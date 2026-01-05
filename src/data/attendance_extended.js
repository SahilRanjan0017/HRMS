export const shifts = [
    { id: 'SHIFT-DAY', name: 'Day Shift', start_time: '09:00', end_time: '18:00', grace_minutes: 15 },
    { id: 'SHIFT-NIGHT', name: 'Night Shift', start_time: '22:00', end_time: '07:00', grace_minutes: 15 },
    { id: 'SHIFT-FLEX', name: 'Flexible Hours', start_time: '08:00', end_time: '20:00', grace_minutes: 30 }
]

export const attendanceLogs = [
    {
        id: 'ATT-001',
        employee_id: 'MEG-EMP-001',
        date: '2024-01-05',
        shift_id: 'SHIFT-DAY',
        check_in: '09:05',
        check_out: '18:10',
        status: 'Present',
        hours_worked: 9.08,
        overtime_hours: 0.17,
        late_by_minutes: 5
    },
    {
        id: 'ATT-002',
        employee_id: 'MEG-EMP-002',
        date: '2024-01-05',
        shift_id: 'SHIFT-DAY',
        check_in: '09:25',
        check_out: '18:00',
        status: 'Late',
        hours_worked: 8.58,
        overtime_hours: 0,
        late_by_minutes: 25
    },
    {
        id: 'ATT-003',
        employee_id: 'MEG-EMP-003',
        date: '2024-01-05',
        shift_id: 'SHIFT-DAY',
        check_in: null,
        check_out: null,
        status: 'Absent',
        hours_worked: 0,
        overtime_hours: 0,
        late_by_minutes: 0
    }
]

export const attendanceExceptions = [
    {
        id: 'EXC-001',
        employee_id: 'MEG-EMP-003',
        date: '2024-01-05',
        type: 'Missing Punch',
        status: 'Pending',
        raised_by: 'System',
        assigned_to: 'Manager'
    },
    {
        id: 'EXC-002',
        employee_id: 'MEG-EMP-002',
        date: '2024-01-05',
        type: 'Late Arrival',
        status: 'Approved',
        raised_by: 'System',
        assigned_to: 'Manager',
        remarks: 'Traffic delay approved'
    }
]

export const attendanceStats = {
    total_employees: 150,
    present_today: 142,
    absent_today: 5,
    on_leave: 3,
    late_arrivals: 8,
    pending_exceptions: 12
}
