"use client"

import React from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { useAuth } from "@/lib/hooks"
import { EmployeeHeader } from "@/components/sections/EmployeeHeader"
import { InfoCards } from "@/components/sections/InfoCards"
import { LeaveAttendanceTable } from "@/components/sections/LeaveAttendanceTable"
import { AttendanceStats } from "@/components/sections/AttendanceStats"
import { FeaturesModal } from "@/components/sections/FeaturesModal"

interface FeatureCard {
	title: string
	description: string
	href: string
	icon: string
	color: string
}

const featureCards: FeatureCard[] = [
	{ title: 'Employee Directory', description: 'View and manage employee directory & org chart', href: '/directory', icon: '👥', color: 'bg-blue-50 text-blue-700' },
	{ title: 'Attendance', description: 'Track attendance and time logs', href: '/attendance', icon: '📋', color: 'bg-green-50 text-green-700' },
	{ title: 'Leave Management', description: 'Manage leave requests and balances', href: '/leave', icon: '📅', color: 'bg-purple-50 text-purple-700' },
	{ title: 'Payroll', description: 'Salary processing and slip management', href: '/salary', icon: '💵', color: 'bg-yellow-50 text-yellow-700' },
	{ title: 'Recruitment', description: 'Job openings and hiring pipeline', href: '/recruitment', icon: '💼', color: 'bg-red-50 text-red-700' },
	{ title: 'Onboarding', description: 'New hire workflows and checklist', href: '/onboarding', icon: '🚀', color: 'bg-indigo-50 text-indigo-700' },
	{ title: 'Performance', description: 'Goals, reviews, and evaluations', href: '/performance', icon: '⭐', color: 'bg-orange-50 text-orange-700' },
	{ title: 'Learning & Dev', description: 'Training courses and certifications', href: '/learning', icon: '📚', color: 'bg-cyan-50 text-cyan-700' },
	{ title: 'Recognition', description: 'Rewards, badges, and achievements', href: '/recognition', icon: '🏆', color: 'bg-pink-50 text-pink-700' },
	{ title: 'Benefits', description: 'Health, insurance, and benefits', href: '/benefits', icon: '❤️', color: 'bg-rose-50 text-rose-700' },
	{ title: 'Analytics', description: 'HR insights and metrics dashboard', href: '/analytics', icon: '📊', color: 'bg-teal-50 text-teal-700' },
	{ title: 'Compliance', description: 'Policies and compliance management', href: '/compliance', icon: '📋', color: 'bg-lime-50 text-lime-700' },
	{ title: 'Roles & Access', description: 'User roles and permissions', href: '/roles', icon: '🔐', color: 'bg-amber-50 text-amber-700' },
	{ title: 'My Goals', description: 'Personal development objectives', href: '/my-goals', icon: '🎯', color: 'bg-violet-50 text-violet-700' },
	{ title: 'Travel', description: 'Business travel management', href: '/travel', icon: '✈️', color: 'bg-sky-50 text-sky-700' },
	{ title: 'HR Connect', description: 'Internal communication & chat', href: '/hr-connect', icon: '💬', color: 'bg-emerald-50 text-emerald-700' },
	{ title: 'Configuration', description: 'System settings and setup', href: '/configuration', icon: '⚙️', color: 'bg-slate-50 text-slate-700' },
	{ title: 'Expenses', description: 'Expense claims and reimbursement', href: '/expenses', icon: '🧾', color: 'bg-fuchsia-50 text-fuchsia-700' },
]

export default function HomePage() {
	const { employee, loading } = useAuth()

	if (loading) {
		return (
			<MainLayout>
				<div className="flex items-center justify-center min-h-screen">
					<p className="text-gray-500">Loading...</p>
				</div>
			</MainLayout>
		)
	}

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Employee Profile Header */}
				<EmployeeHeader />

				{/* Info Cards */}
				<InfoCards />

				{/* Leave & Attendance Table */}
				<LeaveAttendanceTable />

				{/* Attendance Stats with Calendar */}
				<AttendanceStats />

				{/* All Features Grid */}
				<div>
					<h2 className="text-2xl font-bold text-gray-900 mb-6">All Features & Modules</h2>
					<p className="text-gray-600 mb-6">Quick access to all HRMS features</p>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{featureCards.map((feature) => (
							<Card key={feature.href} className="hover:shadow-lg transition-all cursor-pointer">
								<a href={feature.href} className="block h-full">
									<CardContent className="pt-6">
										<div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
											{feature.icon}
										</div>
										<h3 className="font-semibold text-gray-900">{feature.title}</h3>
										<p className="text-sm text-gray-600 mt-2">{feature.description}</p>
										<div className="mt-4 pt-4 border-t border-gray-200">
											<span className="text-xs text-blue-600 font-semibold hover:text-blue-700">
												Access Module →
											</span>
										</div>
									</CardContent>
								</a>
							</Card>
						))}
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
