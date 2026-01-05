<template>
  <div class="min-h-screen bg-[#050510] flex items-center justify-center p-6 text-center">
    <div class="max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-700">
      <div class="relative">
        <div class="absolute inset-0 blur-3xl bg-red-600/20 rounded-full animate-pulse"></div>
        <div class="relative bg-white/5 backdrop-blur-2xl border border-red-500/20 p-8 rounded-[2.5rem] shadow-2xl">
          <div class="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
            <FeatherIcon name="shield-off" class="w-10 h-10 text-red-500" />
          </div>
          <h1 class="text-3xl font-black text-white tracking-tight">Access Denied</h1>
          <p class="text-gray-400 mt-4 font-medium leading-relaxed">
            You do not have the necessary permissions to access this administrative module. Please contact your system administrator if you believe this is an error.
          </p>
          <div class="mt-8 pt-8 border-t border-white/10">
            <Button variant="solid" class="w-full h-14 !bg-red-600 !text-white !rounded-2xl font-black text-lg transition-all active:scale-95 shadow-lg shadow-red-600/20 border-none" @click="router.push('/')">
              Return to Safety
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Button, FeatherIcon } from '@/utils/frappe-ui'

const router = useRouter()
</script>
