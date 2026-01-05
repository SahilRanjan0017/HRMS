<template>
  <BaseLayout pageTitle="Role Management">
    <template #body>
      <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Header Actions -->
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-black text-[rgb(var(--text-main))] tracking-tight">Roles & Permissions</h1>
            <p class="text-[rgb(var(--text-secondary))] font-medium mt-1">Manage security roles and access scopes across your organization.</p>
          </div>
          <Button variant="solid" class="!bg-blue-600 !text-white !rounded-2xl !font-bold py-6 px-8 shadow-lg shadow-blue-600/20">
            <template #icon>
              <FeatherIcon name="plus" class="h-5 w-5" />
            </template>
            Create Role
          </Button>
        </div>

        <!-- Roles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 
            v-for="role in defaultRoles" 
            :key="role.id"
            class="premium-card p-6 flex flex-col gap-4 group hover:ring-2 hover:ring-blue-500/20 transition-all cursor-pointer"
            @click="editRole(role.id)"
          >
            <div class="flex items-start justify-between">
              <div class="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <FeatherIcon name="shield" class="h-6 w-6" />
              </div>
              <Badge v-if="role.is_system_default" theme="gray" variant="subtle" size="sm">System Default</Badge>
            </div>
            
            <div class="mt-2">
              <h3 class="text-xl font-black text-[rgb(var(--text-main))]">{{ role.name }}</h3>
              <p class="text-sm text-[rgb(var(--text-secondary))] mt-1 font-medium italic">Scope: {{ role.scope }}</p>
              <p class="text-sm text-[rgb(var(--text-secondary))] mt-3 line-clamp-2">
                Provides access to {{ role.permissions.length }} specific permissions across the system.
              </p>
            </div>

            <div class="mt-auto pt-6 flex items-center justify-between border-t border-[rgb(var(--border-color))]">
              <div class="flex -space-x-2">
                <Avatar v-for="i in 3" :key="i" size="sm" class="ring-2 ring-white dark:ring-gray-800" label="User" />
                <div class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-500">
                  +12
                </div>
              </div>
              <Button variant="ghost" class="text-blue-600 !p-2">
                <FeatherIcon name="edit-2" class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge, Avatar } from '@/utils/frappe-ui'
import { defaultRoles } from '@/data/roles'

const router = useRouter()
const __ = inject('$translate')

const editRole = (roleId) => {
  router.push({ name: 'RoleEditor', params: { id: roleId } })
}
</script>
