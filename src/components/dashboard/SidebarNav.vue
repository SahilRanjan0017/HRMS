<template>
	<div class="premium-card bg-white dark:bg-gray-800 p-4 space-y-2">
		<router-link
			v-for="item in tabItems"
			:key="item.title"
			:to="item.route"
			class="flex items-center gap-4 p-4 rounded-2xl transition-all group"
			:class="[
				route.path === item.route
					? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
					: 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
			]"
		>
			<div class="p-2 rounded-xl group-hover:scale-110 transition-transform" :class="route.path === item.route ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'">
				<component :is="item.icon" class="h-5 w-5" />
			</div>
			<div class="text-sm font-bold tracking-tight">{{ item.title }}</div>
			<div v-if="route.path === item.route" class="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
		</router-link>

		<div v-if="adminItems.length && isAdmin" class="pt-6 pb-2 px-4">
			<h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Administration</h4>
		</div>

		<router-link
			v-for="item in isAdmin ? adminItems : []"
			:key="item.title"
			:to="item.route"
			class="flex items-center gap-4 p-4 rounded-2xl transition-all group"
			:class="[
				route.path === item.route
					? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
					: 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
			]"
		>
			<div class="p-2 rounded-xl group-hover:scale-110 transition-transform" :class="route.path === item.route ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'">
				<component :is="item.icon" class="h-5 w-5" />
			</div>
			<div class="text-sm font-bold tracking-tight">{{ item.title }}</div>
			<div v-if="route.path === item.route" class="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
		</router-link>
	</div>
</template>

<script setup>
import { useRoute } from "vue-router"
import { inject } from "vue"
import { useAuth } from "@/utils/auth"

import HomeIcon from "@/components/icons/HomeIcon.vue"
import LeaveIcon from "@/components/icons/LeaveIcon.vue"
import ExpenseIcon from "@/components/icons/ExpenseIcon.vue"
import SalaryIcon from "@/components/icons/SalaryIcon.vue"
import AttendanceIcon from "@/components/icons/AttendanceIcon.vue"
import { FeatherIcon } from "@/utils/frappe-ui"
import {
	Briefcase,
	Globe,
	User,
	Settings,
	Users,
	Shield,
	Lock,
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
	Sliders
} from 'lucide-vue-next'

const __ = inject("$translate")
const route = useRoute()
const { isAdmin } = useAuth()

const tabItems = [
	{
		icon: HomeIcon,
		title: __("Home"),
		route: "/home",
	},
	{
		icon: AttendanceIcon,
		title: __("Attendance"),
		route: "/dashboard/attendance",
	},
	{
		icon: LeaveIcon,
		title: __("Leaves"),
		route: "/dashboard/leaves",
	},
	{
		icon: ExpenseIcon,
		title: __("Expenses"),
		route: "/dashboard/expense-claims",
	},
	{
		icon: SalaryIcon,
		title: __("Salary"),
		route: "/dashboard/salary-slips",
	},
	{
		icon: Globe,
		title: __("Careers"),
		route: "/careers",
	},
	{
		icon: Briefcase,
		title: __("My Journey"),
		route: "/my-journey",
	},
	{
		icon: Target,
		title: __("My Goals"),
		route: "/my-goals",
	},
	{
		icon: GraduationCap,
		title: __("Learning"),
		route: "/learning",
	},
	{
		icon: Award,
		title: __("Recognition"),
		route: "/recognition",
	}
]

const adminItems = [
	{
		icon: Users,
		title: __("Employee Directory"),
		route: "/admin/employees",
	},
	{
		icon: Briefcase,
		title: __("Recruitment"),
		route: "/admin/recruitment",
	},
	{
		icon: LayoutDashboard,
		title: __("Onboarding"),
		route: "/admin/workflows",
	},
	{
		icon: Clock,
		title: __("Attendance"),
		route: "/admin/attendance",
	},
	{
		icon: CalendarDays,
		title: __("Leave Management"),
		route: "/admin/leave",
	},
	{
		icon: DollarSign,
		title: __("Payroll"),
		route: "/admin/payroll",
	},
	{
		icon: Target,
		title: __("Performance"),
		route: "/admin/performance",
	},
	{
		icon: Gift,
		title: __("Benefits"),
		route: "/admin/benefits",
	},
	{
		icon: BarChart3,
		title: __("Analytics"),
		route: "/admin/analytics",
	},
	{
		icon: FileCheck,
		title: __("Compliance"),
		route: "/admin/compliance",
	},
	{
		icon: Sliders,
		title: __("Configuration"),
		route: "/admin/config",
	},
	{
		icon: Shield,
		title: __("Roles & Permissions"),
		route: "/admin/roles",
	},
	{
		icon: Lock,
		title: __("Access Management"),
		route: "/admin/user-access",
	}
]
</script>
