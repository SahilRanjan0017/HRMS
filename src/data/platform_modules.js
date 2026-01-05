// Analytics & Reporting Data
export const hrAnalytics = {
    headcount: {
        total: 150,
        active: 145,
        on_leave: 3,
        new_hires_this_month: 5,
        exits_this_month: 2,
        trend: '+2.1%'
    },
    attrition: {
        current_rate: 12.5,
        previous_rate: 14.2,
        voluntary: 8,
        involuntary: 2,
        trend: '-1.7%'
    },
    diversity: {
        gender_ratio: { male: 65, female: 35 },
        age_groups: { '20-30': 45, '31-40': 38, '41-50': 12, '50+': 5 },
        department_distribution: {
            'Engineering': 60,
            'Product': 25,
            'Sales': 20,
            'HR': 15,
            'Finance': 10,
            'Operations': 20
        }
    },
    attendance: {
        average_attendance: 94.5,
        late_arrivals_rate: 5.2,
        overtime_hours: 450,
        trend: '+1.2%'
    },
    leave: {
        utilization_rate: 68.5,
        pending_requests: 8,
        approved_this_month: 45,
        most_used_type: 'Casual Leave'
    },
    payroll: {
        total_cost_this_month: 12500000,
        average_salary: 83333,
        highest_component: 'Basic Salary',
        statutory_compliance: 100
    },
    performance: {
        reviews_completed: 85,
        average_rating: 4.1,
        top_performers: 15,
        improvement_needed: 8
    }
}

export const chartData = {
    headcountTrend: [
        { month: 'Jul', count: 142 },
        { month: 'Aug', count: 144 },
        { month: 'Sep', count: 146 },
        { month: 'Oct', count: 148 },
        { month: 'Nov', count: 147 },
        { month: 'Dec', count: 148 },
        { month: 'Jan', count: 150 }
    ],
    attritionTrend: [
        { month: 'Jul', rate: 15.2 },
        { month: 'Aug', rate: 14.8 },
        { month: 'Sep', rate: 14.5 },
        { month: 'Oct', rate: 13.9 },
        { month: 'Nov', rate: 13.2 },
        { month: 'Dec', rate: 14.2 },
        { month: 'Jan', rate: 12.5 }
    ]
}

// Compliance & Documents
export const compliancePolicies = [
    {
        id: 'POL-001',
        name: 'Code of Conduct',
        category: 'Ethics',
        version: '2.0',
        published_date: '2024-01-01',
        mandatory: true,
        acknowledgment_required: true,
        acknowledged_by: 142,
        total_employees: 150
    },
    {
        id: 'POL-002',
        name: 'Data Privacy Policy',
        category: 'Security',
        version: '1.5',
        published_date: '2023-12-15',
        mandatory: true,
        acknowledgment_required: true,
        acknowledged_by: 150,
        total_employees: 150
    },
    {
        id: 'POL-003',
        name: 'Remote Work Policy',
        category: 'Operations',
        version: '1.0',
        published_date: '2023-11-01',
        mandatory: false,
        acknowledgment_required: false,
        acknowledged_by: 0,
        total_employees: 150
    }
]

export const complianceDocuments = [
    {
        id: 'DOC-001',
        employee_id: 'MEG-EMP-001',
        type: 'PAN Card',
        expiry_date: null,
        status: 'Valid',
        uploaded_date: '2023-06-15'
    },
    {
        id: 'DOC-002',
        employee_id: 'MEG-EMP-001',
        type: 'Passport',
        expiry_date: '2028-03-20',
        status: 'Valid',
        uploaded_date: '2023-06-15'
    },
    {
        id: 'DOC-003',
        employee_id: 'MEG-EMP-002',
        type: 'Work Visa',
        expiry_date: '2024-02-15',
        status: 'Expiring Soon',
        uploaded_date: '2023-02-10'
    }
]

// Platform Configuration
export const tenantSettings = {
    company_name: 'Megha Technologies Pvt Ltd',
    company_logo: '/megha_hr_logo.png',
    primary_color: '#2563eb',
    secondary_color: '#4f46e5',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    date_format: 'DD/MM/YYYY',
    week_start: 'Monday',
    fiscal_year_start: 'April',
    language: 'en'
}

export const featureFlags = [
    { feature: 'recruitment', enabled: true, description: 'Recruitment & ATS module' },
    { feature: 'performance', enabled: true, description: 'Performance management' },
    { feature: 'learning', enabled: true, description: 'Learning & Development' },
    { feature: 'travel', enabled: false, description: 'Travel & Expense (Coming Soon)' },
    { feature: 'surveys', enabled: false, description: 'Employee Surveys (Beta)' }
]

export const customFields = [
    {
        id: 'CF-001',
        entity: 'Employee',
        field_name: 'T-Shirt Size',
        field_type: 'Select',
        options: ['S', 'M', 'L', 'XL', 'XXL'],
        required: false
    },
    {
        id: 'CF-002',
        entity: 'Employee',
        field_name: 'Emergency Contact',
        field_type: 'Text',
        required: true
    }
]

// Workflow Automation
export const automationRules = [
    {
        id: 'RULE-001',
        name: 'Auto-approve leave < 1 day',
        trigger: 'Leave Request Submitted',
        condition: 'Duration < 1 day AND Balance Available',
        action: 'Auto Approve',
        status: 'Active',
        executions: 45
    },
    {
        id: 'RULE-002',
        name: 'Birthday wishes',
        trigger: 'Employee Birthday',
        condition: 'Always',
        action: 'Send Email + Post Announcement',
        status: 'Active',
        executions: 12
    },
    {
        id: 'RULE-003',
        name: 'Probation completion reminder',
        trigger: '7 days before probation end',
        condition: 'Employee Status = Probation',
        action: 'Notify Manager + HR',
        status: 'Active',
        executions: 3
    }
]

// Notifications & Inbox
export const notifications = [
    {
        id: 'NOTIF-001',
        type: 'Leave Approval',
        title: 'Leave request approved',
        message: 'Your leave request for Jan 15-17 has been approved',
        priority: 'Medium',
        read: false,
        timestamp: '2024-01-05T10:30:00',
        action_url: '/dashboard/leaves'
    },
    {
        id: 'NOTIF-002',
        type: 'Payroll',
        title: 'Payslip available',
        message: 'Your payslip for January 2024 is now available',
        priority: 'High',
        read: false,
        timestamp: '2024-01-05T09:00:00',
        action_url: '/dashboard/salary-slips'
    },
    {
        id: 'NOTIF-003',
        type: 'Recognition',
        title: 'You received recognition!',
        message: 'Sameer Kumar recognized you with Team Player badge',
        priority: 'Low',
        read: true,
        timestamp: '2024-01-04T16:45:00',
        action_url: '/recognition'
    }
]

export const userTasks = [
    {
        id: 'TASK-001',
        type: 'Approval',
        title: 'Approve leave request - Priya Sharma',
        description: '3 days casual leave (Jan 20-22)',
        priority: 'High',
        due_date: '2024-01-06',
        action_url: '/admin/leave'
    },
    {
        id: 'TASK-002',
        type: 'Review',
        title: 'Complete performance review - Rohan Mehta',
        description: 'H1 2024 performance cycle',
        priority: 'Medium',
        due_date: '2024-01-15',
        action_url: '/admin/performance'
    }
]
