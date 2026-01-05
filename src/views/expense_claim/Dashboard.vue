<template>
	<BaseLayout :pageTitle="__('Expense Claims')">
		<template #body>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
				<!-- Left Column: History -->
				<div class="md:col-span-2 order-2 lg:order-1">
					<!-- Recent Expenses -->
					<div class="premium-card w-full space-y-4 p-1">
						<div class="px-5 pt-5 pb-2">
							<h3 class="text-lg font-black tracking-tight text-[rgb(var(--text-main))] border-l-4 border-orange-500 pl-3">
								{{ __("Recent Expenses") }}
							</h3>
						</div>
						<RequestList
							:component="markRaw(ExpenseClaimItem)"
							:items="myClaims.data"
							:addListButton="true"
							listButtonRoute="ExpenseClaimListView"
						/>
					</div>
				</div>

				<!-- Right Column: Summary & Actions -->
				<div class="md:col-span-1 space-y-8 order-1 lg:order-2">
					<!-- Summary Card -->
					<div class="premium-card p-1">
						<div class="px-5 pt-5 pb-5">
							<ExpenseClaimSummary />
						</div>
					</div>

					<!-- Action Button -->
					<div class="w-full">
						<router-link
							:to="{ name: 'ExpenseClaimFormView' }"
							v-slot="{ navigate }"
						>
							<Button
								@click="navigate"
								variant="solid"
								class="w-full h-16 !bg-gradient-to-r from-orange-500 via-orange-400 to-red-500 hover:from-orange-400 hover:via-orange-300 hover:to-red-400 !text-white !rounded-2xl !font-black !text-xl !shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)] !border-none !transition-all active:!scale-[0.98] ring-1 ring-white/20"
							>
								{{ __("Claim an Expense") }}
							</Button>
						</router-link>
					</div>

					<!-- Advance Balance -->
					<div class="premium-card w-full p-1">
						<div class="px-5 pt-5 pb-2 flex flex-row justify-between items-center">
							<h3 class="text-lg font-black tracking-tight text-[rgb(var(--text-main))] border-l-4 border-blue-500 pl-3">
								{{ __("Employee Advance Balance") }}
							</h3>
							<router-link
								:to="{ name: 'EmployeeAdvanceListView' }"
								class="text-sm font-bold text-blue-500 hover:text-blue-600 cursor-pointer underline underline-offset-4 decoration-2"
							>
								{{ __("View List") }}
							</router-link>
						</div>

						<div class="px-5 pb-5">
							<EmployeeAdvanceBalance :items="advanceBalance.data" />
						</div>
					</div>
				</div>
			</div>
		</template>
	</BaseLayout>
</template>

<script setup>
import { markRaw } from "vue"

import BaseLayout from "@/components/BaseLayout.vue"
import ExpenseClaimSummary from "@/components/ExpenseClaimSummary.vue"
import RequestList from "@/components/RequestList.vue"
import ExpenseClaimItem from "@/components/ExpenseClaimItem.vue"
import EmployeeAdvanceBalance from "@/components/EmployeeAdvanceBalance.vue"

import { myClaims } from "@/data/claims"
import { advanceBalance } from "@/data/advances"
</script>
