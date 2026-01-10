# Supabase Payroll Schema Setup Guide

## Step 1: Access Supabase SQL Editor

1. Go to your Supabase dashboard: https://supabase.com
2. Select your project: `bfeuvqucqxiuhpkvgwgr`
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

## Step 2: Copy & Run the Schema

1. Copy the entire contents of `database/payroll_schema.sql`
2. Paste it into the SQL Editor
3. Click **Run** (or press Ctrl+Enter)

The system will create:
- ✅ 12 main tables for payroll operations
- ✅ Indexes for performance optimization
- ✅ Default India statutory rules (PF, ESI, PT)
- ✅ Audit logging for compliance

## Step 3: Verify Tables in Supabase

After running, go to **Table Editor** in Supabase and confirm you see:

```
✓ organizations
✓ employees
✓ salary_structures
✓ employee_salary_assignments
✓ statutory_rules
✓ payroll_runs
✓ payroll_components
✓ payroll_locks
✓ audit_logs
✓ statutory_documents
✓ attendance_summary
✓ leave_summary
```

## Step 4: (Optional) Enable Row Level Security (RLS)

For multi-tenant security, run this separately:

```sql
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_components ENABLE ROW LEVEL SECURITY;
```

You'll need to define RLS policies once you have authentication implemented.

## What's Next

Once schema is created:
1. ✅ I'll build React hooks for payroll CRUD operations
2. ✅ Create pages for payroll management UI
3. ✅ Build the Go payroll-service microservice
4. ✅ Implement payroll calculation engine

---

## Schema Architecture Overview

### Multi-Tenant Design
- All tables have `org_id` for organization isolation
- Supports multiple entities within one org

### Effective Dating
- `effective_from` and `effective_till` dates for historical tracking
- Enables auditing of salary structure changes

### Compliance Features
- **Immutable Audit Logs**: Every change is tracked
- **Payroll Locks**: Prevents modification after approval
- **Statutory Rules**: Versioned PF, ESI, PT, TDS calculations
- **Statutory Documents**: Form 16, Form 24Q, ECR, Challan generation ready

### India Compliance
- PAN, Aadhaar encryption ready (encrypted_columns)
- State-wise PT rules
- Professional Tax slabs for Maharashtra (extensible to other states)
- Gratuity calculation support

### Payroll Calculation Flow

```
Employee → Salary Structure
         ↓
    Attendance Data + Leave Data
         ↓
    Fetch Statutory Rules (state-specific)
         ↓
    Compute Earnings (pro-rated)
         ↓
    Deduct: PF, ESI, PT, TDS
         ↓
    Generate Net Pay
         ↓
    Lock & Create Payslip
         ↓
    Audit Log Entry
```

---

## Table Descriptions

### 1. organizations
- Master org record
- Stores entity code, PAN, GST, state (for statutory rules)

### 2. employees
- Employee master (System of Record)
- Personal, employment, payroll, and bank details
- PAN, Aadhaar (to be encrypted), bank account

### 3. salary_structures
- Role-based salary templates
- Effective dating for historical tracking
- Basic, DA, HRA, allowances

### 4. employee_salary_assignments
- Links employees to salary structures
- Allows overrides (if employee has different components)
- Effective dating for changes

### 5. statutory_rules
- PF rates, ESI rates, PT slabs, TDS, Gratuity
- State-specific rules (e.g., PT varies by state)
- Versioned (effective_from/till) for compliance changes

### 6. payroll_runs
- Monthly/periodic payroll execution
- Status: draft → in_progress → dry_run → finalized → locked → released
- Financial summaries (gross, deductions, net)
- Approval tracking (locked_by, approved_by, released_by)

### 7. payroll_components
- Individual employee payroll for each run
- All calculations: earnings, deductions, net pay
- Validation errors and locking

### 8. payroll_locks
- Prevents modifications post-approval
- Lock reason tracking

### 9. audit_logs
- Immutable compliance trail
- Tracks all changes: who, when, what, old values, new values
- Append-only table

### 10. statutory_documents
- Generated payslips, Form 16, Form 24Q, ECR, Challan
- File tracking and filing status

### 11. attendance_summary
- Monthly attendance summary per employee
- Links to payroll for pro-ration calculations

### 12. leave_summary
- Monthly leave summary per employee
- Leave types: casual, sick, earned, unpaid
- Loss of pay calculation
