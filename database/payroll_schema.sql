-- HRMS Payroll Database Schema for India Compliance
-- PostgreSQL for Supabase
-- This schema is multi-tenant, supports effective dating, and includes audit trails

-- ============================================================================
-- 1. ORGANIZATIONS (Multi-tenant support)
-- ============================================================================
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  entity_code VARCHAR(50) NOT NULL UNIQUE,
  state_code VARCHAR(2) NOT NULL DEFAULT 'MH', -- State for statutory rules
  country_code VARCHAR(2) NOT NULL DEFAULT 'IN',
  registration_number VARCHAR(100),
  pan VARCHAR(10),
  gst_number VARCHAR(15),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================================
-- 2. EMPLOYEES (Master data - System of Record)
-- ============================================================================
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  employee_id VARCHAR(50) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(10),
  
  -- Employment Details
  date_of_joining DATE NOT NULL,
  date_of_exit DATE,
  employment_status VARCHAR(50) DEFAULT 'active', -- active, inactive, left
  department VARCHAR(100),
  designation VARCHAR(100),
  manager_id UUID REFERENCES employees(id),
  location VARCHAR(100),
  
  -- Personal Info
  personal_pan VARCHAR(10),
  aadhaar_number VARCHAR(12), -- Will be encrypted
  passport_number VARCHAR(20),
  
  -- Bank Details
  bank_name VARCHAR(100),
  bank_account_number VARCHAR(20),
  bank_ifsc_code VARCHAR(11),
  bank_account_holder_name VARCHAR(255),
  
  -- Contact
  phone_number VARCHAR(20),
  personal_email VARCHAR(255),
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID,
  updated_by UUID,
  
  UNIQUE(org_id, employee_id)
);

CREATE INDEX idx_employees_org ON employees(org_id);
CREATE INDEX idx_employees_status ON employees(employment_status);
CREATE INDEX idx_employees_dept ON employees(department);

-- ============================================================================
-- 3. SALARY STRUCTURES (Role-based templates)
-- ============================================================================
CREATE TABLE IF NOT EXISTS salary_structures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  effective_from DATE NOT NULL,
  effective_till DATE,
  
  -- CTCs and Fixed Components
  annual_ctc DECIMAL(15, 2),
  monthly_basic DECIMAL(15, 2) NOT NULL,
  monthly_da DECIMAL(15, 2) DEFAULT 0,
  monthly_hra DECIMAL(15, 2) DEFAULT 0,
  monthly_allowance DECIMAL(15, 2) DEFAULT 0,
  
  -- Additional Config
  is_template BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID,
  
  UNIQUE(org_id, name, effective_from)
);

CREATE INDEX idx_salary_structures_org ON salary_structures(org_id);
CREATE INDEX idx_salary_structures_active ON salary_structures(is_active, effective_from);

-- ============================================================================
-- 4. EMPLOYEE SALARY ASSIGNMENTS (Link employees to salary structures)
-- ============================================================================
CREATE TABLE IF NOT EXISTS employee_salary_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  salary_structure_id UUID NOT NULL REFERENCES salary_structures(id),
  
  effective_from DATE NOT NULL,
  effective_till DATE,
  
  -- Override salary components (if different from structure)
  override_monthly_basic DECIMAL(15, 2),
  override_monthly_da DECIMAL(15, 2),
  override_monthly_hra DECIMAL(15, 2),
  override_monthly_allowance DECIMAL(15, 2),
  
  assigned_by UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(employee_id, effective_from)
);

CREATE INDEX idx_salary_assignments_employee ON employee_salary_assignments(employee_id);
CREATE INDEX idx_salary_assignments_effective ON employee_salary_assignments(effective_from, effective_till);

-- ============================================================================
-- 5. STATUTORY RULES (India Compliance - PF, ESI, PT, TDS)
-- ============================================================================
CREATE TABLE IF NOT EXISTS statutory_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  rule_type VARCHAR(50) NOT NULL, -- PF, ESI, PT, TDS, GRATUITY
  state_code VARCHAR(2), -- For state-specific rules like PT
  effective_from DATE NOT NULL,
  effective_till DATE,
  
  -- PF Rules
  pf_employee_rate DECIMAL(5, 2), -- 12% default
  pf_employer_rate DECIMAL(5, 2), -- 12% default
  pf_ceiling DECIMAL(15, 2), -- Monthly salary ceiling
  
  -- ESI Rules
  esi_employee_rate DECIMAL(5, 2),
  esi_employer_rate DECIMAL(5, 2),
  esi_wage_ceiling DECIMAL(15, 2),
  esi_threshold_salary DECIMAL(15, 2), -- Salary below which ESI not applicable
  
  -- PT Rules (State-wise)
  pt_slab_min DECIMAL(15, 2),
  pt_slab_max DECIMAL(15, 2),
  pt_amount DECIMAL(15, 2),
  
  -- TDS Rules
  tds_slab_min DECIMAL(15, 2),
  tds_slab_max DECIMAL(15, 2),
  tds_rate DECIMAL(5, 2),
  
  -- Gratuity
  gratuity_rate_per_year DECIMAL(5, 2), -- Usually 15 days
  gratuity_completion_months INT, -- Months for gratuity eligibility
  
  -- Metadata
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID
);

CREATE INDEX idx_statutory_rules_type ON statutory_rules(rule_type);
CREATE INDEX idx_statutory_rules_state ON statutory_rules(state_code);
CREATE INDEX idx_statutory_rules_effective ON statutory_rules(effective_from, effective_till);

-- ============================================================================
-- 6. PAYROLL RUNS (Monthly/Periodic payroll execution records)
-- ============================================================================
CREATE TABLE IF NOT EXISTS payroll_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  
  payroll_period_start DATE NOT NULL,
  payroll_period_end DATE NOT NULL,
  payroll_month VARCHAR(7), -- YYYY-MM format, unique per org
  
  -- Status tracking
  status VARCHAR(50) DEFAULT 'draft', -- draft, in_progress, dry_run, finalized, locked, released
  dry_run_count INT DEFAULT 0,
  
  -- Financial Summary
  total_employees INT DEFAULT 0,
  total_gross_amount DECIMAL(18, 2),
  total_deductions DECIMAL(18, 2),
  total_net_amount DECIMAL(18, 2),
  
  -- Statutory totals
  total_pf_employee DECIMAL(18, 2),
  total_pf_employer DECIMAL(18, 2),
  total_esi_employee DECIMAL(18, 2),
  total_esi_employer DECIMAL(18, 2),
  total_pt DECIMAL(18, 2),
  total_tds DECIMAL(18, 2),
  
  -- Locking & Approval
  locked_at TIMESTAMP,
  locked_by UUID,
  approved_at TIMESTAMP,
  approved_by UUID,
  released_at TIMESTAMP,
  released_by UUID,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID,
  notes TEXT,
  
  UNIQUE(org_id, payroll_month)
);

CREATE INDEX idx_payroll_runs_org ON payroll_runs(org_id);
CREATE INDEX idx_payroll_runs_status ON payroll_runs(status);
CREATE INDEX idx_payroll_runs_period ON payroll_runs(payroll_period_start, payroll_period_end);

-- ============================================================================
-- 7. PAYROLL COMPONENTS (Individual employee payroll for each run)
-- ============================================================================
CREATE TABLE IF NOT EXISTS payroll_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  payroll_run_id UUID NOT NULL REFERENCES payroll_runs(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  
  -- Salary Structure Applied
  salary_structure_id UUID REFERENCES salary_structures(id),
  
  -- Working Days
  days_worked INT DEFAULT 0,
  days_absent INT DEFAULT 0,
  days_leave INT DEFAULT 0,
  days_in_month INT DEFAULT 30,
  
  -- Earnings (Pro-rated based on days worked)
  basic_pay DECIMAL(15, 2),
  dearness_allowance DECIMAL(15, 2),
  house_rent_allowance DECIMAL(15, 2),
  other_allowances DECIMAL(15, 2),
  gross_amount DECIMAL(15, 2),
  
  -- Statutory Deductions
  pf_employee DECIMAL(15, 2) DEFAULT 0,
  pf_employer DECIMAL(15, 2) DEFAULT 0,
  esi_employee DECIMAL(15, 2) DEFAULT 0,
  esi_employer DECIMAL(15, 2) DEFAULT 0,
  professional_tax DECIMAL(15, 2) DEFAULT 0,
  
  -- Income Tax
  tds DECIMAL(15, 2) DEFAULT 0,
  
  -- Other Deductions
  advance_recovery DECIMAL(15, 2) DEFAULT 0,
  loan_recovery DECIMAL(15, 2) DEFAULT 0,
  other_deductions DECIMAL(15, 2) DEFAULT 0,
  
  -- Net Calculation
  total_deductions DECIMAL(15, 2),
  net_pay DECIMAL(15, 2),
  
  -- Validation & Lock
  is_validated BOOLEAN DEFAULT FALSE,
  validation_errors TEXT, -- JSON array of errors
  is_locked BOOLEAN DEFAULT FALSE,
  locked_at TIMESTAMP,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID,
  
  UNIQUE(payroll_run_id, employee_id)
);

CREATE INDEX idx_payroll_components_run ON payroll_components(payroll_run_id);
CREATE INDEX idx_payroll_components_employee ON payroll_components(employee_id);
CREATE INDEX idx_payroll_components_org ON payroll_components(org_id);

-- ============================================================================
-- 8. PAYROLL LOCKS (Prevent post-approval modifications)
-- ============================================================================
CREATE TABLE IF NOT EXISTS payroll_locks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  payroll_run_id UUID NOT NULL REFERENCES payroll_runs(id) ON DELETE CASCADE,
  
  locked_at TIMESTAMP DEFAULT NOW(),
  locked_by UUID,
  lock_reason VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  
  UNIQUE(payroll_run_id)
);

CREATE INDEX idx_payroll_locks_run ON payroll_locks(payroll_run_id);

-- ============================================================================
-- 9. AUDIT LOGS (Immutable compliance trail)
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  
  entity_type VARCHAR(100) NOT NULL, -- employee, payroll_run, payroll_component
  entity_id UUID NOT NULL,
  
  action VARCHAR(50) NOT NULL, -- created, updated, deleted, locked, approved
  old_values JSONB, -- Previous values (for updates)
  new_values JSONB, -- New values
  
  performed_by UUID,
  performed_at TIMESTAMP DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  
  notes TEXT,
  
  -- Immutable (append-only)
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_org ON audit_logs(org_id);
CREATE INDEX idx_audit_logs_performed_at ON audit_logs(performed_at);

-- ============================================================================
-- 10. PAYROLL REPORTS & STATUTORY DOCUMENTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS statutory_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  payroll_run_id UUID REFERENCES payroll_runs(id) ON DELETE CASCADE,
  
  document_type VARCHAR(50) NOT NULL, -- FORM_16, FORM_24Q, PF_ECR, ESI_CHALLAN, PAYSLIP
  employee_id UUID REFERENCES employees(id),
  
  file_name VARCHAR(255),
  file_path TEXT, -- S3 or storage path
  file_size INT,
  
  generated_at TIMESTAMP DEFAULT NOW(),
  generated_by UUID,
  
  -- Status
  is_generated BOOLEAN DEFAULT FALSE,
  is_filed BOOLEAN DEFAULT FALSE,
  filed_at TIMESTAMP,
  
  metadata JSONB, -- Additional info like Form 16 summary
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_statutory_documents_org ON statutory_documents(org_id);
CREATE INDEX idx_statutory_documents_type ON statutory_documents(document_type);
CREATE INDEX idx_statutory_documents_run ON statutory_documents(payroll_run_id);

-- ============================================================================
-- 11. ATTENDANCE SUMMARY (For payroll calculation)
-- ============================================================================
CREATE TABLE IF NOT EXISTS attendance_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  
  attendance_month VARCHAR(7) NOT NULL, -- YYYY-MM
  
  total_days_in_month INT DEFAULT 30,
  present_days INT DEFAULT 0,
  absent_days INT DEFAULT 0,
  leave_days INT DEFAULT 0,
  holiday_days INT DEFAULT 0,
  
  working_days_expected INT, -- Days after holidays
  working_days_actual INT, -- Present + Leave
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(org_id, employee_id, attendance_month)
);

CREATE INDEX idx_attendance_summary_employee ON attendance_summary(employee_id);
CREATE INDEX idx_attendance_summary_month ON attendance_summary(attendance_month);

-- ============================================================================
-- 12. LEAVE SUMMARY (For payroll deductions)
-- ============================================================================
CREATE TABLE IF NOT EXISTS leave_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  
  leave_month VARCHAR(7) NOT NULL, -- YYYY-MM
  
  casual_leave_taken INT DEFAULT 0,
  sick_leave_taken INT DEFAULT 0,
  earned_leave_taken INT DEFAULT 0,
  unpaid_leave_taken INT DEFAULT 0,
  
  total_leave_days_deducted INT DEFAULT 0,
  loss_of_pay DECIMAL(15, 2) DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(org_id, employee_id, leave_month)
);

-- ============================================================================
-- SEED DATA: Default India Statutory Rules
-- ============================================================================

INSERT INTO statutory_rules (rule_type, state_code, effective_from, pf_employee_rate, pf_employer_rate, pf_ceiling, is_active)
VALUES
  ('PF', NULL, '2024-01-01'::DATE, 12, 12, 15000, TRUE),
  ('ESI', NULL, '2024-01-01'::DATE, 0.75, 3.25, 21000, TRUE),
  ('GRATUITY', NULL, '2024-01-01'::DATE, NULL, NULL, NULL, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Professional Tax - Maharashtra (multiple slabs per state/date)
INSERT INTO statutory_rules (rule_type, state_code, effective_from, pt_slab_min, pt_slab_max, pt_amount, is_active)
VALUES
  ('PT', 'MH', '2024-01-01'::DATE, 0, 10000, 0, TRUE),
  ('PT', 'MH', '2024-01-01'::DATE, 10001, 20000, 150, TRUE),
  ('PT', 'MH', '2024-01-01'::DATE, 20001, NULL, 200, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- ROW LEVEL SECURITY (Optional - for multi-tenant security)
-- ============================================================================
-- ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE payroll_components ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Uncomment RLS policies once you have auth implemented
