package service

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"time"

	"payroll-service/internal/calculator"
	"payroll-service/internal/models"
	"payroll-service/internal/repository"
)

type PayrollService struct {
	repo             *repository.PayrollRepository
	empRepo          *repository.EmployeeRepository
	calculatorFactory *calculator.CalculatorFactory
}

func NewPayrollService(db *sql.DB) *PayrollService {
	return &PayrollService{
		repo:              repository.NewPayrollRepository(db),
		empRepo:           repository.NewEmployeeRepository(db),
		calculatorFactory: calculator.NewCalculatorFactory(repository.NewPayrollRepository(db)),
	}
}

// GetPayrollRuns fetches all payroll runs for an organization
func (s *PayrollService) GetPayrollRuns(orgID string, filters map[string]interface{}) ([]models.PayrollRun, error) {
	return s.repo.GetPayrollRuns(orgID, filters)
}

// GetPayrollRunDetail fetches a payroll run with all components
func (s *PayrollService) GetPayrollRunDetail(payrollRunID string) (map[string]interface{}, error) {
	pr, err := s.repo.GetPayrollRunByID(payrollRunID)
	if err != nil {
		return nil, err
	}

	components, err := s.repo.GetPayrollComponents(payrollRunID)
	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"payroll_run":  pr,
		"components":   components,
		"total_count":  len(components),
	}, nil
}

// CreatePayrollRun creates a new payroll cycle
func (s *PayrollService) CreatePayrollRun(orgID string, startDate, endDate time.Time, createdBy string) (*models.PayrollRun, error) {
	// Validate dates
	if startDate.After(endDate) {
		return nil, fmt.Errorf("start date must be before end date")
	}

	// Generate payroll month (YYYY-MM)
	payrollMonth := startDate.Format("2006-01")

	pr := &models.PayrollRun{
		OrgID:              orgID,
		PayrollPeriodStart: startDate,
		PayrollPeriodEnd:   endDate,
		PayrollMonth:       payrollMonth,
		Status:             "draft",
		DryRunCount:        0,
		TotalEmployees:     0,
		CreatedBy:          &createdBy,
	}

	if err := s.repo.CreatePayrollRun(pr); err != nil {
		return nil, err
	}

	return pr, nil
}

// InitiatePayrollRun initializes payroll components for all employees
func (s *PayrollService) InitiatePayrollRun(orgID, payrollRunID, stateCode string, initiatedBy string) error {
	// Get all active employees
	employees, err := s.empRepo.GetEmployees(orgID, map[string]interface{}{
		"employment_status": "active",
	})
	if err != nil {
		return fmt.Errorf("failed to fetch employees: %w", err)
	}

	// Get payroll run details
	pr, err := s.repo.GetPayrollRunByID(payrollRunID)
	if err != nil {
		return err
	}

	if stateCode == "" {
		stateCode = "MH" // Default to Maharashtra
	}

	// Create calculator factory
	calc, err := s.calculatorFactory.CreateCalculator(stateCode)
	if err != nil {
		return fmt.Errorf("failed to create calculator: %w", err)
	}

	validator, err := s.calculatorFactory.CreateValidator(stateCode)
	if err != nil {
		return fmt.Errorf("failed to create validator: %w", err)
	}

	successCount := 0
	failureCount := 0

	// Create payroll components for each employee
	for _, emp := range employees {
		// Get employee's salary structure
		ss, err := s.empRepo.GetSalaryStructure(emp.ID)
		if err != nil {
			failureCount++
			continue
		}

		// Get attendance data
		attendance, err := s.empRepo.GetAttendanceSummary(emp.ID, pr.PayrollMonth)
		if err != nil {
			failureCount++
			continue
		}

		// Get leave data
		leave, err := s.empRepo.GetLeaveSummary(emp.ID, pr.PayrollMonth)
		if err != nil {
			failureCount++
			continue
		}

		// Determine days worked
		daysWorked := 30
		daysAbsent := 0
		daysLeave := 0

		if attendance != nil {
			daysWorked = attendance.WorkingDaysActual
			daysAbsent = attendance.AbsentDays
			daysLeave = attendance.LeaveDays
		}

		daysInMonth := 30

		// Prepare input for calculator
		payrollInput := &calculator.PayrollInput{
			DaysWorked:      daysWorked,
			DaysAbsent:      daysAbsent,
			DaysLeave:       daysLeave,
			DaysInMonth:     daysInMonth,
			AdvanceRecovery: 0,
			LoanRecovery:    0,
			OtherDeductions: 0,
		}

		if leave != nil && leave.LossOfPay > 0 {
			payrollInput.OtherDeductions += leave.LossOfPay
		}

		// Calculate payroll using the calculator engine
		calcResult, err := calc.CalculatePayroll(&emp, ss, payrollInput)
		if err != nil {
			failureCount++
			continue
		}

		// Validate the calculated result
		pc := calculator.ConvertCalculationResultToComponent(
			calcResult,
			orgID, payrollRunID, emp.ID, &ss.ID,
			daysInMonth,
			daysWorked, daysAbsent, daysLeave,
		)

		pc.CreatedBy = &initiatedBy

		// Validate component
		validationErrors := validator.ValidatePayrollComponent(pc, &emp, ss)
		if len(validationErrors) > 0 {
			// Store validation errors
			errJSON, _ := json.Marshal(validationErrors)
			pc.ValidationErrors.String = string(errJSON)
			pc.ValidationErrors.Valid = true

			// Only fail if there are critical errors
			if calculator.HasCriticalErrors(validationErrors) {
				failureCount++
				continue
			}
		}

		// Create the component in database
		if err := s.repo.CreatePayrollComponent(pc); err != nil {
			failureCount++
			continue
		}

		successCount++
	}

	// Update payroll run status to in_progress
	if err := s.repo.UpdatePayrollRunStatus(payrollRunID, "in_progress", initiatedBy); err != nil {
		return err
	}

	if failureCount > 0 {
		return fmt.Errorf("payroll initiated with errors: %d succeeded, %d failed", successCount, failureCount)
	}

	return nil
}

// ValidatePayroll validates all components in a payroll run
func (s *PayrollService) ValidatePayroll(payrollRunID string) ([]string, error) {
	var errors []string

	components, err := s.repo.GetPayrollComponents(payrollRunID)
	if err != nil {
		return nil, err
	}

	for _, comp := range components {
		// Validation rules
		if comp.GrossAmount < 0 {
			errors = append(errors, fmt.Sprintf("Employee %s: Negative gross amount", comp.EmployeeID))
		}

		if comp.NetPay < 0 {
			errors = append(errors, fmt.Sprintf("Employee %s: Negative net pay", comp.EmployeeID))
		}

		if comp.DaysWorked > comp.DaysInMonth {
			errors = append(errors, fmt.Sprintf("Employee %s: Days worked exceeds days in month", comp.EmployeeID))
		}
	}

	return errors, nil
}

// FinalizePayroll finalizes a payroll run (makes it ready for approval)
func (s *PayrollService) FinalizePayroll(payrollRunID string, finalizedBy string) error {
	// Run validation first
	errors, err := s.ValidatePayroll(payrollRunID)
	if err != nil {
		return err
	}

	if len(errors) > 0 {
		return fmt.Errorf("payroll validation failed with %d errors", len(errors))
	}

	// Update status to finalized
	if err := s.repo.UpdatePayrollRunStatus(payrollRunID, "finalized", finalizedBy); err != nil {
		return err
	}

	return nil
}

// ApprovePayroll approves a payroll run
func (s *PayrollService) ApprovePayroll(payrollRunID string, approvedBy string) error {
	pr, err := s.repo.GetPayrollRunByID(payrollRunID)
	if err != nil {
		return err
	}

	if pr.Status != "finalized" {
		return fmt.Errorf("payroll must be finalized before approval")
	}

	// Update status to approved
	if err := s.repo.UpdatePayrollRunStatus(payrollRunID, "locked", approvedBy); err != nil {
		return err
	}

	// Lock the payroll run
	if err := s.repo.LockPayrollRun(payrollRunID, approvedBy, "Payroll approved and locked"); err != nil {
		return err
	}

	return nil
}

// ReleasePayroll releases payroll (marks as released for payment)
func (s *PayrollService) ReleasePayroll(payrollRunID string, releasedBy string) error {
	pr, err := s.repo.GetPayrollRunByID(payrollRunID)
	if err != nil {
		return err
	}

	if pr.Status != "locked" {
		return fmt.Errorf("payroll must be locked before release")
	}

	// Update status to released
	if err := s.repo.UpdatePayrollRunStatus(payrollRunID, "released", releasedBy); err != nil {
		return err
	}

	return nil
}

// DryRunPayroll performs a dry run of payroll (for testing)
func (s *PayrollService) DryRunPayroll(payrollRunID string) error {
	pr, err := s.repo.GetPayrollRunByID(payrollRunID)
	if err != nil {
		return err
	}

	// Increment dry run count
	pr.DryRunCount++

	// Validate
	errors, err := s.ValidatePayroll(payrollRunID)
	if err != nil {
		return err
	}

	if len(errors) > 0 {
		return fmt.Errorf("dry run validation failed with %d errors", len(errors))
	}

	// Update status to dry_run
	if err := s.repo.UpdatePayrollRunStatus(payrollRunID, "dry_run", "system"); err != nil {
		return err
	}

	return nil
}

// GetPayrollSummary gets financial summary for a payroll run
func (s *PayrollService) GetPayrollSummary(payrollRunID string) (map[string]interface{}, error) {
	pr, err := s.repo.GetPayrollRunByID(payrollRunID)
	if err != nil {
		return nil, err
	}

	components, err := s.repo.GetPayrollComponents(payrollRunID)
	if err != nil {
		return nil, err
	}

	var totalGross, totalDeductions, totalNetPay float64
	var totalPFEmp, totalPFEmpr, totalESIEmp, totalESIEmpr, totalPT, totalTDS float64

	for _, comp := range components {
		totalGross += comp.GrossAmount
		totalDeductions += comp.TotalDeductions
		totalNetPay += comp.NetPay
		totalPFEmp += comp.PFEmployee
		totalPFEmpr += comp.PFEmployer
		totalESIEmp += comp.ESIEmployee
		totalESIEmpr += comp.ESIEmployer
		totalPT += comp.ProfessionalTax
		totalTDS += comp.TDS
	}

	return map[string]interface{}{
		"payroll_id":            pr.ID,
		"payroll_month":         pr.PayrollMonth,
		"status":                pr.Status,
		"total_employees":       len(components),
		"total_gross_amount":    totalGross,
		"total_deductions":      totalDeductions,
		"total_net_amount":      totalNetPay,
		"total_pf_employee":     totalPFEmp,
		"total_pf_employer":     totalPFEmpr,
		"total_esi_employee":    totalESIEmp,
		"total_esi_employer":    totalESIEmpr,
		"total_professional_tax": totalPT,
		"total_tds":             totalTDS,
	}, nil
}
