<template>
	<div class="flex flex-col gap-6 mt-8" v-if="props.items?.length">
		<div class="premium-card overflow-hidden">
			<div
				class="flex flex-row p-6 items-center justify-between border-b border-[rgb(var(--border-color))] last:border-0 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
				v-for="link in props.items"
				:key="link.name"
				@click="openRequestModal(link)"
			>
				<component
					:is="props.component || link.component"
					:doc="link"
					:workflowStateField="link.workflow_state_field"
					:isTeamRequest="props.teamRequests"
				/>
			</div>
		</div>

		<router-link
			v-if="props.addListButton"
			:to="{ name: props.listButtonRoute }"
			class="w-full"
		>
			<button
				class="w-full flex items-center justify-center p-5 rounded-[2rem] bg-[rgb(var(--bg-panel))] border border-[rgb(var(--border-color))] text-[rgb(var(--text-main))] font-bold text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
			>
				{{ __("View Complete List") }}
			</button>
		</router-link>
	</div>
	<EmptyState :message="emptyStateMessage || __('You have no requests')" v-else />

	<ion-modal
		ref="modal"
		:is-open="isRequestModalOpen"
		@didDismiss="closeRequestModal"
		:initial-breakpoint="1"
		:breakpoints="[0, 1]"
	>
		<RequestActionSheet :fields="fieldsMap[selectedRequest?.doctype]" v-model="selectedRequest" />
	</ion-modal>
</template>

<script setup>
import { ref, inject } from "vue"
import { IonModal } from "@ionic/vue"
import RequestActionSheet from "@/components/RequestActionSheet.vue"

import {
	LEAVE_FIELDS,
	EXPENSE_CLAIM_FIELDS,
	ATTENDANCE_REQUEST_FIELDS,
	SHIFT_REQUEST_FIELDS,
	SHIFT_FIELDS,
} from "@/data/config/requestSummaryFields"

const __ = inject("$translate")
const props = defineProps({
	component: {
		type: Object,
	},
	items: {
		type: Array,
	},
	teamRequests: {
		type: Boolean,
		default: false,
	},
	addListButton: {
		type: Boolean,
		default: false,
	},
	listButtonRoute: {
		type: String,
		default: "",
	},
	emptyStateMessage: {
		type: String,
		default: "",
	},
})

const fieldsMap = {
	"Leave Application": LEAVE_FIELDS,
	"Expense Claim": EXPENSE_CLAIM_FIELDS,
	"Attendance Request": ATTENDANCE_REQUEST_FIELDS,
	"Shift Request": SHIFT_REQUEST_FIELDS,
	"Shift Assignment": SHIFT_FIELDS,
}

const isRequestModalOpen = ref(false)
const selectedRequest = ref(null)

const openRequestModal = async (request) => {
	selectedRequest.value = request
	isRequestModalOpen.value = true
}

const closeRequestModal = async () => {
	isRequestModalOpen.value = false
	selectedRequest.value = null
}
</script>
