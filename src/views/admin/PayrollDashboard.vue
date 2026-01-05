<template>
  <BaseLayout pageTitle="Payroll: Processing Dashboard">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Header -->
        <div class="premium-card p-8 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 class="text-3xl font-black">Payroll Processing</h1>
              <p class="text-emerald-100 mt-2">Manage salary runs, statutory compliance, and disbursements</p>
            </div>
            <Button variant="solid" class="!bg-white !text-emerald-600 !rounded-xl !font-black px-8 py-6 shadow-xl">
              <FeatherIcon name="play" class="h-5 w-5 mr-2" /> Run Payroll
            </Button>
          </div>
        </div>

        <!-- Payroll Runs -->
        <div class="premium-card overflow-hidden">
          <div class="p-6 border-b border-[rgb(var(--border-color))]">
            <h2 class="text-xl font-black text-[rgb(var(--text-main))]">Payroll History</h2>
          </div>
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 dark:bg-gray-700/30 border-b border-[rgb(var(--border-color))]">
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Period</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Employees</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Gross</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Deductions</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Net Pay</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[rgb(var(--border-color))]">
              <tr v-for="run in payrollRuns" :key="run.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-5">
                  <div class="font-bold text-[rgb(var(--text-main))]">{{ run.month }}</div>
                  <div class="text-xs text-gray-400">{{ run.id }}</div>
                </td>
                <td class="px-6 py-5 font-bold">{{ run.employee_count }}</td>
                <td class="px-6 py-5 font-mono text-sm">₹{{ (run.total_gross / 100000).toFixed(2) }}L</td>
                <td class="px-6 py-5 font-mono text-sm text-red-600">₹{{ (run.total_deductions / 100000).toFixed(2) }}L</td>
                <td class="px-6 py-5 font-mono text-sm font-black text-green-600">₹{{ (run.total_net / 100000).toFixed(2) }}L</td>
                <td class="px-6 py-5">
                  <Badge :theme="run.status === 'Locked' ? 'gray' : 'green'" variant="subtle">{{ run.status }}</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Statutory Components -->
        <div class="premium-card p-6">
          <h2 class="text-xl font-black text-[rgb(var(--text-main))] mb-4">Statutory Components</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="comp in payrollComponents.filter(c => c.statutory)" :key="comp.code" class="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
              <div class="font-black text-[rgb(var(--text-main))] mb-1">{{ comp.name }}</div>
              <div class="text-xs text-gray-500">{{ comp.code }} • {{ comp.type }}</div>
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
import { payrollRuns, payrollComponents } from '@/data/payroll'
</script>
