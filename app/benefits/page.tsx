"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Heart, Shield, DollarSign, FileText } from "lucide-react"

interface Benefit {
	id: string
	name: string
	type: string
	status: "active" | "inactive"
	coverage: string
	employeeCount: number
	description: string
}

const mockBenefits: Benefit[] = [
	{
		id: "1",
		name: "Health Insurance",
		type: "Health",
		status: "active",
		coverage: "100%",
		employeeCount: 45,
		description: "Comprehensive health coverage for employees",
	},
	{
		id: "2",
		name: "Dental Plan",
		type: "Dental",
		status: "active",
		coverage: "80%",
		employeeCount: 40,
		description: "Preventive and restorative dental coverage",
	},
	{
		id: "3",
		name: "Vision Insurance",
		type: "Vision",
		status: "active",
		coverage: "80%",
		employeeCount: 38,
		description: "Eye care and vision correction coverage",
	},
	{
		id: "4",
		name: "Retirement Plan (401k)",
		type: "Retirement",
		status: "active",
		coverage: "100%",
		employeeCount: 42,
		description: "Employer-matched retirement savings plan",
	},
	{
		id: "5",
		name: "Life Insurance",
		type: "Life",
		status: "active",
		coverage: "100%",
		employeeCount: 43,
		description: "Life insurance coverage for employees",
	},
	{
		id: "6",
		name: "Flexible Spending Account",
		type: "FSA",
		status: "inactive",
		coverage: "N/A",
		employeeCount: 0,
		description: "Pre-tax spending account for healthcare",
	},
]

export default function BenefitsPage() {
	const activeBenefits = mockBenefits.filter((b) => b.status === "active")
	const totalEnrolled = mockBenefits.reduce((sum, b) => sum + b.employeeCount, 0)

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Employee Benefits
						</h1>
						<p className="text-gray-600 mt-2">
							Manage employee benefits and coverage
						</p>
					</div>
					<Button>Add Benefit</Button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Active Benefits</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{activeBenefits.length}
									</p>
								</div>
								<Heart className="w-10 h-10 text-red-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Enrolled Employees</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{totalEnrolled}
									</p>
								</div>
								<Shield className="w-10 h-10 text-blue-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Enrollment Rate</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">95%</p>
								</div>
								<DollarSign className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Benefits List */}
				<Card>
					<CardHeader>
						<CardTitle>Benefit Plans</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockBenefits.map((benefit) => (
								<div
									key={benefit.id}
									className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h3 className="font-semibold text-gray-900">
												{benefit.name}
											</h3>
											<p className="text-sm text-gray-600 mt-1">
												{benefit.description}
											</p>
											<div className="flex gap-4 mt-3 text-sm">
												<span className="text-gray-600">
													Type: <span className="font-medium">{benefit.type}</span>
												</span>
												<span className="text-gray-600">
													Coverage:{" "}
													<span className="font-medium">{benefit.coverage}</span>
												</span>
												<span className="text-gray-600">
													Enrolled:{" "}
													<span className="font-medium">
														{benefit.employeeCount}
													</span>
												</span>
											</div>
										</div>
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold ${
												benefit.status === "active"
													? "bg-green-100 text-green-800"
													: "bg-gray-100 text-gray-800"
											}`}
										>
											{benefit.status === "active"
												? "Active"
												: "Inactive"}
										</span>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Enrollment Summary */}
				<Card>
					<CardHeader>
						<CardTitle>Enrollment Summary</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{mockBenefits
								.filter((b) => b.status === "active")
								.map((benefit) => (
									<div
										key={benefit.id}
										className="flex items-center justify-between"
									>
										<span className="text-gray-600">{benefit.name}</span>
										<div className="flex items-center gap-2">
											<span className="font-semibold text-gray-900">
												{benefit.employeeCount}
											</span>
											<div className="w-24 bg-gray-200 rounded-full h-2">
												<div
													className="bg-blue-500 h-2 rounded-full"
													style={{
														width: `${
															(benefit.employeeCount / 45) * 100
														}%`,
													}}
												></div>
											</div>
										</div>
									</div>
								))}
						</div>
					</CardContent>
				</Card>
			</div>
		</MainLayout>
	)
}
