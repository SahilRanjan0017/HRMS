<template>
	<BaseLayout pageTitle="Attendance">
		<template #body>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
				<!-- Left Column: Calendar -->
				<div class="md:col-span-2 w-full order-1">
					<div class="premium-card p-1 h-full">
						<div class="px-5 pt-5 h-full">
							<AttendanceCalendar />
						</div>
					</div>
				</div>

				<!-- Right Column: Actions & Lists -->
				<div class="md:col-span-1 space-y-8 w-full order-2">
					<!-- Navigation Widget -->
					<SidebarNav class="hidden md:block" />

					<!-- Action Button -->
					<router-link :to="{ name: 'AttendanceRequestFormView' }" v-slot="{ navigate }" class="w-full block">
						<Button @click="navigate" variant="solid" class="w-full h-16 !bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 hover:from-emerald-400 hover:via-emerald-300 hover:to-teal-400 !text-white !rounded-2xl !font-black !text-xl !shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)] !border-none !transition-all active:!scale-[0.98] ring-1 ring-white/20">
							{{ __("Request Attendance") }}
						</Button>
					</router-link>

					<!-- Recent Requests -->
					<div class="premium-card w-full space-y-4 p-1">
						<div class="px-5 pt-5 pb-2">
							<h3 class="text-lg font-black tracking-tight text-[rgb(var(--text-main))] border-l-4 border-emerald-500 pl-3">
								{{ __("Recent Requests") }}
							</h3>
						</div>
						<RequestList
							:component="markRaw(AttendanceRequestItem)"
							:items="myAttendanceRequests?.data?.slice(0, 5)"
							:addListButton="true"
							:listButtonRoute="__('AttendanceRequestListView')"
						/>
					</div>

					<!-- Shift Request Action -->
					<router-link :to="{ name: 'ShiftRequestFormView' }" v-slot="{ navigate }" class="w-full block">
						<Button @click="navigate" variant="solid" class="w-full h-16 !bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:via-purple-400 hover:to-indigo-500 !text-white !rounded-2xl !font-black !text-xl !shadow-[0_10px_20px_-5px_rgba(147,51,234,0.4)] !border-none !transition-all active:!scale-[0.98] ring-1 ring-white/20">
							{{ __("Request a Shift") }}
						</Button>
					</router-link>

					<!-- Upcoming Shifts -->
					<div class="premium-card w-full space-y-4 p-1">
						<div class="px-5 pt-5 pb-2">
							<h3 class="text-lg font-black tracking-tight text-[rgb(var(--text-main))] border-l-4 border-purple-500 pl-3">
								{{ __("Upcoming Shifts") }}
							</h3>
						</div>
						<RequestList
							:component="markRaw(ShiftAssignmentItem)"
							:items="upcomingShifts"
							:addListButton="true"
							listButtonRoute="ShiftAssignmentListView"
							:emptyStateMessage="__('You have no upcoming shifts')"
						/>
					</div>
				</div>
			</div>
		</template>
	</BaseLayout>
</template>

<script setup>
import { computed, inject, markRaw } from "vue"
import { createResource } from "@/utils/frappe-ui"

import BaseLayout from "@/components/BaseLayout.vue"
import AttendanceRequestItem from "@/components/AttendanceRequestItem.vue"
import ShiftRequestItem from "@/components/ShiftRequestItem.vue"
import ShiftAssignmentItem from "@/components/ShiftAssignmentItem.vue"
import RequestList from "@/components/RequestList.vue"
import AttendanceCalendar from "@/components/AttendanceCalendar.vue"
import SidebarNav from "@/components/dashboard/SidebarNav.vue"

import {
	getShiftDates,
	getTotalShiftDays,
	getShiftTiming,
	myAttendanceRequests,
	myShiftRequests,
} from "@/data/attendance"

const employee = inject("$employee")
const dayjs = inject("$dayjs")

const shifts = createResource({
	url: "hrms.api.get_shifts",
	auto: true,
	cache: "hrms:shifts",
	makeParams() {
		return {
			employee: employee.data?.name,
		}
	},
	transform: (data) => {
		return data.map((assignment) => {
			assignment.doctype = "Shift Assignment"
			assignment.is_upcoming = !assignment.end_date || dayjs(assignment.end_date).isAfter(dayjs())
			assignment.shift_dates = getShiftDates(assignment)
			assignment.total_shift_days = getTotalShiftDays(assignment)
			assignment.shift_timing = getShiftTiming(assignment)
			return assignment
		})
	},
})

const upcomingShifts = computed(() => {
	const filteredShifts = shifts.data?.filter((shift) => shift.is_upcoming)

	// show only 5 upcoming shifts
	return filteredShifts?.slice(0, 5)
})
</script>
