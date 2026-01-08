"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Briefcase, Users, FileText, TrendingUp } from "lucide-react"

interface JobOpening {
	id: string
	title: string
	department: string
	status: "open" | "closed" | "filled"
	applicants: number
	postedDate: string
}

const mockJobOpenings: JobOpening[] = [
	{
		id: "1",
		title: "Senior Product Manager",
		department: "Product",
		status: "open",
		applicants: 12,
		postedDate: "2024-01-01",
	},
	{
		id: "2",
		title: "Full Stack Developer",
		department: "Engineering",
		status: "open",
		applicants: 24,
		postedDate: "2023-12-15",
	},
	{
		id: "3",
		title: "UX/UI Designer",
		department: "Design",
		status: "open",
		applicants: 18,
		postedDate: "2024-01-05",
	},
	{
		id: "4",
		title: "Sales Executive",
		department: "Sales",
		status: "filled",
		applicants: 8,
		postedDate: "2023-11-20",
	},
]

export default function RecruitmentPage() {
	const openJobs = mockJobOpenings.filter((j) => j.status === "open")
	const filledJobs = mockJobOpenings.filter((j) => j.status === "filled")
	const totalApplicants = mockJobOpenings.reduce((sum, j) => sum + j.applicants, 0)

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Recruitment & Careers
						</h1>
						<p className="text-gray-600 mt-2">
							Manage job openings and track applicants
						</p>
					</div>
					<Button>Post New Job</Button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Open Positions</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{openJobs.length}
									</p>
								</div>
								<Briefcase className="w-10 h-10 text-blue-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Total Applicants</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{totalApplicants}
									</p>
								</div>
								<Users className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Positions Filled</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{filledJobs.length}
									</p>
								</div>
								<TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Avg. Time to Hire</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										32 days
									</p>
								</div>
								<FileText className="w-10 h-10 text-purple-500 opacity-20" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Job Openings */}
				<Card>
					<CardHeader>
						<CardTitle>Active Job Openings</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{openJobs.map((job) => (
								<div
									key={job.id}
									className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
								>
									<div>
										<h3 className="font-semibold text-gray-900">{job.title}</h3>
										<p className="text-sm text-gray-600">{job.department}</p>
										<p className="text-xs text-gray-500 mt-1">
											Posted on {new Date(job.postedDate).toLocaleDateString()}
										</p>
									</div>
									<div className="flex items-center gap-4">
										<div className="text-right">
											<p className="text-2xl font-bold text-gray-900">
												{job.applicants}
											</p>
											<p className="text-xs text-gray-600">applicants</p>
										</div>
										<Button variant="outline" size="sm">
											View Details
										</Button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Filled Positions */}
				{filledJobs.length > 0 && (
					<Card>
						<CardHeader>
							<CardTitle>Recently Filled Positions</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{filledJobs.map((job) => (
									<div
										key={job.id}
										className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50"
									>
										<div>
											<h3 className="font-semibold text-gray-900">
												{job.title}
											</h3>
											<p className="text-sm text-gray-600">{job.department}</p>
										</div>
										<span className="px-3 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded-full">
											Filled
										</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</MainLayout>
	)
}
