package reports

import (
	"fmt"
	"time"

	"payroll-service/internal/models"
)

// PayslipGenerator generates payslips for employees
type PayslipGenerator struct {
	organizationDetails OrganizationDetails
}

// NewPayslipGenerator creates a new payslip generator
func NewPayslipGenerator(orgDetails OrganizationDetails) *PayslipGenerator {
	return &PayslipGenerator{
		organizationDetails: orgDetails,
	}
}

// Payslip represents a complete payslip
type Payslip struct {
	// Header
	PayslipNumber    string
	PayslipDate      string
	PaymentPeriod    string // Month-Year (e.g., "January-2024")
	PaymentDate      string

	// Employee Details
	EmployeeID       string
	EmployeeName     string
	Designation      string
	Department       string
	EmploymentStatus string
	JoinDate         string
	BankName         string
	AccountNumber    string
	IFSC             string

	// Organization Details
	OrganizationName string
	OrganizationCode string
	Address          string

	// Attendance
	DaysInMonth      int
	DaysWorked       int
	DaysAbsent       int
	DaysLeave        int
	WorkingDays      int

	// Earnings
	BasicPay           float64
	DeartnessAllowance float64
	HouseRentAllowance float64
	OtherAllowances    float64
	Gross              float64
	EarningsDetails    []EarningItem

	// Deductions
	PFEmployee         float64
	ESIEmployee        float64
	ProfessionalTax    float64
	TDS                float64
	AdvanceRecovery    float64
	LoanRecovery       float64
	OtherDeductions    float64
	TotalDeductions    float64
	DeductionDetails   []DeductionItem

	// Employer Contribution (for info only)
	PFEmployer         float64
	ESIEmployer        float64
	TotalEmployerCont  float64

	// Summary
	NetPay             float64
	CtcAnnual          float64
	CtcMonthly         float64
	CumulativeCTC      float64 // Year to date

	// Year to Date Summary
	YTDGross           float64
	YTDDeductions      float64
	YTDNetPay          float64
	YTDTds             float64

	// Additional Info
	LeaveBalance       LeaveBalance
	Notes              string
	PrintedDate        string
	SignedBy           string
}

// EarningItem represents individual earning component
type EarningItem struct {
	Name   string
	Amount float64
	Notes  string
}

// DeductionItem represents individual deduction component
type DeductionItem struct {
	Name   string
	Amount float64
	Notes  string
}

// LeaveBalance represents leave balance status
type LeaveBalance struct {
	CasualLeaveOpening    float64
	CasualLeaveTaken      float64
	CasualLeaveClosing    float64
	SickLeaveOpening      float64
	SickLeaveTaken        float64
	SickLeaveClosing      float64
	EarnedLeaveOpening    float64
	EarnedLeaveTaken      float64
	EarnedLeaveClosing    float64
	UnpaidLeaveOpening    float64
	UnpaidLeaveTaken      float64
	UnpaidLeaveClosing    float64
}

// GeneratePayslip generates a payslip from payroll component
func (pg *PayslipGenerator) GeneratePayslip(
	component *models.PayrollComponent,
	employee *models.Employee,
	payrollRun *models.PayrollRun,
	leaveBalance LeaveBalance,
	ytdSummary YTDSummary,
) *Payslip {
	payslip := &Payslip{
		PayslipNumber:    pg.generatePayslipNumber(payrollRun.ID, component.EmployeeID),
		PayslipDate:      time.Now().Format("02-Jan-2006"),
		PaymentPeriod:    pg.formatPaymentPeriod(payrollRun.PayrollMonth),
		PaymentDate:      payrollRun.PayrollPeriodEnd.Format("02-Jan-2006"),

		// Employee Details
		EmployeeID:       employee.EmployeeID,
		EmployeeName:     fmt.Sprintf("%s %s", employee.FirstName, employee.LastName),
		Designation:      employee.Designation.String,
		Department:       employee.Department.String,
		EmploymentStatus: employee.EmploymentStatus,
		JoinDate:         employee.DateOfJoining.Format("02-Jan-2006"),
		BankName:         employee.BankName.String,
		AccountNumber:    maskAccountNumber(employee.BankAccountNumber.String),
		IFSC:             employee.BankIFSCCode.String,

		// Organization Details
		OrganizationName: pg.organizationDetails.Name,
		OrganizationCode: pg.organizationDetails.Code,
		Address:          pg.organizationDetails.Address,

		// Attendance
		DaysInMonth:  component.DaysInMonth,
		DaysWorked:   component.DaysWorked,
		DaysAbsent:   component.DaysAbsent,
		DaysLeave:    component.DaysLeave,
		WorkingDays:  component.DaysWorked,

		// Earnings
		BasicPay:           component.BasicPay,
		DeartnessAllowance: component.DAAmount,
		HouseRentAllowance: component.HRAAmount,
		OtherAllowances:    component.OtherAllowances,
		Gross:              component.GrossAmount,

		// Deductions
		PFEmployee:      component.PFEmployee,
		ESIEmployee:     component.ESIEmployee,
		ProfessionalTax: component.ProfessionalTax,
		TDS:             component.TDS,
		AdvanceRecovery: component.AdvanceRecovery,
		LoanRecovery:    component.LoanRecovery,
		OtherDeductions: component.OtherDeductions,
		TotalDeductions: component.TotalDeductions,

		// Employer Contribution
		PFEmployer:        component.PFEmployer,
		ESIEmployer:       component.ESIEmployer,
		TotalEmployerCont: component.PFEmployer + component.ESIEmployer,

		// Summary
		NetPay:      component.NetPay,
		CtcMonthly:  (component.GrossAmount + component.PFEmployer + component.ESIEmployer) / 12,
		PrintedDate: time.Now().Format("02-Jan-2006"),

		// Year to Date
		YTDGross:      ytdSummary.TotalGross,
		YTDDeductions: ytdSummary.TotalDeductions,
		YTDNetPay:     ytdSummary.TotalNetPay,
		YTDTds:        ytdSummary.TotalTDS,

		// Leave Balance
		LeaveBalance: leaveBalance,

		Notes: fmt.Sprintf("This is a computer generated payslip. No signature required."),
	}

	// Build detailed items
	payslip.EarningsDetails = []EarningItem{
		{Name: "Basic Pay", Amount: component.BasicPay},
		{Name: "Dearness Allowance", Amount: component.DAAmount},
		{Name: "House Rent Allowance", Amount: component.HRAAmount},
		{Name: "Other Allowances", Amount: component.OtherAllowances},
	}

	payslip.DeductionDetails = []DeductionItem{
		{Name: "Provident Fund", Amount: component.PFEmployee, Notes: "Employee Contribution"},
		{Name: "ESI", Amount: component.ESIEmployee, Notes: "Employee Contribution"},
		{Name: "Professional Tax", Amount: component.ProfessionalTax},
		{Name: "TDS", Amount: component.TDS, Notes: "Income Tax"},
		{Name: "Advance Recovery", Amount: component.AdvanceRecovery},
		{Name: "Loan Recovery", Amount: component.LoanRecovery},
		{Name: "Other Deductions", Amount: component.OtherDeductions},
	}

	return payslip
}

// PayslipFormat represents formatted payslip for display/printing
type PayslipFormat struct {
	Header       string
	EmployeeInfo string
	Attendance   string
	Earnings     string
	Deductions   string
	Summary      string
	Footer       string
	HTML         string
}

// FormatPayslipText formats payslip as text
func (pg *PayslipGenerator) FormatPayslipText(payslip *Payslip) string {
	format := fmt.Sprintf(`
================================================================================
%s
PAYSLIP FOR %s (%s)
Payslip Number: %s | Date: %s | Payment Date: %s
================================================================================

EMPLOYEE INFORMATION:
  Name: %s | ID: %s | Designation: %s
  Department: %s | Status: %s | Join Date: %s
  Bank: %s | Account: %s | IFSC: %s

ATTENDANCE:
  Days in Month: %d | Days Worked: %d | Days Absent: %d | Days Leave: %d

EARNINGS:
  Basic Pay              ₹%10.2f
  Dearness Allowance     ₹%10.2f
  House Rent Allowance   ₹%10.2f
  Other Allowances       ₹%10.2f
                         ───────────────
  GROSS AMOUNT           ₹%10.2f

DEDUCTIONS:
  Provident Fund         ₹%10.2f
  ESI                    ₹%10.2f
  Professional Tax       ₹%10.2f
  TDS (Income Tax)       ₹%10.2f
  Advance Recovery       ₹%10.2f
  Loan Recovery          ₹%10.2f
  Other Deductions       ₹%10.2f
                         ───────────────
  TOTAL DEDUCTIONS       ₹%10.2f

EMPLOYER'S CONTRIBUTION:
  Provident Fund         ₹%10.2f
  ESI                    ₹%10.2f
                         ───────────────
  TOTAL                  ₹%10.2f

NET PAY                  ₹%10.2f

MONTHLY CTC              ₹%10.2f

YEAR TO DATE SUMMARY:
  Gross                  ₹%10.2f
  Deductions             ₹%10.2f
  Net Pay                ₹%10.2f
  TDS                    ₹%10.2f

LEAVE BALANCE:
  Casual Leave: %3.0f used | %3.0f balance
  Sick Leave:   %3.0f used | %3.0f balance
  Earned Leave: %3.0f used | %3.0f balance
  Unpaid Leave: %3.0f used | %3.0f balance

NOTES: %s
Printed on: %s

================================================================================
`,
		payslip.OrganizationName,
		payslip.PaymentPeriod,
		payslip.EmployeeName,
		payslip.PayslipNumber,
		payslip.PayslipDate,
		payslip.PaymentDate,

		payslip.EmployeeName,
		payslip.EmployeeID,
		payslip.Designation,
		payslip.Department,
		payslip.EmploymentStatus,
		payslip.JoinDate,
		payslip.BankName,
		payslip.AccountNumber,
		payslip.IFSC,

		payslip.DaysInMonth,
		payslip.DaysWorked,
		payslip.DaysAbsent,
		payslip.DaysLeave,

		payslip.BasicPay,
		payslip.DeartnessAllowance,
		payslip.HouseRentAllowance,
		payslip.OtherAllowances,
		payslip.Gross,

		payslip.PFEmployee,
		payslip.ESIEmployee,
		payslip.ProfessionalTax,
		payslip.TDS,
		payslip.AdvanceRecovery,
		payslip.LoanRecovery,
		payslip.OtherDeductions,
		payslip.TotalDeductions,

		payslip.PFEmployer,
		payslip.ESIEmployer,
		payslip.TotalEmployerCont,

		payslip.NetPay,
		payslip.CtcMonthly,

		payslip.YTDGross,
		payslip.YTDDeductions,
		payslip.YTDNetPay,
		payslip.YTDTds,

		payslip.LeaveBalance.CasualLeaveTaken,
		payslip.LeaveBalance.CasualLeaveClosing,
		payslip.LeaveBalance.SickLeaveTaken,
		payslip.LeaveBalance.SickLeaveClosing,
		payslip.LeaveBalance.EarnedLeaveTaken,
		payslip.LeaveBalance.EarnedLeaveClosing,
		payslip.LeaveBalance.UnpaidLeaveTaken,
		payslip.LeaveBalance.UnpaidLeaveClosing,

		payslip.Notes,
		payslip.PrintedDate,
	)

	return format
}

// YTDSummary represents year-to-date summary
type YTDSummary struct {
	TotalGross       float64
	TotalDeductions  float64
	TotalNetPay      float64
	TotalTDS         float64
	TotalPF          float64
	TotalESI         float64
	TotalPT          float64
}

// ============================================================================
// Helper Methods
// ============================================================================

func (pg *PayslipGenerator) generatePayslipNumber(payrollRunID, employeeID string) string {
	timestamp := time.Now().Unix()
	return fmt.Sprintf("%s-%s-%d", payrollRunID[:8], employeeID[:3], timestamp%100000)
}

func (pg *PayslipGenerator) formatPaymentPeriod(payrollMonth string) string {
	// Input: "2024-01"
	months := map[string]string{
		"01": "January", "02": "February", "03": "March", "04": "April",
		"05": "May", "06": "June", "07": "July", "08": "August",
		"09": "September", "10": "October", "11": "November", "12": "December",
	}

	if len(payrollMonth) != 7 {
		return payrollMonth
	}

	month := payrollMonth[5:7]
	year := payrollMonth[0:4]

	if monthName, ok := months[month]; ok {
		return fmt.Sprintf("%s-%s", monthName, year)
	}

	return payrollMonth
}

func maskAccountNumber(accountNumber string) string {
	if len(accountNumber) <= 4 {
		return "****"
	}
	return fmt.Sprintf("****%s", accountNumber[len(accountNumber)-4:])
}
