"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Lock, Users, Key, Shield } from "lucide-react"

interface Role {
	id: string
	name: string
	userCount: number
	permissions: number
	status: "active" | "inactive"
	description: string
}

interface Permission {
	id: string
	name: string
	description: string
	category: string
}

const mockRoles: Role[] = [
	{
		id: "1",
		name: "Admin",
		userCount: 2,
		permissions: 25,
		status: "active",
		description: "Full system access and management",
	},
	{
		id: "2",
		name: "HR Manager",
		userCount: 5,
		permissions: 18,
		status: "active",
		description: "HR operations and employee management",
	},
	{
		id: "3",
		name: "Department Lead",
		userCount: 8,
		permissions: 12,
		status: "active",
		description: "Department management and approvals",
	},
	{
		id: "4",
		name: "Employee",
		userCount: 30,
		permissions: 6,
		status: "active",
		description: "Basic employee access",
	},
	{
		id: "5",
		name: "Finance Manager",
		userCount: 3,
		permissions: 14,
		status: "active",
		description: "Financial management and reporting",
	},
]

const mockPermissions: Permission[] = [
	{
		id: "1",
		name: "View Employees",
		description: "View employee directory",
		category: "Employee Management",
	},
	{
		id: "2",
		name: "Edit Employees",
		description: "Edit employee information",
		category: "Employee Management",
	},
	{
		id: "3",
		name: "Approve Leave",
		description: "Approve leave requests",
		category: "Leave Management",
	},
	{
		id: "4",
		name: "View Attendance",
		description: "View attendance records",
		category: "Attendance",
	},
	{
		id: "5",
		name: "View Payroll",
		description: "View salary information",
		category: "Payroll",
	},
	{
		id: "6",
		name: "Manage Roles",
		description: "Create and manage roles",
		category: "System Administration",
	},
]

export default function RolesPage() {
	const activeRoles = mockRoles.filter((r) => r.status === "active")
	const totalUsers = mockRoles.reduce((sum, r) => sum + r.userCount, 0)

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Roles & Access Control
						</h1>
						<p className="text-gray-600 mt-2">
							Manage user roles and permissions
						</p>
					</div>
					<Button>Create Role</Button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Total Roles</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{activeRoles.length}
									</p>
								</div>
								<Lock className="w-10 h-10 text-blue-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Users with Roles</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{totalUsers}
									</p>
								</div>
								<Users className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Total Permissions</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{mockPermissions.length}
									</p>
								</div>
								<Key className="w-10 h-10 text-purple-500 opacity-20" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Roles List */}
				<Card>
					<CardHeader>
						<CardTitle>Roles</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockRoles.map((role) => (
								<div
									key={role.id}
									className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
								>
									<div className="flex items-center justify-between mb-2">
										<h3 className="font-semibold text-gray-900">{role.name}</h3>
										<span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
											Active
										</span>
									</div>
									<p className="text-sm text-gray-600 mb-3">
										{role.description}
									</p>
									<div className="flex gap-4 text-sm">
										<span className="text-gray-600">
											Users:{" "}
											<span className="font-semibold">{role.userCount}</span>
										</span>
										<span className="text-gray-600">
											Permissions:{" "}
											<span className="font-semibold">{role.permissions}</span>
										</span>
									</div>
									<Button variant="outline" size="sm" className="mt-3">
										Edit Permissions
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Permissions */}
				<Card>
					<CardHeader>
						<CardTitle>Available Permissions</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{mockPermissions.map((permission) => (
								<div
									key={permission.id}
									className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
								>
									<div>
										<h4 className="font-semibold text-gray-900">
											{permission.name}
										</h4>
										<p className="text-sm text-gray-600">
											{permission.description}
										</p>
									</div>
									<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
										{permission.category}
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
