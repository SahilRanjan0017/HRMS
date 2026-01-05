<template>
  <BaseLayout pageTitle="Workflows: Admin Console">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-black text-[rgb(var(--text-main))] tracking-tight">Workflow Templates</h1>
            <p class="text-[rgb(var(--text-secondary))] font-medium mt-1">Configure automated checklists for joining and exiting employees.</p>
          </div>
          <div class="flex items-center gap-3">
             <Button variant="solid" class="!bg-blue-600 !text-white !rounded-xl !font-bold py-6 px-6 shadow-lg shadow-blue-600/20" @click="isNewTemplateModalOpen = true">
              <template #icon><FeatherIcon name="plus" class="h-4 w-4" /></template>
              Create Template
            </Button>
          </div>
        </div>

        <!-- Tabs for Template Type -->
        <div class="flex items-center gap-2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit">
            <button 
                v-for="type in ['Onboarding', 'Offboarding']" 
                :key="type"
                @click="activeType = type"
                class="px-6 py-2 rounded-xl text-sm font-black transition-all"
                :class="[activeType === type ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900']"
            >
                {{ type }}
            </button>
        </div>

        <!-- Templates Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
                v-for="tpl in filteredTemplates" 
                :key="tpl.id"
                class="premium-card p-6 flex flex-col gap-4 group hover:ring-2 hover:ring-blue-500/20 transition-all cursor-pointer"
            >
                <div class="flex items-start justify-between">
                    <div class="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <FeatherIcon :name="tpl.type === 'Onboarding' ? 'user-plus' : 'user-minus'" class="h-6 w-6" />
                    </div>
                    <Badge theme="blue" variant="subtle" size="sm" class="font-black">{{ tpl.tasks_count }} Tasks</Badge>
                </div>
                
                <div class="space-y-1">
                    <h3 class="text-lg font-black text-[rgb(var(--text-main))] group-hover:text-blue-600 transition-colors">{{ tpl.name }}</h3>
                    <p class="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed">
                        {{ tpl.description }}
                    </p>
                </div>

                <div class="pt-4 border-t border-[rgb(var(--border-color))] flex items-center justify-between">
                     <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Updated: {{ tpl.last_updated }}</span>
                     <div class="flex gap-2">
                         <Button variant="ghost" class="!p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"><FeatherIcon name="edit-2" class="h-4 w-4" /></Button>
                         <Button variant="ghost" class="!p-1.5 rounded-lg text-red-500 hover:bg-red-50"><FeatherIcon name="trash-2" class="h-4 w-4" /></Button>
                     </div>
                </div>
            </div>
        </div>

        <!-- Active Workflows Tracking -->
        <div class="mt-12 space-y-6">
            <h2 class="text-2xl font-black text-[rgb(var(--text-main))] tracking-tight">Track Progress</h2>
            <div class="premium-card overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50/50 dark:bg-gray-700/30 border-b border-[rgb(var(--border-color))]">
                            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Employee</th>
                            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Template</th>
                            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Progress</th>
                            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-[rgb(var(--border-color))]">
                        <tr v-for="wf in employeeWorkflows" :key="wf.id" class="hover:bg-gray-50/50 transition-colors">
                            <td class="px-6 py-5">
                                <div class="font-bold text-[rgb(var(--text-main))]">Sameer Kumar</div>
                                <div class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{{ wf.employee_id }}</div>
                            </td>
                            <td class="px-6 py-5">
                                <div class="text-sm font-medium">{{ getTemplateName(wf.template_id) }}</div>
                            </td>
                            <td class="px-6 py-5">
                                <div class="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden max-w-[150px]">
                                    <div class="bg-blue-600 h-full rounded-full transition-all duration-1000" :style="{ width: wf.progress + '%' }"></div>
                                </div>
                                <span class="text-[10px] font-black text-blue-600 mt-1 block">{{ wf.progress }}% Complete</span>
                            </td>
                            <td class="px-6 py-5 text-right">
                                <Button variant="outline" class="!rounded-xl" @click="router.push(`/admin/workflows/details/${wf.id}`)">View Details</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge } from '@/utils/frappe-ui'
import { workflowTemplates, employeeWorkflows } from '@/data/workflows'

const router = useRouter()
const activeType = ref('Onboarding')
const isNewTemplateModalOpen = ref(false)

const filteredTemplates = computed(() => {
    return workflowTemplates.filter(t => t.type === activeType.value)
})

const getTemplateName = (id) => {
    return workflowTemplates.find(t => t.id === id)?.name || id
}
</script>
