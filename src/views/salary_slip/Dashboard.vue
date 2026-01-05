<template>
	<BaseLayout :pageTitle="__('Salary Slips')">
		<template #body>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
				<!-- Left Column: List -->
				<div class="md:col-span-2 order-2 lg:order-1">
					<div class="premium-card w-full p-1 overflow-hidden">
						<div class="px-5 pt-5 pb-2">
							<h3 class="text-lg font-black tracking-tight text-[rgb(var(--text-main))] border-l-4 border-indigo-500 pl-3">
								{{ __("Salary Slips") }}
							</h3>
						</div>
						
						<div class="w-full">
							<div
								v-if="documents.data?.length"
								class="flex flex-col w-full"
							>
								<div
									class="flex flex-col border-b border-[rgb(var(--border-color))] last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
									v-for="link in documents.data"
									:key="link.name"
								>
									<router-link
										:to="{
											name: 'SalarySlipDetailView',
											params: { id: link.name },
										}"
										v-slot="{ navigate }"
										class="w-full p-5 cursor-pointer block"
									>
										<SalarySlipItem :doc="link" @click="navigate" />
									</router-link>
								</div>
							</div>
							<div v-else class="p-6">
								<EmptyState :message="__('No salary slips found')" />
							</div>
						</div>
					</div>
				</div>

				<!-- Right Column: Summary -->
				<div class="md:col-span-1 space-y-8 order-1 lg:order-2">
					<div class="premium-card w-full p-6 bg-gradient-to-br from-[rgb(var(--bg-panel))] to-gray-50 dark:to-white/5 sticky top-6">
						<div class="flex flex-col gap-6">
							<div v-if="lastSalarySlip && lastSalarySlip.year_to_date" class="flex flex-col w-full gap-2">
								<span class="text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-muted))]">
									{{ __("Year To Date Earnings") }}
								</span>
								<span class="text-4xl font-black tracking-tight text-[rgb(var(--text-main))]">
									{{
										formatCurrency(
											lastSalarySlip.year_to_date,
											lastSalarySlip.currency
										)
									}}
								</span>
							</div>

							<div class="w-full h-px bg-[rgb(var(--border-color))]"></div>

							<Autocomplete
								:label="__('Payroll Period')"
								class="w-full"
								:placeholder="__('Select Payroll Period')"
								v-model="selectedPeriod"
								:options="payrollPeriods.data"
							/>
						</div>
					</div>
				</div>
			</div>
		</template>
	</BaseLayout>
</template>

<script setup>
import { inject, ref, computed, watch, onMounted, onBeforeUnmount } from "vue"
import { Autocomplete, createListResource } from "@/utils/frappe-ui"

import BaseLayout from "@/components/BaseLayout.vue"
import EmptyState from "@/components/EmptyState.vue"
import SalarySlipItem from "@/components/SalarySlipItem.vue"

import { formatCurrency } from "@/utils/formatters"

let selectedPeriod = ref({})
let periodsByName = ref({})

const employee = inject("$employee")
const dayjs = inject("$dayjs")
const socket = inject("$socket")
const __ = inject("$translate")

const payrollPeriods = createListResource({
	doctype: "Payroll Period",
	fields: ["name", "start_date", "end_date"],
	filters: {
		company: employee.data?.company,
	},
	orderBy: "start_date desc",
	auto: true,
	transform(data) {
		return data.map((period) => {
			periodsByName.value[period.name] = period
			return {
				label: getPeriodLabel(period),
				value: period.name,
			}
		})
	},
	onSuccess: (data) => {
		selectedPeriod.value = data[0]
	},
})

const documents = createListResource({
	doctype: "Salary Slip",
	fields: [
		"name",
		"start_date",
		"end_date",
		"currency",
		"gross_pay",
		"net_pay",
		"year_to_date",
	],
	filters: {
		employee: employee.data?.name,
		docstatus: 1,
	},
	orderBy: "end_date desc",
})

const lastSalarySlip = computed(() => documents.data?.[0])

function getPeriodLabel(period) {
	return `${dayjs(period?.start_date).format("MMM YYYY")} - ${dayjs(
		period?.end_date
	).format("MMM YYYY")}`
}

watch(
	() => selectedPeriod.value,
	(value) => {
		let period = periodsByName.value[value?.value]
		documents.filters.start_date = [
			"between",
			[period?.start_date, period?.end_date],
		]
		documents.reload()
	}
)

onMounted(() => {
	socket.on("hrms:update_salary_slips", (data) => {
		if (data.employee === employee.data.name) {
			documents.reload()
		}
	})
})

onBeforeUnmount(() => {
	socket.off("hrms:update_salary_slips")
})
</script>
