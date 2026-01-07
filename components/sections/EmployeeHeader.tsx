'use client'

import React from 'react'
import { useAuth } from '@/lib/hooks'

export const EmployeeHeader: React.FC = () => {
	const { employee, user } = useAuth()

	const getInitials = (name?: string) => {
		if (!name) return 'SR'
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
	}

	return (
		<div className="mb-8 border-b pb-8">
			<div className="flex items-start gap-6">
				<div className="flex-shrink-0">
					<div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-3xl font-bold shadow-lg">
						{getInitials(employee?.employee_name)}
					</div>
				</div>

				<div className="flex-1">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">{employee?.employee_name}</h1>
						<p className="text-gray-600 text-lg mt-1">{employee?.designation}</p>
						<p className="text-gray-500 text-sm mt-2">Bangalore</p>
						<p className="text-gray-500 text-sm">Profile 82% complete</p>
					</div>

					<div className="mt-4 flex gap-2">
						<button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
							View Profile
						</button>
						<button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
							Edit Profile
						</button>
					</div>
				</div>

				<div className="flex-shrink-0">
					<button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
						<svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}
