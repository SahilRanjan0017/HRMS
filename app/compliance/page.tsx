"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Shield, AlertCircle, CheckCircle, FileText } from "lucide-react"

interface Policy {
	id: string
	title: string
	category: string
	status: "active" | "draft" | "archived"
	lastUpdated: string
	acknowledgmentRate: number
}

interface Compliance {
	id: string
	requirement: string
	status: "compliant" | "non-compliant" | "pending"
	dueDate: string
	owner: string
}

const mockPolicies: Policy[] = [
	{
		id: "1",
		title: "Code of Conduct",
		category: "Conduct",
		status: "active",
		lastUpdated: "2023-12-01",
		acknowledgmentRate: 98,
	},
	{
		id: "2",
		title: "Data Privacy & Security",
		category: "Compliance",
		status: "active",
		lastUpdated: "2023-11-15",
		acknowledgmentRate: 95,
	},
	{
		id: "3",
		title: "Anti-Harassment Policy",
		category: "Conduct",
		status: "active",
		lastUpdated: "2023-10-20",
		acknowledgmentRate: 100,
	},
	{
		id: "4",
		title: "Remote Work Policy",
		category: "Work",
		status: "active",
		lastUpdated: "2024-01-05",
		acknowledgmentRate: 85,
	},
]

const mockComplianceItems: Compliance[] = [
	{
		id: "1",
		requirement: "Annual Compliance Training",
		status: "compliant",
		dueDate: "2024-12-31",
		owner: "HR Department",
	},
	{
		id: "2",
		requirement: "Data Protection Audit",
		status: "pending",
		dueDate: "2024-02-28",
		owner: "IT Department",
	},
	{
		id: "3",
		requirement: "Employee Policy Acknowledgments",
		status: "compliant",
		dueDate: "2024-03-31",
		owner: "HR Department",
	},
]

const getStatusIcon = (status: string) => {
	switch (status) {
		case "compliant":
			return <CheckCircle className="w-5 h-5 text-green-500" />
		case "non-compliant":
			return <AlertCircle className="w-5 h-5 text-red-500" />
		case "pending":
			return <AlertCircle className="w-5 h-5 text-yellow-500" />
		default:
			return null
	}
}

export default function CompliancePage() {
	const compliantItems = mockComplianceItems.filter(
		(c) => c.status === "compliant"
	)
	const pendingItems = mockComplianceItems.filter((c) => c.status === "pending")

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Compliance & Policy Management
						</h1>
						<p className="text-gray-600 mt-2">
							Manage policies and compliance requirements
						</p>
					</div>
					<Button>Add Policy</Button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Active Policies</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{mockPolicies.filter((p) => p.status === "active").length}
									</p>
								</div>
								<FileText className="w-10 h-10 text-blue-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Compliance Status</p>
									<p className="text-3xl font-bold text-green-600 mt-2">
										{compliantItems.length}/{mockComplianceItems.length}
									</p>
								</div>
								<Shield className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Avg. Acknowledgment</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{Math.round(
											mockPolicies.reduce(
												(sum, p) => sum + p.acknowledgmentRate,
												0
											) / mockPolicies.length
										)}
										%
									</p>
								</div>
								<CheckCircle className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Policies */}
				<Card>
					<CardHeader>
						<CardTitle>Company Policies</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockPolicies.map((policy) => (
								<div
									key={policy.id}
									className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
								>
									<div className="flex items-center justify-between">
										<div className="flex-1">
											<h3 className="font-semibold text-gray-900">
												{policy.title}
											</h3>
											<p className="text-sm text-gray-600 mt-1">
												{policy.category} • Last updated:{" "}
												{new Date(policy.lastUpdated).toLocaleDateString()}
											</p>
											<div className="mt-3">
												<div className="flex items-center justify-between mb-2">
													<span className="text-xs text-gray-600">
														Acknowledgment Rate
													</span>
													<span className="font-semibold text-gray-900">
														{policy.acknowledgmentRate}%
													</span>
												</div>
												<div className="w-full bg-gray-200 rounded-full h-2">
													<div
														className="bg-green-500 h-2 rounded-full"
														style={{
															width: `${policy.acknowledgmentRate}%`,
														}}
													></div>
												</div>
											</div>
										</div>
										<span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 ml-4">
											Active
										</span>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Compliance Requirements */}
				<Card>
					<CardHeader>
						<CardTitle>Compliance Requirements</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{mockComplianceItems.map((item) => (
								<div
									key={item.id}
									className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
								>
									<div className="flex items-center gap-3 flex-1">
										{getStatusIcon(item.status)}
										<div>
											<h3 className="font-semibold text-gray-900">
												{item.requirement}
											</h3>
											<p className="text-sm text-gray-600">
												Owner: {item.owner} • Due:{" "}
												{new Date(item.dueDate).toLocaleDateString()}
											</p>
										</div>
									</div>
									<span
										className={`px-3 py-1 rounded-full text-xs font-semibold ${
											item.status === "compliant"
												? "bg-green-100 text-green-800"
												: item.status === "non-compliant"
												? "bg-red-100 text-red-800"
												: "bg-yellow-100 text-yellow-800"
										}`}
									>
										{item.status === "non-compliant"
											? "Non-Compliant"
											: item.status === "compliant"
											? "Compliant"
											: "Pending"}
									</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</MainLayout>
	)
}
