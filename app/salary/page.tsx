'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useResource } from '@/lib/hooks'

export default function SalaryPage() {
	const salaryData = useResource({
		initialData: {
			currentMonth: {
				gross: 75000,
				deductions: 15000,
				net: 60000,
			},
			lastSixMonths: [
				{ month: 'Jul 2023', gross: 75000, deductions: 15000, net: 60000 },
				{ month: 'Aug 2023', gross: 75000, deductions: 15000, net: 60000 },
				{ month: 'Sep 2023', gross: 75000, deductions: 15000, net: 60000 },
				{ month: 'Oct 2023', gross: 75000, deductions: 15000, net: 60000 },
				{ month: 'Nov 2023', gross: 75000, deductions: 15000, net: 60000 },
				{ month: 'Dec 2023', gross: 75000, deductions: 15000, net: 60000 },
			],
		},
	})

	return (
		<MainLayout>
			<div className="space-y-8">
				<h1 className="text-3xl font-bold text-gray-900">Salary</h1>

				{/* Current Salary Summary */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card>
						<CardContent>
							<div className="text-center">
								<p className="text-gray-600 text-sm mb-2">Gross Salary</p>
								<p className="text-3xl font-bold text-gray-900">₹{salaryData.data?.currentMonth.gross}</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<div className="text-center">
								<p className="text-gray-600 text-sm mb-2">Deductions</p>
								<p className="text-3xl font-bold text-red-600">₹{salaryData.data?.currentMonth.deductions}</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<div className="text-center">
								<p className="text-gray-600 text-sm mb-2">Net Salary</p>
								<p className="text-3xl font-bold text-green-600">₹{salaryData.data?.currentMonth.net}</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Salary Breakdown */}
				<Card>
					<CardHeader>
						<CardTitle>Current Month Breakdown</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							<div>
								<div className="flex justify-between mb-2">
									<span className="text-gray-700">Basic Salary</span>
									<span className="font-semibold text-gray-900">₹50,000</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
								</div>
							</div>

							<div>
								<div className="flex justify-between mb-2">
									<span className="text-gray-700">HRA</span>
									<span className="font-semibold text-gray-900">₹15,000</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
								</div>
							</div>

							<div>
								<div className="flex justify-between mb-2">
									<span className="text-gray-700">Conveyance</span>
									<span className="font-semibold text-gray-900">₹10,000</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div className="bg-blue-600 h-2 rounded-full" style={{ width: '13%' }}></div>
								</div>
							</div>

							<hr />

							<div>
								<div className="flex justify-between mb-2">
									<span className="text-gray-700 font-semibold">Income Tax</span>
									<span className="font-semibold text-red-600">₹7,500</span>
								</div>
							</div>

							<div>
								<div className="flex justify-between mb-2">
									<span className="text-gray-700 font-semibold">PF</span>
									<span className="font-semibold text-red-600">₹7,500</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Salary Slips */}
				<Card>
					<CardHeader>
						<CardTitle>Last 6 Months Salary Slips</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{salaryData.data?.lastSixMonths.map((slip: any, idx: number) => (
								<div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
									<div className="flex justify-between items-start mb-3">
										<span className="font-semibold text-gray-900">{slip.month}</span>
										<Button variant="ghost" size="sm">
											Download
										</Button>
									</div>
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-gray-600">Gross:</span>
											<span className="text-gray-900">₹{slip.gross}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Deductions:</span>
											<span className="text-gray-900">₹{slip.deductions}</span>
										</div>
										<div className="flex justify-between border-t pt-2 font-semibold">
											<span className="text-gray-900">Net:</span>
											<span className="text-green-600">₹{slip.net}</span>
										</div>
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
