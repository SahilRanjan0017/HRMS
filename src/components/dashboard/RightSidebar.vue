<template>
	<div class="flex flex-col gap-6">
		<!-- Calendar Widget -->
		<div class="premium-card bg-white dark:bg-gray-800 p-4">
			<AttendanceCalendar :simple="true" />
		</div>

		<!-- Navigation Widget -->
		<SidebarNav />

		<!-- Holiday Widget -->
		<div class="premium-card bg-white dark:bg-gray-800 p-6 flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<h3 class="text-xl font-black text-gray-900 dark:text-gray-100">{{ __('Holiday - 2026') }}</h3>
			</div>

			<!-- Filter Tabs -->
			<div class="flex gap-2">
				<button class="px-3 py-1 text-xs font-bold text-teal-600 bg-teal-50 rounded-lg">
					{{ __('Regional') }}
				</button>
				<button class="px-3 py-1 text-xs font-bold text-gray-400 hover:text-gray-600">
					{{ __('National') }}
				</button>
				<button class="px-3 py-1 text-xs font-bold text-gray-400 hover:text-gray-600">
					{{ __('Optional') }}
				</button>
			</div>

			<!-- Holiday List -->
			<div class="space-y-4 pt-2">
				<div v-for="holiday in upcomingHolidays" :key="holiday.date" class="flex items-start gap-4">
					<div class="flex-shrink-0 w-1 bg-teal-500 h-10 rounded-full"></div>
					<div class="flex flex-col">
						<span class="text-sm font-bold text-gray-900 dark:text-gray-100">{{ holiday.description }}</span>
						<span class="text-xs text-gray-400">{{ holiday.prettyDate }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { inject, computed } from 'vue'
import AttendanceCalendar from "@/components/AttendanceCalendar.vue"
import SidebarNav from "./SidebarNav.vue"
import dayjs from "dayjs"

const __ = inject('$translate')

// Mock or passed data for Holidays
const holidays = [
	{ date: '2026-05-23', description: 'Buddha Purnima' },
	{ date: '2026-08-15', description: 'Independence Day' },
]

const upcomingHolidays = computed(() => {
	return holidays.map(h => ({
		...h,
		prettyDate: dayjs(h.date).format('DD MMMM YYYY - dddd')
	}))
})
</script>
