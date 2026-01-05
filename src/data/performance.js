export const performanceCycles = [
    {
        id: 'CYCLE-2024-H1',
        name: 'H1 2024 Performance Review',
        period: 'Jan 2024 - Jun 2024',
        status: 'Active',
        start_date: '2024-01-01',
        end_date: '2024-06-30',
        review_deadline: '2024-07-15',
        participants: 150,
        completed_reviews: 45
    },
    {
        id: 'CYCLE-2023-H2',
        name: 'H2 2023 Performance Review',
        period: 'Jul 2023 - Dec 2023',
        status: 'Completed',
        start_date: '2023-07-01',
        end_date: '2023-12-31',
        review_deadline: '2024-01-15',
        participants: 148,
        completed_reviews: 148
    }
]

export const employeeGoals = [
    {
        id: 'GOAL-001',
        employee_id: 'MEG-EMP-001',
        cycle_id: 'CYCLE-2024-H1',
        title: 'Complete HRMS Module Development',
        description: 'Deliver all 30 features of the enterprise HRMS with premium UI/UX',
        category: 'Project Delivery',
        weight: 40,
        target_date: '2024-06-30',
        status: 'In Progress',
        progress: 25
    },
    {
        id: 'GOAL-002',
        employee_id: 'MEG-EMP-001',
        cycle_id: 'CYCLE-2024-H1',
        title: 'Team Mentorship',
        description: 'Mentor 2 junior developers on Vue.js and modern frontend practices',
        category: 'Leadership',
        weight: 30,
        target_date: '2024-06-30',
        status: 'In Progress',
        progress: 50
    },
    {
        id: 'GOAL-003',
        employee_id: 'MEG-EMP-001',
        cycle_id: 'CYCLE-2024-H1',
        title: 'Technical Blog Writing',
        description: 'Publish 6 technical articles on company engineering blog',
        category: 'Knowledge Sharing',
        weight: 30,
        target_date: '2024-06-30',
        status: 'In Progress',
        progress: 33
    }
]

export const performanceReviews = [
    {
        id: 'REV-001',
        employee_id: 'MEG-EMP-001',
        cycle_id: 'CYCLE-2023-H2',
        self_rating: 4.5,
        manager_rating: 4.2,
        final_rating: 4.3,
        status: 'Completed',
        strengths: 'Excellent technical skills, proactive problem solver',
        areas_of_improvement: 'Can improve documentation practices',
        submitted_date: '2024-01-10'
    }
]

export const performanceStats = {
    active_cycles: 1,
    pending_self_reviews: 105,
    pending_manager_reviews: 12,
    average_rating: 4.1
}
