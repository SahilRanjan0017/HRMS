'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { AttendanceCalendar } from './AttendanceCalendar'
import dayjs from 'dayjs'

export const AttendanceStats: React.FC = () => {
	const [selectedMonth, setSelectedMonth] = useState(dayjs())

	const stats = [
		{
			label: 'Present Days',
			value: '22',
			icon: '👤',
			color: 'text-green-600',
		},
		{
			label: 'Leave Taken',
			value: '2',
			icon: '📅',
			color: 'text-yellow-600',
		},
		{
			label: 'Total Hours',
			value: '8.5h',
			icon: '⏰',
			color: 'text-blue-600',
		},
		{
			label: 'Attendance %',
			value: '96.5%',
			icon: '📊',
			color: 'text-purple-600',
		},
	]

	return (
		<Card>
			<CardHeader>
				<CardTitle>This Month's Attendance</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
					{stats.map((stat, idx) => (
						<div key={idx} className="text-center">
							<p className="text-xs text-gray-500 uppercase font-medium mb-1">{stat.label}</p>
							<p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
						</div>
					))}
				</div>

				<div className="flex gap-4 mb-6">
					<button className="flex items-center gap-2 px-4 py-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium">
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
						</svg>
						All Modules
					</button>
					<button className="flex items-center gap-2 px-4 py-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium">
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4-2h2v20h-2zm4 4h2v16h-2z" />
						</svg>
						Grid
					</button>
				</div>

				<AttendanceCalendar month={selectedMonth} />
			</CardContent>
		</Card>
	)
}
