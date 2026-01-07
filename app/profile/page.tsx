'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/lib/hooks'

export default function ProfilePage() {
	const { user, employee, loading } = useAuth()

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
				<h1 className="text-3xl font-bold text-gray-900">Profile</h1>

				{/* Profile Header */}
				<Card>
					<CardContent>
						<div className="flex items-center gap-6">
							<div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
								<span className="text-4xl text-white">{employee?.employee_name?.charAt(0)}</span>
							</div>
							<div>
								<h2 className="text-2xl font-bold text-gray-900">{employee?.employee_name}</h2>
								<p className="text-gray-600">{employee?.designation}</p>
								<p className="text-sm text-gray-500 mt-2">ID: {employee?.name}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Employee Information */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Employment Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<p className="text-sm text-gray-600">Department</p>
								<p className="text-lg font-semibold text-gray-900">{employee?.department}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Company</p>
								<p className="text-lg font-semibold text-gray-900">{employee?.company}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Date of Joining</p>
								<p className="text-lg font-semibold text-gray-900">{employee?.date_of_joining}</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Account Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<p className="text-sm text-gray-600">Email</p>
								<p className="text-lg font-semibold text-gray-900">{user?.email || 'Not set'}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">User ID</p>
								<p className="text-lg font-semibold text-gray-900">{user?.name}</p>
							</div>
							<div>
								<Button variant="outline" className="mt-4">
									Change Password
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</MainLayout>
	)
}
