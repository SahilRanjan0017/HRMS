'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useResource } from '@/lib/hooks'

export default function ExpensesPage() {
	const expensesSummary = useResource({
		initialData: {
			totalClaimed: 15000,
			pending: 5000,
			approved: 10000,
			rejected: 0,
		},
	})

	const expenses = useResource({
		initialData: [
			{
				id: 1,
				date: '2024-01-05',
				category: 'Travel',
				amount: 3500,
				status: 'Approved',
				description: 'Flight to Mumbai',
			},
			{
				id: 2,
				date: '2024-01-03',
				category: 'Meals',
				amount: 1500,
				status: 'Approved',
				description: 'Client meeting expenses',
			},
			{
				id: 3,
				date: '2024-01-01',
				category: 'Office Supplies',
				amount: 2000,
				status: 'Pending',
				description: 'Stationery items',
			},
		],
	})

	return (
		<MainLayout>
			<div className="space-y-8">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-gray-900">Expense Claims</h1>
					<Button variant="solid">New Expense</Button>
				</div>

				{/* Summary Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<Card>
						<CardContent>
							<div className="text-center">
								<p className="text-gray-600 text-sm mb-2">Total Claimed</p>
								<p className="text-3xl font-bold text-blue-600">₹{expensesSummary.data?.totalClaimed}</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<div className="text-center">
								<p className="text-gray-600 text-sm mb-2">Pending</p>
								<p className="text-3xl font-bold text-orange-600">₹{expensesSummary.data?.pending}</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<div className="text-center">
								<p className="text-gray-600 text-sm mb-2">Approved</p>
								<p className="text-3xl font-bold text-green-600">₹{expensesSummary.data?.approved}</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<div className="text-center">
								<p className="text-gray-600 text-sm mb-2">Rejected</p>
								<p className="text-3xl font-bold text-red-600">₹{expensesSummary.data?.rejected}</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Expense List */}
				<Card>
					<CardHeader>
						<CardTitle>Expense Claims</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b">
										<th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
									</tr>
								</thead>
								<tbody>
									{expenses.data?.map((expense: any) => (
										<tr key={expense.id} className="border-b hover:bg-gray-50">
											<td className="py-3 px-4 text-gray-900">{expense.date}</td>
											<td className="py-3 px-4 text-gray-900">{expense.category}</td>
											<td className="py-3 px-4 text-gray-900">{expense.description}</td>
											<td className="py-3 px-4 text-gray-900">₹{expense.amount}</td>
											<td className="py-3 px-4">
												<span
													className={`px-3 py-1 rounded-full text-sm font-semibold ${
														expense.status === 'Approved'
															? 'bg-green-100 text-green-700'
															: 'bg-yellow-100 text-yellow-700'
													}`}
												>
													{expense.status}
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
