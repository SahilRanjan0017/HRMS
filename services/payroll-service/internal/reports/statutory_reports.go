package reports

import (
	"fmt"
	"time"

	"payroll-service/internal/models"
)

// StatutoryReportGenerator generates Form 16, Form 24Q, and other statutory documents
type StatutoryReportGenerator struct {
	organizationID string
	fiscalYear     string // YYYY-YYYY format, e.g., "2023-2024"
}

// NewStatutoryReportGenerator creates a new report generator
func NewStatutoryReportGenerator(orgID, fiscalYear string) *StatutoryReportGenerator {
	return &StatutoryReportGenerator{
		organizationID: orgID,
		fiscalYear:     fiscalYear,
	}
}

// ============================================================================
// FORM 16 (Annual Income Tax Certificate)
// ============================================================================

// Form16Data represents Form 16 data
type Form16Data struct {
	CertificateNumber      string // Unique certificate number
	IssueDate              string // Date of issue
	DeductorPAN            string // Organization's PAN
	DeductorName           string // Organization name
	DeductorAddress        string // Organization address
	DeducteeID             string // Employee ID
	DeducteeName           string // Employee name
	DeducteePAN            string // Employee PAN
	DeducteeAadhaar        string // Employee Aadhaar (masked)
	FiscalYear             string // YYYY-YYYY
	AssessmentYear         string // YYYY-YY
	EmployerContribution   float64 // EPF/EPS
	TotalIncome            float64 // Gross income for the year
	TotalTDSDeducted       float64 // Total TDS deducted
	SectionIVDeductions    []Section80Deduction // Section 80C, 80D, etc.
	OtherIncome            float64 // Other income
	GrossTotalIncome       float64
	TaxablIncome           float64
	TaxPayable             float64
	TDSPaid                float64
	TaxRefund              float64 // If TDS > Tax Payable
	TaxPayableNow          float64 // If Tax Payable > TDS
	MonthlyTDSBreakdown    []MonthlyTDSDetail
	GeneratedBy            string // HR officer name
	GeneratedAt            string // Timestamp
	DigitalSignatureHash   string // For digital signing
}

// Section80Deduction represents tax deductions under various sections
type Section80Deduction struct {
	Section string  // "80C", "80D", "80E", "80G"
	Amount  float64
	Remarks string
}

// MonthlyTDSDetail shows TDS deducted each month
type MonthlyTDSDetail struct {
	Month         string  // "Apr-2023", "May-2023", etc.
	Salary        float64
	TDS           float64
	CumulativeTDS float64
}

// Form16Summary summarizes Form 16 for multiple employees
type Form16Summary struct {
	TotalEmployees      int
	TotalIncome         float64
	TotalTDSDeducted    float64
	AverageTDS          float64
	DocumentsGenerated  int
	GeneratedAt         string
}

// GenerateForm16 generates Form 16 for an employee
func (g *StatutoryReportGenerator) GenerateForm16(
	employee *models.Employee,
	annualSalaryData AnnualSalaryData,
	organizationDetails OrganizationDetails,
) *Form16Data {
	// Calculate TDS for the year
	totalTDS := g.calculateAnnualTDS(annualSalaryData)
	totalIncome := annualSalaryData.TotalGross

	// Calculate taxable income (simplified)
	// In real scenario, this includes section 80 deductions, relief, etc.
	taxableIncome := g.calculateTaxableIncome(totalIncome)

	// Calculate tax payable (simplified using standard rates)
	taxPayable := g.calculateIncomeTax(taxableIncome)

	// Assessment year (1 year after fiscal year ends)
	assessmentYear := fmt.Sprintf("%s-%s", 
		string(g.fiscalYear[5:9]),    // Last 4 digits of first year
		g.fiscalYear[12:14])           // Last 2 digits of second year

	form16 := &Form16Data{
		CertificateNumber:    g.generateCertificateNumber(employee.ID),
		IssueDate:            time.Now().Format("02-Jan-2006"),
		DeductorPAN:          organizationDetails.PAN,
		DeductorName:         organizationDetails.Name,
		DeductorAddress:      organizationDetails.Address,
		DeducteeID:           employee.ID,
		DeducteeName:         fmt.Sprintf("%s %s", employee.FirstName, employee.LastName),
		DeducteePAN:          employee.PersonalPAN.String,
		DeducteeAadhaar:      maskAadhaar(employee.AadhaarNumber.String),
		FiscalYear:           g.fiscalYear,
		AssessmentYear:       assessmentYear,
		TotalIncome:          totalIncome,
		TotalTDSDeducted:     totalTDS,
		GrossTotalIncome:     totalIncome,
		TaxablIncome:         taxableIncome,
		TaxPayable:           taxPayable,
		TDSPaid:              totalTDS,
		GeneratedBy:          "System", // In production, get from context
		GeneratedAt:          time.Now().Format("02-Jan-2006 15:04:05"),
		MonthlyTDSBreakdown:  g.generateMonthlyTDSBreakdown(annualSalaryData),
	}

	// Calculate refund or additional tax due
	if totalTDS > taxPayable {
		form16.TaxRefund = totalTDS - taxPayable
		form16.TaxPayableNow = 0
	} else {
		form16.TaxPayableNow = taxPayable - totalTDS
		form16.TaxRefund = 0
	}

	return form16
}

// ============================================================================
// FORM 24Q (TDS Summary for Income Tax Department)
// ============================================================================

// Form24QData represents Form 24Q TDS summary
type Form24QData struct {
	QuarterCode         string // "Q1", "Q2", "Q3", "Q4" (Apr-Jun, Jul-Sep, Oct-Dec, Jan-Mar)
	FiscalYear          string // YYYY-YYYY
	PeriodStart         string // Date
	PeriodEnd           string // Date
	DeductorPAN         string
	DeductorName        string
	TotalEmployees      int
	TotalSalaryPaid     float64
	TotalTDSDeducted    float64
	TotalTDSPaid        float64
	TDSPaymentDate      string
	ChallanNumber       string // From bank
	DepositorName       string
	AuthorizedSignatory string
	CertificationBy     string // Name and designation
	CertificationDate   string
	Remarks             string
}

// GenerateForm24Q generates Form 24Q quarterly TDS summary
func (g *StatutoryReportGenerator) GenerateForm24Q(
	quarterCode string, // "Q1", "Q2", "Q3", "Q4"
	employees []models.Employee,
	quarterlyData map[string]QuarterlyEmployeeData, // employeeID -> quarterly data
	tdsPaymentDetails TDSPaymentDetails,
) *Form24QData {
	var totalSalary, totalTDS float64
	for _, data := range quarterlyData {
		totalSalary += data.TotalSalary
		totalTDS += data.TotalTDSDeducted
	}

	quarterStart, quarterEnd := g.getQuarterDates(quarterCode)

	form24Q := &Form24QData{
		QuarterCode:      quarterCode,
		FiscalYear:       g.fiscalYear,
		PeriodStart:      quarterStart,
		PeriodEnd:        quarterEnd,
		TotalEmployees:   len(employees),
		TotalSalaryPaid:  totalSalary,
		TotalTDSDeducted: totalTDS,
		TotalTDSPaid:     tdsPaymentDetails.AmountPaid,
		TDSPaymentDate:   tdsPaymentDetails.PaymentDate,
		ChallanNumber:    tdsPaymentDetails.ChallanNumber,
		Remarks:          fmt.Sprintf("TDS deducted and deposited as per provisions of Income Tax Act, 1961"),
	}

	return form24Q
}

// ============================================================================
// PF ECR (Provident Fund Electronic Challan Cum Return)
// ============================================================================

// PFECRData represents PF ECR for monthly filing
type PFECRData struct {
	MonthYear              string // "YYYY-MM"
	EstablishmentCode      string // From PF registration
	EstablishmentName      string
	ReportingMonth         string // Month and year of contribution
	TotalEmployees         int
	TotalEmployeeContrib   float64
	TotalEmployerContrib   float64
	TotalContribution      float64
	PFAccountNumber        string
	ChallanNumber          string
	PaymentDate            string
	AuthorizedSignatory    string
	SubmissionDate         string
	EmployeeDetails        []PFEmployeeDetail
}

// PFEmployeeDetail represents individual employee PF contribution
type PFEmployeeDetail struct {
	EmployeeID            string
	EmployeeName          string
	UAN                   string // Universal Account Number
	EmployeeContribution  float64
	EmployerContribution  float64
	TotalContribution     float64
}

// GeneratePFECR generates PF ECR for monthly submission
func (g *StatutoryReportGenerator) GeneratePFECR(
	monthYear string,
	orgDetails OrganizationDetails,
	pfContributions map[string]PFEmployeeDetail,
	challanDetails ChallanDetails,
) *PFECRData {
	var totalEmpContrib, totalEmpRContrib float64
	for _, detail := range pfContributions {
		totalEmpContrib += detail.EmployeeContribution
		totalEmpRContrib += detail.EmployerContribution
	}

	pfecr := &PFECRData{
		MonthYear:            monthYear,
		EstablishmentCode:    orgDetails.PFEstablishmentCode,
		EstablishmentName:    orgDetails.Name,
		ReportingMonth:       monthYear,
		TotalEmployees:       len(pfContributions),
		TotalEmployeeContrib: totalEmpContrib,
		TotalEmployerContrib: totalEmpRContrib,
		TotalContribution:    totalEmpContrib + totalEmpRContrib,
		PFAccountNumber:      orgDetails.PFAccountNumber,
		ChallanNumber:        challanDetails.ChallanNumber,
		PaymentDate:          challanDetails.PaymentDate,
		SubmissionDate:       time.Now().Format("2006-01-02"),
	}

	// Add employee details
	for _, detail := range pfContributions {
		pfecr.EmployeeDetails = append(pfecr.EmployeeDetails, detail)
	}

	return pfecr
}

// ============================================================================
// ESI Challan
// ============================================================================

// ESIChallanData represents ESI contribution challan
type ESIChallanData struct {
	ChallanNumber        string
	MonthYear            string
	RegistrationNumber   string // ESI registration
	EstablishmentName    string
	EstablishmentCode    string
	ReportingMonth       string
	TotalEmployees       int
	TotalEmployeeContrib float64
	TotalEmployerContrib float64
	TotalContribution    float64
	PaymentDate          string
	BankName             string
	BranchName           string
	AuthorizedSignatory  string
}

// GenerateESIChallan generates ESI contribution challan
func (g *StatutoryReportGenerator) GenerateESIChallan(
	monthYear string,
	orgDetails OrganizationDetails,
	esiContributions ESIContributionSummary,
	paymentDetails PaymentDetails,
) *ESIChallanData {
	return &ESIChallanData{
		ChallanNumber:        g.generateChallanNumber("ESI", monthYear),
		MonthYear:            monthYear,
		RegistrationNumber:   orgDetails.ESIRegistrationNumber,
		EstablishmentName:    orgDetails.Name,
		EstablishmentCode:    orgDetails.Code,
		ReportingMonth:       monthYear,
		TotalEmployees:       esiContributions.TotalEmployees,
		TotalEmployeeContrib: esiContributions.EmployeeContribution,
		TotalEmployerContrib: esiContributions.EmployerContribution,
		TotalContribution:    esiContributions.TotalContribution,
		PaymentDate:          paymentDetails.Date,
		BankName:             paymentDetails.BankName,
	}
}

// ============================================================================
// Helper Structures
// ============================================================================

// AnnualSalaryData represents annual salary summary
type AnnualSalaryData struct {
	EmployeeID     string
	TotalGross     float64
	TotalBasic     float64
	TotalDA        float64
	TotalDeductions float64
	MonthlyData    []MonthlySalaryData
}

// MonthlySalaryData represents monthly salary breakdown
type MonthlySalaryData struct {
	Month       string
	Gross       float64
	TDS         float64
	PF          float64
	ESI         float64
	PT          float64
	NetPay      float64
	DaysWorked  int
}

// QuarterlyEmployeeData represents employee data for a quarter
type QuarterlyEmployeeData struct {
	EmployeeID       string
	EmployeeName     string
	TotalSalary      float64
	TotalTDSDeducted float64
	MonthsWorked     int
}

// OrganizationDetails represents organization information
type OrganizationDetails struct {
	ID                      string
	Name                    string
	Code                    string
	PAN                     string
	Address                 string
	PFEstablishmentCode     string
	PFAccountNumber         string
	ESIRegistrationNumber   string
	BankName                string
	BankAccountNumber       string
	IFSC                    string
	AuthorizedSignatory     string
	AuthorizedSignatoryDesig string
}

// TDSPaymentDetails represents TDS payment information
type TDSPaymentDetails struct {
	AmountPaid   float64
	PaymentDate  string
	ChallanNumber string
	BankName     string
}

// ChallanDetails represents challan payment details
type ChallanDetails struct {
	ChallanNumber string
	PaymentDate   string
	Amount        float64
}

// ESIContributionSummary represents ESI contribution summary
type ESIContributionSummary struct {
	TotalEmployees       int
	EmployeeContribution float64
	EmployerContribution float64
	TotalContribution    float64
}

// PaymentDetails represents payment information
type PaymentDetails struct {
	Date     string
	BankName string
}

// ============================================================================
// Helper Methods
// ============================================================================

func (g *StatutoryReportGenerator) generateCertificateNumber(employeeID string) string {
	// Format: ORG-FY-EMP-XXXX
	return fmt.Sprintf("%s-%s-%s-%d", 
		g.organizationID[:3], 
		g.fiscalYear[0:4], 
		employeeID[:3], 
		time.Now().Unix()%10000)
}

func (g *StatutoryReportGenerator) generateChallanNumber(challanType, monthYear string) string {
	// Format: TYPE-YYYY-MM-XXXX
	return fmt.Sprintf("%s-%s-%d", challanType, monthYear, time.Now().Unix()%10000)
}

func (g *StatutoryReportGenerator) calculateAnnualTDS(data AnnualSalaryData) float64 {
	var totalTDS float64
	for _, month := range data.MonthlyData {
		totalTDS += month.TDS
	}
	return totalTDS
}

func (g *StatutoryReportGenerator) calculateTaxableIncome(totalIncome float64) float64 {
	// Simplified: Gross income - standard deduction
	// Actual calculation would include:
	// - Section 80 deductions (80C, 80D, 80E, etc.)
	// - HRA exemption
	// - Professional tax
	// - Relief under section 87A
	standardDeduction := 50000.0 // FY 2023-24
	if totalIncome > standardDeduction {
		return totalIncome - standardDeduction
	}
	return 0
}

func (g *StatutoryReportGenerator) calculateIncomeTax(taxableIncome float64) float64 {
	// Simplified slab rates for FY 2023-24
	// Actual rates depend on age, residence status, etc.
	switch {
	case taxableIncome <= 250000:
		return 0
	case taxableIncome <= 500000:
		return (taxableIncome - 250000) * 0.05
	case taxableIncome <= 1000000:
		return 12500 + (taxableIncome-500000)*0.20
	default:
		return 112500 + (taxableIncome-1000000)*0.30
	}
}

func (g *StatutoryReportGenerator) generateMonthlyTDSBreakdown(
	data AnnualSalaryData,
) []MonthlyTDSDetail {
	var breakdown []MonthlyTDSDetail
	var cumulativeTDS float64

	for _, month := range data.MonthlyData {
		cumulativeTDS += month.TDS
		breakdown = append(breakdown, MonthlyTDSDetail{
			Month:         month.Month,
			Salary:        month.Gross,
			TDS:           month.TDS,
			CumulativeTDS: cumulativeTDS,
		})
	}

	return breakdown
}

func (g *StatutoryReportGenerator) getQuarterDates(quarterCode string) (string, string) {
	year := g.fiscalYear[0:4]
	switch quarterCode {
	case "Q1":
		return fmt.Sprintf("01-Apr-%s", year), fmt.Sprintf("30-Jun-%s", year)
	case "Q2":
		return fmt.Sprintf("01-Jul-%s", year), fmt.Sprintf("30-Sep-%s", year)
	case "Q3":
		return fmt.Sprintf("01-Oct-%s", year), fmt.Sprintf("31-Dec-%s", year)
	case "Q4":
		nextYear := fmt.Sprintf("%d", parseInt(year)+1)
		return fmt.Sprintf("01-Jan-%s", nextYear), fmt.Sprintf("31-Mar-%s", nextYear)
	default:
		return "", ""
	}
}

func maskAadhaar(aadhaar string) string {
	if len(aadhaar) != 12 {
		return "XXXX-XXXX-XXXX"
	}
	return fmt.Sprintf("XXXX-XXXX-%s", aadhaar[8:])
}

func parseInt(s string) int {
	var num int
	fmt.Sscanf(s, "%d", &num)
	return num
}
