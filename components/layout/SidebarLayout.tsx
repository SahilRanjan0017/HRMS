"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Users, Calendar, DollarSign, BarChart3, Settings } from "lucide-react"

interface SidebarLayoutProps {
	children: React.ReactNode
}

const menuItems = [
	{ label: "Home", href: "/home", icon: Home },
	{ label: "Directory", href: "/directory", icon: Users },
	{ label: "Attendance", href: "/attendance", icon: Calendar },
	{ label: "Leave", href: "/leave", icon: Calendar },
	{ label: "Payroll", href: "/salary", icon: DollarSign },
	{ label: "Recruitment", href: "/recruitment", icon: Users },
	{ label: "Onboarding", href: "/onboarding", icon: Home },
	{ label: "Performance", href: "/performance", icon: BarChart3 },
	{ label: "Learning", href: "/learning", icon: Home },
	{ label: "Recognition", href: "/recognition", icon: Home },
	{ label: "Benefits", href: "/benefits", icon: Home },
	{ label: "Analytics", href: "/analytics", icon: BarChart3 },
	{ label: "Compliance", href: "/compliance", icon: Settings },
	{ label: "Roles", href: "/roles", icon: Settings },
	{ label: "My Goals", href: "/my-goals", icon: Home },
	{ label: "Travel", href: "/travel", icon: Home },
	{ label: "HR Connect", href: "/hr-connect", icon: Home },
	{ label: "Expenses", href: "/expenses", icon: DollarSign },
	{ label: "Configuration", href: "/configuration", icon: Settings },
	{ label: "Profile", href: "/profile", icon: Users },
]

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
	const pathname = usePathname()
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Desktop Sidebar */}
			<div
				className={`hidden lg:flex flex-col w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white transition-all duration-300 ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				{/* Logo */}
				<Link
					href="/home"
					className="flex items-center justify-center h-20 border-b border-blue-500 gap-3"
				>
					<div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
						<span className="text-blue-600 font-bold text-lg">HR</span>
					</div>
					<span className="text-2xl font-bold">HRMS</span>
				</Link>

				{/* Navigation Menu */}
				<nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
					{menuItems.map((item) => {
						const Icon = item.icon
						const isActive = pathname === item.href
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
									isActive
										? "bg-white text-blue-600 shadow-md font-semibold"
										: "text-blue-100 hover:bg-blue-500 hover:text-white"
								}`}
							>
								<Icon className="w-5 h-5" />
								<span className="text-sm">{item.label}</span>
							</Link>
						)
					})}
				</nav>

				{/* Footer */}
				<div className="p-4 border-t border-blue-500">
					<Link
						href="/profile"
						className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-400 transition-colors text-center justify-center"
					>
						<Users className="w-4 h-4" />
						<span className="text-sm font-medium">My Profile</span>
					</Link>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Top Navigation Bar */}
				<nav className="bg-white border-b border-gray-200 shadow-sm h-16 flex items-center px-6 z-40">
					<div className="flex items-center justify-between w-full max-w-7xl mx-auto">
						<div className="flex items-center gap-4">
							{/* Mobile Menu Button */}
							<button
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className="lg:hidden text-gray-700"
							>
								{mobileMenuOpen ? (
									<X className="w-6 h-6" />
								) : (
									<Menu className="w-6 h-6" />
								)}
							</button>

							{/* Logo for Mobile */}
							<Link
								href="/home"
								className="lg:hidden flex items-center gap-2"
							>
								<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
									<span className="text-white font-bold text-sm">HR</span>
								</div>
								<span className="text-lg font-bold text-blue-600">
									HRMS
								</span>
							</Link>
						</div>

						{/* Right side - User actions */}
						<div className="flex items-center gap-4">
							<button className="relative">
								<span className="absolute inset-0 bg-blue-100 rounded-full blur opacity-50"></span>
								<div className="relative w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
									SR
								</div>
							</button>
						</div>
					</div>
				</nav>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="lg:hidden bg-blue-600 text-white max-h-96 overflow-y-auto">
						<nav className="px-4 py-4 space-y-2">
							{menuItems.map((item) => {
								const Icon = item.icon
								return (
									<Link
										key={item.href}
										href={item.href}
										onClick={() => setMobileMenuOpen(false)}
										className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-500 hover:text-white transition-colors"
									>
										<Icon className="w-5 h-5" />
										<span className="text-sm">{item.label}</span>
									</Link>
								)
							})}
						</nav>
					</div>
				)}

				{/* Page Content */}
				<main className="flex-1 overflow-y-auto">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						{children}
					</div>
				</main>
			</div>
		</div>
	)
}
