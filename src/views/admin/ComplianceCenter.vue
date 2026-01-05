<template>
  <BaseLayout pageTitle="Compliance Center">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Header -->
        <div class="premium-card p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-600">
          <div class="flex items-center gap-4">
            <div class="text-4xl">⚖️</div>
            <div>
              <h2 class="text-xl font-black text-[rgb(var(--text-main))]">Compliance & Policy Management</h2>
              <p class="text-sm text-gray-500 mt-1">Manage company policies, track acknowledgments, and monitor document expiries</p>
            </div>
          </div>
        </div>

        <!-- Company Policies -->
        <div class="premium-card p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-black text-[rgb(var(--text-main))]">Company Policies</h3>
            <Button variant="solid" class="!bg-amber-600 !text-white !rounded-xl"><FeatherIcon name="plus" class="h-4 w-4 mr-2" /> Publish Policy</Button>
          </div>
          <div class="space-y-4">
            <div v-for="policy in compliancePolicies" :key="policy.id" class="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h4 class="font-black text-[rgb(var(--text-main))] text-lg">{{ policy.name }}</h4>
                    <Badge :theme="policy.mandatory ? 'red' : 'blue'" variant="subtle" size="sm">
                      {{ policy.mandatory ? 'Mandatory' : 'Optional' }}
                    </Badge>
                    <Badge theme="gray" variant="subtle" size="sm">v{{ policy.version }}</Badge>
                  </div>
                  <div class="flex items-center gap-4 text-xs font-bold text-gray-400">
                    <span class="flex items-center gap-1"><FeatherIcon name="tag" class="h-3 w-3" /> {{ policy.category }}</span>
                    <span class="flex items-center gap-1"><FeatherIcon name="calendar" class="h-3 w-3" /> Published: {{ policy.published_date }}</span>
                  </div>
                  <div v-if="policy.acknowledgment_required" class="mt-3">
                    <div class="flex items-center justify-between text-xs font-bold mb-1">
                      <span class="text-gray-400">Acknowledgment Progress</span>
                      <span :class="[policy.acknowledged_by === policy.total_employees ? 'text-green-600' : 'text-amber-600']">
                        {{ policy.acknowledged_by }} / {{ policy.total_employees }}
                      </span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div class="bg-gradient-to-r from-amber-600 to-orange-600 h-full rounded-full transition-all duration-1000" :style="{ width: (policy.acknowledged_by / policy.total_employees * 100) + '%' }"></div>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <Button variant="outline" class="!rounded-xl"><FeatherIcon name="eye" class="h-4 w-4 mr-2" /> View</Button>
                  <Button variant="outline" class="!rounded-xl"><FeatherIcon name="download" class="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Document Expiry Tracking -->
        <div class="premium-card overflow-hidden">
          <div class="p-6 border-b border-[rgb(var(--border-color))]">
            <h3 class="text-lg font-black text-[rgb(var(--text-main))]">Document Expiry Tracking</h3>
          </div>
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 dark:bg-gray-700/30 border-b border-[rgb(var(--border-color))]">
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Employee</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Document Type</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Expiry Date</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Status</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[rgb(var(--border-color))]">
              <tr v-for="doc in complianceDocuments" :key="doc.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-5">
                  <div class="font-bold text-[rgb(var(--text-main))]">{{ getEmployeeName(doc.employee_id) }}</div>
                  <div class="text-xs text-gray-400">{{ doc.employee_id }}</div>
                </td>
                <td class="px-6 py-5 font-bold">{{ doc.type }}</td>
                <td class="px-6 py-5 text-sm">{{ doc.expiry_date || 'No Expiry' }}</td>
                <td class="px-6 py-5">
                  <Badge :theme="doc.status === 'Valid' ? 'green' : doc.status === 'Expiring Soon' ? 'yellow' : 'red'" variant="subtle">
                    {{ doc.status }}
                  </Badge>
                </td>
                <td class="px-6 py-5 text-right">
                  <Button variant="ghost" class="!rounded-xl"><FeatherIcon name="eye" class="h-4 w-4" /></Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Compliance Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="premium-card p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <div class="text-3xl font-black text-green-600 mb-2">{{ compliancePolicies.filter(p => p.acknowledged_by === p.total_employees).length }}</div>
            <div class="text-sm font-bold text-gray-500">Fully Acknowledged</div>
          </div>
          <div class="premium-card p-6 text-center bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
            <div class="text-3xl font-black text-amber-600 mb-2">{{ complianceDocuments.filter(d => d.status === 'Expiring Soon').length }}</div>
            <div class="text-sm font-bold text-gray-500">Expiring Soon</div>
          </div>
          <div class="premium-card p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div class="text-3xl font-black text-blue-600 mb-2">100%</div>
            <div class="text-sm font-bold text-gray-500">Compliance Rate</div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge } from '@/utils/frappe-ui'
import { compliancePolicies, complianceDocuments } from '@/data/platform_modules'
import { employeeMasterData } from '@/data/employee_master'

const getEmployeeName = (id) => employeeMasterData.find(e => e.id === id)?.name || id
</script>
