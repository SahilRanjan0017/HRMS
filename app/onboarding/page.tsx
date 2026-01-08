"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { CheckCircle, Clock, AlertCircle, Users } from "lucide-react"

interface OnboardingTask {
	id: string
	title: string
	description: string
	assignee: string
	dueDate: string
	status: "completed" | "in-progress" | "pending"
	employee: string
}

const mockOnboardingTasks: OnboardingTask[] = [
	{
		id: "1",
		title: "Complete Orientation",
		description: "Company overview and policies",
		assignee: "HR Team",
		dueDate: "2024-01-10",
		status: "completed",
		employee: "John Smith",
	},
	{
		id: "2",
		title: "IT Setup",
		description: "Laptop and access provisioning",
		assignee: "IT Department",
		dueDate: "2024-01-08",
		status: "in-progress",
		employee: "John Smith",
	},
	{
		id: "3",
		title: "Team Introduction",
		description: "Meet your team members",
		assignee: "Department Lead",
		dueDate: "2024-01-12",
		status: "pending",
		employee: "John Smith",
	},
	{
		id: "4",
		title: "Complete Orientation",
		description: "Company overview and policies",
		assignee: "HR Team",
		dueDate: "2024-01-15",
		status: "pending",
		employee: "Sarah Johnson",
	},
]

const getStatusIcon = (status: string) => {
	switch (status) {
		case "completed":
			return <CheckCircle className="w-5 h-5 text-green-500" />
		case "in-progress":
			return <Clock className="w-5 h-5 text-blue-500" />
		case "pending":
			return <AlertCircle className="w-5 h-5 text-yellow-500" />
		default:
			return null
	}
}

const getStatusColor = (status: string) => {
	switch (status) {
		case "completed":
			return "bg-green-50 border-green-200"
		case "in-progress":
			return "bg-blue-50 border-blue-200"
		case "pending":
			return "bg-yellow-50 border-yellow-200"
		default:
			return ""
	}
}

export default function OnboardingPage() {
	const completedTasks = mockOnboardingTasks.filter(
		(t) => t.status === "completed"
	)
	const inProgressTasks = mockOnboardingTasks.filter(
		(t) => t.status === "in-progress"
	)
	const pendingTasks = mockOnboardingTasks.filter((t) => t.status === "pending")

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Onboarding</h1>
						<p className="text-gray-600 mt-2">
							Manage new hire workflows and tasks
						</p>
					</div>
					<Button>Add New Hire</Button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Completed</p>
									<p className="text-3xl font-bold text-green-600 mt-2">
										{completedTasks.length}
									</p>
								</div>
								<CheckCircle className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">In Progress</p>
									<p className="text-3xl font-bold text-blue-600 mt-2">
										{inProgressTasks.length}
									</p>
								</div>
								<Clock className="w-10 h-10 text-blue-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Pending</p>
									<p className="text-3xl font-bold text-yellow-600 mt-2">
										{pendingTasks.length}
									</p>
								</div>
								<AlertCircle className="w-10 h-10 text-yellow-500 opacity-20" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Onboarding Tasks */}
				<Card>
					<CardHeader>
						<CardTitle>Onboarding Checklist</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{mockOnboardingTasks.map((task) => (
								<div
									key={task.id}
									className={`flex items-start gap-4 p-4 rounded-lg border ${getStatusColor(
										task.status
									)}`}
								>
									<div className="mt-1">{getStatusIcon(task.status)}</div>
									<div className="flex-1">
										<h3 className="font-semibold text-gray-900">
											{task.title}
										</h3>
										<p className="text-sm text-gray-600">{task.description}</p>
										<div className="flex gap-4 mt-2 text-xs text-gray-500">
											<span>Employee: {task.employee}</span>
											<span>Assignee: {task.assignee}</span>
											<span>
												Due: {new Date(task.dueDate).toLocaleDateString()}
											</span>
										</div>
									</div>
									<span
										className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
											task.status === "completed"
												? "bg-green-200 text-green-800"
												: task.status === "in-progress"
												? "bg-blue-200 text-blue-800"
												: "bg-yellow-200 text-yellow-800"
										}`}
									>
										{task.status === "in-progress"
											? "In Progress"
											: task.status === "completed"
											? "Completed"
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
