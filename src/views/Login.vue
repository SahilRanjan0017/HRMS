<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="min-h-screen bg-[#050510] text-white flex flex-col font-sans relative overflow-hidden">
				<!-- Premium Animated Background -->
				<div class="fixed inset-0 z-0 pointer-events-none">
					<div class="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-600/20 blur-[120px] animate-pulse"></div>
					<div class="absolute bottom-[-20%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse transition-all duration-[5000ms]" style="animation-delay: 2s"></div>
				</div>

				<!-- Nav -->
				<nav class="relative z-50 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto w-full">
					<router-link to="/" class="flex items-center space-x-3 group cursor-pointer">
						<img src="/megha_hr_logo.png" alt="Megha HR" class="h-10 w-auto group-hover:scale-105 transition-transform" />
					</router-link>
					<div class="flex items-center space-x-6">
						<router-link to="/" class="text-sm font-bold text-gray-400 hover:text-white transition-colors">Back to Home</router-link>
					</div>
				</nav>

				<div class="relative z-10 flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
					<div class="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-700">
						<!-- Header -->
						<div class="flex flex-col items-center space-y-4 text-center">
							<div class="mb-4">
								<img src="/megha_hr_logo.png" alt="Megha HR" class="h-24 w-auto drop-shadow-2xl" />
							</div>
							<h1 class="text-4xl font-black tracking-tight text-white">
								{{ __("Welcome Back") }}
							</h1>
							<p class="text-gray-400 font-medium">
								{{ __("Please login to your account to continue.") }}
							</p>
						</div>

						<!-- Login Card -->
						<div class="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl space-y-8">
							<form class="space-y-6" @submit.prevent="submit">
								<div class="space-y-2">
									<label class="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">{{ __("Email Address") }}</label>
									<Input
										:placeholder="__('name@company.com')"
										v-model="email"
										type="text"
										autocomplete="username"
										class="premium-input-field"
									/>
								</div>
								<div class="space-y-2">
									<label class="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">{{ __("Password") }}</label>
									<Input
										type="password"
										placeholder="••••••••"
										v-model="password"
										autocomplete="current-password"
										class="premium-input-field"
									/>
								</div>

								<ErrorMessage :message="errorMessage" v-if="errorMessage" class="text-rose-400 bg-rose-400/10 p-4 rounded-2xl border border-rose-400/20 text-sm font-medium" />

								<Button
									:loading="session.login.loading"
									class="w-full h-14 !mt-10 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-lg shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] border-none"
								>
									{{ __("Login") }}
								</Button>
							</form>

							<template v-if="authProviders.data?.length">
								<div class="relative py-2">
									<div class="absolute inset-0 flex items-center" aria-hidden="true">
										<div class="w-full border-t border-white/10"></div>
									</div>
									<div class="relative flex justify-center text-sm">
										<span class="bg-[#0b0b1a] px-4 text-gray-500">{{ __("Or continue with") }}</span>
									</div>
								</div>

								<div class="grid grid-cols-1 gap-4">
									<a
										v-for="provider in authProviders.data"
										:key="provider.name"
										class="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white font-medium group"
										:href="provider.auth_url"
									>
										<img class="h-5 w-5 grayscale group-hover:grayscale-0 transition-all" :src="provider.icon" :alt="provider.provider_name" />
										<span>{{ provider.provider_name }}</span>
									</a>
								</div>
							</template>
						</div>

						<p class="text-center text-sm text-gray-500 pt-4">
							&copy; {{ new Date().getFullYear() }} Megha HR.
						</p>
					</div>
				</div>

			<Dialog v-model="resetPassword.showDialog">
				<template #body-title>
					<h2 class="text-lg font-bold">{{ __("Reset Password") }} </h2>
				</template>
				<template #body-content>
					<p>
						{{ __("Your password has expired. Please reset your password to continue") }}
					</p>
				</template>
				<template #actions>
					<a
						class="inline-flex items-center justify-center gap-2 transition-colors focus:outline-none text-white bg-gray-900 hover:bg-gray-800 active:bg-gray-700 focus-visible:ring focus-visible:ring-gray-400 h-7 text-base px-2 rounded"
						:href="resetPassword.link"
						target="_blank"
					>
						{{ __("Go to Reset Password page") }}
					</a>
				</template>
			</Dialog>

			<Dialog v-model="otp.showDialog">
				<template #body-title>
					<h2 class="text-lg font-bold">{{ __("OTP Verification") }}</h2>
				</template>
				<template #body-content>
					<p class="mb-4" v-if="otp.verification.prompt">
						{{ otp.verification.prompt }}
					</p>

					<form class="flex flex-col space-y-4" @submit.prevent="submit">
						<Input
							:label="__('OTP Code')"
							type="text"
							placeholder="000000"
							v-model="otp.code"
							autocomplete="one-time-code"
						/>
						<ErrorMessage :message="errorMessage" />
						<Button
							:loading="session.otp.loading"
							variant="solid"
							class="disabled:bg-gray-700 disabled:text-white !mt-6"
						>
							{{ __("Verify") }}
						</Button>
					</form>
				</template>
			</Dialog>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue"
import { inject, reactive, ref } from "vue"
import { Input, Button, ErrorMessage, Dialog, createResource } from "@/utils/frappe-ui"

const email = ref(null)
const password = ref(null)
const errorMessage = ref("")

const resetPassword = reactive({
	showDialog: false,
	link: "",
})
const otp = reactive({
	showDialog: false,
	tmp_id: "",
	code: "",
	verification: {},
})

const session = inject("$session")
const __ = inject("$translate")

async function submit(e) {
	try {
		let response
		if (otp.showDialog) {
			response = await session.otp(otp.tmp_id, otp.code)
		} else {
			response = await session.login(email.value, password.value)
		}

		if (response.message === "Password Reset") {
			resetPassword.showDialog = true
			resetPassword.link = response.redirect_to
		} else {
			resetPassword.showDialog = false
			resetPassword.link = ""
		}

		// OTP verification
		if (response.verification) {
			if (response.verification.setup) {
				otp.showDialog = true
				otp.tmp_id = response.tmp_id
				otp.verification = response.verification
			} else {
				// Don't bother handling impossible OTP setup (e.g. no phone number).
				window.open("/login?redirect-to=" + encodeURIComponent(window.location.pathname), "_blank")
			}
		}
	} catch (error) {
		errorMessage.value = error.messages.join("\n")
	}
}

const authProviders = createResource({
	url: "hrms.api.oauth.oauth_providers",
	auto: true,
})
</script>
