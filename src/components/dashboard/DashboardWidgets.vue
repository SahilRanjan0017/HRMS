<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    <div 
      v-for="widget in widgets" 
      :key="widget.id"
      @click="navigateTo(widget.route)"
      class="group saas-card p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-card-hover transition-all duration-200 min-h-[120px] relative"
    >
      <!-- Icon -->
      <div class="p-3 rounded-lg bg-primary-light text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
        <component :is="widget.icon" class="h-6 w-6" />
      </div>

      <!-- Title -->
      <h3 class="text-xs font-medium text-text-secondary text-center leading-tight">{{ widget.title }}</h3>

      <!-- Badge -->
      <div v-if="widget.badge" class="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold bg-alert text-white">
        {{ widget.badge }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
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
  Sliders,
  Lock
} from 'lucide-vue-next'

const router = useRouter()

const widgets = [
  { id: 1, title: 'Employee Directory', icon: Users, route: '/admin/employees' },
  { id: 2, title: 'Recruitment & ATS', icon: Briefcase, route: '/admin/recruitment' },
  { id: 3, title: 'Onboarding', icon: LayoutDashboard, route: '/admin/workflows' },
  { id: 4, title: 'Attendance', icon: Clock, route: '/admin/attendance', badge: '12' },
  { id: 5, title: 'Leave Management', icon: CalendarDays, route: '/admin/leave', badge: '8' },
  { id: 6, title: 'Payroll', icon: DollarSign, route: '/admin/payroll' },
  { id: 7, title: 'Performance', icon: Target, route: '/admin/performance' },
  { id: 8, title: 'Learning', icon: GraduationCap, route: '/learning' },
  { id: 9, title: 'Recognition', icon: Award, route: '/recognition' },
  { id: 10, title: 'Benefits', icon: Gift, route: '/admin/benefits' },
  { id: 11, title: 'Analytics', icon: BarChart3, route: '/admin/analytics' },
  { id: 12, title: 'Compliance', icon: FileCheck, route: '/admin/compliance' },
  { id: 13, title: 'Roles & Permissions', icon: Shield, route: '/admin/roles' },
  { id: 14, title: 'My Goals', icon: Target, route: '/my-goals' },
  { id: 15, title: 'Careers', icon: Globe, route: '/careers' },
  { id: 16, title: 'Configuration', icon: Sliders, route: '/admin/config' }
]

const navigateTo = (route) => {
  router.push(route)
}
</script>
