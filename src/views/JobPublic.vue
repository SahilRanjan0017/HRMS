<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-[rgb(var(--text-main))] font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
    <!-- Premium Header -->
    <header class="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-[rgb(var(--border-color))]">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <span class="text-white font-black text-xl">M</span>
          </div>
          <span class="text-xl font-black tracking-tight">Megha HR <span class="text-blue-600 text-sm align-top">Careers</span></span>
        </div>
        <div class="hidden md:flex items-center gap-8">
            <a href="#" class="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">Our Culture</a>
            <a href="#" class="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">Benefits</a>
            <a href="#" class="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">About Us</a>
            <Button variant="solid" class="!bg-blue-600 !text-white !rounded-xl !font-black h-11 px-6 shadow-lg shadow-blue-600/20">Sign In</Button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="py-20 md:py-32 overflow-hidden relative">
        <div class="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full"></div>
        
        <div class="max-w-4xl mx-auto px-6 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Badge theme="blue" variant="subtle" size="lg" class="py-2 px-6 rounded-full font-black border-2 border-blue-500/20">WE'RE HIRING</Badge>
            <h1 class="text-5xl md:text-7xl font-black tracking-tight text-[rgb(var(--text-main))] leading-tight">
                Build the future of <br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Enterprise HR.</span>
            </h1>
            <p class="text-xl text-[rgb(var(--text-secondary))] max-w-2xl mx-auto font-medium leading-relaxed">
                Join a world-class team of engineers, designers, and thinkers at Megha HR. We're building premium tools to empower 1M+ workers.
            </p>
            <div class="max-w-lg mx-auto relative group">
                <input type="text" placeholder="Search roles (e.g. Developer, Designer)..." class="w-full h-16 bg-white dark:bg-gray-800 border-2 border-[rgb(var(--border-color))] rounded-[2rem] px-8 pl-14 text-lg focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all shadow-xl shadow-black/5" />
                <FeatherIcon name="search" class="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
        </div>
    </section>

    <!-- Jobs Grid -->
    <main class="max-w-5xl mx-auto px-6 pb-32">
        <div class="flex items-center justify-between mb-12">
            <h2 class="text-3xl font-black text-[rgb(var(--text-main))]">Open Positions</h2>
            <div class="flex items-center gap-4">
                 <select class="bg-transparent font-bold text-sm text-[rgb(var(--text-secondary))] border-none focus:ring-0 cursor-pointer">
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>Product</option>
                 </select>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
                v-for="job in openJobs" 
                :key="job.id"
                class="premium-card p-10 flex flex-col gap-6 group hover:scale-[1.02] hover:ring-2 hover:ring-blue-500/20 transition-all cursor-pointer bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl shadow-black/[0.03]"
            >
                <div class="flex items-start justify-between">
                    <div class="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <FeatherIcon name="briefcase" class="h-6 w-6" />
                    </div>
                    <Badge theme="green" variant="subtle" size="sm" class="font-black">Active</Badge>
                </div>
                
                <div class="space-y-2">
                    <h3 class="text-2xl font-black text-[rgb(var(--text-main))] group-hover:text-blue-600 transition-colors leading-tight">{{ job.title }}</h3>
                    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-[rgb(var(--text-secondary))]">
                        <span class="flex items-center gap-1.5"><FeatherIcon name="map-pin" class="h-3.5 w-3.5" /> {{ job.location }}</span>
                        <span class="flex items-center gap-1.5"><FeatherIcon name="clock" class="h-3.5 w-3.5" /> {{ job.type }}</span>
                    </div>
                </div>

                <p class="text-sm text-gray-500 font-medium line-clamp-3 leading-relaxed">
                    {{ job.description }}
                </p>

                <div class="pt-6 border-t border-[rgb(var(--border-color))] flex items-center justify-between">
                     <span class="text-sm font-black text-blue-600">{{ job.salary_range }}</span>
                     <Button variant="solid" class="!bg-gray-900 dark:!bg-white dark:!text-gray-900 !text-white !rounded-xl !font-black">Details</Button>
                </div>
            </div>
        </div>

        <div v-if="openJobs.length === 0" class="py-20 text-center space-y-4">
             <div class="text-5xl opacity-20">🔍</div>
             <p class="text-xl font-bold text-gray-400">No positions found matching your search.</p>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-50 dark:bg-gray-800/50 py-20 border-t border-[rgb(var(--border-color))]">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
            <div class="space-y-4 text-center md:text-left">
                 <div class="flex items-center justify-center md:justify-start gap-3">
                    <div class="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">M</div>
                    <span class="text-lg font-black tracking-tight">Megha HR</span>
                </div>
                <p class="text-sm font-bold text-gray-400">Next-Gen Enterprise Human Capital Management.</p>
            </div>
            <div class="flex gap-12">
                 <div class="space-y-4">
                    <h4 class="text-sm font-black uppercase tracking-widest text-gray-400">About</h4>
                    <ul class="space-y-2 text-sm font-bold text-[rgb(var(--text-secondary))]">
                        <li><a href="#" class="hover:text-blue-600 transition-colors">Team</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">Privacy</a></li>
                    </ul>
                 </div>
                 <div class="space-y-4">
                    <h4 class="text-sm font-black uppercase tracking-widest text-gray-400">Connect</h4>
                    <ul class="space-y-2 text-sm font-bold text-[rgb(var(--text-secondary))]">
                        <li><a href="#" class="hover:text-blue-600 transition-colors">LinkedIn</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">Twitter</a></li>
                    </ul>
                 </div>
            </div>
        </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Button, FeatherIcon, Badge } from '@/utils/frappe-ui'
import { jobRequisitions } from '@/data/recruitment'

const openJobs = computed(() => jobRequisitions.filter(j => j.status === 'Open'))
</script>
