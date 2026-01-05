<template>
  <BaseLayout pageTitle="Attendance: Admin Console">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Stats Overview -->
        <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div v-for="(val, key) in stats" :key="key" class="premium-card p-5 text-center group hover:scale-105 transition-transform">
            <div class="text-2xl font-black text-blue-600">{{ val }}</div>
            <div class="text-[9px] uppercase font-black tracking-widest text-gray-400 mt-1">{{ key.replace('_', ' ') }}</div>
          </div>
        </div>

        <!-- Attendance Table -->
        <div class="premium-card overflow-hidden">
          <div class="p-6 border-b border-[rgb(var(--border-color))] flex items-center justify-between">
            <h2 class="text-xl font-black text-[rgb(var(--text-main))]">Today's Attendance</h2>
            <div class="flex gap-3">
              <Button variant="outline" class="!rounded-xl"><FeatherIcon name="download" class="h-4 w-4 mr-2" /> Export</Button>
              <Button variant="solid" class="!bg-blue-600 !text-white !rounded-xl"><FeatherIcon name="upload" class="h-4 w-4 mr-2" /> Import</Button>
            </div>
          </div>
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 dark:bg-gray-700/30 border-b border-[rgb(var(--border-color))]">
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Employee</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Shift</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Check In</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Check Out</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Hours</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[rgb(var(--border-color))]">
              <tr v-for="log in attendanceLogs" :key="log.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-5">
                  <div class="font-bold text-[rgb(var(--text-main))]">{{ getEmployeeName(log.employee_id) }}</div>
                  <div class="text-[10px] text-gray-400 font-bold uppercase">{{ log.employee_id }}</div>
                </td>
                <td class="px-6 py-5 text-sm">{{ getShiftName(log.shift_id) }}</td>
                <td class="px-6 py-5 text-sm font-mono">{{ log.check_in || '--' }}</td>
                <td class="px-6 py-5 text-sm font-mono">{{ log.check_out || '--' }}</td>
                <td class="px-6 py-5 text-sm font-bold">{{ log.hours_worked.toFixed(2) }}h</td>
                <td class="px-6 py-5">
                  <Badge :theme="getStatusTheme(log.status)" variant="subtle" size="sm">{{ log.status }}</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Exceptions -->
        <div class="premium-card p-6">
          <h3 class="text-lg font-black text-[rgb(var(--text-main))] mb-4">Pending Exceptions</h3>
          <div class="space-y-3">
            <div v-for="exc in attendanceExceptions.filter(e => e.status === 'Pending')" :key="exc.id" class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/20 rounded-xl">
              <div>
                <div class="font-bold text-[rgb(var(--text-main))]">{{ exc.type }} - {{ exc.employee_id }}</div>
                <div class="text-xs text-gray-400">{{ exc.date }}</div>
              </div>
              <div class="flex gap-2">
                <Button variant="solid" class="!bg-green-600 !text-white !rounded-xl px-4">Approve</Button>
                <Button variant="outline" class="!rounded-xl px-4">Reject</Button>
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
import { attendanceLogs, attendanceExceptions, attendanceStats, shifts } from '@/data/attendance_extended'
import { employeeMasterData } from '@/data/employee_master'

const stats = ref(attendanceStats)

const getEmployeeName = (id) => employeeMasterData.find(e => e.id === id)?.name || id
const getShiftName = (id) => shifts.find(s => s.id === id)?.name || id
const getStatusTheme = (status) => {
  if (status === 'Present') return 'green'
  if (status === 'Late') return 'yellow'
  if (status === 'Absent') return 'red'
  return 'gray'
}
</script>
