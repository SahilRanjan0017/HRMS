export const workflowTemplates = [
    {
        id: 'ONB-TPL-001',
        name: 'Standard Engineering Onboarding',
        type: 'Onboarding',
        description: 'Checklist for new engineering hires including hardware, access, and training.',
        last_updated: '2024-01-05',
        tasks_count: 8
    },
    {
        id: 'ONB-TPL-002',
        name: 'General Staff Onboarding',
        type: 'Onboarding',
        description: 'Standard onboarding for non-tech roles.',
        last_updated: '2023-11-20',
        tasks_count: 5
    },
    {
        id: 'OFF-TPL-001',
        name: 'Standard Employee Exit',
        type: 'Offboarding',
        description: 'Steps for employee resignation/termination, asset recovery, and deactivation.',
        last_updated: '2023-12-10',
        tasks_count: 6
    }
]

export const employeeWorkflows = [
    {
        id: 'WF-EMP-001',
        employee_id: 'MEG-EMP-002', // Sameer Kumar
        template_id: 'ONB-TPL-001',
        status: 'In Progress',
        progress: 65,
        started_date: '2024-01-01',
        tasks: [
            { id: 1, title: 'Laptop Procurement', assigned_to: 'IT Admin', status: 'Completed', deadline: '2024-01-02' },
            { id: 2, title: 'GitLab & Jira Access', assigned_to: 'Manager', status: 'Completed', deadline: '2024-01-02' },
            { id: 3, title: 'ID Card Issuance', assigned_to: 'HR Admin', status: 'Completed', deadline: '2024-01-03' },
            { id: 4, title: 'Health Insurance Enrollment', assigned_to: 'Employee', status: 'In Progress', deadline: '2024-01-07' },
            { id: 5, title: 'Architecture Walkthrough', assigned_to: 'Manager', status: 'Pending', deadline: '2024-01-10' }
        ]
    }
]

export const pendingTasksSummary = {
    my_tasks: 3,
    team_tasks: 12,
    overdue: 2
}
