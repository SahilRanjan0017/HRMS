<template>
	<div class="flex flex-col gap-6 w-full mt-4">
		<div class="flex flex-row justify-between items-center px-2">
			<div class="text-xs font-black uppercase tracking-widest text-[rgb(var(--text-muted))]">
				{{ __("Upcoming Holidays") }}
			</div>
			<div
				v-if="holidays?.data?.length"
				id="open-holiday-list"
				class="text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
			>
				{{ __("View All") }}
			</div>
		</div>

		<div class="premium-card overflow-hidden" v-if="upcomingHolidays?.length">
			<div
				class="flex flex-row p-5 items-center justify-between border-b border-[rgb(var(--border-color))] last:border-0"
				v-for="holiday in upcomingHolidays"
				:key="holiday.holiday_date"
			>
				<div class="flex flex-row items-center gap-4 grow">
					<div class="p-2 bg-blue-500/10 rounded-xl text-blue-500">
						<FeatherIcon name="calendar" class="h-5 w-5" />
					</div>
					<div class="text-base font-bold text-[rgb(var(--text-main))] truncate max-w-[180px]">
						{{ __(holiday.description) }}
					</div>
				</div>
				<div class="text-sm font-black tracking-tight text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-xl whitespace-nowrap">
					{{ holiday.formatted_holiday_date }}
				</div>
			</div>
		</div>

		<EmptyState :message="__('You have no upcoming holidays')" v-else />
	</div>

	<ion-modal
		ref="modal"
		v-if="holidays?.data?.length"
		trigger="open-holiday-list"
		:initial-breakpoint="1"
		:breakpoints="[0, 1]"
	>
		<div class="bg-white w-full flex flex-col items-center justify-center pb-5">
			<div class="w-full pt-8 pb-5 border-b text-center">
				<span class="text-gray-900 font-bold text-lg">{{ __("Holiday List") }}</span>
			</div>
			<div class="w-full flex flex-col items-center justify-center gap-5 p-4">
				<div
					v-for="holiday in holidays.data"
					:key="holiday.holiday_date"
					class="flex flex-row items-center justify-between w-full"
				>
					<div class="flex flex-row items-center gap-3 grow">
						<FeatherIcon name="calendar" class="h-5 w-5 text-gray-500" />
						<div class="text-base font-normal text-gray-800">
							{{ __(holiday.description) }}
						</div>
					</div>
					<div
						:class="[
							'text-base font-bold',
							holiday.is_upcoming ? 'text-gray-800' : 'text-gray-500',
						]"
					>
						{{ holiday.formatted_holiday_date }}
					</div>
				</div>
			</div>
		</div>
	</ion-modal>
</template>

<script setup>
import { inject, computed } from "vue"
import { IonModal } from "@ionic/vue"
import { FeatherIcon, createResource } from "@/utils/frappe-ui"

const employee = inject("$employee")
const dayjs = inject("$dayjs")
const __ = inject("$translate")

const holidays = createResource({
	url: "hrms.api.get_holidays_for_employee",
	params: {
		employee: employee.data.name,
	},
	auto: true,
	transform: (data) => {
		return data.map((holiday) => {
			const holidayDate = dayjs(holiday.holiday_date)
			holiday.is_upcoming = holidayDate.isAfter(dayjs())
			holiday.formatted_holiday_date = holidayDate.format("ddd, D MMM YYYY")
			return holiday
		})
	},
})

const upcomingHolidays = computed(() => {
	const filteredHolidays = holidays.data?.filter(
		(holiday) => holiday.is_upcoming
	)

	// show only 5 upcoming holidays
	return filteredHolidays?.slice(0, 5)
})
</script>
