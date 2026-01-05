<template>
  <ion-page>
    <ion-tabs>
      <!-- Top Navigation Bar -->
      <div class="h-topbar bg-bg-card border-b border-neutral-200 shadow-enterprise sticky top-0 z-50">
        <div class="h-full px-6 flex items-center justify-between">
          <!-- Logo & Module Launcher -->
          <div class="flex items-center gap-4">
            <router-link to="/home">
              <img src="/megha_hr_logo.png" alt="Megha HR" class="h-8 cursor-pointer" />
            </router-link>
            
            <!-- Module Grid Button -->
            <button 
              @click="showModules = true"
              class="p-2 rounded-s hover:bg-neutral-100 transition-colors"
            >
              <LayoutGrid class="h-5 w-5 text-text-secondary" />
            </button>
          </div>

          <!-- Global Search -->
          <div class="flex-1 max-w-2xl mx-8">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search employees, policies, requests..."
                class="w-full h-10 pl-10 pr-4 rounded-s border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body-l bg-white"
              />
            </div>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-2">
            <button class="p-2 rounded-s hover:bg-neutral-100 transition-colors relative">
              <Bell class="h-5 w-5 text-text-secondary" />
              <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button @click="toggleTheme" class="p-2 rounded-s hover:bg-neutral-100 transition-colors">
              <component :is="isDark ? Sun : Moon" class="h-5 w-5 text-text-secondary" />
            </button>
            <router-link to="/profile">
              <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-200 cursor-pointer hover:border-primary transition-colors">
                <img :src="userImage" alt="Profile" class="w-full h-full object-cover" />
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Main Content with Router Outlet - SCROLLABLE -->
      <ion-content class="ion-padding" :scroll-y="true">
        <ion-router-outlet></ion-router-outlet>
      </ion-content>

      <!-- Bottom Navigation Tabs -->
      <BottomTabs />
    </ion-tabs>

    <!-- All Modules Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showModules"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          @click.self="showModules = false"
        >
          <div class="bg-white rounded-l shadow-dropdown border border-neutral-200 w-full max-w-5xl max-h-[80vh] overflow-hidden">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-neutral-200">
              <div>
                <h2 class="text-heading-l text-text-heading">All Features & Modules</h2>
                <p class="text-body-m text-text-secondary mt-1">Quick access to all HRMS features</p>
              </div>
              <button
                @click="showModules = false"
                class="p-2 rounded-s hover:bg-neutral-100 transition-colors"
              >
                <X class="h-5 w-5 text-text-secondary" />
              </button>
            </div>

            <!-- Modules Grid -->
            <div class="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <button 
                  v-for="feature in allFeatures" 
                  :key="feature.id"
                  @click="navigateToFeature(feature.route)"
                  class="p-4 rounded-m border border-neutral-200 hover:border-primary hover:bg-primary-50/50 transition-all group text-left relative"
                >
                  <div class="w-10 h-10 rounded-s mb-3 flex items-center justify-center transition-colors"
                       :class="feature.bgClass">
                    <component :is="feature.icon" class="h-5 w-5 transition-colors" :class="feature.iconClass" />
                  </div>
                  <h3 class="text-body-m font-semibold text-text-primary group-hover:text-primary mb-1">{{ feature.name }}</h3>
                  <p class="text-caption text-text-muted">{{ feature.description }}</p>
                  
                  <span v-if="feature.badge" class="absolute top-2 right-2 badge badge-error">{{ feature.badge }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ion-page>
</template>

<script setup>
import { IonTabs, IonPage, IonRouterOutlet, IonContent } from "@ionic/vue"
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Search, Bell, Sun, Moon, LayoutGrid, X,
  Users, Briefcase, LayoutDashboard, Clock, CalendarDays,
  DollarSign, Target, Award, Gift, BarChart3, FileCheck,
  Shield, Globe, Sliders, Plane, MessageSquare, GraduationCap
} from 'lucide-vue-next'
import BottomTabs from "@/components/BottomTabs.vue"
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const user = inject('$user')
const { isDark, toggleTheme } = useTheme()

const showModules = ref(false)

const userImage = computed(() => {
  return user.data?.user_image || 'https://ui-avatars.com/api/?name=User&background=4F7DFF&color=fff'
})

const allFeatures = [
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

function navigateToFeature(route) {
  router.push(route)
  showModules.value = false
}
</script>

<style scoped>
ion-content {
  --background: var(--bg-app, #F6F8FC);
}
</style>
