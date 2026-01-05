<template>
  <BaseLayout :pageTitle="isEdit ? 'Edit Employee' : 'Hire New Employee'">
    <template #body>
      <div class="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <Button variant="ghost" class="!p-2" @click="router.back()">
              <FeatherIcon name="arrow-left" class="h-5 w-5" />
            </Button>
            <div>
              <h1 class="text-3xl font-black text-[rgb(var(--text-main))] tracking-tight">{{ isEdit ? 'Update Record' : 'Employee Onboarding' }}</h1>
              <p class="text-[rgb(var(--text-secondary))] font-medium mt-1">Complete the details below to {{ isEdit ? 'update the' : 'create a new' }} employee profile.</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
             <Button variant="outline" class="!rounded-xl px-6" @click="router.back()">Cancel</Button>
             <Button variant="solid" class="!bg-blue-600 !text-white !rounded-xl px-8 shadow-lg shadow-blue-600/20 font-black" @click="saveEmployee">
               {{ isEdit ? 'Save Changes' : 'Complete Hiring' }}
             </Button>
          </div>
        </div>

        <!-- Form Steps -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Step Indicators -->
          <div class="md:col-span-1 space-y-2">
            <div 
              v-for="(step, index) in steps" 
              :key="step.id"
              @click="currentStep = index"
              class="p-4 rounded-2xl cursor-pointer transition-all flex items-center gap-3 group"
              :class="[
                currentStep === index 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
              ]"
            >
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2" :class="currentStep === index ? 'border-white' : 'border-gray-300 group-hover:border-gray-400'">
                {{ index + 1 }}
              </div>
              <span class="font-bold text-sm">{{ step.title }}</span>
            </div>
          </div>

          <!-- Main Form Area -->
          <div class="md:col-span-3 space-y-6">
            <div class="premium-card p-8 animate-in fade-in slide-in-from-right-4 duration-500">
              
              <!-- Step 1: Basic Info -->
              <div v-if="currentStep === 0" class="space-y-6">
                <h3 class="text-xl font-black text-[rgb(var(--text-main))] mb-8">Basic Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-gray-400">Full Name</label>
                    <Input v-model="form.name" placeholder="e.g. Sahil Ranjan" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                    <Input v-model="form.email" type="email" placeholder="e.g. sahil@meghahr.com" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-gray-400">Employee ID</label>
                    <Input v-model="form.id" placeholder="e.g. MEG-EMP-001" :disabled="isEdit" />
                  </div>
                   <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-gray-400">Mobile Number</label>
                    <Input v-model="form.personal_details.mobile" placeholder="+91 XXXX XXXX" />
                  </div>
                </div>
              </div>

              <!-- Step 2: Job Details -->
              <div v-if="currentStep === 1" class="space-y-6">
                <h3 class="text-xl font-black text-[rgb(var(--text-main))] mb-8">Role & Reporting</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-gray-400">Designation</label>
                    <Input v-model="form.job_details.designation" placeholder="e.g. Senior Developer" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-gray-400">Department</label>
                    <select v-model="form.job_details.department" class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>Product Management</option>
                      <option>Engineering</option>
                      <option>Human Resources</option>
                      <option>Sales</option>
                    </select>
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-gray-400">Joining Date</label>
                    <Input v-model="form.job_details.date_of_joining" type="date" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-gray-400">Reports To</label>
                    <Input v-model="form.job_details.reports_to" placeholder="Select Manager..." />
                  </div>
                </div>
              </div>

              <!-- Step 3: Pay & Bank -->
              <div v-if="currentStep === 2" class="space-y-6">
                 <h3 class="text-xl font-black text-[rgb(var(--text-main))] mb-8">Financial Details</h3>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                      <label class="text-xs font-black uppercase tracking-widest text-gray-400">Bank Name</label>
                      <Input v-model="form.pay_details.bank_name" />
                    </div>
                    <div class="space-y-2">
                      <label class="text-xs font-black uppercase tracking-widest text-gray-400">Account Number</label>
                      <Input v-model="form.pay_details.account_number" />
                    </div>
                    <div class="space-y-2">
                      <label class="text-xs font-black uppercase tracking-widest text-gray-400">Annual CTC</label>
                      <Input v-model="form.pay_details.ctc" placeholder="e.g. 12,00,000" />
                    </div>
                 </div>
              </div>

              <div class="mt-12 flex items-center justify-between border-t border-[rgb(var(--border-color))] pt-8">
                <Button v-if="currentStep > 0" variant="outline" class="!rounded-xl" @click="currentStep--">Previous Step</Button>
                <div v-else></div>
                <Button v-if="currentStep < steps.length - 1" variant="solid" class="!bg-gray-900 !text-white !rounded-xl px-8" @click="currentStep++">Next Step</Button>
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
import { Button, FeatherIcon, Input } from '@/utils/frappe-ui'
import { employeeMasterData } from '@/data/employee_master'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)
const currentStep = ref(0)

const steps = [
  { id: 'basic', title: 'Basic Info' },
  { id: 'job', title: 'Job Details' },
  { id: 'pay', title: 'Pay & Bank' },
  { id: 'docs', title: 'Documents' }
]

const form = ref({
  id: '',
  name: '',
  email: '',
  image: '',
  personal_details: { mobile: '' },
  job_details: { designation: '', department: 'Engineering', date_of_joining: '', reports_to: '' },
  pay_details: { bank_name: '', account_number: '', ctc: '' },
  documents: []
})

onMounted(() => {
  if (isEdit.value) {
    const existing = employeeMasterData.find(e => e.id === route.params.id)
    if (existing) {
      form.value = JSON.parse(JSON.stringify(existing))
    }
  }
})

const saveEmployee = () => {
  console.log('[EmployeeEditor] Saving:', form.value)
  // Mock add to list if new
  if (!isEdit.value) {
    employeeMasterData.push(form.value)
  } else {
    const idx = employeeMasterData.findIndex(e => e.id === form.value.id)
    if (idx !== -1) employeeMasterData[idx] = form.value
  }
  router.push('/admin/employees')
}
</script>
