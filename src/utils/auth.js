import { defaultRoles, mockUserRoles } from '@/data/roles'
import { reactive, computed } from 'vue'

class AuthService {
    constructor() {
        this.state = reactive({
            currentUser: 'MEG-EMP-001', // Mocked to Sahil
            roles: [],
            initialized: false
        })
    }

    async initialize(userId) {
        this.state.currentUser = userId || this.state.currentUser
        this.state.roles = mockUserRoles[this.state.currentUser] || ['employee']
        this.state.initialized = true
        console.log(`[AuthService] Initialized for ${this.state.currentUser} with roles:`, this.state.roles)
    }

    hasPermission(permissionCode, targetDataId = null) {
        const userPermissions = this.getUserPermissions()

        // Find if any role has this permission
        const roleWithPermission = defaultRoles.find(role =>
            this.state.roles.includes(role.id) && role.permissions.includes(permissionCode)
        )

        if (!roleWithPermission) return false

        // Scope check (Simplified)
        if (roleWithPermission.scope === 'tenant') return true
        if (roleWithPermission.scope === 'self' && targetDataId === this.state.currentUser) return true

        // For 'direct_reports' or 'organization', additional logic would check relationships
        // For this mock, we'll return true if the role simply has the permission code
        return true
    }

    getUserPermissions() {
        const userRoles = defaultRoles.filter(r => this.state.roles.includes(r.id))
        return [...new Set(userRoles.flatMap(r => r.permissions))]
    }

    isAdmin() {
        return this.state.roles.includes('system_admin')
    }
}

export const auth = new AuthService()

// Composition API helper
export function useAuth() {
    return {
        hasPermission: (code, id) => auth.hasPermission(code, id),
        isAdmin: computed(() => auth.isAdmin()),
        roles: computed(() => auth.state.roles),
        userId: computed(() => auth.state.currentUser)
    }
}
