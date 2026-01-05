<template>
	<ListItem
		:isTeamRequest="props.isTeamRequest"
		:employee="props.doc.employee"
		:employeeName="props.doc.employee_name"
	>
		<template #left>
			<div class="p-2.5 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
				<ExpenseIcon class="h-5 w-5" />
			</div>
			<div class="flex flex-col items-start gap-1">
				<div class="text-base font-bold text-[rgb(var(--text-main))]">
					{{ claimTitle }}
				</div>
				<div class="text-xs font-medium text-[rgb(var(--text-muted))] flex items-center gap-1.5">
					<span>{{ claimDates }}</span>
					<span class="w-1 h-1 rounded-full bg-[rgb(var(--border-color))]"></span>
					<span class="font-bold text-blue-500">
						{{ formatCurrency(props.doc.total_claimed_amount, currency) }}
					</span>
				</div>
			</div>
		</template>
		<template #right>
			<div class="flex items-center gap-3">
				<Badge 
					variant="subtle" 
					:theme="statusMap[status]" 
					:label="__(status, null, 'Expense Claim')" 
					size="md" 
					class="font-bold uppercase tracking-wider"
				/>
				<FeatherIcon name="chevron-right" class="h-5 w-5 text-[rgb(var(--text-muted))] group-hover:translate-x-1 transition-transform" />
			</div>
		</template>
	</ListItem>
</template>

<script setup>
import { FeatherIcon, Badge } from "@/utils/frappe-ui"
import { computed, inject } from "vue"

import ListItem from "@/components/ListItem.vue"
import ExpenseIcon from "@/components/icons/ExpenseIcon.vue"

import { getCompanyCurrency } from "@/data/currencies"
import { formatCurrency } from "@/utils/formatters"

const dayjs = inject("$dayjs")
const __ = inject("$translate")
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

const statusMap = {
	Draft: "gray",
	Submitted: "blue",
	Cancelled: "red",
	Paid: "green",
	Unpaid: "orange",
	"Approved & Draft": "gray",
	"Approved & Unpaid": "orange",
	"Approved & Submitted": "blue",
	Rejected: "red",
}

const status = computed(() => {
	if (props.workflowStateField) {
		return props.doc[props.workflowStateField]
	} else if (
		props.doc.approval_status === "Approved" &&
		["Draft", "Unpaid", "Submitted"].includes(props.doc.status)
	) {
		return `${props.doc.approval_status} & ${props.doc.status}`
	} else if (props.doc.approval_status === "Rejected") {
		return "Rejected"
	}
	return props.doc.status
})

const claimTitle = computed(() => {
	let title = __(props.doc.expense_type)
	if (props.doc.total_expenses > 1) {
		title = __("{0} & {1} more", [title, props.doc.total_expenses - 1])
	}
	return title
})

const claimDates = computed(() => {
	if (!props.doc.from_date && !props.doc.to_date)
		return dayjs(props.doc.posting_date).format("D MMM")

	if (props.doc.from_date === props.doc.to_date) {
		return dayjs(props.doc.from_date).format("D MMM")
	} else {
		return `${dayjs(props.doc.from_date).format("D MMM")} - ${dayjs(props.doc.to_date).format(
			"D MMM"
		)}`
	}
})

const currency = computed(() => getCompanyCurrency(props.doc.company))

const approvalStatus = computed(() => {
	return props.doc.approval_status === "Draft" ? "Pending" : props.doc.approval_status
})
</script>
