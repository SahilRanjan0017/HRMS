"use client"

import React from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { useAuth } from "@/lib/hooks"
import { EmployeeHeader } from "@/components/sections/EmployeeHeader"
import { InfoCards } from "@/components/sections/InfoCards"
import { LeaveAttendanceTable } from "@/components/sections/LeaveAttendanceTable"
import { AttendanceStats } from "@/components/sections/AttendanceStats"
import { ArrowRight, Briefcase, Users, TrendingUp, Award, Calendar, BookOpen, Heart, MessageSquare } from "lucide-react"

interface FeatureCard {
	title: string
	description: string
	href: string
	icon: React.ReactNode
	color: string
	bgColor: string
}

const featureCards: FeatureCard[] = [
	{
		title: "Employee Directory",
		description: "View and manage employee directory & org chart",
		href: "/directory",
		icon: <Users className="w-6 h-6" />,
		color: "text-blue-600",
		bgColor: "bg-blue-50",
	},
	{
		title: "Recruitment",
		description: "Job openings and hiring pipeline",
		href: "/recruitment",
		icon: <Briefcase className="w-6 h-6" />,
		color: "text-red-600",
		bgColor: "bg-red-50",
	},
	{
		title: "Performance",
		description: "Goals, reviews, and evaluations",
		href: "/performance",
		icon: <TrendingUp className="w-6 h-6" />,
		color: "text-orange-600",
		bgColor: "bg-orange-50",
	},
	{
		title: "Learning & Dev",
		description: "Training courses and certifications",
		href: "/learning",
		icon: <BookOpen className="w-6 h-6" />,
		color: "text-cyan-600",
		bgColor: "bg-cyan-50",
	},
	{
		title: "Recognition",
		description: "Rewards, badges, and achievements",
		href: "/recognition",
		icon: <Award className="w-6 h-6" />,
		color: "text-pink-600",
		bgColor: "bg-pink-50",
	},
	{
		title: "Benefits",
		description: "Health, insurance, and benefits",
		href: "/benefits",
		icon: <Heart className="w-6 h-6" />,
		color: "text-rose-600",
		bgColor: "bg-rose-50",
	},
	{
		title: "Onboarding",
		description: "New hire workflows and checklist",
		href: "/onboarding",
		icon: <Users className="w-6 h-6" />,
		color: "text-indigo-600",
		bgColor: "bg-indigo-50",
	},
	{
		title: "HR Connect",
		description: "Internal communication & chat",
		href: "/hr-connect",
		icon: <MessageSquare className="w-6 h-6" />,
		color: "text-emerald-600",
		bgColor: "bg-emerald-50",
	},
	{
		title: "My Goals",
		description: "Personal development objectives",
		href: "/my-goals",
		icon: <TrendingUp className="w-6 h-6" />,
		color: "text-violet-600",
		bgColor: "bg-violet-50",
	},
	{
		title: "Travel",
		description: "Business travel management",
		href: "/travel",
		icon: <Briefcase className="w-6 h-6" />,
		color: "text-sky-600",
		bgColor: "bg-sky-50",
	},
	{
		title: "Analytics",
		description: "HR insights and metrics dashboard",
		href: "/analytics",
		icon: <TrendingUp className="w-6 h-6" />,
		color: "text-teal-600",
		bgColor: "bg-teal-50",
	},
	{
		title: "Compliance",
		description: "Policies and compliance management",
		href: "/compliance",
		icon: <Calendar className="w-6 h-6" />,
		color: "text-lime-600",
		bgColor: "bg-lime-50",
	},
]

export default function HomePage() {
	const { employee, loading } = useAuth()

	if (loading) {
		return (
			<MainLayout>
				<div className="flex items-center justify-center min-h-96">
					<div className="text-center">
						<div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4"></div>
						<p className="text-gray-600 font-medium">Loading your dashboard...</p>
					</div>
				</div>
			</MainLayout>
		)
	}

	return (
		<MainLayout>
			<div className="space-y-8">
				{/* Hero Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Left Side - Welcome & Stats */}
					<div className="space-y-6">
						<EmployeeHeader />
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-6 text-center">
									<div className="text-3xl font-bold text-blue-600">22</div>
									<p className="text-gray-600 text-sm mt-2">Present Days</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6 text-center">
									<div className="text-3xl font-bold text-green-600">96.5%</div>
									<p className="text-gray-600 text-sm mt-2">Attendance</p>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Right Side - Illustration */}
					<div className="hidden lg:flex items-center justify-center">
						<div className="w-full max-w-sm">
							<div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 text-center shadow-lg">
								<div className="text-6xl mb-4">👋</div>
								<h3 className="text-2xl font-bold text-gray-900">Welcome Back!</h3>
								<p className="text-gray-600 mt-2">
									Your HRMS is ready to help you manage your HR operations efficiently.
								</p>
								<div className="mt-6 pt-6 border-t border-blue-200">
									<p className="text-sm text-gray-600">
										Access all features from the sidebar menu
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Info Cards */}
				<InfoCards />

				{/* Leave & Attendance Table */}
				<LeaveAttendanceTable />

				{/* Attendance Calendar */}
				<AttendanceStats />

				{/* All Features Section */}
				<div>
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900">
							Explore All Features
						</h2>
						<p className="text-gray-600 mt-2">
							Access all HRMS modules and tools
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{featureCards.map((feature, idx) => (
							<a
								key={idx}
								href={feature.href}
								className="group"
							>
								<Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
									<CardContent className="pt-6">
										<div
											className={`w-14 h-14 rounded-lg ${feature.bgColor} flex items-center justify-center ${feature.color} mb-4 group-hover:scale-110 transition-transform`}
										>
											{feature.icon}
										</div>
										<h3 className="font-semibold text-gray-900 text-lg">
											{feature.title}
										</h3>
										<p className="text-gray-600 text-sm mt-2">
											{feature.description}
										</p>
										<div className="mt-4 pt-4 border-t border-gray-200 flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
											<span className="text-sm">Access Now</span>
											<ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
										</div>
									</CardContent>
								</Card>
							</a>
						))}
					</div>
				</div>

				{/* More Features Link */}
				<Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-xl font-bold">Explore More Features</h3>
								<p className="text-blue-100 mt-1">
									Access Expenses, Payroll, and Configuration modules from the sidebar
								</p>
							</div>
							<ArrowRight className="w-6 h-6 flex-shrink-0" />
						</div>
					</CardContent>
				</Card>
			</div>
		</MainLayout>
	)
}
