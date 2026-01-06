<template>
  <div class="min-h-screen bg-bg-app">
    <!-- Top Navigation Bar -->
    <header class="h-topbar bg-bg-card border-b border-neutral-200 shadow-enterprise sticky top-0 z-50">
      <div class="h-full px-6 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-4">
          <img src="/megha_hr_logo.png" alt="HRMS" class="h-8" />
        </div>

        <!-- Global Search -->
        <div class="flex-1 max-w-2xl mx-8">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search employees, policies, requests..."
              class="w-full h-10 pl-10 pr-4 rounded-s border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body-l"
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
          <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-200 cursor-pointer hover:border-primary transition-colors">
            <img :src="userImage" alt="Profile" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar (Icon-first) -->
      <aside class="w-sidebar bg-bg-sidebar border-r border-neutral-200 h-[calc(100vh-64px)] sticky top-topbar">
        <nav class="flex flex-col items-center py-6 gap-4">
          <router-link
            v-for="item in sidebarItems"
            :key="item.route"
            :to="item.route"
            class="group relative p-3 rounded-m hover:bg-primary-50 transition-all"
            :class="{ 'bg-primary-50': isActive(item.route) }"
          >
            <component
              :is="item.icon"
              class="h-6 w-6 transition-colors"
              :class="isActive(item.route) ? 'text-primary' : 'text-text-secondary group-hover:text-primary'"
            />
            <!-- Tooltip -->
            <div class="absolute left-full ml-2 px-3 py-1.5 bg-neutral-900 text-white text-label-s rounded-s opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
              {{ item.label }}
            </div>
            <!-- Active Indicator -->
            <div v-if="isActive(item.route)" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"></div>
          </router-link>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 p-6">
        <slot name="body"></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Search,
  Bell,
  Sun,
  Moon,
  LayoutDashboard,
  Users,
  CalendarDays,
  Clock,
  DollarSign,
  Target,
  Settings
} from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const user = inject('$user')
const { isDark, toggleTheme } = useTheme()

const userImage = computed(() => {
  return user.data?.user_image || 'https://ui-avatars.com/api/?name=User&background=4F7DFF&color=fff'
})

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', route: '/home' },
  { icon: Users, label: 'People', route: '/admin/employees' },
  { icon: CalendarDays, label: 'Leave', route: '/leave' },
  { icon: Clock, label: 'Attendance', route: '/attendance' },
  { icon: DollarSign, label: 'Payroll', route: '/admin/payroll' },
  { icon: Target, label: 'Performance', route: '/admin/performance' },
  { icon: Settings, label: 'Settings', route: '/admin/config' }
]

const isActive = (itemRoute) => {
  return route.path.startsWith(itemRoute)
}

const props = defineProps({
  pageTitle: {
    type: String,
    required: false,
    default: '',
  },
})
</script>
