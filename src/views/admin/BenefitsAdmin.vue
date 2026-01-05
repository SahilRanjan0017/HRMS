<template>
  <BaseLayout pageTitle="Benefits & Reimbursements">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Benefit Plans -->
        <div class="premium-card p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-black text-[rgb(var(--text-main))]">Active Benefit Plans</h2>
            <Button variant="solid" class="!bg-teal-600 !text-white !rounded-xl"><FeatherIcon name="plus" class="h-4 w-4 mr-2" /> Add Plan</Button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="plan in benefitPlans" :key="plan.id" class="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl border border-teal-100 dark:border-teal-800">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="font-black text-[rgb(var(--text-main))] text-lg">{{ plan.name }}</h3>
                  <Badge theme="teal" variant="subtle" size="sm" class="mt-1">{{ plan.type }}</Badge>
                </div>
                <div class="text-2xl">{{ plan.type === 'Insurance' ? '🏥' : '💰' }}</div>
              </div>
              <div class="space-y-2 text-sm">
                <div v-if="plan.coverage" class="flex justify-between"><span class="text-gray-500">Coverage:</span><span class="font-bold">{{ plan.coverage }}</span></div>
                <div v-if="plan.amount" class="flex justify-between"><span class="text-gray-500">Amount:</span><span class="font-bold">₹{{ plan.amount }}/{{ plan.frequency }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Enrolled:</span><span class="font-bold text-teal-600">{{ plan.enrolled_employees }} employees</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reimbursement Claims -->
        <div class="premium-card overflow-hidden">
          <div class="p-6 border-b border-[rgb(var(--border-color))] flex items-center justify-between">
            <h2 class="text-xl font-black text-[rgb(var(--text-main))]">Recent Claims</h2>
            <div class="flex gap-2">
              <Badge theme="yellow" variant="subtle">{{ reimbursementClaims.filter(c => c.status === 'Pending').length }} Pending</Badge>
              <Badge theme="green" variant="subtle">{{ reimbursementClaims.filter(c => c.status === 'Approved').length }} Approved</Badge>
            </div>
          </div>
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 dark:bg-gray-700/30 border-b border-[rgb(var(--border-color))]">
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Employee</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Type</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Amount</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Date</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Status</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[rgb(var(--border-color))]">
              <tr v-for="claim in reimbursementClaims" :key="claim.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-5">
                  <div class="font-bold text-[rgb(var(--text-main))]">{{ getEmployeeName(claim.employee_id) }}</div>
                  <div class="text-xs text-gray-400">{{ claim.employee_id }}</div>
                </td>
                <td class="px-6 py-5">
                  <div class="font-bold text-sm">{{ getReimbursementTypeName(claim.type) }}</div>
                  <div class="text-xs text-gray-400">{{ claim.description }}</div>
                </td>
                <td class="px-6 py-5 font-mono font-bold text-teal-600">₹{{ claim.amount.toLocaleString() }}</td>
                <td class="px-6 py-5 text-sm">{{ claim.date }}</td>
                <td class="px-6 py-5">
                  <Badge :theme="claim.status === 'Approved' ? 'green' : claim.status === 'Pending' ? 'yellow' : 'red'" variant="subtle">{{ claim.status }}</Badge>
                </td>
                <td class="px-6 py-5 text-right">
                  <div v-if="claim.status === 'Pending'" class="flex justify-end gap-2">
                    <Button variant="solid" class="!bg-green-600 !text-white !rounded-xl px-4">Approve</Button>
                    <Button variant="outline" class="!rounded-xl px-4">Reject</Button>
                  </div>
                  <Button v-else variant="ghost" class="!rounded-xl"><FeatherIcon name="eye" class="h-4 w-4" /></Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Reimbursement Types -->
        <div class="premium-card p-6">
          <h3 class="text-lg font-black text-[rgb(var(--text-main))] mb-4">Reimbursement Policies</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="type in reimbursementTypes" :key="type.code" class="p-4 bg-gray-50 dark:bg-gray-700/20 rounded-xl">
              <div class="font-bold text-[rgb(var(--text-main))] mb-2">{{ type.name }}</div>
              <div class="text-xs text-gray-500 space-y-1">
                <div v-if="type.max_per_year">Max/Year: ₹{{ type.max_per_year.toLocaleString() }}</div>
                <div v-if="type.max_per_claim">Max/Claim: ₹{{ type.max_per_claim.toLocaleString() }}</div>
                <div v-if="type.max_per_month">Max/Month: ₹{{ type.max_per_month.toLocaleString() }}</div>
                <Badge :theme="type.requires_bill ? 'red' : 'green'" variant="subtle" size="sm">{{ type.requires_bill ? 'Bill Required' : 'No Bill' }}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge } from '@/utils/frappe-ui'
import { benefitPlans, reimbursementClaims, reimbursementTypes } from '@/data/extended_modules'
import { employeeMasterData } from '@/data/employee_master'

const getEmployeeName = (id) => employeeMasterData.find(e => e.id === id)?.name || id
const getReimbursementTypeName = (code) => reimbursementTypes.find(t => t.code === code)?.name || code
</script>
