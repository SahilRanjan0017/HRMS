export const leavePolicies = [
    {
        id: 'POL-001',
        name: 'Casual Leave',
        code: 'CL',
        annual_quota: 12,
        carry_forward: true,
        max_carry_forward: 5,
        encashable: false
    },
    {
        id: 'POL-002',
        name: 'Sick Leave',
        code: 'SL',
        annual_quota: 10,
        carry_forward: false,
        max_carry_forward: 0,
        encashable: false
    },
    {
        id: 'POL-003',
        name: 'Earned Leave',
        code: 'EL',
        annual_quota: 18,
        carry_forward: true,
        max_carry_forward: 30,
        encashable: true
    }
]

export const leaveBalances = [
    {
        employee_id: 'MEG-EMP-001',
        policy_id: 'POL-001',
        available: 8.5,
        used: 3.5,
        pending: 0
    },
    {
        employee_id: 'MEG-EMP-001',
        policy_id: 'POL-002',
        available: 10,
        used: 0,
        pending: 0
    },
    {
        employee_id: 'MEG-EMP-001',
        policy_id: 'POL-003',
        available: 15,
        used: 3,
        pending: 0
    }
]

export const holidayCalendar = [
    { date: '2024-01-26', name: 'Republic Day', type: 'National' },
    { date: '2024-03-08', name: 'Holi', type: 'Festival' },
    { date: '2024-08-15', name: 'Independence Day', type: 'National' },
    { date: '2024-10-02', name: 'Gandhi Jayanti', type: 'National' },
    { date: '2024-10-24', name: 'Diwali', type: 'Festival' },
    { date: '2024-12-25', name: 'Christmas', type: 'Festival' }
]

export const leaveStats = {
    pending_approvals: 8,
    approved_this_month: 45,
    rejected_this_month: 2,
    on_leave_today: 12
}
