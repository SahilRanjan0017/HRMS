<template>
	<ListItem
		:isTeamRequest="props.isTeamRequest"
		:employee="props.doc.employee"
		:employeeName="props.doc.employee_name"
		>
		<template #left>
			<div class="p-2.5 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
				<AttendanceIcon class="h-5 w-5" />
			</div>
			<div class="flex flex-col items-start gap-1">
				<div class="text-base font-bold text-[rgb(var(--text-main))]">
					{{ props.doc.reason }}
				</div>
				<div class="text-xs font-medium text-[rgb(var(--text-muted))] flex items-center gap-1.5">
					<span>{{ props.doc.attendance_dates || getDates(props.doc) }}</span>
					<template v-if="props.doc.to_date">
						<span class="w-1 h-1 rounded-full bg-[rgb(var(--border-color))]"></span>
						<span class="font-bold text-blue-500">{{ __("{0}d", [props.doc.total_attendance_days]) }}</span>
					</template>
				</div>
			</div>
		</template>
		<template #right>
			<div class="flex items-center gap-3">
				<Badge 
					variant="subtle" 
					:theme="colorMap[status]" 
					:label="__(status)" 
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
import { Badge, FeatherIcon } from "@/utils/frappe-ui"

import ListItem from "@/components/ListItem.vue"
import AttendanceIcon from "@/components/icons/AttendanceIcon.vue"
import { getDates, getTotalDays } from "@/data/attendance"

const props = defineProps({
	doc: {
		type: Object,
	},
	workflowStateField: {
		type: String,
		required: false,
	},
})

const status = computed(() => {
	if (props.workflowStateField) return props.doc[props.workflowStateField]
	return props.doc.docstatus ? "Submitted" : "Draft"
})

const colorMap = {
	Draft: "gray",
	Submitted: "blue",
}
</script>
