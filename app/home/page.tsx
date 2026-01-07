'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useAuth } from '@/lib/hooks'
import { EmployeeHeader } from '@/components/sections/EmployeeHeader'
import { InfoCards } from '@/components/sections/InfoCards'
import { LeaveAttendanceTable } from '@/components/sections/LeaveAttendanceTable'
import { AttendanceStats } from '@/components/sections/AttendanceStats'
import { FeaturesModal } from '@/components/sections/FeaturesModal'

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
			<div className="space-y-6">
				{/* Employee Profile Header */}
				<EmployeeHeader />

				{/* Info Cards */}
				<InfoCards />

				{/* Leave & Attendance Table */}
				<LeaveAttendanceTable />

				{/* Attendance Stats with Calendar */}
				<AttendanceStats />

				{/* Quick Features Access */}
				<div>
					<FeaturesModal />
				</div>
			</div>
		</MainLayout>
	)
}
