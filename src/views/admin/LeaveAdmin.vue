<template>
  <BaseLayout pageTitle="Leave: Admin Console">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(val, key) in stats" :key="key" class="premium-card p-5 text-center">
            <div class="text-2xl font-black text-indigo-600">{{ val }}</div>
            <div class="text-[9px] uppercase font-black tracking-widest text-gray-400 mt-1">{{ key.replace('_', ' ') }}</div>
          </div>
        </div>

        <!-- Leave Policies -->
        <div class="premium-card p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-black text-[rgb(var(--text-main))]">Leave Policies</h2>
            <Button variant="solid" class="!bg-indigo-600 !text-white !rounded-xl"><FeatherIcon name="plus" class="h-4 w-4 mr-2" /> Add Policy</Button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="policy in leavePolicies" :key="policy.id" class="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-black text-[rgb(var(--text-main))]">{{ policy.name }}</h3>
                <Badge theme="indigo" variant="subtle" size="sm">{{ policy.code }}</Badge>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between"><span class="text-gray-500">Annual Quota:</span><span class="font-bold">{{ policy.annual_quota }} days</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Carry Forward:</span><span class="font-bold">{{ policy.carry_forward ? 'Yes' : 'No' }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Encashable:</span><span class="font-bold">{{ policy.encashable ? 'Yes' : 'No' }}</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Holiday Calendar -->
        <div class="premium-card p-6">
          <h2 class="text-xl font-black text-[rgb(var(--text-main))] mb-4">Holiday Calendar 2024</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="holiday in holidayCalendar" :key="holiday.date" class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/20 rounded-xl">
              <div class="p-3 rounded-xl bg-red-100 text-red-600 font-black text-center min-w-[60px]">
                <div class="text-xs">{{ new Date(holiday.date).toLocaleDateString('en-US', { month: 'short' }) }}</div>
                <div class="text-2xl">{{ new Date(holiday.date).getDate() }}</div>
              </div>
              <div>
                <div class="font-bold text-[rgb(var(--text-main))]">{{ holiday.name }}</div>
                <Badge theme="red" variant="subtle" size="sm">{{ holiday.type }}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge } from '@/utils/frappe-ui'
import { leavePolicies, holidayCalendar, leaveStats } from '@/data/leave_extended'

const stats = ref(leaveStats)
</script>
