'use client'

import React, { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useResource } from '@/lib/hooks'

export default function AttendancePage() {
	const [lastCheckIn, setLastCheckIn] = useState<string | null>(null)

	const attendanceData = useResource({
		initialData: [
			{ date: '2024-01-06', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present' },
			{ date: '2024-01-05', checkIn: '09:15 AM', checkOut: '05:45 PM', status: 'Present' },
			{ date: '2024-01-04', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present' },
			{ date: '2024-01-03', checkIn: '09:30 AM', checkOut: '06:00 PM', status: 'Present' },
			{ date: '2024-01-02', checkIn: '—', checkOut: '—', status: 'Holiday' },
		],
	})

	const handleCheckIn = () => {
		setLastCheckIn(new Date().toLocaleTimeString())
	}

	return (
		<MainLayout>
			<div className="space-y-8">
				<h1 className="text-3xl font-bold text-gray-900">Attendance</h1>

				{/* Quick Checkin */}
				<Card>
					<CardHeader>
						<CardTitle>Check In / Check Out</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{lastCheckIn && (
								<div className="p-4 bg-green-50 border border-green-200 rounded-lg">
									<p className="text-green-700">✓ Checked in at {lastCheckIn}</p>
								</div>
							)}
							<div className="flex gap-4">
								<Button variant="solid" size="lg" onClick={handleCheckIn}>
									Check In
								</Button>
								<Button variant="outline" size="lg">
									Check Out
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Attendance Records */}
				<Card>
					<CardHeader>
						<CardTitle>Attendance Records</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b">
										<th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-700">Check In</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-700">Check Out</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
									</tr>
								</thead>
								<tbody>
									{attendanceData.data?.map((record: any, idx: number) => (
										<tr key={idx} className="border-b hover:bg-gray-50">
											<td className="py-3 px-4 text-gray-900">{record.date}</td>
											<td className="py-3 px-4 text-gray-900">{record.checkIn}</td>
											<td className="py-3 px-4 text-gray-900">{record.checkOut}</td>
											<td className="py-3 px-4">
												<span
													className={`px-3 py-1 rounded-full text-sm font-semibold ${
														record.status === 'Present'
															? 'bg-green-100 text-green-700'
															: 'bg-gray-100 text-gray-700'
													}`}
												>
													{record.status}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>
			</div>
		</MainLayout>
	)
}
