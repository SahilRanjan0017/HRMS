'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
	{ label: 'Home', href: '/home', icon: '🏠' },
	{ label: 'Attendance', href: '/attendance', icon: '📋' },
	{ label: 'Leave', href: '/leave', icon: '📅' },
	{ label: 'Expenses', href: '/expenses', icon: '💰' },
	{ label: 'Salary', href: '/salary', icon: '💵' },
	{ label: 'Profile', href: '/profile', icon: '👤' },
]

export const Navigation: React.FC = () => {
	const pathname = usePathname()

	return (
		<nav className="w-full bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link href="/home" className="text-2xl font-bold text-blue-600">
						HRMS
					</Link>
					<div className="flex items-center gap-8">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
									pathname === item.href
										? 'bg-blue-100 text-blue-700 font-semibold'
										: 'text-gray-700 hover:bg-gray-100'
								}`}
							>
								<span>{item.icon}</span>
								<span className="hidden sm:inline">{item.label}</span>
							</Link>
						))}
					</div>
				</div>
			</div>
		</nav>
	)
}
