export const salaryStructures = [
    {
        id: 'SAL-STRUCT-001',
        name: 'Software Engineer - L3',
        grade: 'L3',
        components: [
            { name: 'Basic Salary', type: 'Earning', amount: 50000, is_percentage: false },
            { name: 'HRA', type: 'Earning', amount: 40, is_percentage: true, base: 'Basic Salary' },
            { name: 'Special Allowance', type: 'Earning', amount: 15000, is_percentage: false },
            { name: 'PF Employee', type: 'Deduction', amount: 12, is_percentage: true, base: 'Basic Salary' },
            { name: 'Professional Tax', type: 'Deduction', amount: 200, is_percentage: false }
        ]
    }
]

export const payrollRuns = [
    {
        id: 'PR-2024-01',
        month: 'January 2024',
        status: 'Processed',
        employee_count: 150,
        total_gross: 12500000,
        total_deductions: 1875000,
        total_net: 10625000,
        processed_date: '2024-01-28',
        payment_date: '2024-02-01'
    },
    {
        id: 'PR-2023-12',
        month: 'December 2023',
        status: 'Locked',
        employee_count: 148,
        total_gross: 12300000,
        total_deductions: 1845000,
        total_net: 10455000,
        processed_date: '2023-12-28',
        payment_date: '2024-01-01'
    }
]

export const payrollComponents = [
    { code: 'BASIC', name: 'Basic Salary', type: 'Earning', statutory: true },
    { code: 'HRA', name: 'House Rent Allowance', type: 'Earning', statutory: false },
    { code: 'SPECIAL', name: 'Special Allowance', type: 'Earning', statutory: false },
    { code: 'PF_EMP', name: 'PF Employee Contribution', type: 'Deduction', statutory: true },
    { code: 'PF_EMP_ER', name: 'PF Employer Contribution', type: 'Deduction', statutory: true },
    { code: 'ESI_EMP', name: 'ESI Employee', type: 'Deduction', statutory: true },
    { code: 'PT', name: 'Professional Tax', type: 'Deduction', statutory: true },
    { code: 'TDS', name: 'Tax Deducted at Source', type: 'Deduction', statutory: true }
]

export const payrollStats = {
    current_run_status: 'Draft',
    employees_processed: 0,
    pending_approvals: 0,
    total_cost: 0
}
