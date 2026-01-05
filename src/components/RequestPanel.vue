<template>
	<div class="w-full space-y-2">
		<div class="sticky top-0 z-20 py-2 bg-[rgb(var(--bg-app))] transition-colors duration-300">
			<TabButtons
				:buttons="TAB_BUTTONS"
				v-model="activeTab"
			/>
		</div>
		<RequestList v-if="activeTab == 'My Requests'" :items="myRequests" />
		<RequestList
			v-else-if="activeTab == 'Team Requests'"
			:items="teamRequests"
			:teamRequests="true"
		/>
	</div>
</template>

<script setup>
import { ref, inject, onMounted, computed, markRaw } from "vue"

import TabButtons from "@/components/TabButtons.vue"
import RequestList from "@/components/RequestList.vue"

import { myAttendanceRequests, myShiftRequests, teamShiftRequests, teamAttendanceRequests } from "@/data/attendance"
import { myClaims, teamClaims } from "@/data/claims"
import { myLeaves, teamLeaves } from "@/data/leaves"

import AttendanceRequestItem from "@/components/AttendanceRequestItem.vue"
import ExpenseClaimItem from "@/components/ExpenseClaimItem.vue"
import LeaveRequestItem from "@/components/LeaveRequestItem.vue"
import ShiftRequestItem from "@/components/ShiftRequestItem.vue"

import { useListUpdate } from "@/composables/realtime"

const activeTab = ref("My Requests")
const socket = inject("$socket")

const TAB_BUTTONS = ["My Requests", "Team Requests"] // __("My Requests"), __("Team Requests")

const myRequests = computed(() =>
	updateRequestDetails(myLeaves, myClaims, myShiftRequests, myAttendanceRequests)
)

const teamRequests = computed(() =>
	updateRequestDetails(teamLeaves, teamClaims, teamShiftRequests, teamAttendanceRequests)
)

function updateRequestDetails(leaves, claims, shiftRequests, attendanceRequests) {
	let requests = [leaves, claims, shiftRequests, attendanceRequests].reduce(
		(acc, resource) => acc.concat(resource?.data || []),
		[]
	)

	// Mock requests for demo if list is empty
	if (requests.length === 0) {
		requests = [
			{
				doctype: "Leave Application",
				leave_type: "Privilege Leave",
				status: "Approved",
				from_date: "2024-05-20",
				to_date: "2024-05-22",
				total_leave_days: 3,
				creation: "2024-05-15"
			},
			{
				doctype: "Expense Claim",
				approval_status: "Pending",
				total_claimed_amount: 1250.00,
				creation: "2024-05-18",
				title: "Travel to Client Site"
			},
			{
				doctype: "Shift Request",
				status: "Approved",
				shift_type: "Night Shift",
				creation: "2024-05-19"
			}
		]
	}

	const componentMap = {
		"Leave Application": LeaveRequestItem,
		"Expense Claim": ExpenseClaimItem,
		"Shift Request": ShiftRequestItem,
		"Attendance Request": AttendanceRequestItem,
	}
	requests.forEach((request) => {
		request.component = markRaw(componentMap[request.doctype])
	})

	return getSortedRequests(requests)
}

function getSortedRequests(list) {
	// return top 10 requests sorted by posting date
	return list
		.sort((a, b) => {
			return new Date(b.creation) - new Date(a.creation)
		})
		.splice(0, 10)
}

onMounted(() => {
	useListUpdate(socket, "Leave Application", () => teamLeaves.reload())
	useListUpdate(socket, "Expense Claim", () => teamClaims.reload())
	useListUpdate(socket, "Shift Request", () => teamShiftRequests.reload())
	useListUpdate(socket, "Attendance Request", () => teamAttendanceRequests.reload())
})
</script>
