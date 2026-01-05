<template>
  <div class="fixed right-0 top-0 h-screen flex items-center z-40">
    <!-- Collapsed Sidebar -->
    <div
      v-if="!isExpanded"
      class="bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-lg h-full flex flex-col items-center py-6 gap-4 w-16"
    >
      <!-- Notifications -->
      <button
        @click="activeTab = 'notifications'; isExpanded = true"
        class="relative p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
      >
        <Bell class="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <span v-if="notificationCount > 0" class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        <span class="absolute right-full mr-2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Notifications
        </span>
      </button>

      <!-- User Profile -->
      <button
        @click="activeTab = 'profile'; isExpanded = true"
        class="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative"
      >
        <UserCircle class="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <span class="absolute right-full mr-2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Profile
        </span>
      </button>

      <!-- HR Connect -->
      <button
        @click="activeTab = 'hrconnect'; isExpanded = true"
        class="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative"
      >
        <Headset class="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <span class="absolute right-full mr-2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          HR Connect
        </span>
      </button>
    </div>

    <!-- Expanded Sidebar -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-all duration-300"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isExpanded"
        class="bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl h-full w-96 flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">
            {{ activeTab === 'notifications' ? 'Notifications' : activeTab === 'profile' ? 'Profile' : 'HR Connect' }}
          </h3>
          <button
            @click="isExpanded = false"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X class="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-4">
          <!-- Notifications Tab -->
          <div v-if="activeTab === 'notifications'" class="space-y-3">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <component :is="getNotificationIcon(notification.type)" class="h-4 w-4" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ notification.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ notification.message }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">{{ notification.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Tab -->
          <div v-if="activeTab === 'profile'" class="space-y-4">
            <div class="text-center">
              <div class="w-24 h-24 rounded-2xl bg-gray-200 dark:bg-gray-800 mx-auto mb-4"></div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white">Sahil Ranjan</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">Associate - Business Insight & Analytics</p>
            </div>
            <div class="space-y-2">
              <button class="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left flex items-center gap-3">
                <User class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span class="text-sm font-medium text-gray-900 dark:text-white">View Profile</span>
              </button>
              <button class="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left flex items-center gap-3">
                <Settings class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span class="text-sm font-medium text-gray-900 dark:text-white">Settings</span>
              </button>
              <button class="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left flex items-center gap-3">
                <LogOut class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span class="text-sm font-medium text-gray-900 dark:text-white">Logout</span>
              </button>
            </div>
          </div>

          <!-- HR Connect Tab -->
          <div v-if="activeTab === 'hrconnect'" class="space-y-4">
            <div class="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h4 class="text-sm font-bold text-blue-900 dark:text-blue-100 mb-2">Need Help?</h4>
              <p class="text-xs text-blue-700 dark:text-blue-300">Raise a ticket and our HR team will assist you.</p>
            </div>

            <button class="w-full p-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Plus class="h-5 w-5" />
              New Ticket
            </button>

            <div class="space-y-3">
              <h5 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recent Tickets</h5>
              <div
                v-for="ticket in tickets"
                :key="ticket.id"
                class="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
              >
                <div class="flex items-start justify-between mb-2">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ ticket.title }}</p>
                  <span
                    class="px-2 py-0.5 rounded-full text-xs font-bold"
                    :class="{
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': ticket.status === 'Open',
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': ticket.status === 'Resolved'
                    }"
                  >
                    {{ ticket.status }}
                  </span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ ticket.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Bell,
  UserCircle,
  Headset,
  X,
  User,
  Settings,
  LogOut,
  Plus,
  Mail,
  Calendar,
  Award,
  DollarSign
} from 'lucide-vue-next'

const isExpanded = ref(false)
const activeTab = ref('notifications')
const notificationCount = ref(3)

const notifications = [
  {
    id: 1,
    type: 'leave',
    title: 'Leave Approved',
    message: 'Your leave request for Jan 15-17 has been approved',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'payroll',
    title: 'Payslip Available',
    message: 'Your payslip for January 2024 is now available',
    time: '5 hours ago'
  },
  {
    id: 3,
    type: 'recognition',
    title: 'New Recognition',
    message: 'Sameer Kumar recognized you with Team Player badge',
    time: '1 day ago'
  }
]

const tickets = [
  { id: 1, title: 'Salary slip not received', status: 'Open', date: 'Jan 4, 2024' },
  { id: 2, title: 'Leave balance query', status: 'Resolved', date: 'Jan 2, 2024' }
]

const getNotificationIcon = (type) => {
  const icons = {
    leave: Calendar,
    payroll: DollarSign,
    recognition: Award,
    default: Mail
  }
  return icons[type] || icons.default
}
</script>
