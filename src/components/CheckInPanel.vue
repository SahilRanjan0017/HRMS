<template>
	<div class="premium-card w-full p-8 space-y-6">
		<div class="space-y-2">
			<h2
				class="text-2xl font-black tracking-tight text-[rgb(var(--text-main))]"
			>
				{{ __("Hey, {0} 👋", [employee?.data?.first_name]) }}
			</h2>
			<p
				v-if="!settings.data?.allow_employee_checkin_from_mobile_app"
				class="text-sm font-bold uppercase tracking-widest text-[rgb(var(--text-muted))]"
			>
				{{ dayjs().format("ddd, D MMMM, YYYY") }}
			</p>
		</div>

		<div
			v-if="settings.data?.allow_employee_checkin_from_mobile_app"
			class="space-y-4"
		>
			<div
				v-if="lastLog"
				class="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10"
			>
				<div class="flex items-center gap-3">
					<div class="p-2 bg-blue-500/10 rounded-xl text-blue-500">
						<FeatherIcon name="clock" class="h-4 w-4" />
					</div>
					<div class="text-sm font-medium text-[rgb(var(--text-main))]">
						<span class="text-[rgb(var(--text-muted))]">{{
							__("Last {0}: ", [__(lastLogType)])
						}}</span>
						<span class="font-bold">{{ formatTimestamp(lastLog.time) }}</span>
					</div>
				</div>
			</div>

			<Button
				class="w-full h-14 !bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:via-blue-400 hover:to-indigo-500 !text-white !rounded-2xl !font-black !text-lg !shadow-[0_10px_20px_-5px_rgba(59,130,246,0.4)] !border-none !transition-all active:!scale-[0.98] ring-1 ring-white/20"
				id="open-checkin-modal"
				@click="handleEmployeeCheckin"
			>
				<template #prefix>
					<FeatherIcon
						:name="
							nextAction.action === 'IN'
								? 'arrow-right-circle'
								: 'arrow-left-circle'
						"
						class="w-5 h-5 mr-1"
					/>
				</template>
				{{ nextAction.label }}
			</Button>

			<div class="text-center">
				<router-link
					:to="{ name: 'EmployeeCheckinListView' }"
					class="text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-colors"
				>
					{{ __("View Check-in History") }}
				</router-link>
			</div>
		</div>
	</div>

	<ion-modal
		v-if="settings.data?.allow_employee_checkin_from_mobile_app"
		ref="modal"
		trigger="open-checkin-modal"
		:initial-breakpoint="1"
		:breakpoints="[0, 1]"
	>
		<div
			class="h-120 w-full flex flex-col items-center justify-center gap-5 p-4 mb-5"
		>
			<div class="flex flex-col gap-1.5 mt-2 items-center justify-center">
				<div class="font-bold text-xl">
					{{ dayjs(checkinTimestamp).format("hh:mm:ss a") }}
				</div>
				<div class="font-medium text-gray-500 text-sm">
					{{ dayjs().format("D MMM, YYYY") }}
				</div>
			</div>

			<template v-if="settings.data?.allow_geolocation_tracking">
				<span v-if="locationStatus" class="font-medium text-gray-500 text-sm">
					{{ locationStatus }}
				</span>

				<div
					class="rounded border-4 translate-z-0 block overflow-hidden w-full h-170"
				>
					<iframe
						width="100%"
						height="170"
						frameborder="0"
						scrolling="no"
						marginheight="0"
						marginwidth="0"
						style="border: 0"
						:src="`https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=15&amp;output=embed`"
					>
					</iframe>
				</div>
			</template>

			<Button
				:loading="checkins.insert.loading"
				variant="solid"
				class="w-full py-5 text-sm disabled:bg-gray-700"
				@click="submitLog(nextAction.action)"
			>
				{{ __("Confirm {0}", [nextAction.label]) }}
			</Button>
		</div>
	</ion-modal>
</template>

<script setup>
import { createResource, createListResource, toast } from "@/utils/api"
import { computed, inject, ref, onMounted, onBeforeUnmount } from "vue"
import FeatherIcon from "@/components/ui/FeatherIcon.vue"
import { IonModal, modalController } from "@ionic/vue"

import { formatTimestamp } from "@/utils/formatters"

const DOCTYPE = "Employee Checkin"

const socket = inject("$socket")
const employee = inject("$employee")
const dayjs = inject("$dayjs")
const __ = inject("$translate")
const checkinTimestamp = ref(null)
const latitude = ref(0)
const longitude = ref(0)
const locationStatus = ref("")
const settings = createResource({
	url: "hrms.api.get_hr_settings",
	auto: true,
	initialData: {
		allow_employee_checkin_from_mobile_app: 1,
		allow_geolocation_tracking: 1,
	},
})

const checkins = createListResource({
	doctype: DOCTYPE,
	fields: [
		"name",
		"employee",
		"employee_name",
		"log_type",
		"time",
		"device_id",
	],
	filters: computed(() => ({
		employee: employee.data?.name,
	})),
	orderBy: "time desc",
	initialData: [
		{
			name: "CHECKIN-001",
			log_type: "OUT",
			time: dayjs().subtract(1, "hour").format("YYYY-MM-DD HH:mm:ss"),
		},
	],
})

onMounted(() => {
	if (employee.data?.name) {
		checkins.reload()
	}
})

const lastLog = computed(() => {
	if (checkins.list.loading || !checkins.data) return {}
	return checkins.data[0]
})

const lastLogType = computed(() => {
	return lastLog.value?.log_type === "IN" ? "check-in" : "check-out"
})

const nextAction = computed(() => {
	const action = lastLog.value?.log_type === "IN" ? "OUT" : "IN"
	const label = action === "IN" ? __("Check In") : __("Check Out")
	return { action, label }
})

const modal = ref(null)

function handleLocationSuccess(position) {
	latitude.value = position.coords.latitude
	longitude.value = position.coords.longitude

	locationStatus.value = [
		__("Latitude: {0}°", [Number(latitude.value).toFixed(5)]),
		__("Longitude: {0}°", [Number(longitude.value).toFixed(5)]),
	].join(", ")
}

function handleLocationError(error) {
	locationStatus.value = "Unable to retrieve your location"
	if (error) locationStatus.value += `: ERROR(${error.code}): ${error.message}`
}

const fetchLocation = () => {
	if (!navigator.geolocation) {
		locationStatus.value = __(
			"Geolocation is not supported by your current browser"
		)
	} else {
		locationStatus.value = __("Locating...")
		navigator.geolocation.getCurrentPosition(
			handleLocationSuccess,
			handleLocationError
		)
	}
}

const handleEmployeeCheckin = () => {
	checkinTimestamp.value = dayjs().format("YYYY-MM-DD HH:mm:ss")

	if (settings.data?.allow_geolocation_tracking) {
		fetchLocation()
	}
	modal.value?.$el.present()
}

const submitLog = (logType) => {
	const actionLabel = logType === "IN" ? __("Check-in") : __("Check-out")

	checkins.insert.submit(
		{
			employee: employee.data.name,
			log_type: logType,
			time: checkinTimestamp.value,
			latitude: latitude.value,
			longitude: longitude.value,
		},
		{
			onSuccess() {
				modal.value?.$el.dismiss()
				toast({
					title: __("Success"),
					text: __("{0} successful!", [actionLabel]),
					icon: "check-circle",
					position: "bottom-center",
					iconClasses: "text-green-500",
				})
			},
			onError(error) {
				let messages = error.messages || []

				for (const message of messages) {
					toast({
						title: __("Error"),
						text: message || __("{0} failed!", [actionLabel]),
						icon: "alert-circle",
						position: "bottom-center",
						iconClasses: "text-red-500",
					})
				}
			},
		}
	)
}

onMounted(() => {
	socket.emit("doctype_subscribe", DOCTYPE)
	socket.on("list_update", (data) => {
		if (data.doctype == DOCTYPE) {
			checkins.reload()
		}
	})
})

onBeforeUnmount(() => {
	socket.emit("doctype_unsubscribe", DOCTYPE)
	socket.off("list_update")
})
</script>
