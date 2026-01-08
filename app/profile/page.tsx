"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Mail, Phone, MapPin, Briefcase, Calendar, Award, FileText, Settings } from "lucide-react"

export default function ProfilePage() {
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		firstName: "Sahil",
		lastName: "Ranjan",
		email: "sahil.ranjan@company.com",
		phone: "+91 98765 43210",
		location: "Bangalore, India",
		jobTitle: "Product Lead",
		department: "Product",
		joinDate: "2022-01-15",
		reportsTo: "CEO",
		bio: "Passionate about building great products and leading teams.",
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<MainLayout>
			<div className="space-y-8">
				{/* Profile Header */}
				<div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
					<div className="flex items-end gap-6">
						<div className="w-32 h-32 bg-blue-500 rounded-2xl flex items-center justify-center text-5xl shadow-lg border-4 border-blue-300">
							SR
						</div>
						<div className="flex-1 mb-2">
							<h1 className="text-4xl font-bold">
								{formData.firstName} {formData.lastName}
							</h1>
							<p className="text-blue-100 text-lg mt-2">
								{formData.jobTitle}
							</p>
							<p className="text-blue-200 text-sm">
								{formData.department} Department
							</p>
						</div>
						<Button
							onClick={() => setIsEditing(!isEditing)}
							className="bg-white text-blue-600 hover:bg-blue-50 px-6"
						>
							{isEditing ? "Save" : "Edit Profile"}
						</Button>
					</div>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Personal Info */}
					<div className="lg:col-span-2 space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<FileText className="w-5 h-5 text-blue-600" />
									Personal Information
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											First Name
										</label>
										{isEditing ? (
											<Input
												type="text"
												name="firstName"
												value={formData.firstName}
												onChange={handleChange}
											/>
										) : (
											<p className="text-gray-900 font-medium">
												{formData.firstName}
											</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Last Name
										</label>
										{isEditing ? (
											<Input
												type="text"
												name="lastName"
												value={formData.lastName}
												onChange={handleChange}
											/>
										) : (
											<p className="text-gray-900 font-medium">
												{formData.lastName}
											</p>
										)}
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
											<Mail className="w-4 h-4" />
											Email
										</label>
										{isEditing ? (
											<Input
												type="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
											/>
										) : (
											<p className="text-gray-900 font-medium">
												{formData.email}
											</p>
										)}
									</div>
									<div>
										<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
											<Phone className="w-4 h-4" />
											Phone
										</label>
										{isEditing ? (
											<Input
												type="tel"
												name="phone"
												value={formData.phone}
												onChange={handleChange}
											/>
										) : (
											<p className="text-gray-900 font-medium">
												{formData.phone}
											</p>
										)}
									</div>
								</div>

								<div>
									<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
										<MapPin className="w-4 h-4" />
										Location
									</label>
									{isEditing ? (
										<Input
											type="text"
											name="location"
											value={formData.location}
											onChange={handleChange}
										/>
									) : (
										<p className="text-gray-900 font-medium">
											{formData.location}
										</p>
									)}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Briefcase className="w-5 h-5 text-blue-600" />
									Work Information
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Job Title
										</label>
										{isEditing ? (
											<Input
												type="text"
												name="jobTitle"
												value={formData.jobTitle}
												onChange={handleChange}
											/>
										) : (
											<p className="text-gray-900 font-medium">
												{formData.jobTitle}
											</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Department
										</label>
										{isEditing ? (
											<Input
												type="text"
												name="department"
												value={formData.department}
												onChange={handleChange}
											/>
										) : (
											<p className="text-gray-900 font-medium">
												{formData.department}
											</p>
										)}
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
											<Calendar className="w-4 h-4" />
											Join Date
										</label>
										{isEditing ? (
											<Input
												type="date"
												name="joinDate"
												value={formData.joinDate}
												onChange={handleChange}
											/>
										) : (
											<p className="text-gray-900 font-medium">
												{new Date(
													formData.joinDate
												).toLocaleDateString()}
											</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Reports To
										</label>
										{isEditing ? (
											<Input
												type="text"
												name="reportsTo"
												value={formData.reportsTo}
												onChange={handleChange}
											/>
										) : (
											<p className="text-gray-900 font-medium">
												{formData.reportsTo}
											</p>
										)}
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>About You</CardTitle>
							</CardHeader>
							<CardContent>
								{isEditing ? (
									<textarea
										name="bio"
										value={formData.bio}
										onChange={handleChange}
										className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
										rows={4}
									/>
								) : (
									<p className="text-gray-700">{formData.bio}</p>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Right Column - Quick Stats */}
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Quick Stats</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="pb-4 border-b border-gray-200">
									<p className="text-sm text-gray-600">Years with Company</p>
									<p className="text-2xl font-bold text-blue-600 mt-1">
										2.0
									</p>
								</div>
								<div className="pb-4 border-b border-gray-200">
									<p className="text-sm text-gray-600">Performance Rating</p>
									<p className="text-2xl font-bold text-yellow-500 mt-1">
										4.5 / 5
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">
										Profile Completion
									</p>
									<div className="mt-2 w-full bg-gray-200 rounded-full h-2">
										<div
											className="bg-green-500 h-2 rounded-full"
											style={{ width: "95%" }}
										></div>
									</div>
									<p className="text-sm text-gray-600 mt-1">95%</p>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<Award className="w-5 h-5 text-blue-600" />
									Achievements
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
									<span className="text-2xl">⭐</span>
									<span className="text-sm font-medium text-gray-900">
										Star Performer
									</span>
								</div>
								<div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
									<span className="text-2xl">🤝</span>
									<span className="text-sm font-medium text-gray-900">
										Team Player
									</span>
								</div>
								<div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
									<span className="text-2xl">💡</span>
									<span className="text-sm font-medium text-gray-900">
										Innovation Award
									</span>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<Settings className="w-5 h-5 text-blue-600" />
									Preferences
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
									<input
										type="checkbox"
										defaultChecked
										className="w-4 h-4 rounded"
									/>
									<span className="text-sm text-gray-700">
										Email Notifications
									</span>
								</label>
								<label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
									<input
										type="checkbox"
										defaultChecked
										className="w-4 h-4 rounded"
									/>
									<span className="text-sm text-gray-700">
										In-App Alerts
									</span>
								</label>
								<label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
									<input type="checkbox" className="w-4 h-4 rounded" />
									<span className="text-sm text-gray-700">
										Weekly Reports
									</span>
								</label>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
