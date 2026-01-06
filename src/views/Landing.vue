<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="landing-page min-h-screen bg-[#050510] text-white overflow-x-hidden font-sans">
				<!-- Dynamic Background -->
				<div class="fixed inset-0 overflow-hidden pointer-events-none">
					<div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse-slow"></div>
					<div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[150px] rounded-full animate-pulse-slow-reverse"></div>
					<div class="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full"></div>
				</div>

				<!-- Nav -->
				<nav class="relative z-50 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto">
					<div class="flex items-center space-x-3 group cursor-pointer">
						<img src="/megha_hr_logo.png" alt="HRMS" class="h-10 w-auto group-hover:scale-105 transition-transform" />
					</div>
					<div class="hidden md:flex items-center space-x-10 text-sm font-semibold tracking-wide text-gray-400">
						<a href="#" class="hover:text-white transition-colors">Solutions</a>
						<a href="#" class="hover:text-white transition-colors">Resources</a>
						<a href="#" class="hover:text-white transition-colors">Pricing</a>
					</div>
					<div class="flex items-center space-x-6">
						<router-link to="/login" class="text-sm font-bold hover:text-blue-400 transition-colors">Sign In</router-link>
						<router-link to="/login" class="px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-blue-50 transition-all active:scale-95 shadow-xl shadow-white/10">
							Get Started
						</router-link>
					</div>
				</nav>

				<!-- Hero Section -->
				<main class="relative z-10 pt-20 pb-32">
					<div class="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
						<div class="space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
							<div class="inline-flex items-center space-x-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
								<span class="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
								<span class="text-xs font-bold uppercase tracking-widest text-blue-400">New Era of HR Management</span>
							</div>

							<h1 class="text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight">
								Reimagine <br/>
								<span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Human Capital</span>
							</h1>

							<p class="text-xl text-gray-400 leading-relaxed max-w-xl font-medium">
								The all-in-one HR platform built for modern teams. Streamline operations, empower employees, and drive growth with precision.
							</p>

							<div class="flex flex-wrap gap-4 pt-4">
								<router-link to="/login" class="group relative px-10 py-5 bg-blue-600 rounded-2xl font-black text-lg transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)]">
									Start Free Trial
									<span class="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
								</router-link>
								<button
									@click="showDemoToast"
									class="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-lg backdrop-blur-xl hover:bg-white/10 transition-all flex items-center space-x-3"
								>
									<svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
									<span>Watch Demo</span>
								</button>
							</div>

							<div class="pt-10 flex items-center space-x-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
								<span class="text-xs font-bold uppercase tracking-widest">Trusted by</span>
								<div class="flex space-x-8">
									<div class="h-6 w-24 bg-white/20 rounded"></div>
									<div class="h-6 w-24 bg-white/20 rounded"></div>
									<div class="h-6 w-24 bg-white/20 rounded"></div>
								</div>
							</div>
						</div>

						<div class="relative group animate-in fade-in slide-in-from-right-12 duration-1000 delay-200">
							<!-- Glow behind image -->
							<div class="absolute inset-x-0 bottom-[-50px] top-40 bg-blue-600/30 blur-[100px] rounded-[100%] group-hover:bg-blue-500/40 transition-colors duration-700"></div>

							<!-- Mockup Card -->
							<div class="relative bg-[#0A0A1F] border border-white/10 rounded-[2.5rem] p-4 shadow-2xl transform lg:rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
								<div class="bg-white/5 rounded-[2rem] overflow-hidden aspect-[4/3] flex items-center justify-center relative">
									<div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
									<div class="grid grid-cols-3 gap-4 w-full p-8">
										<div v-for="i in 6" :key="i" class="h-24 bg-white/5 border border-white/5 rounded-2xl animate-pulse" :style="{ animationDelay: i * 100 + 'ms' }"></div>
									</div>
								</div>
							</div>

							<!-- Floating Badges -->
							<div class="absolute -top-10 -right-10 p-6 bg-white shadow-2xl rounded-3xl animate-float">
								<div class="flex items-center space-x-4">
									<div class="p-3 bg-green-100 rounded-2xl text-green-600">
										<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
									</div>
									<div>
										<p class="text-black font-black text-lg leading-none">99.9%</p>
										<p class="text-gray-500 text-xs font-bold uppercase">Efficiency</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>

				<!-- Features Grid -->
				<section class="max-w-7xl mx-auto px-8 py-32">
					<div class="grid md:grid-cols-3 gap-8">
						<div v-for="(f, i) in features" :key="i" class="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/[0.08] transition-all group">
							<div class="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform">
								<component :is="f.icon" class="w-7 h-7" />
							</div>
							<h3 class="text-2xl font-bold mb-4">{{ f.title }}</h3>
							<p class="text-gray-400 font-medium leading-relaxed">{{ f.desc }}</p>
						</div>
					</div>
				</section>

				<footer class="py-20 border-t border-white/5">
					<div class="max-w-7xl mx-auto px-8 flex flex-col items-center">
						<div class="mb-6 opacity-50 hover:opacity-100 transition-opacity">
							<img src="/megha_hr_logo.png" alt="HRMS" class="h-8 w-auto grayscale hover:grayscale-0" />
						</div>
						<p class="text-gray-500 text-sm font-medium">© 2025 HRMS. All rights reserved.</p>
					</div>
				</footer>
			</div>
		</ion-content>
	</ion-page>
</template>


<script setup>
import { inject, markRaw } from 'vue'
import AttendanceIcon from "@/components/icons/AttendanceIcon.vue"
import LeaveIcon from "@/components/icons/LeaveIcon.vue"
import SalaryIcon from "@/components/icons/SalaryIcon.vue"

const __ = inject("$translate")
import { toast } from "@/utils/frappe-ui"

const showDemoToast = () => {
	toast({
		title: __("Coming Soon"),
		text: __("The full demo video is being prepared. Stay tuned!"),
		icon: "info",
		position: "top-center",
		iconClasses: "text-blue-500",
	})
}

const features = [
	{
		title: __("Attendance Management"),
		desc: __("Automated tracking with geofencing and real-time synchronization."),
		icon: markRaw(AttendanceIcon)
	},
	{
		title: __("Leave & Holidays"),
		desc: __("Smart leave policy engine with seamless approval workflows."),
		icon: markRaw(LeaveIcon)
	},
	{
		title: __("Payroll Precision"),
		desc: __("Error-free salary processing with automated tax calculations."),
		icon: markRaw(SalaryIcon)
	}
]
</script>

<style scoped>
@keyframes pulse-slow {
	0%, 100% { opacity: 0.2; transform: scale(1); }
	50% { opacity: 0.4; transform: scale(1.1); }
}

@keyframes float {
	0%, 100% { transform: translateY(0); }
	50% { transform: translateY(-20px); }
}

.animate-pulse-slow {
	animation: pulse-slow 8s ease-in-out infinite;
}

.animate-pulse-slow-reverse {
	animation: pulse-slow 10s ease-in-out infinite reverse;
}

.animate-float {
	animation: float 6s ease-in-out infinite;
}

.landing-page {
	background-attachment: fixed;
}
</style>
