"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Plane, MapPin, DollarSign, Calendar } from "lucide-react"

interface TravelRequest {
	id: string
	destination: string
	purpose: string
	startDate: string
	endDate: string
	status: "pending" | "approved" | "rejected" | "completed"
	estimatedCost: number
	employee: string
}

const mockTravelRequests: TravelRequest[] = [
	{
		id: "1",
		destination: "San Francisco, USA",
		purpose: "Client Meeting & Conference",
		startDate: "2024-02-15",
		endDate: "2024-02-20",
		status: "approved",
		estimatedCost: 2500,
		employee: "Sahil Ranjan",
	},
	{
		id: "2",
		destination: "London, UK",
		purpose: "Team Offsite & Training",
		startDate: "2024-03-10",
		endDate: "2024-03-17",
		status: "pending",
		estimatedCost: 4200,
		employee: "Priya Sharma",
	},
	{
		id: "3",
		destination: "Tokyo, Japan",
		purpose: "Business Development",
		startDate: "2024-04-01",
		endDate: "2024-04-10",
		status: "pending",
		estimatedCost: 5800,
		employee: "Amit Kumar",
	},
	{
		id: "4",
		destination: "New York, USA",
		purpose: "Client Meeting",
		startDate: "2024-01-15",
		endDate: "2024-01-18",
		status: "completed",
		estimatedCost: 2200,
		employee: "Neha Singh",
	},
]

export default function TravelPage() {
	const pendingRequests = mockTravelRequests.filter(
		(r) => r.status === "pending"
	)
	const approvedRequests = mockTravelRequests.filter(
		(r) => r.status === "approved"
	)
	const completedRequests = mockTravelRequests.filter(
		(r) => r.status === "completed"
	)
	const totalBudget = mockTravelRequests.reduce(
		(sum, r) => sum + r.estimatedCost,
		0
	)

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Travel & Business Management
						</h1>
						<p className="text-gray-600 mt-2">
							Manage business travel requests and expenses
						</p>
					</div>
					<Button>Request Travel</Button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Pending Requests</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{pendingRequests.length}
									</p>
								</div>
								<Calendar className="w-10 h-10 text-orange-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Approved</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{approvedRequests.length}
									</p>
								</div>
								<Plane className="w-10 h-10 text-blue-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Completed</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{completedRequests.length}
									</p>
								</div>
								<MapPin className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Total Budget</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										${(totalBudget / 1000).toFixed(1)}K
									</p>
								</div>
								<DollarSign className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Travel Requests */}
				<Card>
					<CardHeader>
						<CardTitle>Travel Requests</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockTravelRequests.map((request) => (
								<div
									key={request.id}
									className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
								>
									<div className="flex items-start justify-between mb-3">
										<div>
											<h3 className="font-semibold text-gray-900">
												{request.destination}
											</h3>
											<p className="text-sm text-gray-600 mt-1">
												{request.purpose}
											</p>
										</div>
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold ${
												request.status === "approved"
													? "bg-green-100 text-green-800"
													: request.status === "pending"
													? "bg-yellow-100 text-yellow-800"
													: request.status === "completed"
													? "bg-blue-100 text-blue-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{request.status === "in-progress"
												? "In Progress"
												: request.status.charAt(0).toUpperCase() +
												  request.status.slice(1)}
										</span>
									</div>

									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
										<div>
											<p className="text-xs text-gray-600">From</p>
											<p className="text-sm font-medium text-gray-900 mt-1">
												{new Date(request.startDate).toLocaleDateString()}
											</p>
										</div>
										<div>
											<p className="text-xs text-gray-600">To</p>
											<p className="text-sm font-medium text-gray-900 mt-1">
												{new Date(request.endDate).toLocaleDateString()}
											</p>
										</div>
										<div>
											<p className="text-xs text-gray-600">Estimated Cost</p>
											<p className="text-sm font-medium text-gray-900 mt-1">
												${request.estimatedCost}
											</p>
										</div>
										<div>
											<p className="text-xs text-gray-600">Employee</p>
											<p className="text-sm font-medium text-gray-900 mt-1">
												{request.employee}
											</p>
										</div>
									</div>

									{request.status === "pending" && (
										<div className="flex gap-2">
											<Button variant="solid" size="sm">
												Approve
											</Button>
											<Button variant="outline" size="sm">
												Reject
											</Button>
										</div>
									)}
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Travel Policy */}
				<Card>
					<CardHeader>
						<CardTitle>Travel Policy Guidelines</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{[
								{
									title: "Advance Booking",
									description: "Book travel at least 2 weeks in advance",
								},
								{
									title: "Budget Limits",
									description: "Domestic: $3000, International: $8000",
								},
								{
									title: "Approval Required",
									description: "All travel requests require manager approval",
								},
								{
									title: "Expense Reports",
									description: "Submit expense reports within 5 days of return",
								},
							].map((item, idx) => (
								<div
									key={idx}
									className="p-3 bg-gray-50 rounded-lg border border-gray-200"
								>
									<h4 className="font-semibold text-gray-900">{item.title}</h4>
									<p className="text-sm text-gray-600 mt-1">
										{item.description}
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
