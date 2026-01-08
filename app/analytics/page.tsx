"use client"

import React from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { TrendingUp, Users, BarChart3, PieChart } from "lucide-react"

export default function AnalyticsPage() {
	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Analytics & HR Insights
					</h1>
					<p className="text-gray-600 mt-2">
						HR metrics and organizational insights
					</p>
				</div>

				{/* Key Metrics */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Total Employees</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">45</p>
									<p className="text-xs text-green-600 mt-2">↑ 2 this month</p>
								</div>
								<Users className="w-10 h-10 text-blue-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Avg. Tenure</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">3.2</p>
									<p className="text-xs text-gray-600 mt-2">years</p>
								</div>
								<TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Attrition Rate</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">8.5%</p>
									<p className="text-xs text-red-600 mt-2">↑ from 7.2%</p>
								</div>
								<BarChart3 className="w-10 h-10 text-red-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Avg. Performance</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">4.1</p>
									<p className="text-xs text-gray-600 mt-2">out of 5</p>
								</div>
								<PieChart className="w-10 h-10 text-yellow-500 opacity-20" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Department Distribution */}
				<Card>
					<CardHeader>
						<CardTitle>Employee Distribution by Department</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{ name: "Engineering", count: 15, percentage: 33 },
								{ name: "Product", count: 8, percentage: 18 },
								{ name: "Design", count: 5, percentage: 11 },
								{ name: "Sales", count: 10, percentage: 22 },
								{ name: "HR & Admin", count: 7, percentage: 16 },
							].map((dept, idx) => (
								<div key={idx}>
									<div className="flex items-center justify-between mb-2">
										<span className="text-gray-900 font-medium">
											{dept.name}
										</span>
										<span className="text-gray-600">
											{dept.count} ({dept.percentage}%)
										</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div
											className="bg-blue-500 h-2 rounded-full"
											style={{ width: `${dept.percentage}%` }}
										></div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Attendance Trends */}
				<Card>
					<CardHeader>
						<CardTitle>Attendance Trends (Last 30 Days)</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{ metric: "Average Attendance", value: "94.2%" },
								{ metric: "On-Time Arrivals", value: "92.8%" },
								{ metric: "Leave Utilization", value: "45.3%" },
								{ metric: "Absenteeism Rate", value: "5.8%" },
							].map((item, idx) => (
								<div
									key={idx}
									className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
								>
									<span className="text-gray-700">{item.metric}</span>
									<span className="font-bold text-gray-900">{item.value}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Compensation Analytics */}
				<Card>
					<CardHeader>
						<CardTitle>Compensation Analysis</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{[
								{
									label: "Average Salary",
									value: "$75,000",
									change: "+5% YoY",
								},
								{
									label: "Median Salary",
									value: "$72,500",
									change: "+4% YoY",
								},
								{
									label: "Salary Range",
									value: "$40K - $150K",
									change: "IQR: $60K-$85K",
								},
								{
									label: "Benefits Cost",
									value: "$1.2M",
									change: "+8% YoY",
								},
							].map((item, idx) => (
								<div
									key={idx}
									className="p-4 border border-gray-200 rounded-lg"
								>
									<p className="text-gray-600 text-sm">{item.label}</p>
									<p className="text-2xl font-bold text-gray-900 mt-2">
										{item.value}
									</p>
									<p className="text-xs text-gray-500 mt-2">{item.change}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Recruitment Metrics */}
				<Card>
					<CardHeader>
						<CardTitle>Recruitment Metrics</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{[
								{ label: "Time to Hire", value: "32 days", icon: "📅" },
								{ label: "Cost per Hire", value: "$4,500", icon: "💰" },
								{
									label: "Offer Acceptance Rate",
									value: "92%",
									icon: "✅",
								},
							].map((item, idx) => (
								<div
									key={idx}
									className="p-4 border border-gray-200 rounded-lg text-center"
								>
									<div className="text-3xl mb-2">{item.icon}</div>
									<p className="text-gray-600 text-sm">{item.label}</p>
									<p className="text-2xl font-bold text-gray-900 mt-2">
										{item.value}
									</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</MainLayout>
	)
}
