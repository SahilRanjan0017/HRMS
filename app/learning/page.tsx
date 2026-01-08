"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { BookOpen, Users, Award, Clock } from "lucide-react"

interface Course {
	id: string
	title: string
	instructor: string
	duration: string
	status: "available" | "in-progress" | "completed"
	participants: number
	startDate: string
}

const mockCourses: Course[] = [
	{
		id: "1",
		title: "Leadership Skills 101",
		instructor: "John Doe",
		duration: "4 weeks",
		status: "available",
		participants: 8,
		startDate: "2024-02-01",
	},
	{
		id: "2",
		title: "Advanced Communication",
		instructor: "Jane Smith",
		duration: "3 weeks",
		status: "in-progress",
		participants: 12,
		startDate: "2024-01-08",
	},
	{
		id: "3",
		title: "Project Management Basics",
		instructor: "Mike Johnson",
		duration: "5 weeks",
		status: "available",
		participants: 5,
		startDate: "2024-02-15",
	},
	{
		id: "4",
		title: "Effective Time Management",
		instructor: "Sarah Wilson",
		duration: "2 weeks",
		status: "completed",
		participants: 20,
		startDate: "2023-12-01",
	},
]

export default function LearningPage() {
	const availableCourses = mockCourses.filter((c) => c.status === "available")
	const inProgressCourses = mockCourses.filter((c) => c.status === "in-progress")
	const completedCourses = mockCourses.filter((c) => c.status === "completed")
	const totalParticipants = mockCourses.reduce((sum, c) => sum + c.participants, 0)

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Learning & Development
						</h1>
						<p className="text-gray-600 mt-2">
							Training courses and learning programs
						</p>
					</div>
					<Button>Create Course</Button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Available Courses</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{availableCourses.length}
									</p>
								</div>
								<BookOpen className="w-10 h-10 text-blue-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">In Progress</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{inProgressCourses.length}
									</p>
								</div>
								<Clock className="w-10 h-10 text-orange-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Completed</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{completedCourses.length}
									</p>
								</div>
								<Award className="w-10 h-10 text-green-500 opacity-20" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-600 text-sm">Total Participants</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">
										{totalParticipants}
									</p>
								</div>
								<Users className="w-10 h-10 text-purple-500 opacity-20" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Available Courses */}
				<Card>
					<CardHeader>
						<CardTitle>Available Courses</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{availableCourses.map((course) => (
								<div
									key={course.id}
									className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
								>
									<h3 className="font-semibold text-gray-900">
										{course.title}
									</h3>
									<p className="text-sm text-gray-600 mt-1">
										Instructor: {course.instructor}
									</p>
									<p className="text-sm text-gray-600">
										Duration: {course.duration}
									</p>
									<p className="text-xs text-gray-500 mt-2">
										Starts:{" "}
										{new Date(course.startDate).toLocaleDateString()}
									</p>
									<p className="text-xs text-gray-500 mt-1">
										{course.participants} participants
									</p>
									<Button className="w-full mt-4" size="sm">
										Enroll Now
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* All Courses */}
				<Card>
					<CardHeader>
						<CardTitle>All Courses</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{mockCourses.map((course) => (
								<div
									key={course.id}
									className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
								>
									<div>
										<h3 className="font-semibold text-gray-900">
											{course.title}
										</h3>
										<p className="text-sm text-gray-600">
											{course.instructor} • {course.duration}
										</p>
									</div>
									<span
										className={`px-3 py-1 rounded-full text-xs font-semibold ${
											course.status === "available"
												? "bg-blue-100 text-blue-800"
												: course.status === "in-progress"
													? "bg-orange-100 text-orange-800"
													: "bg-green-100 text-green-800"
										}`}
									>
										{course.status === "in-progress"
											? "In Progress"
											: course.status === "completed"
												? "Completed"
												: "Available"}
									</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</MainLayout>
	)
}
