"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Settings, Building2, Mail, Shield } from "lucide-react"

interface ConfigTab {
	id: string
	name: string
	icon: React.ReactNode
}

export default function ConfigurationPage() {
	const [activeTab, setActiveTab] = useState<string>("company")

	const tabs: ConfigTab[] = [
		{ id: "company", name: "Company Settings", icon: <Building2 className="w-4 h-4" /> },
		{ id: "hr", name: "HR Settings", icon: <Settings className="w-4 h-4" /> },
		{ id: "email", name: "Email Configuration", icon: <Mail className="w-4 h-4" /> },
		{ id: "security", name: "Security", icon: <Shield className="w-4 h-4" /> },
	]

	return (
		<MainLayout>
			<div className="space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Configuration & Settings
					</h1>
					<p className="text-gray-600 mt-2">
						System settings and configurations
					</p>
				</div>

				{/* Tab Navigation */}
				<div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
								activeTab === tab.id
									? "border-blue-500 text-blue-600"
									: "border-transparent text-gray-600 hover:text-gray-900"
							}`}
						>
							{tab.icon}
							{tab.name}
						</button>
					))}
				</div>

				{/* Company Settings */}
				{activeTab === "company" && (
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Company Information</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Company Name
									</label>
									<Input defaultValue="Tech Corp Inc." />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Company Email
									</label>
									<Input defaultValue="info@techcorp.com" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Company Website
									</label>
									<Input defaultValue="https://techcorp.com" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Headquarters Address
									</label>
									<Input defaultValue="123 Tech Street, San Francisco, CA 94105" />
								</div>
								<Button>Save Changes</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Financial Settings</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Default Currency
									</label>
									<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
										<option>USD ($)</option>
										<option>EUR (€)</option>
										<option>GBP (£)</option>
										<option>INR (₹)</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Fiscal Year Start
									</label>
									<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
										<option>January 1</option>
										<option>April 1</option>
										<option>July 1</option>
									</select>
								</div>
								<Button>Save Changes</Button>
							</CardContent>
						</Card>
					</div>
				)}

				{/* HR Settings */}
				{activeTab === "hr" && (
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Leave Settings</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Financial Year Start
									</label>
									<Input type="date" defaultValue="2024-01-01" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Default Leave Period (Days)
									</label>
									<Input type="number" defaultValue="30" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Carryforward Limit
									</label>
									<Input type="number" defaultValue="5" />
								</div>
								<Button>Save Changes</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Attendance Settings</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Working Hours Per Day
									</label>
									<Input type="number" defaultValue="8" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Late Check-In Threshold (Minutes)
									</label>
									<Input type="number" defaultValue="15" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Early Check-Out Threshold (Minutes)
									</label>
									<Input type="number" defaultValue="15" />
								</div>
								<Button>Save Changes</Button>
							</CardContent>
						</Card>
					</div>
				)}

				{/* Email Configuration */}
				{activeTab === "email" && (
					<Card>
						<CardHeader>
							<CardTitle>Email Configuration</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									SMTP Server
								</label>
								<Input defaultValue="smtp.gmail.com" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									SMTP Port
								</label>
								<Input type="number" defaultValue="587" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									From Email Address
								</label>
								<Input defaultValue="noreply@techcorp.com" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									From Display Name
								</label>
								<Input defaultValue="Tech Corp HR System" />
							</div>
							<div>
								<label className="flex items-center gap-2">
									<input
										type="checkbox"
										defaultChecked
										className="rounded"
									/>
									<span className="text-sm text-gray-700">
										Use TLS/SSL
									</span>
								</label>
							</div>
							<Button>Test Email Configuration</Button>
							<Button>Save Changes</Button>
						</CardContent>
					</Card>
				)}

				{/* Security Settings */}
				{activeTab === "security" && (
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Password Policy</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Minimum Password Length
									</label>
									<Input type="number" defaultValue="8" />
								</div>
								<div>
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											defaultChecked
											className="rounded"
										/>
										<span className="text-sm text-gray-700">
											Require uppercase letters
										</span>
									</label>
								</div>
								<div>
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											defaultChecked
											className="rounded"
										/>
										<span className="text-sm text-gray-700">
											Require special characters
										</span>
									</label>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Password Expiry (Days)
									</label>
									<Input type="number" defaultValue="90" />
								</div>
								<Button>Save Changes</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Two-Factor Authentication</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											defaultChecked
											className="rounded"
										/>
										<span className="text-sm text-gray-700">
											Enable 2FA for all users
										</span>
									</label>
								</div>
								<div>
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											className="rounded"
										/>
										<span className="text-sm text-gray-700">
											Require 2FA for admins only
										</span>
									</label>
								</div>
								<Button>Save Changes</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Session Settings</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Session Timeout (Minutes)
									</label>
									<Input type="number" defaultValue="30" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Max Concurrent Sessions
									</label>
									<Input type="number" defaultValue="3" />
								</div>
								<Button>Save Changes</Button>
							</CardContent>
						</Card>
					</div>
				)}
			</div>
		</MainLayout>
	)
}
