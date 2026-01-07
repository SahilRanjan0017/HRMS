'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface LeaveType {
	type: string
	opening: number
	utilized: number
	balance: number
}

export const LeaveAttendanceTable: React.FC = () => {
	const leaveData: LeaveType[] = [
		{
			type: 'Casual Leave',
			opening: 6.0,
			utilized: 0.0,
			balance: 6.0,
		},
		{
			type: 'Privilege Leave',
			opening: 13.67,
			utilized: 0.0,
			balance: 13.67,
		},
		{
			type: 'Sick Leave',
			opening: 12.0,
			utilized: 0.0,
			balance: 12.0,
		},
	]

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Leave & Attendance</CardTitle>
					<span className="text-xs font-medium text-gray-600">LeaveSpecialWHFCOFF</span>
				</div>
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-200">
								<th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Type</th>
								<th className="text-right py-3 px-4 font-semibold text-gray-900 text-sm">Opening</th>
								<th className="text-right py-3 px-4 font-semibold text-gray-900 text-sm">Leave Taken</th>
								<th className="text-right py-3 px-4 font-semibold text-gray-900 text-sm">Utilized</th>
								<th className="text-right py-3 px-4 font-semibold text-gray-900 text-sm">Balance</th>
								<th className="text-center py-3 px-4 font-semibold text-gray-900 text-sm">Action</th>
							</tr>
						</thead>
						<tbody>
							{leaveData.map((leave, idx) => (
								<tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
									<td className="py-4 px-4 text-gray-900 font-medium">{leave.type}</td>
									<td className="py-4 px-4 text-right text-gray-600">{leave.opening.toFixed(2)}</td>
									<td className="py-4 px-4 text-right text-gray-600">0.00</td>
									<td className="py-4 px-4 text-right text-gray-600">{leave.utilized.toFixed(2)}</td>
									<td className="py-4 px-4 text-right font-semibold text-gray-900">{leave.balance.toFixed(2)}</td>
									<td className="py-4 px-4 text-center">
										<button className="px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors">
											Apply
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	)
}
