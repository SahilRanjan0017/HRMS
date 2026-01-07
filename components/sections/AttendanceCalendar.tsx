"use client"

import React, { useState } from "react"
import dayjs, { Dayjs } from "dayjs"

interface AttendanceCalendarProps {
	month?: Dayjs
	onDateClick?: (date: string) => void
}

export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
	month = dayjs(),
	onDateClick,
}) => {
	const startDate = month.startOf("month")
	const endDate = month.endOf("month")
	const days = []

	// Get start day of week (0 = Sunday)
	const startDay = startDate.day()

	// Add empty cells for days before month starts
	for (let i = 0; i < startDay; i++) {
		days.push(null)
	}

	// Add all days of the month
	for (let i = 1; i <= endDate.date(); i++) {
		days.push(
			dayjs(
				`${month.year()}-${String(month.month() + 1).padStart(2, "0")}-${String(
					i
				).padStart(2, "0")}`
			)
		)
	}

	// Mock attendance data
	const getAttendanceStatus = (date: Dayjs) => {
		const day = date.date()
		if (day === 1) return "present" // Green
		if (day === 8) return "present"
		if (day === 14) return "absent" // Red
		if (day === 20) return "leave" // Light yellow
		if (day >= 21 && day <= 27) return "present"
		if (day === 31) return "leave"
		return null
	}

	const getStatusColor = (status: string | null) => {
		if (!status) return "bg-white"
		if (status === "present") return "bg-green-100 text-green-900"
		if (status === "absent") return "bg-red-100 text-red-900"
		if (status === "leave") return "bg-yellow-100 text-yellow-900"
		return "bg-white"
	}

	return (
		<div className="p-4">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-bold text-gray-900">
					{month.format("MMMM YYYY")}
				</h3>
				<div className="flex gap-2">
					<button className="p-1 hover:bg-gray-100 rounded">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>
					<button className="p-1 hover:bg-gray-100 rounded">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div className="mb-4 flex gap-4 text-xs">
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 bg-green-100 rounded"></div>
					<span>Present</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 bg-red-100 rounded"></div>
					<span>Absent</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 bg-yellow-100 rounded"></div>
					<span>Leave</span>
				</div>
			</div>

			<table className="w-full">
				<thead>
					<tr>
						{["S", "M", "T", "W", "T", "F", "S"].map((day) => (
							<th
								key={day}
								className="text-center py-2 text-xs font-semibold text-gray-600 bg-gray-50"
							>
								{day}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: Math.ceil(days.length / 7) }).map(
						(_, weekIdx) => (
							<tr key={weekIdx}>
								{days
									.slice(weekIdx * 7, weekIdx * 7 + 7)
									.map((date, dayIdx) => {
										const status = date ? getAttendanceStatus(date) : null
										const statusColor = getStatusColor(status)

										return (
											<td
												key={dayIdx}
												className="border border-gray-200 h-12 p-0"
												onClick={() =>
													date &&
													onDateClick &&
													onDateClick(date.format("YYYY-MM-DD"))
												}
											>
												{date ? (
													<button
														className={`w-full h-full flex items-center justify-center text-sm font-semibold rounded ${statusColor} hover:opacity-80 transition-opacity`}
													>
														{date.date()}
													</button>
												) : (
													<div className="w-full h-full bg-gray-50"></div>
												)}
											</td>
										)
									})}
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	)
}
