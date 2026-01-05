<template>
	<div class="flex flex-col w-full space-y-6 mt-4">
		<div class="flex flex-row justify-between items-center px-6">
			<div class="text-xs font-black uppercase tracking-widest text-[rgb(var(--text-muted))]">
				{{ __("Leave Balance") }} 
			</div>
			<router-link
				:to="{ name: 'LeaveApplicationListView' }"
				v-if="leaveBalance.data"
			>
				<div class="text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-colors">
					{{ __("View History") }}
				</div>
			</router-link>
		</div>

		<!-- Leave Balance Dashboard -->
		<div
			class="flex flex-row gap-5 overflow-x-auto hide-scrollbar py-2 px-6"
			v-if="leaveBalance.data"
		>
			<div
				v-for="(allocation, leave_type, index) in leaveBalance.data"
				:key="leave_type"
				class="premium-card flex flex-col gap-4 p-6 items-center min-w-[160px] hover:scale-105 transition-transform"
			>
				<SemicircleChart
					:percentage="allocation.balance_percentage"
					:colorClass="getChartColor(index)"
					class="size-20"
				/>
				<div class="text-center space-y-1">
					<div class="text-xl font-black tracking-tight text-[rgb(var(--text-main))]">
						{{ allocation.balance_leaves }}<span class="text-xs text-[rgb(var(--text-muted))] font-bold">/{{ allocation.allocated_leaves }}</span>
					</div>
					<div class="text-[10px] font-black uppercase tracking-tighter text-[rgb(var(--text-muted))] leading-tight">
						{{ __(leave_type, null, "Leave Type") }}
					</div>
				</div>
			</div>
		</div>

		<div v-else class="px-6">
			<EmptyState :message="__('You have no leaves allocated')" />
		</div>
	</div>
</template>

<script setup>
import SemicircleChart from "@/components/SemicircleChart.vue"
import { leaveBalance } from "@/data/leaves"
import { inject } from "vue"

const __ = inject("$translate")
const getChartColor = (index) => {
	// note: tw colors - rose-400, pink-400 & purple-500 of the old frappeui palette #918ef5
	const chartColors = ["text-[#fb7185]", "text-[#f472b6]", "text-[#918ef5]"]
	return chartColors[index % chartColors.length]
}
</script>
