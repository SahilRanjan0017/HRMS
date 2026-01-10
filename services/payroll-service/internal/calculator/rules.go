package calculator

import (
	"fmt"
	"payroll-service/internal/models"
)

// StatutoryRules represents all applicable statutory rules for payroll calculation
type StatutoryRules struct {
	PF  *PFRules
	ESI *ESIRules
	PT  *PTRules
	TDS *TDSRules
}

// PFRules represents Provident Fund rules
type PFRules struct {
	EmployeeRate float64 // Default: 12%
	EmployerRate float64 // Default: 12%
	Ceiling      float64 // Monthly salary ceiling (default: 15000)
}

// ESIRules represents Employee State Insurance rules
type ESIRules struct {
	EmployeeRate      float64 // Default: 0.75%
	EmployerRate      float64 // Default: 3.25%
	WageCeiling       float64 // Monthly ceiling (default: 21000)
	ThresholdSalary   float64 // Salary below which ESI is not applicable (default: 0)
}

// PTRules represents Professional Tax rules (state-wise)
type PTRules struct {
	Slabs []PTSlab
}

// PTSlab represents a PT slab
type PTSlab struct {
	Min    float64
	Max    *float64 // nil means no upper limit
	Amount float64
}

// TDSRules represents Tax Deducted at Source rules
type TDSRules struct {
	Slabs []TDSSlab
}

// TDSSlab represents a TDS slab
type TDSSlab struct {
	Min  float64
	Max  *float64 // nil means no upper limit
	Rate float64  // Percentage
}

// PayrollInput represents input data for payroll calculation
type PayrollInput struct {
	DaysWorked      int
	DaysAbsent      int
	DaysLeave       int
	DaysInMonth     int
	AdvanceRecovery float64
	LoanRecovery    float64
	OtherDeductions float64
}

// BuildStatutoryRulesFromDB converts database rules to calculator rules
func BuildStatutoryRulesFromDB(dbRules []models.StatutoryRule) *StatutoryRules {
	rules := &StatutoryRules{}

	// Organize rules by type
	for _, rule := range dbRules {
		switch rule.RuleType {
		case "PF":
			rules.PF = &PFRules{
				EmployeeRate: defaultIfNil(rule.PFEmployeeRate, 12),
				EmployerRate: defaultIfNil(rule.PFEmployerRate, 12),
				Ceiling:      defaultIfNil(rule.PFCeiling, 15000),
			}

		case "ESI":
			rules.ESI = &ESIRules{
				EmployeeRate:    defaultIfNil(rule.ESIEmployeeRate, 0.75),
				EmployerRate:    defaultIfNil(rule.ESIEmployerRate, 3.25),
				WageCeiling:     defaultIfNil(rule.ESIWageCeiling, 21000),
				ThresholdSalary: defaultIfNil(rule.ESIThresholdSalary, 0),
			}

		case "PT", "PT_SLAB_1", "PT_SLAB_2", "PT_SLAB_3":
			if rules.PT == nil {
				rules.PT = &PTRules{Slabs: []PTSlab{}}
			}

			if rule.PTSlabMin != nil && rule.PTAmount != nil {
				slab := PTSlab{
					Min:    *rule.PTSlabMin,
					Max:    rule.PTSlabMax,
					Amount: *rule.PTAmount,
				}
				rules.PT.Slabs = append(rules.PT.Slabs, slab)
			}

		case "TDS":
			if rules.TDS == nil {
				rules.TDS = &TDSRules{Slabs: []TDSSlab{}}
			}

			if rule.TDSSlabMin != nil && rule.TDSRate != nil {
				slab := TDSSlab{
					Min:  *rule.TDSSlabMin,
					Max:  rule.TDSSlabMax,
					Rate: *rule.TDSRate,
				}
				rules.TDS.Slabs = append(rules.TDS.Slabs, slab)
			}
		}
	}

	return rules
}

// GetDefaultIndiaRules returns default India statutory rules
func GetDefaultIndiaRules() *StatutoryRules {
	maxFloat := func(f float64) *float64 { return &f }

	return &StatutoryRules{
		PF: &PFRules{
			EmployeeRate: 12.0,
			EmployerRate: 12.0,
			Ceiling:      15000,
		},
		ESI: &ESIRules{
			EmployeeRate:    0.75,
			EmployerRate:    3.25,
			WageCeiling:     21000,
			ThresholdSalary: 0,
		},
		PT: &PTRules{
			Slabs: []PTSlab{
				// Maharashtra slabs (default)
				{Min: 0, Max: maxFloat(10000), Amount: 0},
				{Min: 10001, Max: maxFloat(20000), Amount: 150},
				{Min: 20001, Max: nil, Amount: 200},
			},
		},
		TDS: &TDSRules{
			Slabs: []TDSSlab{
				// Simplified TDS slabs (actual TDS depends on annual income, relief, etc.)
				{Min: 0, Max: maxFloat(50000), Rate: 0},
				{Min: 50001, Max: maxFloat(100000), Rate: 5},
				{Min: 100001, Max: maxFloat(250000), Rate: 10},
				{Min: 250001, Max: nil, Rate: 15},
			},
		},
	}
}

// ValidateRules validates that rules are configured correctly
func ValidateRules(rules *StatutoryRules) error {
	if rules == nil {
		return fmt.Errorf("statutory rules not configured")
	}

	if rules.PF == nil {
		return fmt.Errorf("PF rules not configured")
	}

	if rules.PF.EmployeeRate < 0 || rules.PF.EmployerRate < 0 {
		return fmt.Errorf("PF rates cannot be negative")
	}

	if rules.ESI == nil {
		return fmt.Errorf("ESI rules not configured")
	}

	if rules.ESI.EmployeeRate < 0 || rules.ESI.EmployerRate < 0 {
		return fmt.Errorf("ESI rates cannot be negative")
	}

	if rules.PT != nil {
		if len(rules.PT.Slabs) == 0 {
			return fmt.Errorf("PT slabs not configured")
		}

		// Validate PT slabs are in ascending order
		for i := 0; i < len(rules.PT.Slabs)-1; i++ {
			if rules.PT.Slabs[i].Min >= rules.PT.Slabs[i+1].Min {
				return fmt.Errorf("PT slabs must be in ascending order")
			}
		}
	}

	if rules.TDS != nil {
		if len(rules.TDS.Slabs) == 0 {
			return fmt.Errorf("TDS slabs not configured")
		}

		// Validate TDS slabs are in ascending order
		for i := 0; i < len(rules.TDS.Slabs)-1; i++ {
			if rules.TDS.Slabs[i].Min >= rules.TDS.Slabs[i+1].Min {
				return fmt.Errorf("TDS slabs must be in ascending order")
			}
		}

		// Validate TDS rates are between 0-100
		for _, slab := range rules.TDS.Slabs {
			if slab.Rate < 0 || slab.Rate > 100 {
				return fmt.Errorf("TDS rate must be between 0-100, got %.2f", slab.Rate)
			}
		}
	}

	return nil
}

// Helper function
func defaultIfNil(value *float64, defaultValue float64) float64 {
	if value == nil {
		return defaultValue
	}
	return *value
}

// IndiaStatutoryRulesInfo provides information about India statutory calculations
const IndiaStatutoryRulesInfo = `
INDIA PAYROLL COMPLIANCE RULES
================================

1. PROVIDENT FUND (PF)
   - Employee Contribution: 12% of (Basic + DA)
   - Employer Contribution: 12% of (Basic + DA)
   - Monthly Ceiling: ₹15,000
   - Purpose: Retirement fund
   - Eligibility: All employees

2. EMPLOYEE STATE INSURANCE (ESI)
   - Employee Contribution: 0.75% of Gross
   - Employer Contribution: 3.25% of Gross
   - Monthly Ceiling: ₹21,000
   - Salary Threshold: ₹0 (applies to all)
   - Purpose: Health & accident insurance
   - Eligibility: Depends on employer size

3. PROFESSIONAL TAX (PT)
   - Amount: State-wise slabs
   - Maharashtra Example:
     * ₹0 - ₹10,000: Nil
     * ₹10,001 - ₹20,000: ₹150
     * ₹20,001+: ₹200
   - Purpose: State revenue
   - State-wise rules vary

4. TAX DEDUCTED AT SOURCE (TDS)
   - Calculated on Taxable Income
   - Depends on annual salary, relief, exemptions
   - Simplified rates (actual calculation more complex):
     * ₹0 - ₹50,000: 0%
     * ₹50,001 - ₹100,000: 5%
     * ₹100,001 - ₹250,000: 10%
     * ₹250,001+: 15%
   - Purpose: Income tax collection
   - Annual reconciliation via Form 16

5. PRO-RATION RULES
   - Salary is pro-rated by days worked
   - Formula: (Days Worked / Days in Month) × Monthly Salary
   - Applicable to all salary components
   - Deductions also pro-rated in most cases

6. LEAVE & ATTENDANCE
   - Loss of Pay: Days absent × (Monthly Salary / Days in Month)
   - Leave Encashment: As per company policy
   - Attendance: Tracked daily, summarized monthly

7. GRATUITY
   - Accrual: 15 days salary per year of service
   - Payment: On separation (if eligible)
   - Eligibility: Min 5 years of service

8. STATUTORY COMPLIANCE
   - All calculations must maintain accuracy to 2 decimal places
   - Audit trail: Track all calculation steps
   - Finalization: Once locked, cannot be modified
   - Filing: Form 16 (annual), Challan (quarterly), ECR (monthly)
`
