<template>
	<ListItem
		:isTeamRequest="props.isTeamRequest"
		:employee="props.doc.employee"
		:employeeName="props.doc.employee_name"
	>
		<template #left>
			<div class="p-2.5 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
				<LeaveIcon class="h-5 w-5" />
			</div>
			<div class="flex flex-col items-start gap-1">
				<div class="text-base font-bold text-[rgb(var(--text-main))]">
					{{ __(props.doc.leave_type, null, "Leave Type") }}
				</div>
				<div class="text-xs font-medium text-[rgb(var(--text-muted))] flex items-center gap-1.5">
					<span>{{ props.doc.leave_dates || getLeaveDates(props.doc) }}</span>
					<span class="w-1 h-1 rounded-full bg-[rgb(var(--border-color))]"></span>
					<span class="font-bold text-blue-500">{{ __("{0}d", [props.doc.total_leave_days]) }}</span>
				</div>
			</div>
		</template>
		<template #right>
			<div class="flex items-center gap-3">
				<Badge 
					variant="subtle" 
					:theme="colorMap[status]" 
					:label="__(status, null, 'Leave Application')" 
					size="md" 
					class="font-bold uppercase tracking-wider"
				/>
				<FeatherIcon name="chevron-right" class="h-5 w-5 text-[rgb(var(--text-muted))] group-hover:translate-x-1 transition-transform" />
			</div>
		</template>
	</ListItem>
</template>

<script setup>
import { computed } from "vue"
import { FeatherIcon, Badge } from "@/utils/frappe-ui"

import ListItem from "@/components/ListItem.vue"
import LeaveIcon from "@/components/icons/LeaveIcon.vue"
import { getLeaveDates } from "@/data/leaves"

const props = defineProps({
	doc: {
		type: Object,
	},
	isTeamRequest: {
		type: Boolean,
		default: false,
	},
	workflowStateField: {
		type: String,
		required: false,
	},
})

const status = computed(() => {
	return props.workflowStateField ? props.doc[props.workflowStateField] : props.doc.status
})

const colorMap = {
	Approved: "green",
	Rejected: "red",
	Open: "orange",
}
</script>
