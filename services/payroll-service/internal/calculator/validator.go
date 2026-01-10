package calculator

import (
	"fmt"
	"payroll-service/internal/models"
)

// ValidationError represents a single validation error
type ValidationError struct {
	Code       string  // Error code for programmatic handling
	Severity   string  // "error", "warning", "info"
	Category   string  // "salary", "deductions", "attendance", etc.
	Message    string
	Amount     *float64
	EmployeeID string
}

// PayrollValidator validates payroll calculations
type PayrollValidator struct {
	rules *StatutoryRules
}

// NewPayrollValidator creates a new validator instance
func NewPayrollValidator(rules *StatutoryRules) *PayrollValidator {
	return &PayrollValidator{
		rules: rules,
	}
}

// ValidatePayrollComponent validates a single payroll component
func (v *PayrollValidator) ValidatePayrollComponent(
	component *models.PayrollComponent,
	employee *models.Employee,
	salaryStructure *models.SalaryStructure,
) []ValidationError {
	var errors []ValidationError

	// Basic validations
	v.validateAmounts(component, &errors)
	v.validateDays(component, &errors)
	v.validateDeductions(component, &errors)
	v.validateEmployeeEligibility(employee, component, &errors)
	v.validateSalaryStructure(salaryStructure, &errors)

	return errors
}

// validateAmounts checks for negative/extreme amounts
func (v *PayrollValidator) validateAmounts(component *models.PayrollComponent, errors *[]ValidationError) {
	if component.BasicPay < 0 {
		*errors = append(*errors, ValidationError{
			Code:       "INVALID_BASIC_PAY",
			Severity:   "error",
			Category:   "salary",
			Message:    "Basic pay cannot be negative",
			Amount:     &component.BasicPay,
			EmployeeID: component.EmployeeID,
		})
	}

	if component.GrossAmount < 0 {
		*errors = append(*errors, ValidationError{
			Code:       "INVALID_GROSS_AMOUNT",
			Severity:   "error",
			Category:   "salary",
			Message:    "Gross amount cannot be negative",
			Amount:     &component.GrossAmount,
			EmployeeID: component.EmployeeID,
		})
	}

	if component.NetPay < 0 {
		*errors = append(*errors, ValidationError{
			Code:       "NEGATIVE_NET_PAY",
			Severity:   "error",
			Category:   "salary",
			Message:    "Net pay is negative - total deductions exceed gross amount",
			Amount:     &component.NetPay,
			EmployeeID: component.EmployeeID,
		})
	}

	if component.TotalDeductions < 0 {
		*errors = append(*errors, ValidationError{
			Code:       "INVALID_DEDUCTIONS",
			Severity:   "error",
			Category:   "deductions",
			Message:    "Total deductions cannot be negative",
			Amount:     &component.TotalDeductions,
			EmployeeID: component.EmployeeID,
		})
	}

	// Check if deductions exceed 60% of gross (warning)
	if component.GrossAmount > 0 {
		deductionPercentage := (component.TotalDeductions / component.GrossAmount) * 100
		if deductionPercentage > 60 {
			*errors = append(*errors, ValidationError{
				Code:       "HIGH_DEDUCTIONS",
				Severity:   "warning",
				Category:   "deductions",
				Message:    fmt.Sprintf("Total deductions (%.2f%%) exceed 60%% of gross amount", deductionPercentage),
				Amount:     &component.TotalDeductions,
				EmployeeID: component.EmployeeID,
			})
		}
	}
}

// validateDays checks attendance/leave days validity
func (v *PayrollValidator) validateDays(component *models.PayrollComponent, errors *[]ValidationError) {
	if component.DaysInMonth <= 0 {
		*errors = append(*errors, ValidationError{
			Code:       "INVALID_DAYS_IN_MONTH",
			Severity:   "error",
			Category:   "attendance",
			Message:    "Days in month must be greater than 0",
			EmployeeID: component.EmployeeID,
		})
	}

	if component.DaysWorked < 0 {
		*errors = append(*errors, ValidationError{
			Code:       "INVALID_DAYS_WORKED",
			Severity:   "error",
			Category:   "attendance",
			Message:    "Days worked cannot be negative",
			EmployeeID: component.EmployeeID,
		})
	}

	if component.DaysWorked > component.DaysInMonth {
		*errors = append(*errors, ValidationError{
			Code:       "DAYS_WORKED_EXCEEDS_MONTH",
			Severity:   "error",
			Category:   "attendance",
			Message:    fmt.Sprintf("Days worked (%d) cannot exceed days in month (%d)", component.DaysWorked, component.DaysInMonth),
			EmployeeID: component.EmployeeID,
		})
	}

	totalDaysDeducted := component.DaysAbsent + component.DaysLeave
	if totalDaysDeducted+component.DaysWorked > component.DaysInMonth {
		*errors = append(*errors, ValidationError{
			Code:       "DAYS_TOTAL_MISMATCH",
			Severity:   "error",
			Category:   "attendance",
			Message:    fmt.Sprintf("Total days (worked: %d, absent: %d, leave: %d) do not match days in month (%d)", component.DaysWorked, component.DaysAbsent, component.DaysLeave, component.DaysInMonth),
			EmployeeID: component.EmployeeID,
		})
	}
}

// validateDeductions checks deduction rules
func (v *PayrollValidator) validateDeductions(component *models.PayrollComponent, errors *[]ValidationError) {
	if component.PFEmployee < 0 {
		*errors = append(*errors, ValidationError{
			Code:       "INVALID_PF",
			Severity:   "error",
			Category:   "deductions",
			Message:    "PF deduction cannot be negative",
			EmployeeID: component.EmployeeID,
		})
	}

	if component.ESIEmployee < 0 {
		*errors = append(*errors, ValidationError{
			Code:       "INVALID_ESI",
			Severity:   "error",
			Category:   "deductions",
			Message:    "ESI deduction cannot be negative",
			EmployeeID: component.EmployeeID,
		})
	}

	if component.ProfessionalTax < 0 {
		*errors = append(*errors, ValidationError{
			Code:       "INVALID_PT",
			Severity:   "error",
			Category:   "deductions",
			Message:    "Professional Tax cannot be negative",
			EmployeeID: component.EmployeeID,
		})
	}

	if component.TDS < 0 {
		*errors = append(*errors, ValidationError{
			Code:       "INVALID_TDS",
			Severity:   "error",
			Category:   "deductions",
			Message:    "TDS cannot be negative",
			EmployeeID: component.EmployeeID,
		})
	}

	// Check advance recovery not exceeding gross
	if component.AdvanceRecovery > 0 && component.AdvanceRecovery > component.GrossAmount {
		*errors = append(*errors, ValidationError{
			Code:       "ADVANCE_RECOVERY_EXCEEDS_GROSS",
			Severity:   "error",
			Category:   "deductions",
			Message:    fmt.Sprintf("Advance recovery (%.2f) cannot exceed gross amount (%.2f)", component.AdvanceRecovery, component.GrossAmount),
			EmployeeID: component.EmployeeID,
		})
	}
}

// validateEmployeeEligibility checks employee-specific eligibility rules
func (v *PayrollValidator) validateEmployeeEligibility(
	employee *models.Employee,
	component *models.PayrollComponent,
	errors *[]ValidationError,
) {
	if employee == nil {
		return
	}

	if employee.EmploymentStatus != "active" {
		// Warning: Processing payroll for non-active employee
		if employee.EmploymentStatus == "left" {
			*errors = append(*errors, ValidationError{
				Code:       "EMPLOYEE_LEFT",
				Severity:   "warning",
				Category:   "employee",
				Message:    "Processing payroll for an employee who has left the organization",
				EmployeeID: component.EmployeeID,
			})
		}
	}

	// Check for missing bank details
	if employee.BankAccountNumber.Valid == false || employee.BankIFSCCode.Valid == false {
		*errors = append(*errors, ValidationError{
			Code:       "MISSING_BANK_DETAILS",
			Severity:   "warning",
			Category:   "employee",
			Message:    "Employee has incomplete bank details - payment may fail",
			EmployeeID: component.EmployeeID,
		})
	}

	// Check for missing PAN
	if employee.PersonalPAN.Valid == false {
		*errors = append(*errors, ValidationError{
			Code:       "MISSING_PAN",
			Severity:   "warning",
			Category:   "employee",
			Message:    "Employee does not have PAN - TDS calculation accuracy affected",
			EmployeeID: component.EmployeeID,
		})
	}
}

// validateSalaryStructure checks salary structure validity
func (v *PayrollValidator) validateSalaryStructure(
	salaryStructure *models.SalaryStructure,
	errors *[]ValidationError,
) {
	if salaryStructure == nil {
		return
	}

	if salaryStructure.MonthlyBasic <= 0 {
		*errors = append(*errors, ValidationError{
			Code:       "INVALID_SALARY_STRUCTURE",
			Severity:   "error",
			Category:   "salary",
			Message:    "Salary structure basic pay must be greater than 0",
		})
	}
}

// ValidatePayrollRun validates an entire payroll run
func (v *PayrollValidator) ValidatePayrollRun(
	components []models.PayrollComponent,
	payrollMonth string,
) []ValidationError {
	var allErrors []ValidationError

	if len(components) == 0 {
		allErrors = append(allErrors, ValidationError{
			Code:     "NO_COMPONENTS",
			Severity: "error",
			Category: "payroll",
			Message:  "Payroll run has no employee components",
		})
		return allErrors
	}

	// Validate totals
	var totalGross, totalDeductions, totalNetPay float64

	for _, comp := range components {
		totalGross += comp.GrossAmount
		totalDeductions += comp.TotalDeductions
		totalNetPay += comp.NetPay
	}

	// Check if totals are reasonable
	if totalGross <= 0 {
		allErrors = append(allErrors, ValidationError{
			Code:     "ZERO_PAYROLL",
			Severity: "error",
			Category: "payroll",
			Message:  "Total gross amount is zero or negative",
		})
	}

	if totalNetPay < 0 {
		allErrors = append(allErrors, ValidationError{
			Code:     "NEGATIVE_TOTAL_PAYROLL",
			Severity: "error",
			Category: "payroll",
			Message:  "Total net pay is negative",
		})
	}

	// Check for missing components
	for _, comp := range components {
		if comp.BasicPay == 0 && comp.GrossAmount == 0 {
			allErrors = append(allErrors, ValidationError{
				Code:       "INCOMPLETE_CALCULATION",
				Severity:   "error",
				Category:   "salary",
				Message:    "Employee component not properly calculated",
				EmployeeID: comp.EmployeeID,
			})
		}

		if !comp.IsValidated {
			allErrors = append(allErrors, ValidationError{
				Code:       "UNVALIDATED_COMPONENT",
				Severity:   "warning",
				Category:   "validation",
				Message:    "Employee component not validated",
				EmployeeID: comp.EmployeeID,
			})
		}
	}

	return allErrors
}

// SummarizeErrors groups errors by severity
func SummarizeErrors(errors []ValidationError) map[string]int {
	summary := map[string]int{
		"error":   0,
		"warning": 0,
		"info":    0,
	}

	for _, err := range errors {
		summary[err.Severity]++
	}

	return summary
}

// HasCriticalErrors checks if there are any critical errors
func HasCriticalErrors(errors []ValidationError) bool {
	for _, err := range errors {
		if err.Severity == "error" {
			return true
		}
	}
	return false
}
