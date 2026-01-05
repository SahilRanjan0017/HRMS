<template>
  <BaseLayout pageTitle="Recruitment: Candidate Pipeline">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <Button variant="ghost" class="!p-2" @click="router.back()">
              <FeatherIcon name="arrow-left" class="h-5 w-5" />
            </Button>
            <div>
              <h1 class="text-3xl font-black text-[rgb(var(--text-main))] tracking-tight">Pipeline: {{ job?.title || 'Candidates' }}</h1>
              <p class="text-[rgb(var(--text-secondary))] font-medium mt-1">Track and move candidates through different hiring stages.</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
             <Button variant="outline" class="!rounded-xl px-4 py-6 font-bold">
              <template #icon><FeatherIcon name="filter" class="h-4 w-4" /></template>
              Filter
            </Button>
            <Button variant="solid" class="!bg-blue-600 !text-white !rounded-xl !font-bold py-6 px-6 shadow-lg shadow-blue-600/20">
              <template #icon><FeatherIcon name="user-plus" class="h-4 w-4" /></template>
              Add Candidate
            </Button>
          </div>
        </div>

        <!-- Kanban Board -->
        <div class="flex-1 overflow-x-auto pb-8 -mx-4 px-4 mask-fade-right">
          <div class="flex gap-6 h-full min-w-max">
            <!-- Stages -->
            <div v-for="stage in stages" :key="stage" class="w-80 flex flex-col gap-4">
              <div class="flex items-center justify-between px-2">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></span>
                    <h3 class="text-sm font-black uppercase tracking-widest text-[rgb(var(--text-main))]">{{ stage }}</h3>
                </div>
                <span class="text-xs font-black text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-lg">{{ getCandidatesByStage(stage).length }}</span>
              </div>

              <!-- Candidate Cards -->
              <div class="flex-1 space-y-4 bg-gray-50/50 dark:bg-gray-700/20 p-4 rounded-[2rem] border border-[rgb(var(--border-color))] min-h-[400px]">
                <div 
                    v-for="candidate in getCandidatesByStage(stage)" 
                    :key="candidate.id"
                    class="premium-card p-5 group hover:ring-2 hover:ring-blue-500/20 transition-all cursor-grab active:cursor-grabbing hover:scale-[1.02]"
                >
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <Avatar :label="candidate.name" size="md" class="rounded-xl ring-2 ring-white dark:ring-gray-800" />
                            <div>
                                <h4 class="font-black text-[rgb(var(--text-main))] text-sm">{{ candidate.name }}</h4>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{{ candidate.id }}</p>
                            </div>
                        </div>
                        <div v-if="candidate.rating" class="flex items-center gap-1 text-amber-500">
                             <FeatherIcon name="star" class="h-3 w-3 fill-current" />
                             <span class="text-[10px] font-black">{{ candidate.rating }}</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 mb-4">
                        <Badge theme="blue" variant="subtle" size="sm" class="text-[9px]">{{ candidate.stage }}</Badge>
                        <span class="text-[9px] font-bold text-gray-400">{{ dayjs(candidate.applied_date).fromNow() }}</span>
                    </div>

                    <div class="flex items-center justify-between pt-4 border-t border-[rgb(var(--border-color))]">
                        <div class="flex -space-x-2">
                            <div class="w-6 h-6 rounded-full bg-blue-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-[8px] text-white font-black">SR</div>
                             <div class="w-6 h-6 rounded-full bg-indigo-500 border-2 border-white dark:border-gray-800 flex items-center justify-center text-[8px] text-white font-black">AK</div>
                        </div>
                        <Button variant="ghost" class="!p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <FeatherIcon name="more-horizontal" class="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div v-if="getCandidatesByStage(stage).length === 0" class="flex flex-col items-center justify-center h-40 border-2 border-dashed border-[rgb(var(--border-color))] rounded-3xl text-gray-400">
                    <FeatherIcon name="inbox" class="h-8 w-8 mb-2 opacity-20" />
                    <span class="text-xs font-bold uppercase tracking-widest opacity-40">No Candidates</span>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge, Avatar } from '@/utils/frappe-ui'
import { jobRequisitions, candidatePipeline } from '@/data/recruitment'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const route = useRoute()
const router = useRouter()

const job = ref(null)
const stages = ['Applied', 'Shortlisted', 'Interview', 'Offered', 'Rejected']

const getCandidatesByStage = (status) => {
    return candidatePipeline.filter(c => c.status === status && (job.value ? c.job_id === job.value.id : true))
}

onMounted(() => {
    const jobId = route.params.jobId
    if (jobId) {
        job.value = jobRequisitions.find(j => j.id === jobId)
    }
})
</script>

<style scoped>
.mask-fade-right {
  mask-image: linear-gradient(to right, black 90%, transparent 100%);
}
</style>
