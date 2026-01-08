"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Target, TrendingUp, CheckCircle, Clock } from "lucide-react"

interface PersonalGoal {
	id: string
	title: string
	category: string
	status: "not-started" | "in-progress" | "completed" | "on-hold"
	progress: number
	dueDate: string
	description: string
	priority: "high" | "medium" | "low"
}

const mockPersonalGoals: PersonalGoal[] = [
	{
		id: "1",
		title: "Improve Product Launch Process",
		category: "Professional Development",
		status: "in-progress",
		progress: 65,
		dueDate: "2024-03-31",
		description: "Streamline the product launch workflow to reduce time-to-market",
		priority: "high",
	},
	{
		id: "2",
		title: "Learn Advanced React Patterns",
		category: "Skill Development",
		status: "in-progress",
		progress: 45,
		dueDate: "2024-04-15",
		description: "Complete advanced React training course",
		priority: "high",
	},
	{
		id: "3",
		title: "Mentor Junior Developers",
		category: "Leadership",
		status: "in-progress",
		progress: 70,
		dueDate: "2024-06-30",
		description: "Mentor 2 junior developers and help them grow",
		priority: "medium",
	},
	{
		id: "4",
		title: "Complete Project Management Certification",
		category: "Certification",
		status: "not-started",
		progress: 0,
		dueDate: "2024-08-31",
		description: "Obtain PMP certification",
		priority: "medium",
	},
	{
		id: "5",
		title: "Improve Communication Skills",
		category: "Soft Skills",
		status: "on-hold",
		progress: 30,
		dueDate: "2024-05-31",
		description: "Take public speaking and presentation skills course",
		priority: "low",
	},
]

const getPriorityColor = (priority: string) => {
	switch (priority) {
		case "high":
			return "text-red-600"
		case "medium":
			return "text-yellow-600"
		case "low":
			return "text-green-600"
		default:
			return "text-gray-600"
	}
}

const getStatusColor = (status: string) => {
	switch (status) {
		case "completed":
			return "bg-green-50 border-green-200"
		case "in-progress":
			return "bg-blue-50 border-blue-200"
		case "on-hold":
			return "bg-yellow-50 border-yellow-200"
		default:
			return "bg-gray-50 border-gray-200"
	}
}

export default function MyGoalsPage() {
	const completedGoals = mockPersonalGoals.filter((g) => g.status === "completed")
	const inProgressGoals = mockPersonalGoals.filter((g) => g.status === "in-progress")
	const notStartedGoals = mockPersonalGoals.filter((g) => g.status === "not-started")

	const averageProgress = Math.round(
		mockPersonalGoals.reduce((sum, g) => sum + g.progress, 0) /
			mockPersonalGoals.length
	)

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							My Personal Goals
						</h1>
						<p className="text-gray-600 mt-2">
							Track your personal development objectives
						</p>
					</div>
					<Button>Create Goal</Button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Total Goals</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{mockPersonalGoals.length}
									</p>
								</div>
								<Target className="w-10 h-10 text-blue-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">In Progress</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{inProgressGoals.length}
									</p>
								</div>
								<Clock className="w-10 h-10 text-orange-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Completed</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{completedGoals.length}
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
									<p className="text-gray-600 text-sm">
										Avg. Progress
									</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{averageProgress}%
									</p>
								</div>
								<TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Goals List */}
				<Card>
					<CardHeader>
						<CardTitle>Your Goals</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockPersonalGoals.map((goal) => (
								<div
									key={goal.id}
									className={`p-4 rounded-lg border ${getStatusColor(
										goal.status
									)}`}
								>
									<div className="flex items-start justify-between mb-3">
										<div>
											<h3 className="font-semibold text-gray-900">
												{goal.title}
											</h3>
											<p className="text-sm text-gray-600 mt-1">
												{goal.category}
											</p>
										</div>
										<div className="flex items-center gap-2">
											<span
												className={`text-xs font-semibold uppercase ${getPriorityColor(
													goal.priority
												)}`}
											>
												{goal.priority}
											</span>
											<span
												className={`px-3 py-1 rounded-full text-xs font-semibold ${
													goal.status === "completed"
														? "bg-green-200 text-green-800"
														: goal.status === "in-progress"
															? "bg-blue-200 text-blue-800"
															: goal.status === "on-hold"
																? "bg-yellow-200 text-yellow-800"
																: "bg-gray-200 text-gray-800"
												}`}
											>
												{goal.status === "in-progress"
													? "In Progress"
													: goal.status === "not-started"
														? "Not Started"
														: goal.status === "on-hold"
															? "On Hold"
															: "Completed"}
											</span>
										</div>
									</div>

									<p className="text-sm text-gray-600 mb-3">
										{goal.description}
									</p>

									<div className="space-y-2">
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-600">Progress</span>
											<span className="font-medium">
												{goal.progress}%
											</span>
										</div>
										<div className="w-full bg-gray-300 rounded-full h-2">
											<div
												className="bg-blue-500 h-2 rounded-full"
												style={{ width: `${goal.progress}%` }}
											></div>
										</div>
										<p className="text-xs text-gray-500 mt-2">
											Due: {new Date(goal.dueDate).toLocaleDateString()}
										</p>
									</div>

									<div className="flex gap-2 mt-4">
										<Button
											variant="outline"
											size="sm"
											className="flex-1"
										>
											Update Progress
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="flex-1"
										>
											Edit
										</Button>
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
