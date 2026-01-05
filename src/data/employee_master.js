import { reactive } from 'vue'
import dayjs from 'dayjs'

export const employeeMasterData = reactive([
    {
        id: 'MEG-EMP-001',
        name: 'Sahil Ranjan',
        email: 'sahil@meghahr.com',
        image: 'https://i.pravatar.cc/150?u=sahil',
        status: 'Active',
        personal_details: {
            dob: '1992-05-15',
            gender: 'Male',
            blood_group: 'O+',
            mobile: '+91 98765 43210',
            emergency_contact: 'Priya Ranjan (+91 98765 43211)',
            address: '123, Indiranagar, Bangalore, 560038',
            pan: 'ABCDE1234F',
            aadhaar: '1234 5678 9012'
        },
        job_details: {
            designation: 'Product Lead',
            department: 'Product Management',
            date_of_joining: '2024-01-01',
            employment_type: 'Full-time',
            location: 'Bangalore HQ',
            reports_to: 'Vikram Seth (CEO)',
            probation_end_date: '2024-06-01'
        },
        pay_details: {
            bank_name: 'HDFC Bank',
            account_number: '50100234567890',
            ifsc: 'HDFC0001234',
            ctc: '₹ 24,00,000',
            basic: '₹ 1,00,000',
            hra: '₹ 50,000',
            lta: '₹ 10,000',
            special_allowance: '₹ 40,000'
        },
        documents: [
            { name: 'Offer Letter', type: 'PDF', size: '1.2 MB', url: '#' },
            { name: 'Aadhaar Card', type: 'Image', size: '800 KB', url: '#' },
            { name: 'Experience Letter - Prev Co', type: 'PDF', size: '2.1 MB', url: '#' }
        ]
    },
    {
        id: 'MEG-EMP-002',
        name: 'Anjali Sharma',
        email: 'anjali@meghahr.com',
        image: 'https://i.pravatar.cc/150?u=anjali',
        status: 'Active',
        personal_details: {
            dob: '1995-08-22',
            gender: 'Female',
            blood_group: 'A+',
            mobile: '+91 98765 43220',
            emergency_contact: 'Ravi Sharma (+91 98765 43221)',
            address: '45, Koramangala, Bangalore, 560034',
            pan: 'FGHIJ5678K',
            aadhaar: '5678 9012 3456'
        },
        job_details: {
            designation: 'Senior HRBP',
            department: 'Human Resources',
            date_of_joining: '2024-02-15',
            employment_type: 'Full-time',
            location: 'Bangalore HQ',
            reports_to: 'Vikram Seth (CEO)',
            probation_end_date: '2024-08-15'
        },
        pay_details: {
            bank_name: 'ICICI Bank',
            account_number: '60100123456789',
            ifsc: 'ICIC0000001',
            ctc: '₹ 18,00,000',
            basic: '₹ 75,000',
            hra: '₹ 37,500',
            lta: '₹ 8,000',
            special_allowance: '₹ 29,500'
        },
        documents: [
            { name: 'Appointment Letter', type: 'PDF', size: '1.1 MB', url: '#' }
        ]
    }
])
