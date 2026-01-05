<template>
  <BaseLayout pageTitle="My Onboarding Checklist">
    <template #body>
      <div v-if="activeWorkflow" class="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Progress Overview -->
        <div class="premium-card p-8 bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none shadow-2xl shadow-blue-600/20">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-2">
                    <h2 class="text-3xl font-black tracking-tight">Welcome, {{ user?.data?.full_name }}!</h2>
                    <p class="text-blue-100 font-medium">Let's get you settled in. Here's your onboarding journey progress.</p>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="relative h-24 w-24">
                        <svg class="h-full w-full" viewBox="0 0 36 36">
                          <circle class="stroke-current text-white/10" stroke-width="3" fill="transparent" r="16" cx="18" cy="18" />
                          <circle class="stroke-current text-white transform -rotate-90 origin-center transition-all duration-1000" stroke-width="3" stroke-dasharray="100" :stroke-dashoffset="100 - activeWorkflow.progress" stroke-linecap="round" fill="transparent" r="16" cx="18" cy="18" />
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center text-xl font-black">{{ activeWorkflow.progress }}%</div>
                    </div>
                    <span class="text-[10px] font-black uppercase tracking-widest text-white/60">Overall Completion</span>
                </div>
            </div>
        </div>

        <!-- Task List -->
        <div class="space-y-4">
            <h3 class="text-xl font-black text-[rgb(var(--text-main))] tracking-tight flex items-center gap-3">
                <div class="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                    <FeatherIcon name="list" class="h-5 w-5" />
                </div>
                Your Tasks
            </h3>
            
            <div class="grid grid-cols-1 gap-4">
                <div 
                    v-for="task in activeWorkflow.tasks" 
                    :key="task.id"
                    class="premium-card p-6 flex flex-col md:flex-row md:items-center gap-6 group hover:ring-2 hover:ring-blue-500/20 transition-all"
                >
                    <div class="flex items-center gap-4 flex-1">
                        <button 
                            @click="toggleTask(task)"
                            class="h-8 w-8 rounded-xl border-2 flex items-center justify-center transition-all"
                            :class="[task.status === 'Completed' ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 dark:border-gray-700 hover:border-blue-500']"
                        >
                            <FeatherIcon v-if="task.status === 'Completed'" name="check" class="h-4 w-4" />
                        </button>
                        <div>
                            <h4 class="font-black text-[rgb(var(--text-main))] transition-colors" :class="[task.status === 'Completed' ? 'line-through text-gray-400' : '']">
                                {{ task.title }}
                            </h4>
                            <div class="flex items-center gap-4 mt-1">
                                <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Owner: {{ task.assigned_to }}</span>
                                <span class="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                    <FeatherIcon name="calendar" class="h-3 w-3" />
                                    Due: {{ task.deadline }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                         <Badge :theme="getStatusTheme(task.status)" variant="subtle" size="sm" class="font-black">{{ task.status }}</Badge>
                         <Button v-if="task.status !== 'Completed'" variant="outline" class="!rounded-xl !p-2">
                             <FeatherIcon name="arrow-right" class="h-4 w-4" />
                         </Button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Help Section -->
        <div class="premium-card p-6 bg-gray-50 dark:bg-gray-700/20 flex flex-col md:flex-row items-center justify-between gap-6 border-dashed border-2">
             <div class="flex items-center gap-4">
                 <div class="p-3 rounded-2xl bg-indigo-100 text-indigo-600">
                    <FeatherIcon name="help-circle" class="h-6 w-6" />
                 </div>
                 <div>
                    <h4 class="font-black text-[rgb(var(--text-main))]">Need assistance?</h4>
                    <p class="text-xs font-bold text-gray-400">Reach out to your HR Buddy, <span class="text-indigo-600">Megha Sharma</span></p>
                 </div>
             </div>
             <Button variant="solid" class="!bg-indigo-600 !text-white !rounded-xl px-6">Chat with HR</Button>
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div class="h-20 w-20 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-300">
              <FeatherIcon name="check-circle" class="h-10 w-10" />
          </div>
          <h2 class="text-2xl font-black text-[rgb(var(--text-main))]">All clear!</h2>
          <p class="text-gray-400 max-w-sm">You don't have any active onboarding or offboarding workflows currently assigned.</p>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge } from '@/utils/frappe-ui'
import { employeeWorkflows } from '@/data/workflows'

const user = inject('$user')
const activeWorkflow = ref(employeeWorkflows[0]) // Mocking first one as belongs to user

const getStatusTheme = (status) => {
    if (status === 'Completed') return 'green'
    if (status === 'In Progress') return 'blue'
    return 'gray'
}

const toggleTask = (task) => {
    task.status = task.status === 'Completed' ? 'In Progress' : 'Completed'
    // Recalculate progress
    const completed = activeWorkflow.value.tasks.filter(t => t.status === 'Completed').length
    activeWorkflow.value.progress = Math.round((completed / activeWorkflow.value.tasks.length) * 100)
}
</script>
