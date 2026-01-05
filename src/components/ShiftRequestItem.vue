<template>
	<ListItem
		:isTeamRequest="props.isTeamRequest"
		:employee="props.doc.employee"
		:employeeName="props.doc.employee_name"
	>
		<template #left>
			<div class="p-2.5 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
				<ShiftIcon class="h-5 w-5" />
			</div>
			<div class="flex flex-col items-start gap-1">
				<div class="text-base font-bold text-[rgb(var(--text-main))]">
					{{ props.doc.shift_type }}
				</div>
				<div class="text-xs font-medium text-[rgb(var(--text-muted))] flex items-center gap-1.5">
					<span>{{ props.doc.shift_dates || getDates(props.doc) }}</span>
					<template v-if="props.doc.to_date">
						<span class="w-1 h-1 rounded-full bg-[rgb(var(--border-color))]"></span>
						<span class="font-bold text-blue-500">{{ __("{0}d", [props.doc.total_shift_days || getTotalDays(props.doc)]) }}</span>
					</template>
				</div>
			</div>
		</template>
		<template #right>
			<div class="flex items-center gap-3">
				<Badge 
					variant="subtle" 
					:theme="colorMap[status]" 
					:label="status" 
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
import ShiftIcon from "@/components/icons/ShiftIcon.vue"
import { getDates, getTotalDays } from "@/data/attendance"

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
	if (props.workflowStateField) return props.doc[props.workflowStateField]
	return props.doc.docstatus ? props.doc.status : "Open"
})

const colorMap = {
	Approved: "green",
	Rejected: "red",
	Open: "orange",
}
</script>
