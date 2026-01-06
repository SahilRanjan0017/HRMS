<template>
	<!-- Install PWA dialog -->
	<div
		v-if="showDialog"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
	>
		<div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
			<h2 class="text-lg font-bold mb-4">{{ __("Install HRMS") }}</h2>
			<p class="mb-6">
				{{
					__(
						"Get the app on your device for easy access & a better experience!"
					)
				}}
			</p>
			<button
				@click="install()"
				class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
			>
				<FeatherIcon name="download" class="w-4 h-4" />
				{{ __("Install") }}
			</button>
		</div>
	</div>

	<!-- iOS installation info message -->
	<div
		v-if="iosInstallMessage"
		class="fixed bottom-0 left-0 right-0 z-50 mx-2 mb-4 rounded py-5 px-3 bg-blue-100 drop-shadow-xl"
	>
		<div class="flex flex-row text-center items-center justify-between mb-1">
			<span class="text-base text-gray-900 font-bold">
				{{ __("Install HRMS") }}
			</span>
			<button @click="iosInstallMessage = false" class="text-gray-700">
				<FeatherIcon name="x" class="h-4 w-4" />
			</button>
		</div>
		<div class="text-xs text-gray-800">
			<div class="flex flex-col gap-2">
				<span>
					{{
						__(
							"Get the app on your iPhone for easy access & a better experience"
						)
					}}
				</span>
				<span class="inline-flex items-start whitespace-nowrap gap-1">
					<span>Tap</span>
					<FeatherIcon name="share" class="h-4 w-4 text-blue-600" />
					<span>and then "Add to Home Screen"</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue"
import FeatherIcon from "@/components/ui/FeatherIcon.vue"

// Initialize deferredPrompt for use later to show browser install prompt.
const deferredPrompt = ref(null)
const showDialog = ref(false)
const iosInstallMessage = ref(false)

const isIos = () => {
	// Detects if device is on iOS
	const userAgent = window.navigator.userAgent.toLowerCase()
	return /iphone|ipad|ipod/.test(userAgent)
}

// Detects if device is in standalone mode
const isInStandaloneMode = () =>
	"standalone" in window.navigator && window.navigator.standalone

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
	iosInstallMessage.value = true
}

window.addEventListener("beforeinstallprompt", (e) => {
	// Prevent the mini-infobar from appearing on mobile
	e.preventDefault()
	// Stash the event so it can be triggered later.
	deferredPrompt.value = e
	if (isIos() && !isInStandaloneMode()) {
		iosInstallMessage.value = true
	} else {
		showDialog.value = true
	}
	// Optionally, send analytics event that PWA install promo was shown.
	console.log(`'beforeinstallprompt' event was fired.`)
})

window.addEventListener("appinstalled", () => {
	showDialog.value = false
	deferredPrompt.value = null
})

async function install() {
	deferredPrompt.value.prompt()
	showDialog.value = false
}
</script>
