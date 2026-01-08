"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Search, Users, Network } from "lucide-react"

interface Employee {
	id: string
	name: string
	email: string
	role: string
	department: string
	reportingTo: string
	image: string
}

const mockEmployees: Employee[] = [
	{
		id: "1",
		name: "Sahil Ranjan",
		email: "sahil@company.com",
		role: "Product Lead",
		department: "Product",
		reportingTo: "CEO",
		image: "SR",
	},
	{
		id: "2",
		name: "Priya Sharma",
		email: "priya@company.com",
		role: "HR Manager",
		department: "Human Resources",
		reportingTo: "Head of HR",
		image: "PS",
	},
	{
		id: "3",
		name: "Amit Kumar",
		email: "amit@company.com",
		role: "Senior Developer",
		department: "Engineering",
		reportingTo: "Engineering Lead",
		image: "AK",
	},
	{
		id: "4",
		name: "Neha Singh",
		email: "neha@company.com",
		role: "Designer",
		department: "Design",
		reportingTo: "Design Lead",
		image: "NS",
	},
]

export default function DirectoryPage() {
	const [searchQuery, setSearchQuery] = useState("")
	const [viewMode, setViewMode] = useState<"list" | "org">("list")

	const filteredEmployees = mockEmployees.filter(
		(emp) =>
			emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			emp.department.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Employee Directory
						</h1>
						<p className="text-gray-600 mt-2">
							Manage and view all employees in your organization
						</p>
					</div>
					<div className="flex gap-2">
						<Button
							variant={viewMode === "list" ? "solid" : "outline"}
							onClick={() => setViewMode("list")}
						>
							<Users className="w-4 h-4 mr-2" />
							List View
						</Button>
						<Button
							variant={viewMode === "org" ? "solid" : "outline"}
							onClick={() => setViewMode("org")}
						>
							<Network className="w-4 h-4 mr-2" />
							Org Chart
						</Button>
					</div>
				</div>

				{/* Search */}
				<div className="relative">
					<Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
					<Input
						type="text"
						placeholder="Search by name, email, or department..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-10"
					/>
				</div>

				{/* View Mode: List */}
				{viewMode === "list" && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{filteredEmployees.map((emp) => (
							<Card key={emp.id} className="hover:shadow-lg transition-shadow">
								<CardContent className="pt-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-semibold">
											{emp.image}
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-gray-900">
												{emp.name}
											</h3>
											<p className="text-sm text-blue-600">{emp.role}</p>
											<p className="text-xs text-gray-500 mt-1">
												{emp.department}
											</p>
											<p className="text-xs text-gray-400 mt-2 break-all">
												{emp.email}
											</p>
											<div className="mt-3 pt-3 border-t border-gray-200">
												<p className="text-xs text-gray-600">
													Reports to: <span className="font-medium">{emp.reportingTo}</span>
												</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}

				{/* View Mode: Org Chart */}
				{viewMode === "org" && (
					<Card>
						<CardHeader>
							<CardTitle>Organization Structure</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
									<h3 className="font-semibold text-gray-900">CEO</h3>
									<p className="text-sm text-gray-600">reports: 3</p>
								</div>
								<div className="ml-8 space-y-4">
									{mockEmployees.map((emp) => (
										<div
											key={emp.id}
											className="bg-white p-4 rounded-lg border border-gray-200 relative"
										>
											<div className="absolute -left-8 top-4 w-8 h-0.5 bg-gray-300"></div>
											<h4 className="font-semibold text-gray-900">
												{emp.name}
											</h4>
											<p className="text-sm text-blue-600">{emp.role}</p>
											<p className="text-xs text-gray-500">{emp.department}</p>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</MainLayout>
	)
}
