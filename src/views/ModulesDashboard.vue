<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="modules-dashboard p-6 max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 class="text-3xl font-black mb-2">All Modules</h1>
            <p class="text-lg text-gray-500">Quick access to every feature in your HRMS</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="feature in features" :key="feature.id" class="rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all p-6 flex flex-col items-center group cursor-pointer border border-neutral-100 hover:border-primary"
            @click="goTo(feature.route)">
            <div class="w-16 h-16 flex items-center justify-center rounded-full mb-4" :class="feature.bgClass">
              <component :is="feature.icon" class="h-8 w-8" :class="feature.iconClass" />
            </div>
            <h2 class="text-xl font-bold text-gray-800 group-hover:text-primary mb-1">{{ feature.name }}</h2>
            <p class="text-gray-500 text-center mb-2">{{ feature.description }}</p>
            <span v-if="feature.badge" class="inline-block mt-2 px-2 py-1 text-xs rounded bg-error text-white">{{ feature.badge }}</span>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue'
import { useRouter } from 'vue-router'
import {
  Users, Briefcase, LayoutDashboard, Clock, CalendarDays,
  DollarSign, Target, Award, Gift, BarChart3, FileCheck,
  Shield, Globe, Sliders, Plane, MessageSquare, GraduationCap
} from 'lucide-vue-next'

const router = useRouter()

const features = [
  { id: 1, name: 'Employee Directory', description: 'Manage employees', icon: Users, route: '/admin/employees', bgClass: 'bg-primary-50', iconClass: 'text-primary' },
  { id: 2, name: 'Recruitment', description: 'Hiring & ATS', icon: Briefcase, route: '/admin/recruitment', bgClass: 'bg-purple-50', iconClass: 'text-purple-600' },
  { id: 3, name: 'Onboarding', description: 'New hire workflows', icon: LayoutDashboard, route: '/admin/workflows', bgClass: 'bg-green-50', iconClass: 'text-green-600' },
  { id: 4, name: 'Attendance', description: 'Time tracking', icon: Clock, route: '/dashboard/attendance', bgClass: 'bg-orange-50', iconClass: 'text-orange-600', badge: '12' },
  { id: 5, name: 'Leave', description: 'Leave requests', icon: CalendarDays, route: '/dashboard/leaves', bgClass: 'bg-teal-50', iconClass: 'text-teal-600', badge: '8' },
  { id: 6, name: 'Payroll', description: 'Salary processing', icon: DollarSign, route: '/admin/payroll', bgClass: 'bg-emerald-50', iconClass: 'text-emerald-600' },
  { id: 7, name: 'Performance', description: 'Goals & reviews', icon: Target, route: '/admin/performance', bgClass: 'bg-violet-50', iconClass: 'text-violet-600' },
  { id: 8, name: 'Learning', description: 'Training courses', icon: GraduationCap, route: '/learning', bgClass: 'bg-indigo-50', iconClass: 'text-indigo-600' },
  { id: 9, name: 'Recognition', description: 'Rewards & badges', icon: Award, route: '/recognition', bgClass: 'bg-yellow-50', iconClass: 'text-yellow-600' },
  { id: 10, name: 'Benefits', description: 'Employee benefits', icon: Gift, route: '/admin/benefits', bgClass: 'bg-pink-50', iconClass: 'text-pink-600' },
  { id: 11, name: 'Analytics', description: 'HR insights', icon: BarChart3, route: '/admin/analytics', bgClass: 'bg-cyan-50', iconClass: 'text-cyan-600' },
  { id: 12, name: 'Compliance', description: 'Policy management', icon: FileCheck, route: '/admin/compliance', bgClass: 'bg-red-50', iconClass: 'text-red-600' },
  { id: 13, name: 'Roles', description: 'Access control', icon: Shield, route: '/admin/roles', bgClass: 'bg-slate-50', iconClass: 'text-slate-600' },
  { id: 14, name: 'My Goals', description: 'Personal objectives', icon: Target, route: '/my-goals', bgClass: 'bg-fuchsia-50', iconClass: 'text-fuchsia-600' },
  { id: 15, name: 'Careers', description: 'Job openings', icon: Globe, route: '/careers', bgClass: 'bg-sky-50', iconClass: 'text-sky-600' },
  { id: 16, name: 'Configuration', description: 'System settings', icon: Sliders, route: '/admin/config', bgClass: 'bg-lime-50', iconClass: 'text-lime-600' },
  { id: 17, name: 'Travel', description: 'Business travel', icon: Plane, route: '/travel', bgClass: 'bg-blue-50', iconClass: 'text-blue-600' },
  { id: 18, name: 'HR Connect', description: 'Support tickets', icon: MessageSquare, route: '/hr-connect', bgClass: 'bg-rose-50', iconClass: 'text-rose-600' }
]

function goTo(route) {
  // Use replace for admin/top-level routes to avoid Ionic tab context issues
  if (route.startsWith('/admin/') || route.startsWith('/travel') || route.startsWith('/hr-connect') || route.startsWith('/modules')) {
    router.replace(route)
  } else {
    router.push(route)
  }
}
</script>

<style scoped>
.modules-dashboard {
  background: #f8fafc;
  min-height: 100vh;
}
</style>
