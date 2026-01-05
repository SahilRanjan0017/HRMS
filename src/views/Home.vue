<template>
  <div class="space-y-6 max-w-[1440px] mx-auto pb-20">
    <!-- Welcome / Profile Card (Hero Card) -->
    <div class="profile-header">
      <div class="flex items-center gap-6 flex-1">
        <!-- Profile Image -->
        <div class="w-20 h-20 rounded-l overflow-hidden border-2 border-neutral-200">
          <img :src="userImage" @error="handleImageError" alt="Profile" class="w-full h-full object-cover" />
        </div>

        <!-- Profile Info -->
        <div class="flex-1">
          <h1 class="text-heading-l text-text-heading mb-1">{{ fullName }}</h1>
          <div class="flex items-center gap-4 text-body-l text-text-secondary mb-3">
            <span>{{ designation }}</span>
            <span class="w-1 h-1 rounded-full bg-neutral-300"></span>
            <span>{{ branch }}</span>
            <span class="w-1 h-1 rounded-full bg-neutral-300"></span>
            <span>ID: {{ employeeId }}</span>
          </div>
          
          <!-- Profile Completion -->
          <div class="flex items-center gap-3">
            <div class="progress-track w-48">
              <div class="progress-fill" style="width: 82%"></div>
            </div>
            <span class="text-label-s text-text-muted">Profile 82% complete</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="flex gap-2">
        <button @click="$router.push('/profile')" class="btn-secondary">View Profile</button>
        <button @click="$router.push('/profile')" class="btn-primary">Edit Profile</button>
      </div>
    </div>

    <!-- Feature Highlight Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Organization Card -->
      <div @click="$router.push('/admin/employees')" class="action-card min-h-[120px] flex items-center gap-4">
        <div class="w-16 h-16 rounded-m bg-primary-50 flex items-center justify-center flex-shrink-0">
          <Building2 class="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 class="text-heading-m text-text-heading mb-1">Organization</h3>
          <p class="text-body-m text-text-secondary">View org chart & team</p>
        </div>
      </div>

      <!-- Employee Handbook -->
      <div @click="$router.push('/admin/compliance')" class="action-card min-h-[120px] flex items-center gap-4">
        <div class="w-16 h-16 rounded-m bg-accent-teal/10 flex items-center justify-center flex-shrink-0">
          <BookOpen class="h-8 w-8 text-accent-teal" />
        </div>
        <div>
          <h3 class="text-heading-m text-text-heading mb-1">Handbook</h3>
          <p class="text-body-m text-text-secondary">Policies & guidelines</p>
        </div>
      </div>

      <!-- My Tasks -->
      <div @click="$router.push('/my-goals')" class="action-card min-h-[120px] flex items-center gap-4">
        <div class="w-16 h-16 rounded-m bg-warning-100 flex items-center justify-center flex-shrink-0 relative">
          <CheckSquare class="h-8 w-8 text-warning" />
          <span class="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-caption rounded-full flex items-center justify-center font-semibold">5</span>
        </div>
        <div>
          <h3 class="text-heading-m text-text-heading mb-1">My Tasks</h3>
          <p class="text-body-m text-text-secondary">5 pending actions</p>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column (2/3) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Leave & Attendance Widget -->
        <div class="enterprise-card">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-heading-l text-text-heading">Leave & Attendance</h2>
            <div class="tab-list border-0">
              <button 
                v-for="tab in leaveTabs" 
                :key="tab.id"
                @click="activeLeaveTab = tab.id"
                class="tab-item"
                :class="{ 'active': activeLeaveTab === tab.id }"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Leave Table -->
          <table class="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Opening</th>
                <th>Leave Utilized</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="leave in leaveData" :key="leave.type">
                <td>
                  <div class="flex items-center gap-2">
                    <div class="w-1 h-12 rounded-full" :class="leave.colorClass"></div>
                    <span class="font-medium">{{ leave.type }}</span>
                  </div>
                </td>
                <td>{{ leave.opening }}</td>
                <td>{{ leave.utilized }}</td>
                <td class="font-semibold">{{ leave.balance }}</td>
                <td class="text-right">
                  <button @click="$router.push('/dashboard/leaves')" class="btn-secondary !h-8 !px-3 text-label-s">Apply</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Attendance Overview -->
        <div class="enterprise-card">
          <h2 class="text-heading-l text-text-heading mb-6">This Month's Attendance</h2>
          
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="p-4 rounded-m bg-success-50 border border-success-100">
              <div class="text-caption text-text-muted uppercase tracking-wider mb-1">Present Days</div>
              <div class="text-heading-xl text-success">22</div>
            </div>
            <div class="p-4 rounded-m bg-warning-50 border border-warning-100">
              <div class="text-caption text-text-muted uppercase tracking-wider mb-1">Leave Taken</div>
              <div class="text-heading-xl text-warning">2</div>
            </div>
            <div class="p-4 rounded-m bg-primary-50 border border-primary-100">
              <div class="text-caption text-text-muted uppercase tracking-wider mb-1">Avg Hours</div>
              <div class="text-heading-xl text-primary">8.5h</div>
            </div>
            <div class="p-4 rounded-m bg-neutral-100 border border-neutral-200">
              <div class="text-caption text-text-muted uppercase tracking-wider mb-1">Attendance %</div>
              <div class="text-heading-xl text-text-heading">96.5%</div>
            </div>
          </div>

          <!-- Week View -->
          <div class="grid grid-cols-7 gap-2">
            <div v-for="day in weekDays" :key="day.date" class="text-center">
              <div class="text-label-s text-text-muted mb-2">{{ day.day }}</div>
              <div 
                class="aspect-square rounded-s flex items-center justify-center text-body-m font-medium transition-colors cursor-pointer"
                :class="getDayClass(day.status)"
              >
                {{ day.date }}
              </div>
              <div class="text-caption text-text-muted mt-1">{{ day.hours }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (1/3) -->
      <div class="space-y-6">
        <!-- Calendar Widget - IMPROVED -->
        <div class="calendar-widget">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-heading-m text-text-heading">{{ displayMonth }}</h3>
            <div class="flex gap-1">
              <button @click="previousMonth" class="p-1 hover:bg-neutral-100 rounded-s transition-colors">
                <ChevronLeft class="h-4 w-4 text-text-secondary" />
              </button>
              <button @click="nextMonth" class="p-1 hover:bg-neutral-100 rounded-s transition-colors">
                <ChevronRight class="h-4 w-4 text-text-secondary" />
              </button>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="mb-4">
            <!-- Day Headers -->
            <div class="grid grid-cols-7 gap-1 mb-2">
              <div v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']" :key="day" class="text-label-s text-text-muted font-medium text-center py-1">
                {{ day }}
              </div>
            </div>
            
            <!-- Calendar Dates -->
            <div class="grid grid-cols-7 gap-1">
              <div 
                v-for="date in calendarDates" 
                :key="date.key"
                @click="selectDate(date)"
                class="aspect-square flex items-center justify-center text-label-s rounded-s transition-all cursor-pointer"
                :class="getCalendarClass(date)"
              >
                <span v-if="!date.isEmpty" class="relative">
                  {{ date.day }}
                  <!-- Dot indicator for events -->
                  <span v-if="date.hasEvent" class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" :class="getEventDotClass(date.status)"></span>
                </span>
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div class="pt-4 border-t border-neutral-200 space-y-2">
            <div class="flex items-center gap-2 text-label-s text-text-secondary">
              <div class="dot-holiday"></div>
              <span>Holiday</span>
            </div>
            <div class="flex items-center gap-2 text-label-s text-text-secondary">
              <div class="dot-leave"></div>
              <span>Leave</span>
            </div>
            <div class="flex items-center gap-2 text-label-s text-text-secondary">
              <div class="dot-approval"></div>
              <span>Approval Pending</span>
            </div>
            <div class="flex items-center gap-2 text-label-s text-text-secondary">
              <div class="dot-weeklyoff"></div>
              <span>Weekly Off</span>
            </div>
          </div>
        </div>

        <!-- Pending Approvals -->
        <div class="enterprise-card">
          <h3 class="text-heading-m text-text-heading mb-4">Pending Approvals</h3>
          <div class="space-y-3">
            <div v-for="approval in pendingApprovals" :key="approval.id" class="p-3 rounded-m border border-neutral-200 hover:border-primary/50 transition-colors">
              <div class="flex items-center justify-between mb-2">
                <span class="badge badge-warning">{{ approval.type }}</span>
                <span class="text-caption text-text-muted">{{ approval.time }}</span>
              </div>
              <p class="text-body-l text-text-primary font-medium mb-3">{{ approval.title }}</p>
              <div class="flex gap-2">
                <button class="btn-primary !h-8 flex-1 text-label-s">Approve</button>
                <button class="btn-ghost !h-8 flex-1 text-label-s">Reject</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="enterprise-card">
          <h3 class="text-heading-m text-text-heading mb-4">Quick Links</h3>
          <div class="space-y-2">
            <button 
              v-for="link in quickLinks" 
              :key="link.id"
              @click="$router.push(link.route)"
              class="w-full flex items-center gap-3 p-3 rounded-m hover:bg-neutral-50 transition-colors text-left"
            >
              <component :is="link.icon" class="h-5 w-5 text-text-secondary" />
              <span class="text-body-l text-text-primary">{{ link.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import {
  Building2,
  BookOpen,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  FileText,
  DollarSign,
  GraduationCap,
  HelpCircle
} from 'lucide-vue-next'

const user = inject('$user')
const employee = inject('$employee')

const userImage = computed(() => user.data?.user_image || 'https://ui-avatars.com/api/?name=User&background=4F7DFF&color=fff')
const fullName = computed(() => employee.data?.employee_name || user.data?.full_name || 'Sahil Ranjan')
const designation = computed(() => employee.data?.designation || 'Associate - Business Insight & Analytics')
const branch = computed(() => employee.data?.branch || 'Bangalore')
const employeeId = computed(() => employee.data?.name || 'EMP-1897')

// Calendar state
const currentDate = ref(new Date(2026, 0, 1)) // January 2026
const selectedDate = ref(null)

const displayMonth = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calendarDates = computed(() => {
  return generateCalendarDates(currentDate.value)
})

const activeLeaveTab = ref('leave')
const leaveTabs = [
  { id: 'leave', label: 'Leave' },
  { id: 'special', label: 'Special' },
  { id: 'wfh', label: 'WFH' },
  { id: 'coff', label: 'COFF' }
]

const leaveData = [
  { type: 'Casual Leave', opening: '6.00', utilized: '0.00', balance: '6.00', colorClass: 'bg-primary' },
  { type: 'Privilege Leave', opening: '13.67', utilized: '0.00', balance: '13.67', colorClass: 'bg-success' },
  { type: 'Sick Leave', opening: '12.00', utilized: '0.00', balance: '12.00', colorClass: 'bg-warning' }
]

const weekDays = [
  { day: 'Mon', date: '1', status: 'present', hours: '9h' },
  { day: 'Tue', date: '2', status: 'present', hours: '8.5h' },
  { day: 'Wed', date: '3', status: 'present', hours: '9h' },
  { day: 'Thu', date: '4', status: 'present', hours: '8h' },
  { day: 'Fri', date: '5', status: 'today', hours: '4h' },
  { day: 'Sat', date: '6', status: 'weekend', hours: '-' },
  { day: 'Sun', date: '7', status: 'weekend', hours: '-' }
]

const pendingApprovals = [
  { id: 1, type: 'Leave', title: 'Rajesh Kumar - 2 days', time: '2h ago' },
  { id: 2, type: 'Expense', title: 'Travel Claim - ₹5,240', time: '5h ago' }
]

const quickLinks = [
  { id: 1, label: 'View Payslip', icon: FileText, route: '/dashboard/salary-slips' },
  { id: 2, label: 'Submit Expense', icon: DollarSign, route: '/dashboard/expense-claims' },
  { id: 3, label: 'Training Courses', icon: GraduationCap, route: '/learning' },
  { id: 4, label: 'HR Support', icon: HelpCircle, route: '/hr-connect' }
]

function generateCalendarDates(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1).getDay() // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year
  
  const dates = []
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    dates.push({ key: `empty-${i}`, day: '', isEmpty: true })
  }
  
  // Add all dates of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = isCurrentMonth && i === today.getDate()
    const dayOfWeek = new Date(year, month, i).getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    
    let status = 'future'
    let hasEvent = false
    
    if (isToday) {
      status = 'today'
      hasEvent = true
    } else if (i === 15) {
      status = 'holiday'
      hasEvent = true
    } else if (i === 20 || i === 21) {
      status = 'leave'
      hasEvent = true
    } else if (i === 10) {
      status = 'approval'
      hasEvent = true
    } else if (isWeekend) {
      status = 'weekend'
    } else if (i < today.getDate() && isCurrentMonth) {
      status = 'present'
    }
    
    dates.push({ 
      key: `date-${i}`, 
      day: i, 
      status,
      hasEvent,
      date: new Date(year, month, i),
      isEmpty: false
    })
  }
  
  return dates
}

function previousMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

function selectDate(date) {
  if (!date.isEmpty) {
    selectedDate.value = date.date
    console.log('Selected date:', date.date)
  }
}

function getDayClass(status) {
  const classes = {
    present: 'bg-success-100 text-success',
    today: 'bg-primary text-white',
    weekend: 'bg-neutral-100 text-text-muted'
  }
  return classes[status] || 'bg-neutral-50 text-text-secondary'
}

function getCalendarClass(date) {
  if (date.isEmpty) return 'invisible'
  
  const classes = {
    today: 'bg-primary text-white font-semibold hover:bg-primary-600',
    holiday: 'bg-error-100 text-error font-medium hover:bg-error-100',
    leave: 'bg-warning-100 text-warning font-medium hover:bg-warning-100',
    approval: 'bg-info-100 text-info font-medium hover:bg-info-100',
    weekend: 'bg-neutral-100 text-text-muted hover:bg-neutral-200',
    present: 'bg-success-50/30 text-text-primary hover:bg-success-50',
    future: 'text-text-secondary hover:bg-neutral-100'
  }
  return classes[date.status] || 'text-text-secondary hover:bg-neutral-100'
}

function getEventDotClass(status) {
  const classes = {
    holiday: 'bg-error',
    leave: 'bg-warning',
    approval: 'bg-info',
    today: 'bg-white'
  }
  return classes[status] || ''
}

function handleImageError(e) {
  e.target.src = 'https://ui-avatars.com/api/?name=User&background=4F7DFF&color=fff'
}
</script>
