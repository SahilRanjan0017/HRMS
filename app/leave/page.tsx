'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useResource } from '@/lib/hooks'

export default function LeavePage() {
	const leaveBalance = useResource({
		initialData: {
			casual: { allocated: 12, taken: 3, available: 9 },
			privilege: { allocated: 10, taken: 2, available: 8 },
			sick: { allocated: 5, taken: 0, available: 5 },
		},
	})

	const leaveRequests = useResource({
		initialData: [
			{ id: 1, type: 'Casual Leave', from: '2024-01-15', to: '2024-01-17', status: 'Approved', days: 3 },
			{ id: 2, type: 'Sick Leave', from: '2024-01-10', to: '2024-01-10', status: 'Approved', days: 1 },
			{ id: 3, type: 'Casual Leave', from: '2024-02-01', to: '2024-02-02', status: 'Pending', days: 2 },
		],
	})

	return (
		<MainLayout>
			<div className="space-y-8">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
					<Button variant="solid">Apply for Leave</Button>
				</div>

				{/* Leave Balance */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card>
						<CardContent>
							<div className="space-y-3">
								<h3 className="font-semibold text-gray-900">Casual Leave</h3>
								<div className="space-y-1">
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Allocated:</span>
										<span className="font-semibold text-gray-900">{leaveBalance.data?.casual.allocated}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Taken:</span>
										<span className="font-semibold text-orange-600">{leaveBalance.data?.casual.taken}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Available:</span>
										<span className="font-semibold text-green-600">{leaveBalance.data?.casual.available}</span>
									</div>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2 mt-4">
									<div
										className="bg-green-600 h-2 rounded-full"
										style={{ width: `${(leaveBalance.data?.casual.available || 0) * 8}%` }}
									></div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<div className="space-y-3">
								<h3 className="font-semibold text-gray-900">Privilege Leave</h3>
								<div className="space-y-1">
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Allocated:</span>
										<span className="font-semibold text-gray-900">{leaveBalance.data?.privilege.allocated}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Taken:</span>
										<span className="font-semibold text-orange-600">{leaveBalance.data?.privilege.taken}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Available:</span>
										<span className="font-semibold text-green-600">{leaveBalance.data?.privilege.available}</span>
									</div>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2 mt-4">
									<div
										className="bg-green-600 h-2 rounded-full"
										style={{ width: `${(leaveBalance.data?.privilege.available || 0) * 8}%` }}
									></div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<div className="space-y-3">
								<h3 className="font-semibold text-gray-900">Sick Leave</h3>
								<div className="space-y-1">
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Allocated:</span>
										<span className="font-semibold text-gray-900">{leaveBalance.data?.sick.allocated}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Taken:</span>
										<span className="font-semibold text-orange-600">{leaveBalance.data?.sick.taken}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Available:</span>
										<span className="font-semibold text-green-600">{leaveBalance.data?.sick.available}</span>
									</div>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2 mt-4">
									<div
										className="bg-green-600 h-2 rounded-full"
										style={{ width: `${(leaveBalance.data?.sick.available || 0) * 20}%` }}
									></div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Leave Requests */}
				<Card>
					<CardHeader>
						<CardTitle>Leave Requests</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b">
										<th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-700">From - To</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-700">Days</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
									</tr>
								</thead>
								<tbody>
									{leaveRequests.data?.map((request: any) => (
										<tr key={request.id} className="border-b hover:bg-gray-50">
											<td className="py-3 px-4 text-gray-900">{request.type}</td>
											<td className="py-3 px-4 text-gray-900">
												{request.from} to {request.to}
											</td>
											<td className="py-3 px-4 text-gray-900">{request.days}</td>
											<td className="py-3 px-4">
												<span
													className={`px-3 py-1 rounded-full text-sm font-semibold ${
														request.status === 'Approved'
															? 'bg-green-100 text-green-700'
															: 'bg-yellow-100 text-yellow-700'
													}`}
												>
													{request.status}
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
