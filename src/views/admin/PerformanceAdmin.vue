<template>
  <BaseLayout pageTitle="Performance: Admin Console">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(val, key) in stats" :key="key" class="premium-card p-5 text-center">
            <div class="text-2xl font-black text-purple-600">{{ val }}</div>
            <div class="text-[9px] uppercase font-black tracking-widest text-gray-400 mt-1">{{ key.replace('_', ' ') }}</div>
          </div>
        </div>

        <!-- Performance Cycles -->
        <div class="premium-card p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-black text-[rgb(var(--text-main))]">Performance Cycles</h2>
            <Button variant="solid" class="!bg-purple-600 !text-white !rounded-xl"><FeatherIcon name="plus" class="h-4 w-4 mr-2" /> Create Cycle</Button>
          </div>
          <div class="space-y-4">
            <div v-for="cycle in performanceCycles" :key="cycle.id" class="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-100 dark:border-purple-800">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="text-lg font-black text-[rgb(var(--text-main))]">{{ cycle.name }}</h3>
                    <Badge :theme="cycle.status === 'Active' ? 'green' : 'gray'" variant="subtle">{{ cycle.status }}</Badge>
                  </div>
                  <p class="text-sm text-gray-500 font-medium">{{ cycle.period }}</p>
                  <div class="flex items-center gap-6 mt-3 text-xs font-bold text-gray-400">
                    <span>{{ cycle.participants }} Participants</span>
                    <span>{{ cycle.completed_reviews }} Reviews Completed</span>
                    <span>Deadline: {{ cycle.review_deadline }}</span>
                  </div>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <div class="relative h-20 w-20">
                    <svg class="h-full w-full" viewBox="0 0 36 36">
                      <circle class="stroke-current text-gray-200 dark:text-gray-700" stroke-width="3" fill="transparent" r="16" cx="18" cy="18" />
                      <circle class="stroke-current text-purple-600 transform -rotate-90 origin-center" stroke-width="3" :stroke-dasharray="100" :stroke-dashoffset="100 - (cycle.completed_reviews / cycle.participants * 100)" stroke-linecap="round" fill="transparent" r="16" cx="18" cy="18" />
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center text-sm font-black">{{ Math.round(cycle.completed_reviews / cycle.participants * 100) }}%</div>
                  </div>
                  <Button variant="outline" class="!rounded-xl">View Details</Button>
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
import { ref } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge } from '@/utils/frappe-ui'
import { performanceCycles, performanceStats } from '@/data/performance'

const stats = ref(performanceStats)
</script>
