package calculator

import (
	"fmt"
	"time"

	"payroll-service/internal/models"
)

// GratuityCalculator handles gratuity computation
type GratuityCalculator struct {
	rules *StatutoryRules
}

// NewGratuityCalculator creates a new gratuity calculator
func NewGratuityCalculator(rules *StatutoryRules) *GratuityCalculator {
	return &GratuityCalculator{
		rules: rules,
	}
}

// GratuityResult represents gratuity calculation output
type GratuityResult struct {
	EmployeeID               string
	ServiceYears             float64
	ServiceMonths            int
	AnnualBasicSalary        float64
	GratuityRatePerYear      float64 // Usually 15 days
	EligibilityMonths        int     // Min months for eligibility (60)
	IsEligible               bool
	AccruedGratuity          float64
	AccruedGratuityMonthly   float64 // Monthly accrual
	DaysOfServiceEarned      float64 // Total days earned
	PayableGratuity          float64 // On exit/resignation
	Notes                    string
	CalculationSteps         []string
}

// CalculateGratuityAccrual calculates monthly gratuity accrual
func (gc *GratuityCalculator) CalculateGratuityAccrual(
	employee *models.Employee,
	monthlyBasicSalary float64,
) *GratuityResult {
	result := &GratuityResult{
		EmployeeID: employee.ID,
		Notes:      "Gratuity accrual calculation",
	}

	// Get gratuity rules
	if gc.rules == nil {
		result.Notes = "No gratuity rules configured"
		return result
	}

	// Default values (as per Indian labor law)
	gratuityRatePerYear := 15.0 // days per year
	eligibilityMonths := 60     // 5 years minimum

	result.EligibilityMonths = eligibilityMonths
	result.GratuityRatePerYear = gratuityRatePerYear
	result.AnnualBasicSalary = monthlyBasicSalary * 12

	// Calculate service period
	serviceYears := float64(0)
	serviceMonths := 0

	if employee.DateOfJoining.Before(time.Now()) {
		serviceDuration := time.Since(employee.DateOfJoining)
		serviceYears = serviceDuration.Hours() / (24 * 365.25)
		serviceMonths = int(serviceYears * 12)
	}

	result.ServiceYears = round(serviceYears, 2)
	result.ServiceMonths = serviceMonths

	result.CalculationSteps = append(result.CalculationSteps,
		fmt.Sprintf("Service Period: %.2f years (%d months)", serviceYears, serviceMonths),
	)

	// Check eligibility (minimum 5 years/60 months)
	if serviceMonths < eligibilityMonths {
		result.IsEligible = false
		result.AccruedGratuity = 0
		result.AccruedGratuityMonthly = 0
		result.Notes = fmt.Sprintf("Not eligible - requires %d months service, has %d months", eligibilityMonths, serviceMonths)
		return result
	}

	result.IsEligible = true

	// Calculate accrued gratuity
	// Formula: (Basic × 15 × Service Years) / 30
	// = (Basic × 15) / 30 × Service Years
	// = (Basic × 0.5) × Service Years

	result.DaysOfServiceEarned = serviceYears * gratuityRatePerYear
	result.CalculationSteps = append(result.CalculationSteps,
		fmt.Sprintf("Days Earned: %.2f years × %.0f days/year = %.0f days", serviceYears, gratuityRatePerYear, result.DaysOfServiceEarned),
	)

	// Convert days to amount
	dailyBasicSalary := monthlyBasicSalary / 30.0
	result.AccruedGratuity = round(result.DaysOfServiceEarned*dailyBasicSalary, 2)

	result.CalculationSteps = append(result.CalculationSteps,
		fmt.Sprintf("Daily Salary: %.2f / 30 = %.2f", monthlyBasicSalary, dailyBasicSalary),
	)

	result.CalculationSteps = append(result.CalculationSteps,
		fmt.Sprintf("Accrued Gratuity: %.0f days × %.2f = %.2f", result.DaysOfServiceEarned, dailyBasicSalary, result.AccruedGratuity),
	)

	// Monthly accrual (for tracking)
	monthlyDaysEarned := gratuityRatePerYear / 12.0
	result.AccruedGratuityMonthly = round(monthlyDaysEarned*dailyBasicSalary, 2)

	result.CalculationSteps = append(result.CalculationSteps,
		fmt.Sprintf("Monthly Accrual: (%.2f days/year ÷ 12) × %.2f = %.2f", gratuityRatePerYear, dailyBasicSalary, result.AccruedGratuityMonthly),
	)

	return result
}

// CalculatePayableGratuity calculates gratuity payable on exit
func (gc *GratuityCalculator) CalculatePayableGratuity(
	employee *models.Employee,
	monthlyBasicSalary float64,
	exitReason string, // "retirement", "resignation", "termination"
) *GratuityResult {
	result := gc.CalculateGratuityAccrual(employee, monthlyBasicSalary)

	// Apply exit reason adjustments (as per Indian labor law)
	switch exitReason {
	case "retirement":
		result.PayableGratuity = result.AccruedGratuity
		result.Notes = fmt.Sprintf("Full gratuity payable on retirement: %.2f", result.PayableGratuity)

	case "resignation":
		// As per Indian labor law, gratuity on resignation is typically:
		// If service < 5 years: 0 (not eligible)
		// If service 5-10 years: 50% of accrued
		// If service > 10 years: 100% of accrued
		if result.ServiceYears < 5 {
			result.PayableGratuity = 0
			result.Notes = "No gratuity on resignation before 5 years of service"
		} else if result.ServiceYears < 10 {
			result.PayableGratuity = round(result.AccruedGratuity*0.5, 2)
			result.Notes = fmt.Sprintf("50%% gratuity on resignation (5-10 years): %.2f", result.PayableGratuity)
		} else {
			result.PayableGratuity = result.AccruedGratuity
			result.Notes = fmt.Sprintf("Full gratuity on resignation (>10 years): %.2f", result.PayableGratuity)
		}

	case "termination":
		// Gratuity on termination depends on reason
		// For now, assume severance requires full gratuity
		result.PayableGratuity = result.AccruedGratuity
		result.Notes = fmt.Sprintf("Full gratuity payable on termination: %.2f", result.PayableGratuity)

	default:
		// No exit, just accrual
		result.PayableGratuity = 0
		result.Notes = fmt.Sprintf("Gratuity accrued (still employed): %.2f", result.AccruedGratuity)
	}

	return result
}

// GratuityStatsSummary provides gratuity statistics for payroll run
type GratuityStatsSummary struct {
	TotalAccruedGratuity float64
	TotalPayableGratuity float64
	EligibleCount        int
	NotEligibleCount     int
	AccrualsByEmployee   map[string]GratuityResult
}

// CalculatePayrollGratuity calculates gratuity for all employees in payroll
func (gc *GratuityCalculator) CalculatePayrollGratuity(
	employees []models.Employee,
	basicSalaries map[string]float64,
) GratuityStatsSummary {
	summary := GratuityStatsSummary{
		AccrualsByEmployee: make(map[string]GratuityResult),
	}

	for _, emp := range employees {
		basicSalary := basicSalaries[emp.ID]
		if basicSalary == 0 {
			continue
		}

		result := gc.CalculateGratuityAccrual(&emp, basicSalary)

		summary.AccrualsByEmployee[emp.ID] = *result
		summary.TotalAccruedGratuity += result.AccruedGratuity

		if result.IsEligible {
			summary.EligibleCount++
		} else {
			summary.NotEligibleCount++
		}
	}

	return summary
}
