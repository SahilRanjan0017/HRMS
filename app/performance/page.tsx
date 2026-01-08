"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Target, TrendingUp, Award, MessageCircle } from "lucide-react"

interface Goal {
	id: string
	title: string
	status: "active" | "completed" | "on-hold"
	progress: number
	dueDate: string
	owner: string
}

interface Review {
	id: string
	employeeName: string
	reviewer: string
	rating: number
	status: "pending" | "in-progress" | "completed"
	dueDate: string
}

const mockGoals: Goal[] = [
	{
		id: "1",
		title: "Increase product adoption by 20%",
		status: "active",
		progress: 60,
		dueDate: "2024-03-31",
		owner: "Sahil Ranjan",
	},
	{
		id: "2",
		title: "Launch new feature module",
		status: "active",
		progress: 85,
		dueDate: "2024-02-15",
		owner: "Sahil Ranjan",
	},
	{
		id: "3",
		title: "Improve team productivity",
		status: "completed",
		progress: 100,
		dueDate: "2023-12-31",
		owner: "Sahil Ranjan",
	},
]

const mockReviews: Review[] = [
	{
		id: "1",
		employeeName: "Sahil Ranjan",
		reviewer: "CEO",
		rating: 4.5,
		status: "completed",
		dueDate: "2023-12-15",
	},
	{
		id: "2",
		employeeName: "Priya Sharma",
		reviewer: "Head of HR",
		rating: 4,
		status: "in-progress",
		dueDate: "2024-01-15",
	},
	{
		id: "3",
		employeeName: "Amit Kumar",
		reviewer: "Engineering Lead",
		rating: 0,
		status: "pending",
		dueDate: "2024-01-20",
	},
]

export default function PerformancePage() {
	const activeGoals = mockGoals.filter((g) => g.status === "active")
	const completedGoals = mockGoals.filter((g) => g.status === "completed")

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Performance Management
						</h1>
						<p className="text-gray-600 mt-2">
							Track goals and performance reviews
						</p>
					</div>
					<div className="flex gap-2">
						<Button>Create Goal</Button>
						<Button variant="outline">Schedule Review</Button>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Active Goals</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{activeGoals.length}
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
									<p className="text-gray-600 text-sm">Avg. Rating</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">4.2</p>
								</div>
								<Award className="w-10 h-10 text-yellow-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Completed Goals</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{completedGoals.length}
									</p>
								</div>
								<TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Goals */}
				<Card>
					<CardHeader>
						<CardTitle>Goals</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockGoals.map((goal) => (
								<div
									key={goal.id}
									className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
								>
									<div className="flex items-center justify-between mb-3">
										<h3 className="font-semibold text-gray-900">
											{goal.title}
										</h3>
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold ${
												goal.status === "active"
													? "bg-blue-100 text-blue-800"
													: goal.status === "completed"
													? "bg-green-100 text-green-800"
													: "bg-gray-100 text-gray-800"
											}`}
										>
											{goal.status === "on-hold"
												? "On Hold"
												: goal.status === "completed"
												? "Completed"
												: "Active"}
										</span>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-600">Progress</span>
											<span className="font-medium">{goal.progress}%</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2">
											<div
												className="bg-blue-500 h-2 rounded-full"
												style={{ width: `${goal.progress}%` }}
											></div>
										</div>
										<div className="flex justify-between text-xs text-gray-500 mt-2">
											<span>Owner: {goal.owner}</span>
											<span>
												Due: {new Date(goal.dueDate).toLocaleDateString()}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Performance Reviews */}
				<Card>
					<CardHeader>
						<CardTitle>Performance Reviews</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockReviews.map((review) => (
								<div
									key={review.id}
									className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
								>
									<div>
										<h3 className="font-semibold text-gray-900">
											{review.employeeName}
										</h3>
										<p className="text-sm text-gray-600">
											Reviewer: {review.reviewer}
										</p>
										<p className="text-xs text-gray-500 mt-1">
											Due: {new Date(review.dueDate).toLocaleDateString()}
										</p>
									</div>
									<div className="flex items-center gap-4">
										{review.status === "completed" && (
											<div className="text-right">
												<p className="text-2xl font-bold text-yellow-500">
													{review.rating}
												</p>
												<p className="text-xs text-gray-600">rating</p>
											</div>
										)}
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold ${
												review.status === "completed"
													? "bg-green-100 text-green-800"
													: review.status === "in-progress"
													? "bg-blue-100 text-blue-800"
													: "bg-gray-100 text-gray-800"
											}`}
										>
											{review.status === "in-progress"
												? "In Progress"
												: review.status === "completed"
												? "Completed"
												: "Pending"}
										</span>
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
