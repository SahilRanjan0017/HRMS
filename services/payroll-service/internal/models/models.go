package models

import (
	"database/sql"
	"time"
)

// Organization represents a company/entity in the system
type Organization struct {
	ID                 string    `json:"id"`
	Name               string    `json:"name"`
	EntityCode         string    `json:"entity_code"`
	StateCode          string    `json:"state_code"`
	CountryCode        string    `json:"country_code"`
	RegistrationNumber string    `json:"registration_number"`
	PAN                string    `json:"pan"`
	GSTNumber          string    `json:"gst_number"`
	IsActive           bool      `json:"is_active"`
	CreatedAt          time.Time `json:"created_at"`
	UpdatedAt          time.Time `json:"updated_at"`
}

// Employee represents an employee record
type Employee struct {
	ID                  string         `json:"id"`
	OrgID               string         `json:"org_id"`
	EmployeeID          string         `json:"employee_id"`
	FirstName           string         `json:"first_name"`
	LastName            string         `json:"last_name"`
	Email               string         `json:"email"`
	DateOfBirth         *time.Time     `json:"date_of_birth"`
	Gender              sql.NullString `json:"gender"`
	DateOfJoining       time.Time      `json:"date_of_joining"`
	DateOfExit          *time.Time     `json:"date_of_exit"`
	EmploymentStatus    string         `json:"employment_status"` // active, inactive, left
	Department          sql.NullString `json:"department"`
	Designation         sql.NullString `json:"designation"`
	ManagerID           *string        `json:"manager_id"`
	Location            sql.NullString `json:"location"`
	PersonalPAN         sql.NullString `json:"personal_pan"`
	AadhaarNumber       sql.NullString `json:"aadhaar_number"` // Encrypted
	PassportNumber      sql.NullString `json:"passport_number"`
	BankName            sql.NullString `json:"bank_name"`
	BankAccountNumber   sql.NullString `json:"bank_account_number"`
	BankIFSCCode        sql.NullString `json:"bank_ifsc_code"`
	BankAccountHolder   sql.NullString `json:"bank_account_holder_name"`
	PhoneNumber         sql.NullString `json:"phone_number"`
	PersonalEmail       sql.NullString `json:"personal_email"`
	CreatedAt           time.Time      `json:"created_at"`
	UpdatedAt           time.Time      `json:"updated_at"`
	CreatedBy           *string        `json:"created_by"`
	UpdatedBy           *string        `json:"updated_by"`
}

// SalaryStructure represents a role-based salary template
type SalaryStructure struct {
	ID                    string          `json:"id"`
	OrgID                 string          `json:"org_id"`
	Name                  string          `json:"name"`
	Description           sql.NullString  `json:"description"`
	EffectiveFrom         time.Time       `json:"effective_from"`
	EffectiveTill         *time.Time      `json:"effective_till"`
	AnnualCTC             *float64        `json:"annual_ctc"`
	MonthlyBasic          float64         `json:"monthly_basic"`
	MonthlyDA             float64         `json:"monthly_da"`
	MonthlyHRA            float64         `json:"monthly_hra"`
	MonthlyAllowance      float64         `json:"monthly_allowance"`
	IsTemplate            bool            `json:"is_template"`
	IsActive              bool            `json:"is_active"`
	CreatedAt             time.Time       `json:"created_at"`
	UpdatedAt             time.Time       `json:"updated_at"`
	CreatedBy             *string         `json:"created_by"`
}

// PayrollRun represents a payroll cycle execution
type PayrollRun struct {
	ID                 string     `json:"id"`
	OrgID              string     `json:"org_id"`
	PayrollPeriodStart time.Time  `json:"payroll_period_start"`
	PayrollPeriodEnd   time.Time  `json:"payroll_period_end"`
	PayrollMonth       string     `json:"payroll_month"` // YYYY-MM
	Status             string     `json:"status"`        // draft, in_progress, dry_run, finalized, locked, released
	DryRunCount        int        `json:"dry_run_count"`
	TotalEmployees     int        `json:"total_employees"`
	TotalGrossAmount   *float64   `json:"total_gross_amount"`
	TotalDeductions    *float64   `json:"total_deductions"`
	TotalNetAmount     *float64   `json:"total_net_amount"`
	TotalPFEmployee    *float64   `json:"total_pf_employee"`
	TotalPFEmployer    *float64   `json:"total_pf_employer"`
	TotalESIEmployee   *float64   `json:"total_esi_employee"`
	TotalESIEmployer   *float64   `json:"total_esi_employer"`
	TotalPT            *float64   `json:"total_pt"`
	TotalTDS           *float64   `json:"total_tds"`
	LockedAt           *time.Time `json:"locked_at"`
	LockedBy           *string    `json:"locked_by"`
	ApprovedAt         *time.Time `json:"approved_at"`
	ApprovedBy         *string    `json:"approved_by"`
	ReleasedAt         *time.Time `json:"released_at"`
	ReleasedBy         *string    `json:"released_by"`
	CreatedAt          time.Time  `json:"created_at"`
	UpdatedAt          time.Time  `json:"updated_at"`
	CreatedBy          *string    `json:"created_by"`
	Notes              sql.NullString `json:"notes"`
}

// PayrollComponent represents individual employee payroll calculation
type PayrollComponent struct {
	ID                 string     `json:"id"`
	OrgID              string     `json:"org_id"`
	PayrollRunID       string     `json:"payroll_run_id"`
	EmployeeID         string     `json:"employee_id"`
	SalaryStructureID  *string    `json:"salary_structure_id"`
	DaysWorked         int        `json:"days_worked"`
	DaysAbsent         int        `json:"days_absent"`
	DaysLeave          int        `json:"days_leave"`
	DaysInMonth        int        `json:"days_in_month"`
	BasicPay           float64    `json:"basic_pay"`
	DAAmount           float64    `json:"dearness_allowance"`
	HRAAmount          float64    `json:"house_rent_allowance"`
	OtherAllowances    float64    `json:"other_allowances"`
	GrossAmount        float64    `json:"gross_amount"`
	PFEmployee         float64    `json:"pf_employee"`
	PFEmployer         float64    `json:"pf_employer"`
	ESIEmployee        float64    `json:"esi_employee"`
	ESIEmployer        float64    `json:"esi_employer"`
	ProfessionalTax    float64    `json:"professional_tax"`
	TDS                float64    `json:"tds"`
	AdvanceRecovery    float64    `json:"advance_recovery"`
	LoanRecovery       float64    `json:"loan_recovery"`
	OtherDeductions    float64    `json:"other_deductions"`
	TotalDeductions    float64    `json:"total_deductions"`
	NetPay             float64    `json:"net_pay"`
	IsValidated        bool       `json:"is_validated"`
	ValidationErrors   sql.NullString `json:"validation_errors"` // JSON array
	IsLocked           bool       `json:"is_locked"`
	LockedAt           *time.Time `json:"locked_at"`
	CreatedAt          time.Time  `json:"created_at"`
	UpdatedAt          time.Time  `json:"updated_at"`
	CreatedBy          *string    `json:"created_by"`
}

// StatutoryRule represents India compliance rules
type StatutoryRule struct {
	ID                      string     `json:"id"`
	OrgID                   *string    `json:"org_id"`
	RuleType                string     `json:"rule_type"` // PF, ESI, PT, TDS, GRATUITY
	StateCode               *string    `json:"state_code"`
	EffectiveFrom           time.Time  `json:"effective_from"`
	EffectiveTill           *time.Time `json:"effective_till"`
	PFEmployeeRate          *float64   `json:"pf_employee_rate"`
	PFEmployerRate          *float64   `json:"pf_employer_rate"`
	PFCeiling               *float64   `json:"pf_ceiling"`
	ESIEmployeeRate         *float64   `json:"esi_employee_rate"`
	ESIEmployerRate         *float64   `json:"esi_employer_rate"`
	ESIWageCeiling          *float64   `json:"esi_wage_ceiling"`
	ESIThresholdSalary      *float64   `json:"esi_threshold_salary"`
	PTSlabMin               *float64   `json:"pt_slab_min"`
	PTSlabMax               *float64   `json:"pt_slab_max"`
	PTAmount                *float64   `json:"pt_amount"`
	TDSSlabMin              *float64   `json:"tds_slab_min"`
	TDSSlabMax              *float64   `json:"tds_slab_max"`
	TDSRate                 *float64   `json:"tds_rate"`
	GratuityRatePerYear     *float64   `json:"gratuity_rate_per_year"`
	GratuityCompletionMonths *int      `json:"gratuity_completion_months"`
	IsActive                bool       `json:"is_active"`
	CreatedAt               time.Time  `json:"created_at"`
	UpdatedAt               time.Time  `json:"updated_at"`
	CreatedBy               *string    `json:"created_by"`
}

// AttendanceSummary represents monthly attendance
type AttendanceSummary struct {
	ID                   string    `json:"id"`
	OrgID                string    `json:"org_id"`
	EmployeeID           string    `json:"employee_id"`
	AttendanceMonth      string    `json:"attendance_month"` // YYYY-MM
	TotalDaysInMonth     int       `json:"total_days_in_month"`
	PresentDays          int       `json:"present_days"`
	AbsentDays           int       `json:"absent_days"`
	LeaveDays            int       `json:"leave_days"`
	HolidayDays          int       `json:"holiday_days"`
	WorkingDaysExpected  int       `json:"working_days_expected"`
	WorkingDaysActual    int       `json:"working_days_actual"`
	CreatedAt            time.Time `json:"created_at"`
	UpdatedAt            time.Time `json:"updated_at"`
}

// LeaveSummary represents monthly leave
type LeaveSummary struct {
	ID                  string    `json:"id"`
	OrgID               string    `json:"org_id"`
	EmployeeID          string    `json:"employee_id"`
	LeaveMonth          string    `json:"leave_month"` // YYYY-MM
	CasualLeaveTaken    int       `json:"casual_leave_taken"`
	SickLeaveTaken      int       `json:"sick_leave_taken"`
	EarnedLeaveTaken    int       `json:"earned_leave_taken"`
	UnpaidLeaveTaken    int       `json:"unpaid_leave_taken"`
	TotalLeaveDaysDeducted int    `json:"total_leave_days_deducted"`
	LossOfPay           float64   `json:"loss_of_pay"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
}
