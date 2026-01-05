<template>
  <BaseLayout pageTitle="Employee Directory">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Header Actions -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-black text-[rgb(var(--text-main))] tracking-tight">Employees</h1>
            <p class="text-[rgb(var(--text-secondary))] font-medium mt-1">Manage and view all employee records across the organization.</p>
          </div>
          <div class="flex items-center gap-3">
             <Button variant="outline" class="!rounded-xl px-4 py-6 font-bold">
              <template #icon><FeatherIcon name="download" class="h-4 w-4" /></template>
              Export
            </Button>
            <Button variant="solid" class="!bg-blue-600 !text-white !rounded-xl !font-bold py-6 px-6 shadow-lg shadow-blue-600/20" @click="router.push('/admin/employees/new')">
              <template #icon><FeatherIcon name="plus" class="h-4 w-4" /></template>
              Add Employee
            </Button>
          </div>
        </div>

        <!-- Filters & Search -->
        <div class="premium-card p-4 flex flex-wrap items-center gap-4">
          <div class="flex-1 min-w-[300px] relative">
            <FeatherIcon name="search" class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search by name, email, or employee ID..." 
              class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div class="flex items-center gap-2">
            <Badge theme="blue" variant="subtle" class="cursor-pointer hover:scale-105 transition-transform">Department: All</Badge>
            <Badge theme="gray" variant="subtle" class="cursor-pointer hover:scale-105 transition-transform">Status: Active</Badge>
          </div>
        </div>

        <!-- Employee Table -->
        <div class="premium-card overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 dark:bg-gray-700/30 border-b border-[rgb(var(--border-color))]">
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Employee</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Designation & Dept</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Joining Date</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[rgb(var(--border-color))]">
              <tr 
                v-for="emp in filteredEmployees" 
                :key="emp.id" 
                class="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors cursor-pointer group"
                @click="viewProfile(emp.id)"
              >
                <td class="px-6 py-5">
                  <div class="flex items-center gap-4">
                    <Avatar :image="emp.image" :label="emp.name" size="lg" class="rounded-2xl" />
                    <div>
                      <div class="font-black text-[rgb(var(--text-main))] text-base group-hover:text-blue-600 transition-colors">{{ emp.name }}</div>
                      <div class="text-xs text-gray-400 font-bold uppercase tracking-tighter mt-0.5">{{ emp.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5">
                   <div class="font-bold text-[rgb(var(--text-main))] text-sm">{{ emp.job_details.designation }}</div>
                   <div class="text-xs text-[rgb(var(--text-secondary))] mt-0.5">{{ emp.job_details.department }}</div>
                </td>
                <td class="px-6 py-5">
                  <div class="text-sm font-medium text-[rgb(var(--text-main))]">{{ dayjs(emp.job_details.date_of_joining).format('DD MMM YYYY') }}</div>
                  <Badge theme="green" variant="subtle" class="mt-1" size="sm">Active</Badge>
                </td>
                <td class="px-6 py-5 text-right">
                  <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" class="!p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl" @click.stop="editEmployee(emp.id)">
                      <FeatherIcon name="edit-2" class="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" class="!p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl">
                      <FeatherIcon name="more-vertical" class="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge, Avatar } from '@/utils/frappe-ui'
import { employeeMasterData } from '@/data/employee_master'
import dayjs from 'dayjs'

const router = useRouter()
const searchQuery = ref('')

const filteredEmployees = computed(() => {
  if (!searchQuery.value) return employeeMasterData
  const q = searchQuery.value.toLowerCase()
  return employeeMasterData.filter(e => 
    e.name.toLowerCase().includes(q) || 
    e.id.toLowerCase().includes(q) || 
    e.email.toLowerCase().includes(q)
  )
})

const viewProfile = (id) => {
  router.push(`/profile/${id}`)
}

const editEmployee = (id) => {
  router.push(`/admin/employees/edit/${id}`)
}
</script>
