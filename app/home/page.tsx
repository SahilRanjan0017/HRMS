'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useAuth } from '@/lib/hooks'

export default function HomePage() {
	const { employee, loading } = useAuth()

	if (loading) {
		return (
			<MainLayout>
				<div className="flex items-center justify-center min-h-screen">
					<p className="text-gray-500">Loading...</p>
				</div>
			</MainLayout>
		)
	}

	return (
		<MainLayout>
			<div className="space-y-8">
				{/* Welcome Section */}
				<div className="space-y-2">
					<h1 className="text-4xl font-bold text-gray-900">Welcome back, {employee?.employee_name}!</h1>
					<p className="text-gray-600">Here's your HR dashboard</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<Card>
						<CardContent>
							<div className="text-center">
								<p className="text-gray-600 text-sm mb-2">Total Leave Balance</p>
								<p className="text-3xl font-bold text-blue-600">12 days</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<div className="text-center">
								<p className="text-gray-600 text-sm mb-2">Leaves Taken</p>
								<p className="text-3xl font-bold text-green-600">8 days</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<div className="text-center">
								<p className="text-gray-600 text-sm mb-2">Pending Approvals</p>
								<p className="text-3xl font-bold text-orange-600">3</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<div className="text-center">
								<p className="text-gray-600 text-sm mb-2">Attendance Rate</p>
								<p className="text-3xl font-bold text-purple-600">95%</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Attendance</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 mb-4">Check in/out or view your attendance history</p>
							<button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
								Go to Attendance
							</button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Leave Request</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 mb-4">Apply for leaves or view your leave status</p>
							<button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
								Request Leave
							</button>
						</CardContent>
					</Card>
				</div>
			</div>
		</MainLayout>
	)
}
