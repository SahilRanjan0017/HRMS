// Benefits & Reimbursements
export const benefitPlans = [
    {
        id: 'BEN-001',
        name: 'Health Insurance',
        type: 'Insurance',
        provider: 'Star Health',
        coverage: '₹5,00,000',
        premium_employee: 2000,
        premium_employer: 8000,
        enrolled_employees: 145
    },
    {
        id: 'BEN-002',
        name: 'Life Insurance',
        type: 'Insurance',
        provider: 'LIC',
        coverage: '₹10,00,000',
        premium_employee: 500,
        premium_employer: 1500,
        enrolled_employees: 150
    },
    {
        id: 'BEN-003',
        name: 'Meal Allowance',
        type: 'Allowance',
        amount: 3000,
        frequency: 'Monthly',
        enrolled_employees: 150
    }
]

export const reimbursementTypes = [
    { code: 'MEDICAL', name: 'Medical Reimbursement', max_per_year: 15000, requires_bill: true },
    { code: 'TRAVEL', name: 'Travel Reimbursement', max_per_claim: 5000, requires_bill: true },
    { code: 'INTERNET', name: 'Internet Reimbursement', max_per_month: 1000, requires_bill: true },
    { code: 'MOBILE', name: 'Mobile Reimbursement', max_per_month: 500, requires_bill: false }
]

export const reimbursementClaims = [
    {
        id: 'CLAIM-001',
        employee_id: 'MEG-EMP-001',
        type: 'MEDICAL',
        amount: 4500,
        date: '2024-01-03',
        description: 'Dental treatment',
        status: 'Pending',
        submitted_date: '2024-01-04',
        attachments: ['dental_bill.pdf']
    },
    {
        id: 'CLAIM-002',
        employee_id: 'MEG-EMP-002',
        type: 'TRAVEL',
        amount: 2800,
        date: '2024-01-02',
        description: 'Client meeting - Mumbai',
        status: 'Approved',
        submitted_date: '2024-01-03',
        approved_date: '2024-01-04',
        attachments: ['flight_ticket.pdf', 'hotel_bill.pdf']
    }
]

// Travel & Expenses
export const travelPolicies = [
    {
        id: 'POL-TRAVEL-001',
        name: 'Domestic Travel Policy',
        flight_class: 'Economy',
        hotel_max_per_night: 5000,
        daily_allowance: 1500,
        applicable_to: 'All Employees'
    },
    {
        id: 'POL-TRAVEL-002',
        name: 'International Travel Policy',
        flight_class: 'Economy',
        hotel_max_per_night: 15000,
        daily_allowance: 5000,
        applicable_to: 'Senior Management'
    }
]

export const travelRequests = [
    {
        id: 'TRAVEL-001',
        employee_id: 'MEG-EMP-001',
        from: 'Bangalore',
        to: 'Mumbai',
        start_date: '2024-01-15',
        end_date: '2024-01-17',
        purpose: 'Client presentation',
        estimated_cost: 25000,
        status: 'Pending Approval',
        submitted_date: '2024-01-05'
    }
]

// Learning & Development
export const courses = [
    {
        id: 'COURSE-001',
        title: 'Advanced Vue.js Development',
        category: 'Technical',
        type: 'Self-paced',
        duration: '20 hours',
        instructor: 'Internal',
        enrolled: 25,
        rating: 4.8,
        modules_count: 12
    },
    {
        id: 'COURSE-002',
        title: 'Leadership Fundamentals',
        category: 'Leadership',
        type: 'Instructor-led',
        duration: '3 days',
        instructor: 'External',
        enrolled: 15,
        rating: 4.9,
        modules_count: 8
    },
    {
        id: 'COURSE-003',
        title: 'Data Privacy & GDPR Compliance',
        category: 'Compliance',
        type: 'Self-paced',
        duration: '5 hours',
        instructor: 'Internal',
        enrolled: 150,
        rating: 4.5,
        modules_count: 6,
        mandatory: true
    }
]

export const courseEnrollments = [
    {
        id: 'ENROLL-001',
        employee_id: 'MEG-EMP-001',
        course_id: 'COURSE-001',
        enrolled_date: '2024-01-01',
        progress: 65,
        status: 'In Progress',
        completed_modules: 8
    },
    {
        id: 'ENROLL-002',
        employee_id: 'MEG-EMP-001',
        course_id: 'COURSE-003',
        enrolled_date: '2024-01-02',
        progress: 100,
        status: 'Completed',
        completed_modules: 6,
        completion_date: '2024-01-04',
        certificate_issued: true
    }
]

// Engagement & Recognition
export const recognitions = [
    {
        id: 'REC-001',
        from_employee_id: 'MEG-EMP-003',
        to_employee_id: 'MEG-EMP-001',
        badge: 'Team Player',
        message: 'Great collaboration on the HRMS project!',
        date: '2024-01-04',
        public: true
    },
    {
        id: 'REC-002',
        from_employee_id: 'MEG-EMP-002',
        to_employee_id: 'MEG-EMP-001',
        badge: 'Innovation Champion',
        message: 'Excellent work on the premium UI design',
        date: '2024-01-03',
        public: true
    }
]

export const announcements = [
    {
        id: 'ANN-001',
        title: 'New Year Celebration',
        content: 'Join us for the New Year party on Jan 15th at 6 PM!',
        type: 'Event',
        posted_by: 'HR Admin',
        posted_date: '2024-01-02',
        priority: 'High',
        target_audience: 'All Employees'
    },
    {
        id: 'ANN-002',
        title: 'System Maintenance',
        content: 'HRMS will be under maintenance on Jan 10th from 2 AM to 4 AM.',
        type: 'System',
        posted_by: 'IT Admin',
        posted_date: '2024-01-05',
        priority: 'Medium',
        target_audience: 'All Employees'
    }
]

export const badges = [
    { id: 'BADGE-001', name: 'Team Player', icon: '🤝', color: 'blue' },
    { id: 'BADGE-002', name: 'Innovation Champion', icon: '💡', color: 'purple' },
    { id: 'BADGE-003', name: 'Customer Hero', icon: '⭐', color: 'yellow' },
    { id: 'BADGE-004', name: 'Problem Solver', icon: '🔧', color: 'green' },
    { id: 'BADGE-005', name: 'Mentor', icon: '🎓', color: 'indigo' }
]
