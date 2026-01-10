package calculator

import (
	"fmt"
	"payroll-service/internal/models"
	"payroll-service/internal/repository"
)

// CalculatorFactory creates calculator instances with rules from database
type CalculatorFactory struct {
	repo *repository.PayrollRepository
}

// NewCalculatorFactory creates a new factory
func NewCalculatorFactory(repo *repository.PayrollRepository) *CalculatorFactory {
	return &CalculatorFactory{
		repo: repo,
	}
}

// CreateCalculator creates a calculator with rules for a specific organization/state
func (f *CalculatorFactory) CreateCalculator(stateCode string) (*PayrollCalculator, error) {
	// Fetch rules from database (for now, use defaults)
	// In production, this would fetch rules by state and effective date
	rules := GetDefaultIndiaRules()

	// Validate rules
	if err := ValidateRules(rules); err != nil {
		return nil, fmt.Errorf("invalid statutory rules: %w", err)
	}

	return NewPayrollCalculator(rules), nil
}

// CreateValidator creates a validator with rules
func (f *CalculatorFactory) CreateValidator(stateCode string) (*PayrollValidator, error) {
	rules := GetDefaultIndiaRules()

	if err := ValidateRules(rules); err != nil {
		return nil, fmt.Errorf("invalid statutory rules: %w", err)
	}

	return NewPayrollValidator(rules), nil
}

// CalculateEmployeePayroll calculates complete payroll for an employee
func (f *CalculatorFactory) CalculateEmployeePayroll(
	employee *models.Employee,
	salaryStructure *models.SalaryStructure,
	attendance *PayrollInput,
	stateCode string,
) (*CalculationResult, error) {
	if employee == nil {
		return nil, fmt.Errorf("employee is nil")
	}

	if salaryStructure == nil {
		return nil, fmt.Errorf("salary structure is nil")
	}

	if attendance == nil {
		return nil, fmt.Errorf("attendance data is nil")
	}

	// Validate input
	if attendance.DaysWorked < 0 || attendance.DaysInMonth <= 0 {
		return nil, fmt.Errorf("invalid attendance data: days_worked=%d, days_in_month=%d", attendance.DaysWorked, attendance.DaysInMonth)
	}

	// Create calculator
	calc, err := f.CreateCalculator(stateCode)
	if err != nil {
		return nil, err
	}

	// Calculate payroll
	result, err := calc.CalculatePayroll(employee, salaryStructure, attendance)
	if err != nil {
		return nil, err
	}

	return result, nil
}

// ConvertCalculationResultToComponent converts calculation result to PayrollComponent
func ConvertCalculationResultToComponent(
	result *CalculationResult,
	orgID, payrollRunID, employeeID string,
	salaryStructureID *string,
	daysInMonth int,
	daysWorked, daysAbsent, daysLeave int,
) *models.PayrollComponent {
	return &models.PayrollComponent{
		OrgID:              orgID,
		PayrollRunID:       payrollRunID,
		EmployeeID:         employeeID,
		SalaryStructureID:  salaryStructureID,
		DaysWorked:         daysWorked,
		DaysAbsent:         daysAbsent,
		DaysLeave:          daysLeave,
		DaysInMonth:        daysInMonth,
		BasicPay:           result.BasicPay,
		DAAmount:           result.DeartnessAllowance,
		HRAAmount:          result.HouseRentAllowance,
		OtherAllowances:    result.OtherAllowances,
		GrossAmount:        result.GrossAmount,
		PFEmployee:         result.PFEmployee,
		PFEmployer:         result.PFEmployer,
		ESIEmployee:        result.ESIEmployee,
		ESIEmployer:        result.ESIEmployer,
		ProfessionalTax:    result.ProfessionalTax,
		TDS:                result.TDS,
		AdvanceRecovery:    result.AdvanceRecovery,
		LoanRecovery:       result.LoanRecovery,
		OtherDeductions:    result.OtherDeductions,
		TotalDeductions:    result.TotalDeductions,
		NetPay:             result.NetPay,
		IsValidated:        false,
		IsLocked:           false,
	}
}

// CalculationAuditTrail represents audit trail for a calculation
type CalculationAuditTrail struct {
	EmployeeID   string
	PayrollMonth string
	Steps        []CalculationStep
	Validations  []ValidationError
	Status       string
	CalculatedAt string
	CalculatedBy string
}

// FormatCalculationAuditTrail creates an audit trail from calculation results
func FormatCalculationAuditTrail(
	employeeID, payrollMonth string,
	result *CalculationResult,
	validations []ValidationError,
	calculatedBy string,
) CalculationAuditTrail {
	status := "valid"
	if len(validations) > 0 {
		status = "with_errors"
	}

	return CalculationAuditTrail{
		EmployeeID:   employeeID,
		PayrollMonth: payrollMonth,
		Steps:        result.Calculations,
		Validations:  validations,
		Status:       status,
		CalculatedBy: calculatedBy,
	}
}
