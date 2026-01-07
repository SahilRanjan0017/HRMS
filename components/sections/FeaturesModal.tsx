"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/Card"

interface Module {
	id: string
	title: string
	description: string
	icon: string
	color: string
	badge?: number
}

export const FeaturesModal: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	const modules: Module[] = [
		{
			id: "employee",
			title: "Employee Directory",
			description: "Manage employees",
			icon: "👥",
			color: "bg-blue-100",
		},
		{
			id: "recruitment",
			title: "Recruitment",
			description: "Hiring & job posts",
			icon: "📋",
			color: "bg-purple-100",
		},
		{
			id: "onboarding",
			title: "Onboarding",
			description: "New hire workflows",
			icon: "✓",
			color: "bg-green-100",
		},
		{
			id: "attendance",
			title: "Attendance",
			description: "Time tracking",
			icon: "⏰",
			color: "bg-orange-100",
			badge: 12,
		},
		{
			id: "leave",
			title: "Leave",
			description: "Leave requests",
			icon: "📅",
			color: "bg-pink-100",
			badge: 8,
		},
		{
			id: "payroll",
			title: "Payroll",
			description: "Salary processing",
			icon: "💰",
			color: "bg-green-100",
		},
		{
			id: "performance",
			title: "Performance",
			description: "Goals & reviews",
			icon: "📊",
			color: "bg-purple-100",
		},
		{
			id: "learning",
			title: "Learning",
			description: "Training programs",
			icon: "📚",
			color: "bg-blue-100",
		},
		{
			id: "recognition",
			title: "Recognition",
			description: "Rewards & badges",
			icon: "🏆",
			color: "bg-yellow-100",
		},
		{
			id: "benefits",
			title: "Benefits",
			description: "Health & insurance",
			icon: "❤️",
			color: "bg-red-100",
		},
		{
			id: "analytics",
			title: "Analytics",
			description: "HR insights & reports",
			icon: "📈",
			color: "bg-green-100",
		},
		{
			id: "compliance",
			title: "Compliance",
			description: "Regulations & policies",
			icon: "⚖️",
			color: "bg-indigo-100",
		},
		{
			id: "roles",
			title: "Roles",
			description: "Access control",
			icon: "🔐",
			color: "bg-gray-100",
		},
		{
			id: "goals",
			title: "My Goals",
			description: "Goal tracking",
			icon: "🎯",
			color: "bg-cyan-100",
		},
		{
			id: "careers",
			title: "Careers",
			description: "Career development",
			icon: "🚀",
			color: "bg-blue-100",
		},
		{
			id: "config",
			title: "Configuration",
			description: "System settings",
			icon: "⚙️",
			color: "bg-green-100",
		},
		{
			id: "travel",
			title: "Travel",
			description: "Travel requests",
			icon: "✈️",
			color: "bg-sky-100",
		},
		{
			id: "connect",
			title: "HR Connect",
			description: "Integration platform",
			icon: "🔗",
			color: "bg-pink-100",
		},
	]

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
			>
				All Features & Modules →
			</button>

			{isOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
							<div>
								<h2 className="text-2xl font-bold text-gray-900">
									All Features & Modules
								</h2>
								<p className="text-gray-600 text-sm mt-1">
									Quick access to all HRMS features
								</p>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						<div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
							{modules.map((module) => (
								<div
									key={module.id}
									className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer hover:border-gray-300"
								>
									<div
										className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-3`}
									>
										{module.icon}
									</div>
									<h3 className="font-bold text-gray-900 text-sm">
										{module.title}
									</h3>
									<p className="text-gray-600 text-xs mt-1">
										{module.description}
									</p>
									{module.badge && (
										<span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
											{module.badge}
										</span>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	)
}
