<template>
	<div class="flex flex-col w-full gap-4">
		<div class="flex flex-row items-center justify-between group">
			<div class="flex flex-row items-center gap-4 grow">
				<slot name="left" />
			</div>
			<div class="flex flex-row justify-end items-center gap-3">
				<slot name="right" />
			</div>
		</div>
		<div v-if="props.isTeamRequest" class="flex flex-row items-center gap-3 pl-11">
			<EmployeeAvatar :employeeID="props.employee" class="size-6 rounded-full" />
			<div class="text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-muted))]">
				{{ props.employeeName }}
			</div>
		</div>
	</div>
</template>

<script setup>
import EmployeeAvatar from "@/components/EmployeeAvatar.vue"

const props = defineProps({
	isTeamRequest: {
		type: Boolean,
		default: false,
	},
	employee: {
		type: String,
		required: false,
	},
	employeeName: {
		type: String,
		required: false,
	},
})
</script>
