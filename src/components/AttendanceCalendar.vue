<template>
	<div class="flex flex-col w-full">
		<div class="flex flex-col gap-4 bg-white dark:bg-gray-800">
			<!-- Month Change -->
			<div class="flex flex-row justify-between items-center">
				<Button
					icon="chevron-left"
					variant="ghost"
					class="text-gray-400 hover:text-gray-600"
					@click="firstOfMonth = firstOfMonth.subtract(1, 'M')"
				/>
				<div class="flex items-center gap-2 text-base text-gray-700 dark:text-gray-200 font-bold">
					<span>{{ firstOfMonth.format("MMMM") }}</span>
					<span class="text-gray-400">{{ firstOfMonth.format("YYYY") }}</span>
				</div>
				<Button
					icon="chevron-right"
					variant="ghost"
					class="text-gray-400 hover:text-gray-600"
					@click="firstOfMonth = firstOfMonth.add(1, 'M')"
				/>
			</div>

			<!-- Calendar -->
			<div class="grid grid-cols-7 gap-y-4">
				<div
					v-for="day in DAYS"
					class="flex justify-center text-gray-400 text-xs font-bold uppercase tracking-wider"
				>
					{{ day }}
				</div>
				<div v-for="_ in firstOfMonth.get('d')" />
				<div v-for="index in firstOfMonth.endOf('M').get('D')">
					<div
						class="h-8 w-8 flex flex-col items-center justify-center rounded-full mx-auto transition-colors cursor-default"
						:class="[
							getEventOnDate(index) ? colorMap[getEventOnDate(index)] : 'hover:bg-gray-50 dark:hover:bg-gray-700',
							isToday(index) ? 'ring-2 ring-blue-500' : ''
						]"
					>
						<span 
							class="text-sm font-medium"
							:class="getEventOnDate(index) && getEventOnDate(index) !== 'Holiday' ? 'text-white' : 'text-gray-700 dark:text-gray-300'"
						>
							{{ index }}
						</span>
					</div>
				</div>
			</div>

			<!-- Legend (Matches Reference Image) -->
			<div class="mt-4 grid grid-cols-2 gap-y-2 gap-x-1">
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 rounded-full bg-red-400"></div>
					<span class="text-xs text-gray-500 font-medium">Holiday</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 rounded-full bg-yellow-400"></div>
					<span class="text-xs text-gray-500 font-medium">Leave</span>
				</div>
				<div class="flex items-center gap-2 col-span-2">
					<div class="w-2 h-2 rounded-full bg-blue-400"></div>
					<span class="text-xs text-gray-500 font-medium">Awaiting Approval</span>
				</div>
				<div class="flex items-center gap-2 col-span-2">
					<div class="w-2 h-2 rounded-full bg-green-400"></div>
					<span class="text-xs text-gray-500 font-medium">Weekly Off</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, inject, ref, watch } from "vue"
import { createResource } from "@/utils/frappe-ui"

const dayjs = inject("$dayjs")
const employee = inject("$employee")
const __ = inject("$translate")
const firstOfMonth = ref(dayjs().date(1).startOf("D"))

const colorMap = {
	Present: "hover:bg-gray-50 dark:hover:bg-gray-700", // Default, no background
	"Work From Home": "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
	"Half Day": "bg-yellow-400",
	Absent: "bg-red-100 text-red-600",
	"On Leave": "bg-yellow-400",
	Holiday: "bg-red-400",
	"Weekly Off": "bg-green-400", 
}

const isToday = (date) => {
	const current = firstOfMonth.value.date(date)
	return dayjs().isSame(current, 'day')
}

// __("Present"), __("Half Day"), __("Absent"), __("On Leave"), __("Work From Home")
const summaryStatuses = ["Present", "Half Day", "Absent", "On Leave"]

const summary = computed(() => {
	const summary = {}

	for (const status of Object.values(calendarEvents.data)) {
		let updatedStatus = status === "Work From Home" ? "Present" : status
		if (updatedStatus in summary) {
			summary[updatedStatus] += 1
		} else {
			summary[updatedStatus] = 1
		}
	}

	return summary
})

watch(
	() => firstOfMonth.value,
	() => {
		calendarEvents.fetch()
	}
)

const getEventOnDate = (date) => {
	if (!calendarEvents.data) return null
	return calendarEvents.data[firstOfMonth.value.date(date).format("YYYY-MM-DD")]
}

const getFirstLetter = (s) => Array.from(s.trim())[0] // Unicode

const DAYS = [
	getFirstLetter(__("Sunday")),
	getFirstLetter(__("Monday")),
	getFirstLetter(__("Tuesday")),
	getFirstLetter(__("Wednesday")),
	getFirstLetter(__("Thursday")),
	getFirstLetter(__("Friday")),
	getFirstLetter(__("Saturday")),
]

//resources
const calendarEvents = createResource({
	url: "hrms.api.get_attendance_calendar_events",
	auto: true,
	cache: "hrms:attendance_calendar_events",
	initialData: {},
	makeParams() {
		return {
			employee: employee.data?.name,
			from_date: firstOfMonth.value.format("YYYY-MM-DD"),
			to_date: firstOfMonth.value.endOf("M").format("YYYY-MM-DD"),
		}
	},
})
</script>
