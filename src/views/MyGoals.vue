<template>
  <BaseLayout pageTitle="My Goals & Performance">
    <template #body>
      <div class="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Current Cycle Info -->
        <div class="premium-card p-8 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
          <h2 class="text-2xl font-black mb-2">{{ activeCycle?.name }}</h2>
          <p class="text-purple-100">{{ activeCycle?.period }}</p>
          <div class="mt-6 flex items-center gap-8">
            <div>
              <div class="text-3xl font-black">{{ employeeGoals.length }}</div>
              <div class="text-xs uppercase tracking-widest text-purple-200">Active Goals</div>
            </div>
            <div>
              <div class="text-3xl font-black">{{ Math.round(employeeGoals.reduce((sum, g) => sum + g.progress, 0) / employeeGoals.length) }}%</div>
              <div class="text-xs uppercase tracking-widest text-purple-200">Avg Progress</div>
            </div>
          </div>
        </div>

        <!-- Goals List -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-black text-[rgb(var(--text-main))]">My Goals</h3>
            <Button variant="solid" class="!bg-purple-600 !text-white !rounded-xl"><FeatherIcon name="plus" class="h-4 w-4 mr-2" /> Add Goal</Button>
          </div>
          
          <div class="grid grid-cols-1 gap-4">
            <div v-for="goal in employeeGoals" :key="goal.id" class="premium-card p-6 hover:ring-2 hover:ring-purple-500/20 transition-all">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h4 class="font-black text-[rgb(var(--text-main))] text-lg">{{ goal.title }}</h4>
                    <Badge theme="purple" variant="subtle" size="sm">{{ goal.weight }}%</Badge>
                  </div>
                  <p class="text-sm text-gray-500 mb-3">{{ goal.description }}</p>
                  <div class="flex items-center gap-4 text-xs font-bold text-gray-400">
                    <span class="flex items-center gap-1"><FeatherIcon name="tag" class="h-3 w-3" /> {{ goal.category }}</span>
                    <span class="flex items-center gap-1"><FeatherIcon name="calendar" class="h-3 w-3" /> Due: {{ goal.target_date }}</span>
                  </div>
                </div>
                <Badge :theme="goal.status === 'Completed' ? 'green' : 'blue'" variant="subtle">{{ goal.status }}</Badge>
              </div>
              
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs font-bold">
                  <span class="text-gray-400">Progress</span>
                  <span class="text-purple-600">{{ goal.progress }}%</span>
                </div>
                <div class="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div class="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full transition-all duration-1000" :style="{ width: goal.progress + '%' }"></div>
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
import { performanceCycles, employeeGoals } from '@/data/performance'

const activeCycle = ref(performanceCycles.find(c => c.status === 'Active'))
</script>
