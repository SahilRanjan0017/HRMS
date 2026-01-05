<template>
	<ion-page>
		<ion-content class="ion-padding">
			<div class="flex flex-col h-screen w-screen bg-gray-50 dark:bg-gray-900">
				<div class="w-full sm:w-96 mx-auto">
					<header
						class="flex flex-row bg-white dark:bg-gray-800 shadow-sm py-4 px-3 items-center justify-between border-b dark:border-gray-700 sticky top-0 z-10"
					>
						<div class="flex flex-row items-center">
							<Button
								variant="ghost"
								class="!pl-0 hover:bg-transparent"
								@click="router.back()"
							>
								<FeatherIcon name="chevron-left" class="h-5 w-5" />
							</Button>
							<h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ __("Settings") }} </h2>
						</div>
					</header>

					<div class="flex flex-col gap-5 my-4 w-full p-4">
						<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
							<div class="flex items-center justify-between">
								<div class="flex flex-col">
									<span class="text-sm font-bold text-gray-900 dark:text-white">{{ __('Push Notifications') }}</span>
									<span class="text-xs text-gray-400">{{ __('Simulated for Megha HR Standalone') }}</span>
								</div>
								<div 
									@click="pushNotificationState = !pushNotificationState"
									class="w-12 h-6 rounded-full transition-colors relative cursor-pointer"
									:class="pushNotificationState ? 'bg-blue-600' : 'bg-gray-200'"
								>
									<div 
										class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform"
										:class="pushNotificationState ? 'translate-x-6' : ''"
									></div>
								</div>
							</div>
						</div>

						<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
							<div class="space-y-4">
								<div class="flex flex-col">
									<span class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ __('App Version') }}</span>
									<span class="text-sm font-bold text-gray-900 dark:text-white">v1.2.0-standalone</span>
								</div>
								<div class="flex flex-col">
									<span class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ __('Environment') }}</span>
									<span class="text-sm font-bold text-gray-900 dark:text-white">Production (Standalone)</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue"
import { useRouter } from "vue-router"
import { Button, FeatherIcon } from "@/utils/frappe-ui"
import { inject, ref } from "vue"

const __ = inject("$translate")
const router = useRouter()
const pushNotificationState = ref(true)
</script>
