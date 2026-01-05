export const jobRequisitions = [
    {
        id: 'JOB-2024-001',
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'Remote / Bangalore',
        type: 'Full-time',
        status: 'Open',
        experience: '5-8 Years',
        salary_range: '₹25L - ₹40L',
        description: 'We are looking for a Vue.js expert to lead our HRMS frontend team...',
        posted_date: '2024-01-01',
        applications_count: 12
    },
    {
        id: 'JOB-2024-002',
        title: 'Product Designer (UI/UX)',
        department: 'Product',
        location: 'Mumbai',
        type: 'Full-time',
        status: 'Open',
        experience: '3-5 Years',
        salary_range: '₹18L - ₹28L',
        description: 'Design premium, glassmorphic interfaces for our enterprise suite...',
        posted_date: '2024-01-03',
        applications_count: 8
    },
    {
        id: 'JOB-2024-003',
        title: 'HR Operations Manager',
        department: 'Human Resources',
        location: 'Bangalore',
        type: 'Full-time',
        status: 'Closed',
        experience: '8-12 Years',
        salary_range: '₹20L - ₹35L',
        description: 'Oversee entire employee lifecycle and compliance...',
        posted_date: '2023-12-15',
        applications_count: 45
    }
]

export const candidatePipeline = [
    {
        id: 'APP-001',
        job_id: 'JOB-2024-001',
        name: 'Rohan Mehta',
        email: 'rohan.m@gmail.com',
        status: 'Interview',
        stage: 'Technical Round 1',
        rating: 4.5,
        applied_date: '2024-01-02',
        resume: 'rohan_resume.pdf'
    },
    {
        id: 'APP-002',
        job_id: 'JOB-2024-001',
        name: 'Sanya Iyer',
        email: 'sanya.i@outlook.com',
        status: 'Applied',
        stage: 'Initial Screening',
        rating: null,
        applied_date: '2024-01-04',
        resume: 'sanya_cv.pdf'
    },
    {
        id: 'APP-003',
        job_id: 'JOB-2024-002',
        name: 'Arjun Kapoor',
        email: 'arjun.k@design.com',
        status: 'Shortlisted',
        stage: 'Portfolio Review',
        rating: 4.8,
        applied_date: '2024-01-03',
        resume: 'arjun_portfolio.pdf'
    },
    {
        id: 'APP-004',
        job_id: 'JOB-2024-001',
        name: 'Vikram Singh',
        email: 'v.singh@dev.io',
        status: 'Rejected',
        stage: 'Technical Round 1',
        rating: 2.5,
        applied_date: '2024-01-01',
        resume: 'vikram_resume.pdf'
    },
    {
        id: 'APP-005',
        job_id: 'JOB-2024-002',
        name: 'Priya Sharma',
        email: 'priya.s@ux.com',
        status: 'Offered',
        stage: 'Final Negotiation',
        rating: 4.9,
        applied_date: '2023-12-28',
        resume: 'priya_sharma.pdf'
    }
]

export const recruitmentStats = {
    open_jobs: 2,
    total_candidates: 342,
    interviews_today: 4,
    offers_sent: 12
}
