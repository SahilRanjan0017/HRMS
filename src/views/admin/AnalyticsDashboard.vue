<template>
  <BaseLayout pageTitle="HR Analytics & Insights">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Header -->
        <div class="premium-card p-8 bg-gradient-to-br from-violet-600 to-purple-700 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-black mb-2">Executive Dashboard</h1>
              <p class="text-violet-100">Real-time HR metrics and workforce analytics</p>
            </div>
            <div class="flex gap-3">
              <Button variant="solid" class="!bg-white !text-violet-600 !rounded-xl !font-black">
                <FeatherIcon name="download" class="h-4 w-4 mr-2" /> Export Report
              </Button>
            </div>
          </div>
        </div>

        <!-- Key Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Headcount -->
          <div class="premium-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600">
            <div class="flex items-start justify-between mb-4">
              <div class="p-3 rounded-2xl bg-blue-100 text-blue-600">
                <FeatherIcon name="users" class="h-6 w-6" />
              </div>
              <Badge :theme="hrAnalytics.headcount.trend.startsWith('+') ? 'green' : 'red'" variant="subtle" size="sm">
                {{ hrAnalytics.headcount.trend }}
              </Badge>
            </div>
            <div class="text-3xl font-black text-[rgb(var(--text-main))] mb-1">{{ hrAnalytics.headcount.total }}</div>
            <div class="text-sm font-bold text-gray-500">Total Headcount</div>
            <div class="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800 text-xs font-bold text-gray-400 space-y-1">
              <div>Active: {{ hrAnalytics.headcount.active }}</div>
              <div>New Hires: {{ hrAnalytics.headcount.new_hires_this_month }}</div>
            </div>
          </div>

          <!-- Attrition -->
          <div class="premium-card p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-l-4 border-red-600">
            <div class="flex items-start justify-between mb-4">
              <div class="p-3 rounded-2xl bg-red-100 text-red-600">
                <FeatherIcon name="trending-down" class="h-6 w-6" />
              </div>
              <Badge :theme="hrAnalytics.attrition.trend.startsWith('-') ? 'green' : 'red'" variant="subtle" size="sm">
                {{ hrAnalytics.attrition.trend }}
              </Badge>
            </div>
            <div class="text-3xl font-black text-[rgb(var(--text-main))] mb-1">{{ hrAnalytics.attrition.current_rate }}%</div>
            <div class="text-sm font-bold text-gray-500">Attrition Rate</div>
            <div class="mt-3 pt-3 border-t border-red-200 dark:border-red-800 text-xs font-bold text-gray-400 space-y-1">
              <div>Voluntary: {{ hrAnalytics.attrition.voluntary }}</div>
              <div>Involuntary: {{ hrAnalytics.attrition.involuntary }}</div>
            </div>
          </div>

          <!-- Attendance -->
          <div class="premium-card p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-600">
            <div class="flex items-start justify-between mb-4">
              <div class="p-3 rounded-2xl bg-green-100 text-green-600">
                <FeatherIcon name="check-circle" class="h-6 w-6" />
              </div>
              <Badge theme="green" variant="subtle" size="sm">{{ hrAnalytics.attendance.trend }}</Badge>
            </div>
            <div class="text-3xl font-black text-[rgb(var(--text-main))] mb-1">{{ hrAnalytics.attendance.average_attendance }}%</div>
            <div class="text-sm font-bold text-gray-500">Avg Attendance</div>
            <div class="mt-3 pt-3 border-t border-green-200 dark:border-green-800 text-xs font-bold text-gray-400 space-y-1">
              <div>Late Rate: {{ hrAnalytics.attendance.late_arrivals_rate }}%</div>
              <div>OT Hours: {{ hrAnalytics.attendance.overtime_hours }}</div>
            </div>
          </div>

          <!-- Payroll -->
          <div class="premium-card p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-600">
            <div class="flex items-start justify-between mb-4">
              <div class="p-3 rounded-2xl bg-purple-100 text-purple-600">
                <FeatherIcon name="dollar-sign" class="h-6 w-6" />
              </div>
            </div>
            <div class="text-3xl font-black text-[rgb(var(--text-main))] mb-1">₹{{ (hrAnalytics.payroll.total_cost_this_month / 100000).toFixed(1) }}L</div>
            <div class="text-sm font-bold text-gray-500">Payroll Cost</div>
            <div class="mt-3 pt-3 border-t border-purple-200 dark:border-purple-800 text-xs font-bold text-gray-400 space-y-1">
              <div>Avg Salary: ₹{{ (hrAnalytics.payroll.average_salary / 1000).toFixed(0) }}K</div>
              <div>Compliance: {{ hrAnalytics.payroll.statutory_compliance }}%</div>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Headcount Trend -->
          <div class="premium-card p-6">
            <h3 class="text-lg font-black text-[rgb(var(--text-main))] mb-6 flex items-center gap-3">
              <div class="p-2 rounded-xl bg-blue-100 text-blue-600">
                <FeatherIcon name="trending-up" class="h-5 w-5" />
              </div>
              Headcount Trend (Last 7 Months)
            </h3>
            <div class="h-64 flex items-end justify-between gap-2">
              <div v-for="data in chartData.headcountTrend" :key="data.month" class="flex-1 flex flex-col items-center gap-2">
                <div class="text-xs font-black text-blue-600">{{ data.count }}</div>
                <div class="w-full bg-gradient-to-t from-blue-600 to-indigo-600 rounded-t-lg transition-all duration-1000 hover:scale-105" :style="{ height: (data.count / 150 * 100) + '%' }"></div>
                <div class="text-[10px] font-bold text-gray-400">{{ data.month }}</div>
              </div>
            </div>
          </div>

          <!-- Department Distribution -->
          <div class="premium-card p-6">
            <h3 class="text-lg font-black text-[rgb(var(--text-main))] mb-6 flex items-center gap-3">
              <div class="p-2 rounded-xl bg-purple-100 text-purple-600">
                <FeatherIcon name="pie-chart" class="h-5 w-5" />
              </div>
              Department Distribution
            </h3>
            <div class="space-y-3">
              <div v-for="(count, dept) in hrAnalytics.diversity.department_distribution" :key="dept" class="space-y-1">
                <div class="flex items-center justify-between text-sm">
                  <span class="font-bold text-[rgb(var(--text-main))]">{{ dept }}</span>
                  <span class="font-black text-purple-600">{{ count }}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div class="bg-gradient-to-r from-purple-600 to-pink-600 h-full rounded-full transition-all duration-1000" :style="{ width: (count / 150 * 100) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance & Leave Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="premium-card p-6">
            <h3 class="text-lg font-black text-[rgb(var(--text-main))] mb-4">Performance Overview</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                <div class="text-2xl font-black text-green-600">{{ hrAnalytics.performance.reviews_completed }}%</div>
                <div class="text-xs font-bold text-gray-500 mt-1">Reviews Complete</div>
              </div>
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                <div class="text-2xl font-black text-blue-600">{{ hrAnalytics.performance.average_rating }}</div>
                <div class="text-xs font-bold text-gray-500 mt-1">Avg Rating</div>
              </div>
              <div class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center">
                <div class="text-2xl font-black text-amber-600">{{ hrAnalytics.performance.top_performers }}</div>
                <div class="text-xs font-bold text-gray-500 mt-1">Top Performers</div>
              </div>
              <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
                <div class="text-2xl font-black text-red-600">{{ hrAnalytics.performance.improvement_needed }}</div>
                <div class="text-xs font-bold text-gray-500 mt-1">Need Improvement</div>
              </div>
            </div>
          </div>

          <div class="premium-card p-6">
            <h3 class="text-lg font-black text-[rgb(var(--text-main))] mb-4">Leave Utilization</h3>
            <div class="flex items-center justify-center mb-6">
              <div class="relative h-32 w-32">
                <svg class="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle class="stroke-current text-gray-200 dark:text-gray-700" stroke-width="4" fill="transparent" r="16" cx="18" cy="18" />
                  <circle class="stroke-current text-indigo-600" stroke-width="4" :stroke-dasharray="100" :stroke-dashoffset="100 - hrAnalytics.leave.utilization_rate" stroke-linecap="round" fill="transparent" r="16" cx="18" cy="18" />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center flex-col">
                  <div class="text-2xl font-black text-[rgb(var(--text-main))]">{{ hrAnalytics.leave.utilization_rate }}%</div>
                  <div class="text-[8px] font-bold text-gray-400 uppercase">Utilized</div>
                </div>
              </div>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-gray-500">Pending Requests:</span><span class="font-bold">{{ hrAnalytics.leave.pending_requests }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Approved This Month:</span><span class="font-bold">{{ hrAnalytics.leave.approved_this_month }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Most Used Type:</span><span class="font-bold">{{ hrAnalytics.leave.most_used_type }}</span></div>
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
import { hrAnalytics, chartData } from '@/data/platform_modules'
</script>
