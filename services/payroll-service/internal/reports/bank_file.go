package reports

import (
	"fmt"
	"strings"
	"time"

	"payroll-service/internal/models"
)

// BankFileGenerator generates bank payment files for salary disbursement
type BankFileGenerator struct {
	organizationDetails OrganizationDetails
}

// NewBankFileGenerator creates a new bank file generator
func NewBankFileGenerator(orgDetails OrganizationDetails) *BankFileGenerator {
	return &BankFileGenerator{
		organizationDetails: orgDetails,
	}
}

// BankPaymentFile represents a payment file for bank submission
type BankPaymentFile struct {
	FileFormat       string // "NEFT", "RTGS", "IMPS", "ACH"
	FileType         string // "DIRECT", "INDIRECT"
	FileName         string
	GeneratedDate    string
	FileReference    string
	TotalRecords     int
	TotalAmount      float64
	Currency         string // "INR"
	Header           BankFileHeader
	Details          []BankPaymentDetail
	Trailer          BankFileTrailer
	RawContent       string // For file generation
}

// BankFileHeader represents file header
type BankFileHeader struct {
	RecordType      string // "H" for header
	SequenceNumber  int
	FileType        string // "A" for ACH, "N" for NEFT
	Priority        int
	FileCreatedDate string // DDMMYY
	FileCreatedTime string // HHMMSS
	FileReference   string // Unique identifier
	Bank            string // Bank code
	UserNumber      string // Corporate ID
	UserName        string // Corporate name
	ReservedData    string
	FieldSeparator  string
	RecordDelimiter string
}

// BankPaymentDetail represents individual payment record
type BankPaymentDetail struct {
	RecordType         string // "D" for detail
	SequenceNumber     int
	BeneficiaryAccount string // Account number
	BeneficiaryIFSC    string // IFSC code
	BeneficiaryName    string // Account holder name
	Amount             float64
	Description        string // "Salary-YYYY-MM"
	DeductorAccount    string // Sender's account
	DeductorIFSC       string
	DeductorName       string
	UTR                string // Unique Transaction Reference
	Mandated           bool   // Is amount mandated
	EmployeeID         string
	Reference          string // For reconciliation
}

// BankFileTrailer represents file trailer/summary
type BankFileTrailer struct {
	RecordType      string // "T" for trailer
	TotalRecords    int
	TotalAmount     float64
	SettlementDate  string // DDMMYY
	ReservedData    string
	AuthSignature   string
	AuthName        string
	AuthDesignation string
}

// NEFTFormat represents NEFT specific format (ICICI/HDFC standard)
type NEFTFormat struct {
	Header  string // Header line
	Details []string // Detail lines
	Trailer string // Trailer line
}

// GenerateBankFile generates payment file for salary disbursement
func (bg *BankFileGenerator) GenerateBankFile(
	payrollComponents []models.PayrollComponent,
	employees map[string]*models.Employee,
	payrollRun *models.PayrollRun,
	fileFormat string, // "NEFT", "RTGS", "IMPS"
) *BankPaymentFile {
	file := &BankPaymentFile{
		FileFormat:    fileFormat,
		FileType:      "DIRECT",
		FileName:      bg.generateFileName(fileFormat, payrollRun.PayrollMonth),
		GeneratedDate: time.Now().Format("02-Jan-2006"),
		FileReference: bg.generateFileReference(),
		Currency:      "INR",
	}

	var totalAmount float64
	sequenceNumber := 1

	// Generate header
	file.Header = BankFileHeader{
		RecordType:      "H",
		SequenceNumber:  sequenceNumber,
		FileType:        bg.getFileTypeCode(fileFormat),
		Priority:        1,
		FileCreatedDate: time.Now().Format("020106"),
		FileCreatedTime: time.Now().Format("150405"),
		FileReference:   file.FileReference,
		Bank:            "PYTM", // PayTM or relevant bank code
		UserNumber:      bg.organizationDetails.Code,
		UserName:        bg.organizationDetails.Name,
		FieldSeparator:  "|",
		RecordDelimiter: "\n",
	}

	sequenceNumber++

	// Generate payment details
	for _, component := range payrollComponents {
		emp := employees[component.EmployeeID]
		if emp == nil || component.NetPay <= 0 {
			continue // Skip employees with no payment or missing details
		}

		if emp.BankAccountNumber.Valid == false || emp.BankIFSCCode.Valid == false {
			continue // Skip employees without bank details
		}

		detail := BankPaymentDetail{
			RecordType:         "D",
			SequenceNumber:     sequenceNumber,
			BeneficiaryAccount: emp.BankAccountNumber.String,
			BeneficiaryIFSC:    emp.BankIFSCCode.String,
			BeneficiaryName:    fmt.Sprintf("%s %s", emp.FirstName, emp.LastName),
			Amount:             component.NetPay,
			Description:        fmt.Sprintf("Salary-%s", payrollRun.PayrollMonth),
			DeductorAccount:    bg.organizationDetails.BankAccountNumber,
			DeductorIFSC:       bg.organizationDetails.IFSC,
			DeductorName:       bg.organizationDetails.Name,
			UTR:                bg.generateUTR(component.EmployeeID),
			EmployeeID:         component.EmployeeID,
			Reference:          component.ID,
		}

		file.Details = append(file.Details, detail)
		totalAmount += component.NetPay
		sequenceNumber++
	}

	file.TotalRecords = len(file.Details)
	file.TotalAmount = totalAmount

	// Generate trailer
	file.Trailer = BankFileTrailer{
		RecordType:      "T",
		TotalRecords:    file.TotalRecords + 2, // Including header and trailer
		TotalAmount:     totalAmount,
		SettlementDate:  time.Now().AddDate(0, 0, 1).Format("020106"), // Next business day
		AuthSignature:   "AUTHORIZED",
		AuthName:        bg.organizationDetails.AuthorizedSignatory,
		AuthDesignation: bg.organizationDetails.AuthorizedSignatoryDesig,
	}

	// Generate raw content based on format
	file.RawContent = bg.formatFileContent(file, fileFormat)

	return file
}

// formatFileContent generates the actual file content
func (bg *BankFileGenerator) formatFileContent(file *BankPaymentFile, format string) string {
	switch format {
	case "NEFT":
		return bg.formatNEFT(file)
	case "RTGS":
		return bg.formatRTGS(file)
	case "IMPS":
		return bg.formatIMPS(file)
	default:
		return bg.formatGeneric(file)
	}
}

// formatNEFT generates NEFT format file
func (bg *BankFileGenerator) formatNEFT(file *BankPaymentFile) string {
	var content strings.Builder

	// NEFT Header
	headerLine := fmt.Sprintf("%s|%s|%s|%s|%s|%s|%s|%s|%s|%s|%d|%s|%s",
		file.Header.RecordType,
		file.Header.FileReference,
		file.Header.FileCreatedDate,
		file.Header.FileCreatedTime,
		file.Header.Bank,
		file.Header.UserNumber,
		file.Header.UserName,
		file.Header.FileType,
		file.Header.Priority,
		"00000000",
		file.TotalRecords,
		fmt.Sprintf("%.2f", file.TotalAmount),
		"INR",
	)
	content.WriteString(headerLine)
	content.WriteString("\n")

	// NEFT Details
	for _, detail := range file.Details {
		detailLine := fmt.Sprintf("%s|%09d|%s|%s|%s|%s|%.2f|%s|%s|%s|%s|%s|%s",
			detail.RecordType,
			detail.SequenceNumber,
			padString(detail.BeneficiaryAccount, 16),
			detail.BeneficiaryIFSC,
			padString(detail.BeneficiaryName, 40),
			padString(detail.DeductorAccount, 16),
			detail.Amount,
			detail.Description,
			"N", // Not mandated
			"00000000",
			"IND",
			detail.UTR,
			detail.EmployeeID,
		)
		content.WriteString(detailLine)
		content.WriteString("\n")
	}

	// NEFT Trailer
	trailerLine := fmt.Sprintf("%s|%09d|%d|%.2f|%s|%s|%s|%s",
		file.Trailer.RecordType,
		file.Trailer.TotalRecords,
		file.TotalRecords,
		file.TotalAmount,
		file.Trailer.SettlementDate,
		"00000000",
		file.Trailer.AuthName,
		file.Trailer.AuthDesignation,
	)
	content.WriteString(trailerLine)
	content.WriteString("\n")

	return content.String()
}

// formatRTGS generates RTGS format file (Fixed amount threshold, typically >2 lakhs)
func (bg *BankFileGenerator) formatRTGS(file *BankPaymentFile) string {
	// RTGS format is similar to NEFT but with different messaging
	// For simplicity, using similar structure
	return bg.formatNEFT(file) // Can be customized as per bank requirements
}

// formatIMPS generates IMPS format file (For immediate payments)
func (bg *BankFileGenerator) formatIMPS(file *BankPaymentFile) string {
	// IMPS format may vary by bank
	// Using generic format for now
	return bg.formatGeneric(file)
}

// formatGeneric generates a generic comma-separated format
func (bg *BankFileGenerator) formatGeneric(file *BankPaymentFile) string {
	var content strings.Builder

	// Header
	headerLine := fmt.Sprintf("RecordType,FileReference,CreatedDate,CreatedTime,Bank,UserNumber,UserName,TotalRecords,TotalAmount,Currency\n")
	content.WriteString(headerLine)

	headerData := fmt.Sprintf("%s,%s,%s,%s,%s,%s,%s,%d,%.2f,%s\n",
		file.Header.RecordType,
		file.Header.FileReference,
		file.Header.FileCreatedDate,
		file.Header.FileCreatedTime,
		file.Header.Bank,
		file.Header.UserNumber,
		file.Header.UserName,
		file.TotalRecords,
		file.TotalAmount,
		file.Currency,
	)
	content.WriteString(headerData)

	// Details Header
	content.WriteString("RecordType,SequenceNo,BeneficiaryAccount,BeneficiaryIFSC,BeneficiaryName,Amount,Description,DeductorAccount,EmployeeID,UTR\n")

	// Details
	for _, detail := range file.Details {
		detailLine := fmt.Sprintf("%s,%d,%s,%s,%s,%.2f,%s,%s,%s,%s\n",
			detail.RecordType,
			detail.SequenceNumber,
			detail.BeneficiaryAccount,
			detail.BeneficiaryIFSC,
			detail.BeneficiaryName,
			detail.Amount,
			detail.Description,
			detail.DeductorAccount,
			detail.EmployeeID,
			detail.UTR,
		)
		content.WriteString(detailLine)
	}

	// Trailer
	trailerLine := fmt.Sprintf("%s,%d,%.2f,%s\n",
		file.Trailer.RecordType,
		file.Trailer.TotalRecords,
		file.Trailer.TotalAmount,
		file.Trailer.SettlementDate,
	)
	content.WriteString(trailerLine)

	return content.String()
}

// PaymentSummary represents payment file summary
type PaymentSummary struct {
	FileFormat       string
	TotalRecords     int
	TotalAmount      float64
	SettlementDate   string
	SuccessfulCount  int
	FailedCount      int
	PendingCount     int
	ReconciledAmount float64
}

// ============================================================================
// Helper Methods
// ============================================================================

func (bg *BankFileGenerator) generateFileName(format string, monthYear string) string {
	timestamp := time.Now().Format("20060102150405")
	return fmt.Sprintf("%s_SALARY_%s_%s.txt", format, monthYear, timestamp)
}

func (bg *BankFileGenerator) generateFileReference() string {
	return fmt.Sprintf("%s%d", time.Now().Format("20060102"), time.Now().Unix()%10000000)
}

func (bg *BankFileGenerator) getFileTypeCode(format string) string {
	switch format {
	case "NEFT":
		return "N"
	case "RTGS":
		return "R"
	case "IMPS":
		return "I"
	default:
		return "A" // ACH
	}
}

func (bg *BankFileGenerator) generateUTR(employeeID string) string {
	// UTR format: EMPLOYER + TIMESTAMP + EMPLOYEE
	timestamp := time.Now().Unix()
	return fmt.Sprintf("ORG%d%s", timestamp%1000000000, employeeID[len(employeeID)-4:])
}

func padString(s string, length int) string {
	if len(s) >= length {
		return s[:length]
	}
	return s + strings.Repeat(" ", length-len(s))
}

func padZero(s string, length int) string {
	if len(s) >= length {
		return s[:length]
	}
	return strings.Repeat("0", length-len(s)) + s
}
