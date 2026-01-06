import { createRouter, createWebHistory } from "@ionic/vue-router"

import TabbedView from "@/views/TabbedView.vue"
import attendanceRoutes from "./attendance"
import leaveRoutes from "./leaves"
import claimRoutes from "./claims"
import employeeAdvanceRoutes from "./advances"
import salarySlipRoutes from "./salary_slips"

const routes = [
			{
				path: "/travel",
				name: "Travel",
				component: () => import("@/views/Travel.vue"),
			},
			{
				path: "/hr-connect",
				name: "HRConnect",
				component: () => import("@/views/HRConnect.vue"),
			},
		{
			path: "/modules",
			name: "ModulesDashboard",
			component: () => import("@/views/ModulesDashboard.vue"),
		},
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/app",
		component: TabbedView,
		children: [
			{
				path: "",
				redirect: "/home",
			},
			{
				path: "/home",
				name: "Home",
				component: () => import("@/views/Home.vue"),
			},
			{
				path: "/dashboard/attendance",
				name: "AttendanceDashboard",
				component: () => import("@/views/attendance/Dashboard.vue"),
			},
			{
				path: "/dashboard/leaves",
				name: "LeavesDashboard",
				component: () => import("@/views/leave/Dashboard.vue"),
			},
			{
				path: "/dashboard/expense-claims",
				name: "ExpenseClaimsDashboard",
				component: () => import("@/views/expense_claim/Dashboard.vue"),
			},
			{
				path: "/dashboard/salary-slips",
				name: "SalarySlipsDashboard",
				component: () => import("@/views/salary_slip/Dashboard.vue"),
			},
		],
	},
	{
		path: "/careers",
		name: "Careers",
		component: () => import("@/views/JobPublic.vue"),
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/Login.vue"),
	},
	{
		path: "/profile",
		name: "Profile",
		component: () => import("@/views/Profile.vue"),
	},
	{
		path: "/my-journey",
		name: "MyJourney",
		component: () => import("@/views/MyWorkflows.vue"),
	},
	{
		path: "/my-goals",
		name: "MyGoals",
		component: () => import("@/views/MyGoals.vue"),
	},
	{
		path: "/learning",
		name: "LearningCatalog",
		component: () => import("@/views/LearningCatalog.vue"),
	},
	{
		path: "/recognition",
		name: "RecognitionFeed",
		component: () => import("@/views/RecognitionFeed.vue"),
	},
	{
		path: "/notifications",
		name: "Notifications",
		component: () => import("@/views/Notifications.vue"),
	},
	{
		path: "/admin/employees",
		name: "EmployeeList",
		component: () => import("@/views/admin/EmployeeList.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/employees/new",
		name: "EmployeeNew",
		component: () => import("@/views/admin/EmployeeEditor.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/employees/edit/:id",
		name: "EmployeeEdit",
		component: () => import("@/views/admin/EmployeeEditor.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/recruitment",
		name: "JobManager",
		component: () => import("@/views/admin/JobManager.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/recruitment/pipeline/:jobId",
		name: "CandidatePipeline",
		component: () => import("@/views/admin/CandidatePipeline.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/workflows",
		name: "WorkflowAdmin",
		component: () => import("@/views/admin/WorkflowAdmin.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/attendance",
		name: "AttendanceAdmin",
		component: () => import("@/views/admin/AttendanceAdmin.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/leave",
		name: "LeaveAdmin",
		component: () => import("@/views/admin/LeaveAdmin.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/payroll",
		name: "PayrollDashboard",
		component: () => import("@/views/admin/PayrollDashboard.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/performance",
		name: "PerformanceAdmin",
		component: () => import("@/views/admin/PerformanceAdmin.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/benefits",
		name: "BenefitsAdmin",
		component: () => import("@/views/admin/BenefitsAdmin.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/analytics",
		name: "AnalyticsDashboard",
		component: () => import("@/views/admin/AnalyticsDashboard.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/compliance",
		name: "ComplianceCenter",
		component: () => import("@/views/admin/ComplianceCenter.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/config",
		name: "PlatformConfig",
		component: () => import("@/views/admin/PlatformConfig.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/roles",
		name: "Roles",
		component: () => import("@/views/admin/Roles.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/roles/:id",
		name: "RoleEditor",
		component: () => import("@/views/admin/RoleEditor.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/admin/user-access",
		name: "UserAccess",
		component: () => import("@/views/admin/UserAccess.vue"),
		meta: { requiresAdmin: true }
	},
	{
		path: "/forbidden",
		name: "Forbidden",
		component: () => import("@/views/admin/Forbidden.vue"),
	},
	...attendanceRoutes,
	...leaveRoutes,
	...claimRoutes,
	...employeeAdvanceRoutes,
	...salarySlipRoutes,
]

const router = createRouter({
	history: createWebHistory("/"),
	routes,
})

import { auth } from "@/utils/auth"

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAdmin && !auth.isAdmin()) {
		next({ name: 'Forbidden' })
	} else {
		next()
	}
})

export default router
