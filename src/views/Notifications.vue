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
							<h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ __("Notifications") }} </h2>
						</div>
					</header>

					<div class="flex flex-col gap-4 mt-5 p-4">
						<div class="flex flex-row justify-between items-center mb-2">
							<div
								class="text-sm text-gray-500 font-bold uppercase tracking-widest"
								v-if="unreadCount"
							>
								{{ unreadCount }} {{ __("Unread") }}
							</div>
							<div class="flex ml-auto gap-2">
								<Button
									variant="subtle"
									size="sm"
									@click="router.push({ name: 'Settings' })"
								>
									<template #prefix>
										<FeatherIcon name="settings" class="w-4 h-4" />
									</template>
									{{ __("Settings") }}
								</Button>
							</div>
						</div>

						<div
							class="flex flex-col bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
							v-if="notifications.data?.length"
						>
							<div
								:class="[
									'flex flex-row items-start p-5 justify-between border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors',
									!item.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : '',
								]"
								v-for="item in notifications.data"
								:key="item.name"
								@click="item.read = true"
							>
								<div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
									<FeatherIcon name="bell" class="w-5 h-5" />
								</div>
								<div class="flex flex-col gap-1 grow ml-4">
									<div
										class="text-sm font-bold text-gray-900 dark:text-white leading-tight"
										v-html="item.message"
									></div>
									<div class="text-xs font-medium text-gray-400">
										{{ item.creation }}
									</div>
								</div>
								<div v-if="!item.read" class="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
							</div>
						</div>
						
						<div v-else class="flex flex-col items-center justify-center py-20 text-center">
							<div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
								<FeatherIcon name="bell-off" class="w-10 h-10 text-gray-400" />
							</div>
							<p class="text-gray-500 font-bold">{{ __('You have no notifications') }}</p>
						</div>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonContent, IonPage } from "@ionic/vue"
import { useRouter } from "vue-router"
import { Button, FeatherIcon } from "@/utils/frappe-ui"
import { computed, inject } from "vue"
import { notifications } from "@/data/notifications"

const router = useRouter()
const __ = inject("$translate")

const unreadCount = computed(() => {
	return notifications.data?.filter(n => !n.read).length || 0
})
</script>
