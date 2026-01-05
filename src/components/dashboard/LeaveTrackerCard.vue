<template>
	<div class="premium-card bg-white dark:bg-gray-800 p-6 min-h-[300px]">
		<!-- Header / Tabs -->
		<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
			<div class="flex flex-col">
				<h3 class="text-xl font-black text-gray-900 dark:text-gray-100">
					{{ __('My Leave Tracker') }}
				</h3>
				<span class="text-xs text-gray-400 font-bold mt-1">
					{{ dayjs().startOf('year').format('DD-MMM-YYYY') }} to {{ dayjs().endOf('year').format('DD-MMM-YYYY') }}
				</span>
			</div>
			
			<div class="flex gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
				<button 
					v-for="tab in tabs" 
					:key="tab"
					@click="activeTab = tab"
					class="px-4 py-2 text-xs font-bold rounded-lg transition-all"
					:class="activeTab === tab ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'"
				>
					{{ __(tab) }}
				</button>
			</div>
		</div>

		<!-- Allocation Table -->
		<div class="w-full overflow-x-auto" v-if="activeTab === 'Leave Details'">
			<table class="w-full whitespace-nowrap text-left">
				<thead>
					<tr>
						<th class="pb-4 pt-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">Type</th> <!-- Colored indicator line handled in row -->
						<th class="pb-4 pt-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 text-right">Opening</th>
						<th class="pb-4 pt-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 text-right">Leave utilized</th>
						<th class="pb-4 pt-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 text-right">Balance</th>
						<th class="pb-4 pt-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700"></th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-50 dark:divide-gray-700/50">
					<tr v-for="leave in leaveAllocations.data" :key="leave.name" class="group">
						<td class="py-4 px-2 align-top">
							<div class="flex items-start gap-3">
								<div class="w-1 h-8 rounded-full" :class="getColorClass(leave.leave_type)"></div>
								<div class="flex flex-col">
									<span class="text-sm font-bold text-gray-900 dark:text-gray-100">{{ leave.leave_type }}</span>
									<span class="text-xs text-gray-400 font-mono">{{ getShortCode(leave.leave_type) }}</span>
								</div>
							</div>
						</td>
						<td class="py-4 px-2 text-right">
							<div class="flex flex-col">
								<span class="text-xs text-gray-400 mb-1 sm:hidden">Opening</span>
								<span class="text-sm font-bold text-gray-700 dark:text-gray-300">{{ formatNumber(leave.total_leaves_allocated) }}</span>
							</div>
						</td>
						<td class="py-4 px-2 text-right">
							<div class="flex flex-col">
								<span class="text-xs text-gray-400 mb-1 sm:hidden">Utilized</span>
								<span class="text-sm font-bold text-gray-700 dark:text-gray-300">{{ formatNumber(leave.leaves_allocated - leave.new_leaves_allocated) }}</span>
							</div>
						</td>
						<td class="py-4 px-2 text-right">
							<div class="flex flex-col">
								<span class="text-xs text-gray-400 mb-1 sm:hidden">Balance</span>
								<span class="text-sm font-black text-gray-900 dark:text-white">{{ formatNumber(leave.new_leaves_allocated) }}</span>
							</div>
						</td>
						<td class="py-4 px-2 text-right">
							<router-link :to="{ name: 'LeaveApplicationFormView' }" class="text-sm font-bold text-blue-500 hover:text-blue-600 hover:underline decoration-2 underline-offset-4">
								{{ __('Apply') }}
							</router-link>
						</td>
					</tr>
				</tbody>
			</table>

			<div v-if="!leaveAllocations.data?.length" class="py-10 text-center text-gray-400 text-sm font-medium">
				{{ __("No leave allocations found.") }}
			</div>
		</div>

		<div v-else class="py-20 flex items-center justify-center text-gray-400 text-sm font-medium">
			{{ __("No data available for this section yet.") }}
		</div>
	</div>
</template>

<script setup>
import { inject, ref } from 'vue'
import { createResource } from '@/utils/frappe-ui'
import dayjs from 'dayjs'

const __ = inject('$translate')
const user = inject('$user')

const tabs = ['Leave Details', 'Special Leave', 'OPH/WFH Details', 'COFF']
const activeTab = ref('Leave Details')

const leaveAllocations = createResource({
	url: 'hrms.hr.utils.get_leave_balances',
	makeParams() {
		return {
			employee: user.data?.name, 
			date: dayjs().format('YYYY-MM-DD')
		}
	},
	auto: true,
	// Use mock data if API fails or is empty for demo
	initialData: [
		{ name: '1', leave_type: 'Casual Leave', total_leaves_allocated: 6.00, leaves_allocated: 6.00, new_leaves_allocated: 6.00 },
		{ name: '2', leave_type: 'Privilege Leave', total_leaves_allocated: 13.67, leaves_allocated: 13.67, new_leaves_allocated: 13.67 },
		{ name: '3', leave_type: 'Sick Leave', total_leaves_allocated: 8.00, leaves_allocated: 8.00, new_leaves_allocated: 4.50 },
	]
})

const getColorClass = (type) => {
	const map = {
		'Casual Leave': 'bg-rose-500',
		'Privilege Leave': 'bg-rose-500', // Using rose to match screenshot red bars
		'Sick Leave': 'bg-orange-500',
	}
	return map[type] || 'bg-gray-400'
}

const getShortCode = (type) => {
	const map = {
		'Casual Leave': 'CL',
		'Privilege Leave': 'PL',
		'Sick Leave': 'SL',
		'Compensatory Off': 'COFF'
	}
	// Fallback to acronym
	return map[type] || type.match(/\b(\w)/g).join('')
}

const formatNumber = (num) => {
	return parseFloat(num).toFixed(2)
}
</script>
