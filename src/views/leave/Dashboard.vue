<template>
	<BaseLayout :pageTitle="__('Leaves & Holidays')">
		<template #body>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
				<!-- Left Column: History -->
				<div class="md:col-span-2 space-y-8 order-2 md:order-1">
					<!-- Recent Leaves -->
					<div class="premium-card w-full space-y-4 p-1">
						<div class="px-5 pt-5 pb-2">
							<h3 class="text-lg font-black tracking-tight text-[rgb(var(--text-main))] border-l-4 border-blue-500 pl-3">
								{{ __('Recent Leaves') }}
							</h3>
						</div>
						<RequestList
							:component="markRaw(LeaveRequestItem)"
							:items="myLeaves.data"
							:addListButton="true"
							listButtonRoute="LeaveApplicationListView"
						/>
					</div>
				</div>

				<!-- Right Column: Summary & Actions -->
				<div class="md:col-span-1 space-y-8 order-1 md:order-2">
					<!-- Navigation Widget -->
					<SidebarNav class="hidden md:block" />

					<!-- Leave Balance Card -->
					<div class="w-full">
						<LeaveBalance />
					</div>

					<!-- Action Button -->
					<router-link
						:to="{ name: 'LeaveApplicationFormView' }"
						v-slot="{ navigate }"
						class="w-full block"
					>
						<Button
							@click="navigate"
							variant="solid"
							class="w-full h-16 !bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:via-blue-400 hover:to-indigo-500 !text-white !rounded-2xl !font-black !text-xl !shadow-[0_10px_20px_-5px_rgba(59,130,246,0.4)] !border-none !transition-all active:!scale-[0.98] ring-1 ring-white/20"
						>
							{{ __("Request a Leave") }}
						</Button>
					</router-link>

					<!-- Holidays -->
					<div class="premium-card w-full p-1">
						<Holidays />
					</div>
				</div>
			</div>
		</template>
	</BaseLayout>
</template>

<script setup>
import { markRaw } from "vue"

import BaseLayout from "@/components/BaseLayout.vue"
import LeaveBalance from "@/components/LeaveBalance.vue"
import RequestList from "@/components/RequestList.vue"
import LeaveRequestItem from "@/components/LeaveRequestItem.vue"
import Holidays from "@/components/Holidays.vue"
import SidebarNav from "@/components/dashboard/SidebarNav.vue"

import { myLeaves } from "@/data/leaves"
</script>
