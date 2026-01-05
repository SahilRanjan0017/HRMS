<template>
  <!-- Module Grid Button -->
  <button
    @click="isOpen = !isOpen"
    class="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group"
    :class="{ 'bg-gray-100 dark:bg-gray-800': isOpen }"
  >
    <LayoutGrid class="h-5 w-5 text-gray-700 dark:text-gray-300" />
    <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      All Modules
    </span>
  </button>

  <!-- Module Grid Modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
        @click.self="isOpen = false"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm" @click="isOpen = false"></div>

        <!-- Modal Content -->
        <div class="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-4xl max-h-[80vh] overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">All Modules</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Quick access to all HRMS features</p>
            </div>
            <button
              @click="isOpen = false"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X class="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <!-- Modules Grid -->
          <div class="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <button
                v-for="module in modules"
                :key="module.id"
                @click="navigateToModule(module.route)"
                class="group relative p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-200 text-left bg-white dark:bg-gray-900"
              >
                <!-- Icon -->
                <div class="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-200 w-fit mb-3">
                  <component :is="module.icon" class="h-6 w-6" />
                </div>

                <!-- Title -->
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1">{{ module.title }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ module.description }}</p>

                <!-- Badge -->
                <div v-if="module.badge" class="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                  {{ module.badge }}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  LayoutGrid,
  X,
  Users,
  Briefcase,
  LayoutDashboard,
  Clock,
  CalendarDays,
  DollarSign,
  Target,
  GraduationCap,
  Award,
  Gift,
  BarChart3,
  FileCheck,
  Shield,
  Globe,
  Sliders
} from 'lucide-vue-next'

const router = useRouter()
const isOpen = ref(false)

const modules = [
  {
    id: 1,
    title: 'Employee Directory',
    description: 'Manage employee records',
    icon: Users,
    route: '/admin/employees'
  },
  {
    id: 2,
    title: 'Recruitment',
    description: 'Hiring & ATS',
    icon: Briefcase,
    route: '/admin/recruitment'
  },
  {
    id: 3,
    title: 'Onboarding',
    description: 'New hire workflows',
    icon: LayoutDashboard,
    route: '/admin/workflows'
  },
  {
    id: 4,
    title: 'Attendance',
    description: 'Time tracking',
    icon: Clock,
    route: '/admin/attendance',
    badge: '12'
  },
  {
    id: 5,
    title: 'Leave Management',
    description: 'Leave requests',
    icon: CalendarDays,
    route: '/admin/leave',
    badge: '8'
  },
  {
    id: 6,
    title: 'Payroll',
    description: 'Salary processing',
    icon: DollarSign,
    route: '/admin/payroll'
  },
  {
    id: 7,
    title: 'Performance',
    description: 'Goals & reviews',
    icon: Target,
    route: '/admin/performance'
  },
  {
    id: 8,
    title: 'Learning',
    description: 'Training & courses',
    icon: GraduationCap,
    route: '/learning'
  },
  {
    id: 9,
    title: 'Recognition',
    description: 'Rewards & badges',
    icon: Award,
    route: '/recognition'
  },
  {
    id: 10,
    title: 'Benefits',
    description: 'Employee benefits',
    icon: Gift,
    route: '/admin/benefits'
  },
  {
    id: 11,
    title: 'Analytics',
    description: 'HR insights',
    icon: BarChart3,
    route: '/admin/analytics'
  },
  {
    id: 12,
    title: 'Compliance',
    description: 'Policy management',
    icon: FileCheck,
    route: '/admin/compliance'
  },
  {
    id: 13,
    title: 'Roles & Permissions',
    description: 'Access control',
    icon: Shield,
    route: '/admin/roles'
  },
  {
    id: 14,
    title: 'My Goals',
    description: 'Personal objectives',
    icon: Target,
    route: '/my-goals'
  },
  {
    id: 15,
    title: 'Careers',
    description: 'Job openings',
    icon: Globe,
    route: '/careers'
  },
  {
    id: 16,
    title: 'Configuration',
    description: 'System settings',
    icon: Sliders,
    route: '/admin/config'
  }
]

const navigateToModule = (route) => {
  router.push(route)
  isOpen.value = false
}
</script>
