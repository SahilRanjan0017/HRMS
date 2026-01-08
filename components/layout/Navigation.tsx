'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const primaryNavItems = [
	{ label: 'Home', href: '/home', icon: '🏠' },
	{ label: 'Directory', href: '/directory', icon: '👥' },
	{ label: 'Attendance', href: '/attendance', icon: '📋' },
	{ label: 'Leave', href: '/leave', icon: '📅' },
	{ label: 'Payroll', href: '/salary', icon: '💵' },
	{ label: 'Profile', href: '/profile', icon: '👤' },
]

const allNavItems = [
	{ label: 'Home', href: '/home', icon: '🏠', category: 'Core' },
	{ label: 'Directory', href: '/directory', icon: '👥', category: 'Employees' },
	{ label: 'Attendance', href: '/attendance', icon: '📋', category: 'Time & Attendance' },
	{ label: 'Leave', href: '/leave', icon: '📅', category: 'Time & Attendance' },
	{ label: 'Payroll', href: '/salary', icon: '💵', category: 'Payroll' },
	{ label: 'Expenses', href: '/expenses', icon: '🧾', category: 'Payroll' },
	{ label: 'Recruitment', href: '/recruitment', icon: '💼', category: 'Talent' },
	{ label: 'Onboarding', href: '/onboarding', icon: '🚀', category: 'Talent' },
	{ label: 'Performance', href: '/performance', icon: '⭐', category: 'Development' },
	{ label: 'Learning', href: '/learning', icon: '📚', category: 'Development' },
	{ label: 'My Goals', href: '/my-goals', icon: '🎯', category: 'Development' },
	{ label: 'Recognition', href: '/recognition', icon: '🏆', category: 'Engagement' },
	{ label: 'Benefits', href: '/benefits', icon: '❤️', category: 'Engagement' },
	{ label: 'Travel', href: '/travel', icon: '✈️', category: 'Engagement' },
	{ label: 'Analytics', href: '/analytics', icon: '📊', category: 'Admin' },
	{ label: 'Compliance', href: '/compliance', icon: '📋', category: 'Admin' },
	{ label: 'Roles', href: '/roles', icon: '🔐', category: 'Admin' },
	{ label: 'HR Connect', href: '/hr-connect', icon: '💬', category: 'Admin' },
	{ label: 'Config', href: '/configuration', icon: '⚙️', category: 'Admin' },
	{ label: 'Profile', href: '/profile', icon: '👤', category: 'Core' },
]

export const Navigation: React.FC = () => {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link href="/home" className="text-2xl font-bold text-blue-600 flex-shrink-0">
						HRMS
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center gap-1 flex-1 mx-6 overflow-x-auto">
						{primaryNavItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
									pathname === item.href
										? 'bg-blue-100 text-blue-700 font-semibold'
										: 'text-gray-700 hover:bg-gray-100'
								}`}
							>
								<span>{item.icon}</span>
								<span>{item.label}</span>
							</Link>
						))}
						<div className="flex-1"></div>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ml-auto flex-shrink-0"
						>
							<span>More</span>
							<span>⋯</span>
						</button>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="lg:hidden flex-shrink-0"
					>
						{isOpen ? (
							<X className="w-6 h-6 text-gray-700" />
						) : (
							<Menu className="w-6 h-6 text-gray-700" />
						)}
					</button>
				</div>

				{/* Mobile & Dropdown Navigation */}
				{isOpen && (
					<div className="border-t border-gray-200 bg-gray-50 max-h-96 overflow-y-auto">
						<div className="px-2 py-2 space-y-1">
							{allNavItems.map((item, idx) => (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsOpen(false)}
									className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors block w-full text-left ${
										pathname === item.href
											? 'bg-blue-100 text-blue-700 font-semibold'
											: 'text-gray-700 hover:bg-gray-100'
									}`}
								>
									<span className="text-lg">{item.icon}</span>
									<span className="flex-1">{item.label}</span>
									<span className="text-xs text-gray-500">{item.category}</span>
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}
