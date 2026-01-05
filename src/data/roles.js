export const permissions = {
    CORE_HR: {
        EMPLOYEE_VIEW: 'CORE_HR_EMPLOYEE_VIEW',
        EMPLOYEE_EDIT: 'CORE_HR_EMPLOYEE_EDIT',
        EMPLOYEE_CREATE: 'CORE_HR_EMPLOYEE_CREATE',
        ORG_STRUCTURE_MANAGE: 'CORE_HR_ORG_MANAGE',
    },
    LEAVE: {
        VIEW: 'LEAVE_VIEW',
        REQUEST: 'LEAVE_REQUEST',
        APPROVE: 'LEAVE_APPROVE',
    },
    ADMIN: {
        ROLES_MANAGE: 'ADMIN_ROLES_MANAGE',
        TENANT_MANAGE: 'ADMIN_TENANT_MANAGE',
        AUDIT_VIEW: 'ADMIN_AUDIT_VIEW',
    }
}

export const defaultRoles = [
    {
        id: 'system_admin',
        name: 'System Admin',
        is_system_default: true,
        permissions: Object.values(permissions).flatMap(p => Object.values(p)),
        scope: 'tenant'
    },
    {
        id: 'hr_admin',
        name: 'HR Admin',
        is_system_default: true,
        permissions: [
            permissions.CORE_HR.EMPLOYEE_VIEW,
            permissions.CORE_HR.EMPLOYEE_EDIT,
            permissions.CORE_HR.EMPLOYEE_CREATE,
            permissions.LEAVE.VIEW,
            permissions.LEAVE.APPROVE,
        ],
        scope: 'organization'
    },
    {
        id: 'manager',
        name: 'Manager',
        is_system_default: true,
        permissions: [
            permissions.CORE_HR.EMPLOYEE_VIEW,
            permissions.LEAVE.REQUEST,
            permissions.LEAVE.VIEW,
            permissions.LEAVE.APPROVE,
        ],
        scope: 'direct_reports'
    },
    {
        id: 'employee',
        name: 'Employee',
        is_system_default: true,
        permissions: [
            permissions.LEAVE.REQUEST,
            permissions.LEAVE.VIEW,
        ],
        scope: 'self'
    }
]

export const mockUserRoles = {
    'Administrator': ['system_admin'],
    'MEG-EMP-001': ['system_admin', 'manager', 'employee'], // Sahil Ranjan
}
