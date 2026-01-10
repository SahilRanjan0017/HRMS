package repository

import (
	"database/sql"
	"fmt"
	"time"

	"payroll-service/internal/models"
)

type PayrollRepository struct {
	db *sql.DB
}

func NewPayrollRepository(db *sql.DB) *PayrollRepository {
	return &PayrollRepository{db: db}
}

// GetPayrollRuns fetches all payroll runs for an organization with optional filters
func (r *PayrollRepository) GetPayrollRuns(orgID string, filters map[string]interface{}) ([]models.PayrollRun, error) {
	query := `
		SELECT id, org_id, payroll_period_start, payroll_period_end, payroll_month,
		       status, dry_run_count, total_employees, total_gross_amount, total_deductions,
		       total_net_amount, total_pf_employee, total_pf_employer, total_esi_employee,
		       total_esi_employer, total_pt, total_tds, locked_at, locked_by, approved_at,
		       approved_by, released_at, released_by, created_at, updated_at, created_by, notes
		FROM payroll_runs
		WHERE org_id = $1
	`
	args := []interface{}{orgID}
	argCount := 2

	// Apply filters
	if status, ok := filters["status"].(string); ok {
		query += fmt.Sprintf(" AND status = $%d", argCount)
		args = append(args, status)
		argCount++
	}

	if month, ok := filters["month"].(string); ok {
		query += fmt.Sprintf(" AND payroll_month = $%d", argCount)
		args = append(args, month)
		argCount++
	}

	query += " ORDER BY payroll_period_start DESC"

	rows, err := r.db.Query(query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to query payroll runs: %w", err)
	}
	defer rows.Close()

	var payrollRuns []models.PayrollRun
	for rows.Next() {
		var pr models.PayrollRun
		err := rows.Scan(
			&pr.ID, &pr.OrgID, &pr.PayrollPeriodStart, &pr.PayrollPeriodEnd, &pr.PayrollMonth,
			&pr.Status, &pr.DryRunCount, &pr.TotalEmployees, &pr.TotalGrossAmount, &pr.TotalDeductions,
			&pr.TotalNetAmount, &pr.TotalPFEmployee, &pr.TotalPFEmployer, &pr.TotalESIEmployee,
			&pr.TotalESIEmployer, &pr.TotalPT, &pr.TotalTDS, &pr.LockedAt, &pr.LockedBy, &pr.ApprovedAt,
			&pr.ApprovedBy, &pr.ReleasedAt, &pr.ReleasedBy, &pr.CreatedAt, &pr.UpdatedAt, &pr.CreatedBy, &pr.Notes,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan payroll run: %w", err)
		}
		payrollRuns = append(payrollRuns, pr)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating payroll runs: %w", err)
	}

	return payrollRuns, nil
}

// GetPayrollRunByID fetches a single payroll run by ID
func (r *PayrollRepository) GetPayrollRunByID(payrollRunID string) (*models.PayrollRun, error) {
	query := `
		SELECT id, org_id, payroll_period_start, payroll_period_end, payroll_month,
		       status, dry_run_count, total_employees, total_gross_amount, total_deductions,
		       total_net_amount, total_pf_employee, total_pf_employer, total_esi_employee,
		       total_esi_employer, total_pt, total_tds, locked_at, locked_by, approved_at,
		       approved_by, released_at, released_by, created_at, updated_at, created_by, notes
		FROM payroll_runs
		WHERE id = $1
	`

	var pr models.PayrollRun
	err := r.db.QueryRow(query, payrollRunID).Scan(
		&pr.ID, &pr.OrgID, &pr.PayrollPeriodStart, &pr.PayrollPeriodEnd, &pr.PayrollMonth,
		&pr.Status, &pr.DryRunCount, &pr.TotalEmployees, &pr.TotalGrossAmount, &pr.TotalDeductions,
		&pr.TotalNetAmount, &pr.TotalPFEmployee, &pr.TotalPFEmployer, &pr.TotalESIEmployee,
		&pr.TotalESIEmployer, &pr.TotalPT, &pr.TotalTDS, &pr.LockedAt, &pr.LockedBy, &pr.ApprovedAt,
		&pr.ApprovedBy, &pr.ReleasedAt, &pr.ReleasedBy, &pr.CreatedAt, &pr.UpdatedAt, &pr.CreatedBy, &pr.Notes,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("payroll run not found")
		}
		return nil, fmt.Errorf("failed to query payroll run: %w", err)
	}

	return &pr, nil
}

// CreatePayrollRun creates a new payroll run
func (r *PayrollRepository) CreatePayrollRun(pr *models.PayrollRun) error {
	query := `
		INSERT INTO payroll_runs (
			org_id, payroll_period_start, payroll_period_end, payroll_month,
			status, dry_run_count, total_employees, total_gross_amount, total_deductions,
			total_net_amount, total_pf_employee, total_pf_employer, total_esi_employee,
			total_esi_employer, total_pt, total_tds, created_by, notes, created_at, updated_at
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW(), NOW()
		)
		RETURNING id, created_at, updated_at
	`

	err := r.db.QueryRow(
		query,
		pr.OrgID, pr.PayrollPeriodStart, pr.PayrollPeriodEnd, pr.PayrollMonth,
		pr.Status, pr.DryRunCount, pr.TotalEmployees, pr.TotalGrossAmount, pr.TotalDeductions,
		pr.TotalNetAmount, pr.TotalPFEmployee, pr.TotalPFEmployer, pr.TotalESIEmployee,
		pr.TotalESIEmployer, pr.TotalPT, pr.TotalTDS, pr.CreatedBy, pr.Notes,
	).Scan(&pr.ID, &pr.CreatedAt, &pr.UpdatedAt)

	if err != nil {
		return fmt.Errorf("failed to create payroll run: %w", err)
	}

	return nil
}

// UpdatePayrollRunStatus updates the status of a payroll run
func (r *PayrollRepository) UpdatePayrollRunStatus(payrollRunID string, status string, updatedBy string) error {
	query := `
		UPDATE payroll_runs
		SET status = $1, updated_at = NOW()
		WHERE id = $2
	`

	result, err := r.db.Exec(query, status, payrollRunID)
	if err != nil {
		return fmt.Errorf("failed to update payroll run status: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("payroll run not found")
	}

	return nil
}

// LockPayrollRun locks a payroll run to prevent modifications
func (r *PayrollRepository) LockPayrollRun(payrollRunID string, lockedBy string, reason string) error {
	// Start transaction
	tx, err := r.db.Begin()
	if err != nil {
		return fmt.Errorf("failed to start transaction: %w", err)
	}
	defer tx.Rollback()

	// Insert lock record
	lockQuery := `
		INSERT INTO payroll_locks (payroll_run_id, locked_by, lock_reason, is_active, created_at)
		VALUES ($1, $2, $3, true, NOW())
	`

	if _, err := tx.Exec(lockQuery, payrollRunID, lockedBy, reason); err != nil {
		return fmt.Errorf("failed to create lock: %w", err)
	}

	// Update payroll run status
	statusQuery := `
		UPDATE payroll_runs
		SET status = 'locked', locked_at = NOW(), locked_by = $1, updated_at = NOW()
		WHERE id = $2
	`

	if _, err := tx.Exec(statusQuery, lockedBy, payrollRunID); err != nil {
		return fmt.Errorf("failed to update payroll run status: %w", err)
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}

// GetPayrollComponents fetches all payroll components for a payroll run
func (r *PayrollRepository) GetPayrollComponents(payrollRunID string) ([]models.PayrollComponent, error) {
	query := `
		SELECT id, org_id, payroll_run_id, employee_id, salary_structure_id,
		       days_worked, days_absent, days_leave, days_in_month,
		       basic_pay, dearness_allowance, house_rent_allowance, other_allowances,
		       gross_amount, pf_employee, pf_employer, esi_employee, esi_employer,
		       professional_tax, tds, advance_recovery, loan_recovery, other_deductions,
		       total_deductions, net_pay, is_validated, validation_errors, is_locked,
		       locked_at, created_at, updated_at, created_by
		FROM payroll_components
		WHERE payroll_run_id = $1
		ORDER BY created_at
	`

	rows, err := r.db.Query(query, payrollRunID)
	if err != nil {
		return nil, fmt.Errorf("failed to query payroll components: %w", err)
	}
	defer rows.Close()

	var components []models.PayrollComponent
	for rows.Next() {
		var pc models.PayrollComponent
		err := rows.Scan(
			&pc.ID, &pc.OrgID, &pc.PayrollRunID, &pc.EmployeeID, &pc.SalaryStructureID,
			&pc.DaysWorked, &pc.DaysAbsent, &pc.DaysLeave, &pc.DaysInMonth,
			&pc.BasicPay, &pc.DAAmount, &pc.HRAAmount, &pc.OtherAllowances,
			&pc.GrossAmount, &pc.PFEmployee, &pc.PFEmployer, &pc.ESIEmployee, &pc.ESIEmployer,
			&pc.ProfessionalTax, &pc.TDS, &pc.AdvanceRecovery, &pc.LoanRecovery, &pc.OtherDeductions,
			&pc.TotalDeductions, &pc.NetPay, &pc.IsValidated, &pc.ValidationErrors, &pc.IsLocked,
			&pc.LockedAt, &pc.CreatedAt, &pc.UpdatedAt, &pc.CreatedBy,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan payroll component: %w", err)
		}
		components = append(components, pc)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating payroll components: %w", err)
	}

	return components, nil
}

// CreatePayrollComponent creates a new payroll component
func (r *PayrollRepository) CreatePayrollComponent(pc *models.PayrollComponent) error {
	query := `
		INSERT INTO payroll_components (
			org_id, payroll_run_id, employee_id, salary_structure_id,
			days_worked, days_absent, days_leave, days_in_month,
			basic_pay, dearness_allowance, house_rent_allowance, other_allowances,
			gross_amount, pf_employee, pf_employer, esi_employee, esi_employer,
			professional_tax, tds, advance_recovery, loan_recovery, other_deductions,
			total_deductions, net_pay, is_validated, created_by, created_at, updated_at
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17,
			$18, $19, $20, $21, $22, $23, $24, $25, $26, NOW(), NOW()
		)
		RETURNING id, created_at, updated_at
	`

	err := r.db.QueryRow(
		query,
		pc.OrgID, pc.PayrollRunID, pc.EmployeeID, pc.SalaryStructureID,
		pc.DaysWorked, pc.DaysAbsent, pc.DaysLeave, pc.DaysInMonth,
		pc.BasicPay, pc.DAAmount, pc.HRAAmount, pc.OtherAllowances,
		pc.GrossAmount, pc.PFEmployee, pc.PFEmployer, pc.ESIEmployee, pc.ESIEmployer,
		pc.ProfessionalTax, pc.TDS, pc.AdvanceRecovery, pc.LoanRecovery, pc.OtherDeductions,
		pc.TotalDeductions, pc.NetPay, pc.IsValidated, pc.CreatedBy,
	).Scan(&pc.ID, &pc.CreatedAt, &pc.UpdatedAt)

	if err != nil {
		return fmt.Errorf("failed to create payroll component: %w", err)
	}

	return nil
}

// GetStatutoryRules fetches applicable statutory rules
func (r *PayrollRepository) GetStatutoryRules(ruleType string, stateCode *string) ([]models.StatutoryRule, error) {
	query := `
		SELECT id, org_id, rule_type, state_code, effective_from, effective_till,
		       pf_employee_rate, pf_employer_rate, pf_ceiling,
		       esi_employee_rate, esi_employer_rate, esi_wage_ceiling, esi_threshold_salary,
		       pt_slab_min, pt_slab_max, pt_amount,
		       tds_slab_min, tds_slab_max, tds_rate,
		       gratuity_rate_per_year, gratuity_completion_months,
		       is_active, created_at, updated_at, created_by
		FROM statutory_rules
		WHERE rule_type = $1 AND is_active = true
	`
	args := []interface{}{ruleType}

	if stateCode != nil {
		query += " AND (state_code = $2 OR state_code IS NULL)"
		args = append(args, *stateCode)
	}

	query += " ORDER BY effective_from DESC"

	rows, err := r.db.Query(query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to query statutory rules: %w", err)
	}
	defer rows.Close()

	var rules []models.StatutoryRule
	for rows.Next() {
		var sr models.StatutoryRule
		err := rows.Scan(
			&sr.ID, &sr.OrgID, &sr.RuleType, &sr.StateCode, &sr.EffectiveFrom, &sr.EffectiveTill,
			&sr.PFEmployeeRate, &sr.PFEmployerRate, &sr.PFCeiling,
			&sr.ESIEmployeeRate, &sr.ESIEmployerRate, &sr.ESIWageCeiling, &sr.ESIThresholdSalary,
			&sr.PTSlabMin, &sr.PTSlabMax, &sr.PTAmount,
			&sr.TDSSlabMin, &sr.TDSSlabMax, &sr.TDSRate,
			&sr.GratuityRatePerYear, &sr.GratuityCompletionMonths,
			&sr.IsActive, &sr.CreatedAt, &sr.UpdatedAt, &sr.CreatedBy,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan statutory rule: %w", err)
		}
		rules = append(rules, sr)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating statutory rules: %w", err)
	}

	return rules, nil
}
