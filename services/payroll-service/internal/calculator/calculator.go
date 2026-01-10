package calculator

import (
	"fmt"
	"math"
	"payroll-service/internal/models"
)

// PayrollCalculator handles all payroll computations
type PayrollCalculator struct {
	rules *StatutoryRules
}

// NewPayrollCalculator creates a new calculator instance
func NewPayrollCalculator(rules *StatutoryRules) *PayrollCalculator {
	return &PayrollCalculator{
		rules: rules,
	}
}

// CalculationResult contains detailed payroll calculation output
type CalculationResult struct {
	// Earnings
	BasicPay          float64
	DeartnessAllowance float64
	HouseRentAllowance float64
	OtherAllowances    float64
	GrossAmount        float64

	// Statutory Deductions
	PFEmployee        float64
	PFEmployer        float64
	ESIEmployee       float64
	ESIEmployer       float64
	ProfessionalTax   float64

	// Income Tax
	TDS float64

	// Other Deductions
	AdvanceRecovery float64
	LoanRecovery    float64
	OtherDeductions float64

	// Summary
	TotalEmployeeDeductions float64
	TotalEmployerDeductions float64
	TotalDeductions         float64
	NetPay                  float64

	// Audit Trail
	Calculations []CalculationStep
}

// CalculationStep represents a single calculation step for audit trail
type CalculationStep struct {
	Category    string  // earnings, pf, esi, pt, tds, etc.
	Description string
	Amount      float64
	Rule        string
}

// CalculatePayroll computes complete payroll for an employee
func (pc *PayrollCalculator) CalculatePayroll(employee *models.Employee, salaryStructure *models.SalaryStructure, attendance *PayrollInput) (*CalculationResult, error) {
	result := &CalculationResult{
		Calculations: []CalculationStep{},
	}

	// Step 1: Calculate Earnings (Pro-rated by days worked)
	pc.calculateEarnings(result, salaryStructure, attendance)

	// Step 2: Calculate Statutory Deductions (PF, ESI, PT)
	pc.calculateStatutoryDeductions(result, salaryStructure, attendance, employee)

	// Step 3: Calculate Income Tax (TDS)
	pc.calculateIncomeTax(result, salaryStructure, attendance)

	// Step 4: Calculate Other Deductions
	pc.calculateOtherDeductions(result, attendance)

	// Step 5: Calculate Net Pay
	pc.calculateNetPay(result)

	return result, nil
}

// calculateEarnings computes salary components based on days worked
func (pc *PayrollCalculator) calculateEarnings(result *CalculationResult, ss *models.SalaryStructure, input *PayrollInput) {
	// Pro-ration factor based on days worked
	proRateFactor := float64(input.DaysWorked) / float64(input.DaysInMonth)

	// Ensure factor is between 0 and 1
	if proRateFactor < 0 {
		proRateFactor = 0
	} else if proRateFactor > 1 {
		proRateFactor = 1
	}

	// Basic Pay
	result.BasicPay = round(ss.MonthlyBasic * proRateFactor, 2)
	result.Calculations = append(result.Calculations, CalculationStep{
		Category:    "earnings",
		Description: fmt.Sprintf("Basic Pay (%d/%d days)", input.DaysWorked, input.DaysInMonth),
		Amount:      result.BasicPay,
		Rule:        fmt.Sprintf("%.2f × %.2f = %.2f", ss.MonthlyBasic, proRateFactor, result.BasicPay),
	})

	// Dearness Allowance
	result.DeartnessAllowance = round(ss.MonthlyDA * proRateFactor, 2)
	if result.DeartnessAllowance > 0 {
		result.Calculations = append(result.Calculations, CalculationStep{
			Category:    "earnings",
			Description: fmt.Sprintf("Dearness Allowance (%d/%d days)", input.DaysWorked, input.DaysInMonth),
			Amount:      result.DeartnessAllowance,
			Rule:        fmt.Sprintf("%.2f × %.2f", ss.MonthlyDA, proRateFactor),
		})
	}

	// House Rent Allowance
	result.HouseRentAllowance = round(ss.MonthlyHRA * proRateFactor, 2)
	if result.HouseRentAllowance > 0 {
		result.Calculations = append(result.Calculations, CalculationStep{
			Category:    "earnings",
			Description: fmt.Sprintf("House Rent Allowance (%d/%d days)", input.DaysWorked, input.DaysInMonth),
			Amount:      result.HouseRentAllowance,
			Rule:        fmt.Sprintf("%.2f × %.2f", ss.MonthlyHRA, proRateFactor),
		})
	}

	// Other Allowances
	result.OtherAllowances = round(ss.MonthlyAllowance * proRateFactor, 2)
	if result.OtherAllowances > 0 {
		result.Calculations = append(result.Calculations, CalculationStep{
			Category:    "earnings",
			Description: fmt.Sprintf("Other Allowances (%d/%d days)", input.DaysWorked, input.DaysInMonth),
			Amount:      result.OtherAllowances,
			Rule:        fmt.Sprintf("%.2f × %.2f", ss.MonthlyAllowance, proRateFactor),
		})
	}

	// Gross Amount
	result.GrossAmount = round(
		result.BasicPay+result.DeartnessAllowance+result.HouseRentAllowance+result.OtherAllowances,
		2,
	)

	result.Calculations = append(result.Calculations, CalculationStep{
		Category:    "summary",
		Description: "Gross Amount",
		Amount:      result.GrossAmount,
		Rule:        fmt.Sprintf("Basic (%.2f) + DA (%.2f) + HRA (%.2f) + Other (%.2f)", result.BasicPay, result.DeartnessAllowance, result.HouseRentAllowance, result.OtherAllowances),
	})
}

// calculateStatutoryDeductions computes PF, ESI, PT based on India rules
func (pc *PayrollCalculator) calculateStatutoryDeductions(result *CalculationResult, ss *models.SalaryStructure, input *PayrollInput, employee *models.Employee) {
	// Provident Fund (PF)
	pc.calculatePF(result, ss, input)

	// Employee State Insurance (ESI)
	pc.calculateESI(result, ss, input)

	// Professional Tax (PT) - State-wise
	pc.calculatePT(result, ss, input, employee)

	// Total statutory deductions
	result.TotalEmployeeDeductions = round(
		result.PFEmployee+result.ESIEmployee+result.ProfessionalTax,
		2,
	)

	result.TotalEmployerDeductions = round(
		result.PFEmployer+result.ESIEmployer,
		2,
	)
}

// calculatePF computes Provident Fund deduction (12% + 12%)
func (pc *PayrollCalculator) calculatePF(result *CalculationResult, ss *models.SalaryStructure, input *PayrollInput) {
	if pc.rules.PF == nil {
		return
	}

	// PF is calculated on Basic + DA
	pfWage := result.BasicPay + result.DeartnessAllowance

	// Check if salary exceeds PF ceiling
	if pc.rules.PF.Ceiling > 0 && pfWage > pc.rules.PF.Ceiling {
		pfWage = pc.rules.PF.Ceiling
	}

	// Employee contribution (12%)
	result.PFEmployee = round(pfWage*pc.rules.PF.EmployeeRate/100, 2)
	result.Calculations = append(result.Calculations, CalculationStep{
		Category:    "pf",
		Description: "PF - Employee Contribution",
		Amount:      result.PFEmployee,
		Rule:        fmt.Sprintf("%.2f × %.2f%% = %.2f", pfWage, pc.rules.PF.EmployeeRate, result.PFEmployee),
	})

	// Employer contribution (12%)
	result.PFEmployer = round(pfWage*pc.rules.PF.EmployerRate/100, 2)
	result.Calculations = append(result.Calculations, CalculationStep{
		Category:    "pf",
		Description: "PF - Employer Contribution",
		Amount:      result.PFEmployer,
		Rule:        fmt.Sprintf("%.2f × %.2f%% = %.2f", pfWage, pc.rules.PF.EmployerRate, result.PFEmployer),
	})
}

// calculateESI computes Employee State Insurance deduction
func (pc *PayrollCalculator) calculateESI(result *CalculationResult, ss *models.SalaryStructure, input *PayrollInput) {
	if pc.rules.ESI == nil {
		return
	}

	// Check if salary exceeds ESI threshold
	if pc.rules.ESI.ThresholdSalary > 0 && result.GrossAmount > pc.rules.ESI.ThresholdSalary {
		return // ESI not applicable
	}

	// ESI is calculated on Gross Amount
	esiWage := result.GrossAmount

	// Check if salary exceeds ESI ceiling
	if pc.rules.ESI.WageCeiling > 0 && esiWage > pc.rules.ESI.WageCeiling {
		esiWage = pc.rules.ESI.WageCeiling
	}

	// Employee contribution (0.75%)
	result.ESIEmployee = round(esiWage*pc.rules.ESI.EmployeeRate/100, 2)
	result.Calculations = append(result.Calculations, CalculationStep{
		Category:    "esi",
		Description: "ESI - Employee Contribution",
		Amount:      result.ESIEmployee,
		Rule:        fmt.Sprintf("%.2f × %.2f%% = %.2f", esiWage, pc.rules.ESI.EmployeeRate, result.ESIEmployee),
	})

	// Employer contribution (3.25%)
	result.ESIEmployer = round(esiWage*pc.rules.ESI.EmployerRate/100, 2)
	result.Calculations = append(result.Calculations, CalculationStep{
		Category:    "esi",
		Description: "ESI - Employer Contribution",
		Amount:      result.ESIEmployer,
		Rule:        fmt.Sprintf("%.2f × %.2f%% = %.2f", esiWage, pc.rules.ESI.EmployerRate, result.ESIEmployer),
	})
}

// calculatePT computes Professional Tax (state-wise)
func (pc *PayrollCalculator) calculatePT(result *CalculationResult, ss *models.SalaryStructure, input *PayrollInput, employee *models.Employee) {
	if pc.rules.PT == nil || len(pc.rules.PT.Slabs) == 0 {
		return
	}

	// Find applicable PT slab based on gross amount
	for _, slab := range pc.rules.PT.Slabs {
		if result.GrossAmount >= slab.Min && (slab.Max == nil || result.GrossAmount <= *slab.Max) {
			result.ProfessionalTax = slab.Amount
			result.Calculations = append(result.Calculations, CalculationStep{
				Category:    "pt",
				Description: fmt.Sprintf("Professional Tax (%.0f - %.0f)", slab.Min, getMaxOrInfinity(slab.Max)),
				Amount:      result.ProfessionalTax,
				Rule:        fmt.Sprintf("Slab: %.2f to %.0f = %.2f", slab.Min, getMaxOrInfinity(slab.Max), slab.Amount),
			})
			break
		}
	}
}

// calculateIncomeTax computes TDS based on annual income
func (pc *PayrollCalculator) calculateIncomeTax(result *CalculationResult, ss *models.SalaryStructure, input *PayrollInput) {
	if pc.rules.TDS == nil || len(pc.rules.TDS.Slabs) == 0 {
		return
	}

	// For Phase 3, simplified TDS calculation
	// In a real system, this would be based on annual income with relief/exemptions
	// For now, we calculate monthly TDS based on annual estimated income

	monthlyTaxableIncome := result.GrossAmount - result.PFEmployee - result.ESIEmployee - result.ProfessionalTax

	// Find applicable TDS slab
	for _, slab := range pc.rules.TDS.Slabs {
		if monthlyTaxableIncome >= slab.Min && (slab.Max == nil || monthlyTaxableIncome <= *slab.Max) {
			result.TDS = round(monthlyTaxableIncome*slab.Rate/100, 2)
			result.Calculations = append(result.Calculations, CalculationStep{
				Category:    "tds",
				Description: fmt.Sprintf("TDS (%.0f - %.0f)", slab.Min, getMaxOrInfinity(slab.Max)),
				Amount:      result.TDS,
				Rule:        fmt.Sprintf("Taxable Income: %.2f × %.2f%% = %.2f", monthlyTaxableIncome, slab.Rate, result.TDS),
			})
			break
		}
	}
}

// calculateOtherDeductions handles additional deductions
func (pc *PayrollCalculator) calculateOtherDeductions(result *CalculationResult, input *PayrollInput) {
	result.AdvanceRecovery = input.AdvanceRecovery
	if result.AdvanceRecovery > 0 {
		result.Calculations = append(result.Calculations, CalculationStep{
			Category:    "deductions",
			Description: "Advance Recovery",
			Amount:      result.AdvanceRecovery,
			Rule:        "Employee advance recovery",
		})
	}

	result.LoanRecovery = input.LoanRecovery
	if result.LoanRecovery > 0 {
		result.Calculations = append(result.Calculations, CalculationStep{
			Category:    "deductions",
			Description: "Loan Recovery",
			Amount:      result.LoanRecovery,
			Rule:        "Employee loan recovery",
		})
	}

	result.OtherDeductions = input.OtherDeductions
	if result.OtherDeductions > 0 {
		result.Calculations = append(result.Calculations, CalculationStep{
			Category:    "deductions",
			Description: "Other Deductions",
			Amount:      result.OtherDeductions,
			Rule:        "Other approved deductions",
		})
	}
}

// calculateNetPay computes final net amount
func (pc *PayrollCalculator) calculateNetPay(result *CalculationResult) {
	result.TotalDeductions = round(
		result.PFEmployee+result.ESIEmployee+result.ProfessionalTax+result.TDS+
			result.AdvanceRecovery+result.LoanRecovery+result.OtherDeductions,
		2,
	)

	result.NetPay = round(result.GrossAmount-result.TotalDeductions, 2)

	// Ensure net pay is not negative
	if result.NetPay < 0 {
		result.NetPay = 0
	}

	result.Calculations = append(result.Calculations, CalculationStep{
		Category:    "summary",
		Description: "Total Deductions",
		Amount:      result.TotalDeductions,
		Rule:        fmt.Sprintf("PF (%.2f) + ESI (%.2f) + PT (%.2f) + TDS (%.2f) + Others (%.2f)", result.PFEmployee, result.ESIEmployee, result.ProfessionalTax, result.TDS, result.AdvanceRecovery+result.LoanRecovery+result.OtherDeductions),
	})

	result.Calculations = append(result.Calculations, CalculationStep{
		Category:    "summary",
		Description: "Net Pay",
		Amount:      result.NetPay,
		Rule:        fmt.Sprintf("Gross (%.2f) - Deductions (%.2f) = Net (%.2f)", result.GrossAmount, result.TotalDeductions, result.NetPay),
	})
}

// Helper functions

func round(value float64, precision int) float64 {
	multiplier := math.Pow(10, float64(precision))
	return math.Round(value*multiplier) / multiplier
}

func getMaxOrInfinity(max *float64) float64 {
	if max == nil {
		return 9999999
	}
	return *max
}
