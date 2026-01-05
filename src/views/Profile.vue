<template>
  <BaseLayout :pageTitle="`Profile: ${emp?.name || '...'}`">
    <template #body>
      <div v-if="emp" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Profile Header Card -->
        <div class="premium-card p-8 flex flex-col md:flex-row items-center gap-8 border-none bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-600/20">
          <div class="relative group">
            <div class="absolute inset-0 bg-white/20 rounded-3xl blur-xl group-hover:scale-110 transition-transform"></div>
            <Avatar :image="emp.image" :label="emp.name" size="2xl" class="relative rounded-3xl ring-4 ring-white/20 shadow-2xl" />
          </div>
          
          <div class="flex-1 text-center md:text-left space-y-2">
            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <h1 class="text-4xl font-black tracking-tight">{{ emp.name }}</h1>
              <Badge variant="solid" theme="green" class="!bg-emerald-500 !text-white !border-none self-center md:self-auto">Active</Badge>
            </div>
            <p class="text-xl font-bold text-white/80">{{ emp.job_details.designation }} • {{ emp.job_details.department }}</p>
            <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <div class="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-xl text-sm font-bold backdrop-blur-md">
                <FeatherIcon name="mail" class="h-4 w-4" />
                {{ emp.email }}
              </div>
              <div class="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-xl text-sm font-bold backdrop-blur-md">
                <FeatherIcon name="phone" class="h-4 w-4" />
                {{ emp.personal_details.mobile }}
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3 w-full md:w-auto">
            <Button variant="solid" class="!bg-white !text-blue-600 !rounded-2xl !font-black h-12 px-8 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
              <FeatherIcon name="edit-3" class="h-5 w-5" />
              Edit Profile
            </Button>
            <Button @click="logout" variant="outline" class="!border-white/20 !text-white hover:!bg-white/10 !rounded-2xl !font-bold h-12">
              Logout
            </Button>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex items-center gap-2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-[2rem] w-fit mx-auto md:mx-0">
          <button 
            v-for="tab in visibleTabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-6 py-3 rounded-[1.5rem] text-sm font-black transition-all"
            :class="[
              activeTab === tab.id 
                ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-[rgb(var(--text-main))]'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Info -->
          <div class="lg:col-span-2 space-y-8">
            <div v-if="activeTab === 'overview'" class="premium-card p-8 space-y-8 animate-in fade-in duration-500">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-6">
                  <h3 class="text-sm font-black uppercase tracking-widest text-gray-400 border-l-4 border-blue-500 pl-3">Job Information</h3>
                  <div class="space-y-4">
                    <div v-for="(val, key) in emp.job_details" :key="key" class="flex flex-col">
                      <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">{{ key.replaceAll('_', ' ') }}</span>
                      <span class="text-base font-bold text-[rgb(var(--text-main))]">{{ val }}</span>
                    </div>
                  </div>
                </div>
                <div class="space-y-6">
                  <h3 class="text-sm font-black uppercase tracking-widest text-gray-400 border-l-4 border-indigo-500 pl-3">Personal Information</h3>
                  <div class="space-y-4">
                    <div v-for="(val, key) in emp.personal_details" :key="key" class="flex flex-col">
                      <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">{{ key.replaceAll('_', ' ') }}</span>
                      <span class="text-base font-bold text-[rgb(var(--text-main))]">{{ val }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'pay'" class="premium-card p-8 space-y-8 animate-in fade-in duration-500">
               <div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl flex items-center gap-4 text-blue-700 dark:text-blue-300">
                <FeatherIcon name="info" class="h-6 w-6" />
                <p class="text-sm font-bold">This sensitive financial information is only visible to you and HR administrators.</p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-6">
                   <h3 class="text-sm font-black uppercase tracking-widest text-gray-400 border-l-4 border-emerald-500 pl-3">Bank Details</h3>
                   <div class="space-y-4">
                      <div class="flex flex-col">
                        <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Bank Name</span>
                        <span class="text-base font-bold text-[rgb(var(--text-main))]">{{ emp.pay_details.bank_name }}</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Account Number</span>
                        <span class="text-base font-bold text-[rgb(var(--text-main))]">•••• •••• {{ emp.pay_details.account_number.slice(-4) }}</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">IFSC Code</span>
                        <span class="text-base font-bold text-[rgb(var(--text-main))]">{{ emp.pay_details.ifsc }}</span>
                      </div>
                   </div>
                </div>
                <div class="space-y-6">
                   <h3 class="text-sm font-black uppercase tracking-widest text-gray-400 border-l-4 border-amber-500 pl-3">Compensation</h3>
                   <div class="space-y-4">
                      <div class="flex flex-col">
                        <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Monthly Basic</span>
                        <span class="text-base font-bold text-[rgb(var(--text-main))]">{{ emp.pay_details.basic }}</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">CTC (Annual)</span>
                        <span class="text-2xl font-black text-blue-600">{{ emp.pay_details.ctc }}</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'documents'" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
              <div v-for="doc in emp.documents" :key="doc.name" class="premium-card p-6 flex flex-col gap-4 group hover:ring-2 hover:ring-blue-500/20 transition-all cursor-pointer">
                <div class="flex items-start justify-between">
                  <div class="p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50 text-gray-400 group-hover:scale-110 transition-transform">
                    <FeatherIcon :name="doc.type === 'PDF' ? 'file-text' : 'image'" class="h-6 w-6" />
                  </div>
                  <Badge theme="gray" variant="subtle" size="sm">{{ doc.type }}</Badge>
                </div>
                <div>
                  <h4 class="font-black text-[rgb(var(--text-main))]">{{ doc.name }}</h4>
                  <p class="text-xs text-gray-400 font-bold mt-1">{{ doc.size }}</p>
                </div>
                <Button variant="outline" class="mt-2 w-full !rounded-xl">Download</Button>
              </div>
            </div>
          </div>

          <!-- Quick Stats / Actions -->
          <div class="lg:col-span-1 space-y-8">
            <div class="premium-card p-6 space-y-6">
              <h3 class="font-black text-[rgb(var(--text-main))] text-lg">Leave Balances</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl">
                  <span class="font-bold text-blue-700 dark:text-blue-300">Privilege Leave</span>
                  <span class="text-xl font-black text-blue-700 dark:text-blue-300">12</span>
                </div>
                <div class="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl">
                  <span class="font-bold text-indigo-700 dark:text-indigo-300">Sick Leave</span>
                  <span class="text-xl font-black text-indigo-700 dark:text-indigo-300">8</span>
                </div>
              </div>
            </div>

            <div class="premium-card p-6 space-y-4">
              <h3 class="font-black text-[rgb(var(--text-main))] text-lg">Upcoming Holidays</h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/10 flex flex-col items-center justify-center text-rose-600">
                    <span class="text-[10px] font-black leading-none">JAN</span>
                    <span class="text-sm font-black">26</span>
                  </div>
                  <div class="font-bold text-sm">Republic Day</div>
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
import { ref, onMounted, computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge, Avatar } from '@/utils/frappe-ui'
import { employeeMasterData } from '@/data/employee_master'
import { useAuth } from '@/utils/auth'

const route = useRoute()
const router = useRouter()
const { hasPermission } = useAuth()
const session = inject("$session")

const emp = ref(null)
const activeTab = ref('overview')

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'pay', label: 'Pay & Bank', permission: 'CORE_HR_PAY_VIEW' },
  { id: 'documents', label: 'Documents' },
  { id: 'assets', label: 'Assets' }
]

const visibleTabs = computed(() => {
  return tabs.filter(tab => !tab.permission || hasPermission(tab.permission, emp.value?.id))
})

onMounted(() => {
  const empId = route.params.id || 'MEG-EMP-001'
  emp.value = employeeMasterData.find(e => e.id === empId) || employeeMasterData[0]
})

const logout = async () => {
  await session.logout.fetch()
}
</script>
