<template>
  <BaseLayout :pageTitle="`Edit Role: ${role?.name || '...'}`">
    <template #body>
      <div v-if="role" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <Button variant="ghost" class="!p-2" @click="router.back()">
              <FeatherIcon name="arrow-left" class="h-5 w-5" />
            </Button>
            <div>
              <h1 class="text-3xl font-black text-[rgb(var(--text-main))] tracking-tight">{{ role.name }}</h1>
              <p class="text-[rgb(var(--text-secondary))] font-medium mt-1 italic">Internal ID: {{ role.id }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <Button variant="outline" class="!rounded-xl px-6">Cancel</Button>
            <Button variant="solid" class="!bg-blue-600 !text-white !rounded-xl px-6 shadow-md shadow-blue-600/20" @click="saveRole">Save Changes</Button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- General Info -->
          <div class="lg:col-span-1 space-y-6">
            <div class="premium-card p-6 space-y-4">
              <h3 class="text-lg font-black text-[rgb(var(--text-main))] border-l-4 border-blue-500 pl-3">General Settings</h3>
              
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-gray-500">Role Name</label>
                <Input v-model="role.name" placeholder="e.g. Payroll Auditor" />
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-gray-500">Default Data Scope</label>
                <select class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  <option value="self">Self (Own records only)</option>
                  <option value="direct_reports">Direct Reports (Team scope)</option>
                  <option value="organization">Organization (Assigned unit scope)</option>
                  <option value="tenant">Tenant (All records in company)</option>
                </select>
              </div>

              <div class="pt-4">
                <div class="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-900/20 rounded-2xl text-amber-700 dark:text-amber-400">
                  <FeatherIcon name="alert-triangle" class="h-5 w-5 flex-shrink-0" />
                  <p class="text-xs font-bold leading-tight">System default roles cannot be renamed or deleted to ensure core system stability.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Permission Matrix -->
          <div class="lg:col-span-2 space-y-6">
            <div class="premium-card overflow-hidden">
              <div class="p-6 border-b border-[rgb(var(--border-color))]">
                <h3 class="text-lg font-black text-[rgb(var(--text-main))]">Capabilities & Permissions</h3>
              </div>
              
              <div class="divide-y divide-[rgb(var(--border-color))]">
                <div v-for="(modulePerms, moduleName) in permissions" :key="moduleName" class="p-6 space-y-4">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                    <h4 class="font-black text-sm uppercase tracking-wider text-gray-400">{{ moduleName.replace('_', ' ') }}</h4>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                    <label 
                      v-for="(code, key) in modulePerms" 
                      :key="code" 
                      class="flex items-center gap-3 p-4 rounded-2xl border border-[rgb(var(--border-color))] hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group"
                    >
                      <input 
                        type="checkbox" 
                        :checked="role.permissions.includes(code)"
                        @change="togglePermission(code)"
                        class="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                      />
                      <div class="flex flex-col">
                        <span class="text-sm font-bold text-[rgb(var(--text-main))]">{{ key.replace('_', ' ') }}</span>
                        <span class="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">{{ code }}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Input } from '@/utils/frappe-ui'
import { defaultRoles, permissions } from '@/data/roles'

const route = useRoute()
const router = useRouter()
const role = ref(null)

onMounted(() => {
  const found = defaultRoles.find(r => r.id === route.params.id)
  if (found) {
    role.ref = JSON.parse(JSON.stringify(found)) // Clone
    role.value = role.ref
  }
})

const togglePermission = (code) => {
  const index = role.value.permissions.indexOf(code)
  if (index > -1) {
    role.value.permissions.splice(index, 1)
  } else {
    role.value.permissions.push(code)
  }
}

const saveRole = () => {
  console.log('[RoleEditor] Saving role changes:', role.value)
  // In a real app, this would be a mock call
  router.back()
}
</script>
