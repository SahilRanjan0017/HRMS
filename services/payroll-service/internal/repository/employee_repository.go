package repository

import (
	"database/sql"
	"fmt"

	"payroll-service/internal/models"
)

type EmployeeRepository struct {
	db *sql.DB
}

func NewEmployeeRepository(db *sql.DB) *EmployeeRepository {
	return &EmployeeRepository{db: db}
}

// GetEmployees fetches all employees for an organization with optional filters
func (r *EmployeeRepository) GetEmployees(orgID string, filters map[string]interface{}) ([]models.Employee, error) {
	query := `
		SELECT id, org_id, employee_id, first_name, last_name, email, date_of_birth,
		       gender, date_of_joining, date_of_exit, employment_status, department,
		       designation, manager_id, location, personal_pan, aadhaar_number,
		       passport_number, bank_name, bank_account_number, bank_ifsc_code,
		       bank_account_holder_name, phone_number, personal_email,
		       created_at, updated_at, created_by, updated_by
		FROM employees
		WHERE org_id = $1
	`
	args := []interface{}{orgID}
	argCount := 2

	// Apply filters
	if status, ok := filters["employment_status"].(string); ok {
		query += fmt.Sprintf(" AND employment_status = $%d", argCount)
		args = append(args, status)
		argCount++
	}

	if dept, ok := filters["department"].(string); ok {
		query += fmt.Sprintf(" AND department = $%d", argCount)
		args = append(args, dept)
		argCount++
	}

	query += " ORDER BY first_name, last_name"

	rows, err := r.db.Query(query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to query employees: %w", err)
	}
	defer rows.Close()

	var employees []models.Employee
	for rows.Next() {
		var emp models.Employee
		err := rows.Scan(
			&emp.ID, &emp.OrgID, &emp.EmployeeID, &emp.FirstName, &emp.LastName, &emp.Email, &emp.DateOfBirth,
			&emp.Gender, &emp.DateOfJoining, &emp.DateOfExit, &emp.EmploymentStatus, &emp.Department,
			&emp.Designation, &emp.ManagerID, &emp.Location, &emp.PersonalPAN, &emp.AadhaarNumber,
			&emp.PassportNumber, &emp.BankName, &emp.BankAccountNumber, &emp.BankIFSCCode,
			&emp.BankAccountHolder, &emp.PhoneNumber, &emp.PersonalEmail,
			&emp.CreatedAt, &emp.UpdatedAt, &emp.CreatedBy, &emp.UpdatedBy,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan employee: %w", err)
		}
		employees = append(employees, emp)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating employees: %w", err)
	}

	return employees, nil
}

// GetEmployeeByID fetches a single employee by ID
func (r *EmployeeRepository) GetEmployeeByID(employeeID string) (*models.Employee, error) {
	query := `
		SELECT id, org_id, employee_id, first_name, last_name, email, date_of_birth,
		       gender, date_of_joining, date_of_exit, employment_status, department,
		       designation, manager_id, location, personal_pan, aadhaar_number,
		       passport_number, bank_name, bank_account_number, bank_ifsc_code,
		       bank_account_holder_name, phone_number, personal_email,
		       created_at, updated_at, created_by, updated_by
		FROM employees
		WHERE id = $1
	`

	var emp models.Employee
	err := r.db.QueryRow(query, employeeID).Scan(
		&emp.ID, &emp.OrgID, &emp.EmployeeID, &emp.FirstName, &emp.LastName, &emp.Email, &emp.DateOfBirth,
		&emp.Gender, &emp.DateOfJoining, &emp.DateOfExit, &emp.EmploymentStatus, &emp.Department,
		&emp.Designation, &emp.ManagerID, &emp.Location, &emp.PersonalPAN, &emp.AadhaarNumber,
		&emp.PassportNumber, &emp.BankName, &emp.BankAccountNumber, &emp.BankIFSCCode,
		&emp.BankAccountHolder, &emp.PhoneNumber, &emp.PersonalEmail,
		&emp.CreatedAt, &emp.UpdatedAt, &emp.CreatedBy, &emp.UpdatedBy,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("employee not found")
		}
		return nil, fmt.Errorf("failed to query employee: %w", err)
	}

	return &emp, nil
}

// GetSalaryStructure fetches salary structure for an employee
func (r *EmployeeRepository) GetSalaryStructure(employeeID string) (*models.SalaryStructure, error) {
	query := `
		SELECT ss.id, ss.org_id, ss.name, ss.description, ss.effective_from,
		       ss.effective_till, ss.annual_ctc, ss.monthly_basic, ss.monthly_da,
		       ss.monthly_hra, ss.monthly_allowance, ss.is_template, ss.is_active,
		       ss.created_at, ss.updated_at, ss.created_by
		FROM salary_structures ss
		INNER JOIN employee_salary_assignments esa ON ss.id = esa.salary_structure_id
		WHERE esa.employee_id = $1 AND esa.effective_till IS NULL
		ORDER BY ss.effective_from DESC
		LIMIT 1
	`

	var ss models.SalaryStructure
	err := r.db.QueryRow(query, employeeID).Scan(
		&ss.ID, &ss.OrgID, &ss.Name, &ss.Description, &ss.EffectiveFrom,
		&ss.EffectiveTill, &ss.AnnualCTC, &ss.MonthlyBasic, &ss.MonthlyDA,
		&ss.MonthlyHRA, &ss.MonthlyAllowance, &ss.IsTemplate, &ss.IsActive,
		&ss.CreatedAt, &ss.UpdatedAt, &ss.CreatedBy,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("salary structure not found")
		}
		return nil, fmt.Errorf("failed to query salary structure: %w", err)
	}

	return &ss, nil
}

// GetAttendanceSummary fetches attendance summary for a month
func (r *EmployeeRepository) GetAttendanceSummary(employeeID string, month string) (*models.AttendanceSummary, error) {
	query := `
		SELECT id, org_id, employee_id, attendance_month, total_days_in_month,
		       present_days, absent_days, leave_days, holiday_days,
		       working_days_expected, working_days_actual, created_at, updated_at
		FROM attendance_summary
		WHERE employee_id = $1 AND attendance_month = $2
	`

	var as models.AttendanceSummary
	err := r.db.QueryRow(query, employeeID, month).Scan(
		&as.ID, &as.OrgID, &as.EmployeeID, &as.AttendanceMonth, &as.TotalDaysInMonth,
		&as.PresentDays, &as.AbsentDays, &as.LeaveDays, &as.HolidayDays,
		&as.WorkingDaysExpected, &as.WorkingDaysActual, &as.CreatedAt, &as.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No attendance data is OK
		}
		return nil, fmt.Errorf("failed to query attendance summary: %w", err)
	}

	return &as, nil
}

// GetLeaveSummary fetches leave summary for a month
func (r *EmployeeRepository) GetLeaveSummary(employeeID string, month string) (*models.LeaveSummary, error) {
	query := `
		SELECT id, org_id, employee_id, leave_month, casual_leave_taken,
		       sick_leave_taken, earned_leave_taken, unpaid_leave_taken,
		       total_leave_days_deducted, loss_of_pay, created_at, updated_at
		FROM leave_summary
		WHERE employee_id = $1 AND leave_month = $2
	`

	var ls models.LeaveSummary
	err := r.db.QueryRow(query, employeeID, month).Scan(
		&ls.ID, &ls.OrgID, &ls.EmployeeID, &ls.LeaveMonth, &ls.CasualLeaveTaken,
		&ls.SickLeaveTaken, &ls.EarnedLeaveTaken, &ls.UnpaidLeaveTaken,
		&ls.TotalLeaveDaysDeducted, &ls.LossOfPay, &ls.CreatedAt, &ls.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No leave data is OK
		}
		return nil, fmt.Errorf("failed to query leave summary: %w", err)
	}

	return &ls, nil
}
