<template>
  <BaseLayout pageTitle="User Access Control">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-black text-[rgb(var(--text-main))] tracking-tight">Access Management</h1>
            <p class="text-[rgb(var(--text-secondary))] font-medium mt-1">Assign and manage system roles for your workforce.</p>
          </div>
          <div class="flex items-center gap-3">
             <Button variant="outline" class="!rounded-xl px-4 py-6 font-bold" @click="router.push('/admin/roles')">
              <template #icon><FeatherIcon name="shield" class="h-4 w-4" /></template>
              View Roles
            </Button>
          </div>
        </div>

        <!-- Search & Filter -->
        <div class="premium-card p-4 flex flex-wrap items-center gap-4">
          <div class="flex-1 min-w-[300px] relative">
            <FeatherIcon name="search" class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search users by name or ID..." 
              class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <!-- User Role List -->
        <div class="premium-card overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 dark:bg-gray-700/30 border-b border-[rgb(var(--border-color))]">
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">User / Employee</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Current Roles</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[rgb(var(--border-color))]">
              <tr 
                v-for="user in filteredUsers" 
                :key="user.id" 
                class="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors group"
              >
                <td class="px-6 py-5">
                  <div class="flex items-center gap-4">
                    <Avatar :image="user.image" :label="user.name" size="lg" class="rounded-2xl" />
                    <div>
                      <div class="font-black text-[rgb(var(--text-main))] text-base">{{ user.name }}</div>
                      <div class="text-xs text-gray-400 font-bold uppercase tracking-tighter mt-0.5">{{ user.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="flex flex-wrap gap-2">
                    <Badge v-for="roleId in getRolesForUser(user.id)" :key="roleId" theme="blue" variant="subtle" size="sm">
                      {{ getRoleLabel(roleId) }}
                    </Badge>
                  </div>
                </td>
                <td class="px-6 py-5 text-right">
                  <Button variant="outline" class="!rounded-xl px-4 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all" @click="openAssignmentModal(user)">
                    Manage Access
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Assignment Modal -->
      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div class="premium-card bg-white dark:bg-gray-800 w-full max-w-lg overflow-hidden shadow-2xl">
            <div class="p-6 border-b border-[rgb(var(--border-color))] flex items-center justify-between">
              <h2 class="text-xl font-black text-[rgb(var(--text-main))]">Manage Roles: {{ selectedUser?.name }}</h2>
              <Button variant="ghost" class="!p-2" @click="isModalOpen = false">
                <FeatherIcon name="x" class="h-5 w-5" />
              </Button>
            </div>
            
            <div class="p-6 space-y-4">
              <p class="text-sm font-medium text-[rgb(var(--text-secondary))] mb-4 italic">Select the roles that should be assigned to this user. This determines their system capabilities.</p>
              
              <div class="space-y-3">
                <label 
                  v-for="role in defaultRoles" 
                  :key="role.id" 
                  class="flex items-center gap-4 p-4 rounded-2xl border border-[rgb(var(--border-color))] cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  :class="[tempRoles.includes(role.id) ? 'ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : '']"
                >
                  <input 
                    type="checkbox" 
                    :value="role.id" 
                    v-model="tempRoles"
                    class="w-6 h-6 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <div class="flex flex-col">
                    <span class="text-sm font-bold text-[rgb(var(--text-main))]">{{ role.name }}</span>
                    <span class="text-[10px] uppercase text-gray-400 font-bold tracking-widest">{{ role.scope }} scope</span>
                  </div>
                </label>
              </div>
            </div>

            <div class="p-6 bg-gray-50 dark:bg-gray-700/30 flex items-center justify-end gap-3">
               <Button variant="outline" class="!rounded-xl px-6" @click="isModalOpen = false">Cancel</Button>
               <Button variant="solid" class="!bg-blue-600 !text-white !rounded-xl px-8 font-black" @click="saveAssignments">Save Assignments</Button>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </BaseLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge, Avatar } from '@/utils/frappe-ui'
import { employeeMasterData } from '@/data/employee_master'
import { defaultRoles, mockUserRoles } from '@/data/roles'

const router = useRouter()
const searchQuery = ref('')
const isModalOpen = ref(false)
const selectedUser = ref(null)
const tempRoles = ref([])

const filteredUsers = computed(() => {
  if (!searchQuery.value) return employeeMasterData
  const q = searchQuery.value.toLowerCase()
  return employeeMasterData.filter(u => 
    u.name.toLowerCase().includes(q) || 
    u.id.toLowerCase().includes(q)
  )
})

const getRolesForUser = (userId) => {
  return mockUserRoles[userId] || ['employee']
}

const getRoleLabel = (roleId) => {
  return defaultRoles.find(r => r.id === roleId)?.name || roleId
}

const openAssignmentModal = (user) => {
  selectedUser.value = user
  tempRoles.value = [...getRolesForUser(user.id)]
  isModalOpen.value = true
}

const saveAssignments = () => {
  if (selectedUser.value) {
    mockUserRoles[selectedUser.value.id] = [...tempRoles.value]
    console.log(`[UserAccess] Updated roles for ${selectedUser.value.name}:`, tempRoles.value)
  }
  isModalOpen.value = false
}
</script>
