<template>
  <BaseLayout pageTitle="Recruitment: Job Manager">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-black text-[rgb(var(--text-main))] tracking-tight">Active Requisitions</h1>
            <p class="text-[rgb(var(--text-secondary))] font-medium mt-1">Create and manage job postings for your organization.</p>
          </div>
          <div class="flex items-center gap-3">
             <Button variant="solid" class="!bg-blue-600 !text-white !rounded-xl !font-bold py-6 px-6 shadow-lg shadow-blue-600/20" @click="isNewJobModalOpen = true">
              <template #icon><FeatherIcon name="plus" class="h-4 w-4" /></template>
              Create Job
            </Button>
          </div>
        </div>

        <!-- Recruitment Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div v-for="(val, label) in stats" :key="label" class="premium-card p-6 flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform cursor-pointer">
            <div class="text-3xl font-black text-blue-600 mb-1">{{ val }}</div>
            <div class="text-[10px] uppercase font-black tracking-widest text-gray-400 group-hover:text-blue-500 transition-colors">{{ label.replace('_', ' ') }}</div>
          </div>
        </div>

        <!-- Job List -->
        <div class="grid grid-cols-1 gap-6">
          <div 
            v-for="job in jobRequisitions" 
            :key="job.id" 
            class="premium-card p-8 flex flex-col md:flex-row items-center gap-8 group hover:ring-2 hover:ring-blue-500/20 transition-all cursor-pointer"
            @click="viewPipeline(job.id)"
          >
            <div class="p-5 rounded-[2rem] bg-gray-50 dark:bg-gray-700/50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              <FeatherIcon name="briefcase" class="h-8 w-8" />
            </div>
            
            <div class="flex-1 space-y-2 text-center md:text-left">
              <div class="flex flex-col md:flex-row md:items-center gap-3">
                <h3 class="text-xl font-black text-[rgb(var(--text-main))]">{{ job.title }}</h3>
                <Badge :theme="job.status === 'Open' ? 'green' : 'gray'" variant="subtle" size="sm">{{ job.status }}</Badge>
              </div>
              <p class="text-sm font-bold text-[rgb(var(--text-secondary))]">{{ job.department }} • {{ job.location }} • {{ job.type }}</p>
              <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                <span class="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{{ job.experience }}</span>
                <span class="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{{ job.salary_range }}</span>
              </div>
            </div>

            <div class="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
              <div class="text-center md:text-right">
                <div class="text-2xl font-black text-blue-600">{{ job.applications_count }}</div>
                <div class="text-[10px] font-black uppercase tracking-widest text-gray-400">Applications</div>
              </div>
              <Button variant="outline" class="!rounded-xl px-8 w-full md:w-auto py-5 font-black group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all">
                View Pipeline
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- New Job Modal (Simplified) -->
      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <div v-if="isNewJobModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div class="premium-card bg-white dark:bg-gray-800 w-full max-w-2xl overflow-hidden shadow-2xl">
            <div class="p-6 border-b border-[rgb(var(--border-color))] flex items-center justify-between">
              <h2 class="text-2xl font-black text-[rgb(var(--text-main))] tracking-tight">Post New Position</h2>
              <Button variant="ghost" class="!p-2" @click="isNewJobModalOpen = false">
                <FeatherIcon name="x" class="h-5 w-5" />
              </Button>
            </div>
            
            <div class="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
               <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-gray-400">Job Title</label>
                    <input type="text" v-model="newJob.title" class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Backend Engineer" />
                  </div>
                   <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-gray-400">Department</label>
                    <select v-model="newJob.department" class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>Engineering</option>
                      <option>Product</option>
                      <option>Design</option>
                      <option>Human Resources</option>
                    </select>
                  </div>
                   <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-gray-400">Job Type</label>
                    <select v-model="newJob.type" class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>Full-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-gray-400">Location</label>
                    <input type="text" v-model="newJob.location" class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Remote" />
                  </div>
               </div>
               <div class="space-y-2">
                  <label class="text-xs font-black uppercase tracking-widest text-gray-400">Description</label>
                  <textarea v-model="newJob.description" rows="4" class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter job responsibilities..."></textarea>
               </div>
            </div>

            <div class="p-6 bg-gray-50 dark:bg-gray-700/30 flex items-center justify-end gap-3 px-8">
               <Button variant="outline" class="!rounded-xl px-6" @click="isNewJobModalOpen = false">Discard</Button>
               <Button variant="solid" class="!bg-blue-600 !text-white !rounded-xl px-12 py-6 font-black shadow-xl shadow-blue-600/20" @click="saveJob">Publish Job</Button>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge } from '@/utils/frappe-ui'
import { jobRequisitions, recruitmentStats } from '@/data/recruitment'

const router = useRouter()
const stats = ref(recruitmentStats)
const isNewJobModalOpen = ref(false)

const newJob = ref({
  title: '',
  department: 'Engineering',
  type: 'Full-time',
  location: '',
  description: '',
  status: 'Open',
  applications_count: 0
})

const viewPipeline = (jobId) => {
  router.push(`/admin/recruitment/pipeline/${jobId}`)
}

const saveJob = () => {
    const id = `JOB-2024-00${jobRequisitions.length + 1}`
    jobRequisitions.unshift({
        ...newJob.value,
        id,
        posted_date: new Date().toISOString().split('T')[0]
    })
    isNewJobModalOpen.value = false
    newJob.value = { title: '', department: 'Engineering', type: 'Full-time', location: '', description: '', status: 'Open', applications_count: 0 }
}
</script>
