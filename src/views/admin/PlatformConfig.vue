<template>
  <BaseLayout pageTitle="Platform Configuration">
    <template #body>
      <div class="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Company Settings -->
        <div class="premium-card p-6">
          <h2 class="text-xl font-black text-[rgb(var(--text-main))] mb-6 flex items-center gap-3">
            <div class="p-2 rounded-xl bg-blue-100 text-blue-600">
              <FeatherIcon name="settings" class="h-5 w-5" />
            </div>
            Company Settings
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-gray-400">Company Name</label>
              <input type="text" v-model="settings.company_name" class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-gray-400">Timezone</label>
              <select v-model="settings.timezone" class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Asia/Kolkata</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-gray-400">Currency</label>
              <select v-model="settings.currency" class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-gray-400">Date Format</label>
              <select v-model="settings.date_format" class="w-full bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
          <div class="mt-6 flex justify-end">
            <Button variant="solid" class="!bg-blue-600 !text-white !rounded-xl !font-black px-8">Save Settings</Button>
          </div>
        </div>

        <!-- Feature Flags -->
        <div class="premium-card p-6">
          <h2 class="text-xl font-black text-[rgb(var(--text-main))] mb-6 flex items-center gap-3">
            <div class="p-2 rounded-xl bg-purple-100 text-purple-600">
              <FeatherIcon name="toggle-right" class="h-5 w-5" />
            </div>
            Feature Flags
          </h2>
          <div class="space-y-4">
            <div v-for="flag in featureFlags" :key="flag.feature" class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/20 rounded-xl">
              <div>
                <div class="font-bold text-[rgb(var(--text-main))]">{{ flag.feature.charAt(0).toUpperCase() + flag.feature.slice(1) }}</div>
                <div class="text-xs text-gray-400">{{ flag.description }}</div>
              </div>
              <button @click="flag.enabled = !flag.enabled" class="relative w-14 h-7 rounded-full transition-colors" :class="[flag.enabled ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600']">
                <div class="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform" :class="[flag.enabled ? 'translate-x-7' : '']"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Custom Fields -->
        <div class="premium-card p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-black text-[rgb(var(--text-main))] flex items-center gap-3">
              <div class="p-2 rounded-xl bg-indigo-100 text-indigo-600">
                <FeatherIcon name="database" class="h-5 w-5" />
              </div>
              Custom Fields
            </h2>
            <Button variant="solid" class="!bg-indigo-600 !text-white !rounded-xl"><FeatherIcon name="plus" class="h-4 w-4 mr-2" /> Add Field</Button>
          </div>
          <div class="space-y-3">
            <div v-for="field in customFields" :key="field.id" class="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
              <div>
                <div class="font-bold text-[rgb(var(--text-main))]">{{ field.field_name }}</div>
                <div class="flex items-center gap-3 text-xs font-bold text-gray-400 mt-1">
                  <span>Entity: {{ field.entity }}</span>
                  <span>Type: {{ field.field_type }}</span>
                  <Badge :theme="field.required ? 'red' : 'gray'" variant="subtle" size="sm">{{ field.required ? 'Required' : 'Optional' }}</Badge>
                </div>
              </div>
              <div class="flex gap-2">
                <Button variant="ghost" class="!p-2 !rounded-lg"><FeatherIcon name="edit-2" class="h-4 w-4" /></Button>
                <Button variant="ghost" class="!p-2 !rounded-lg text-red-500"><FeatherIcon name="trash-2" class="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Theme Customization -->
        <div class="premium-card p-6">
          <h2 class="text-xl font-black text-[rgb(var(--text-main))] mb-6 flex items-center gap-3">
            <div class="p-2 rounded-xl bg-pink-100 text-pink-600">
              <FeatherIcon name="palette" class="h-5 w-5" />
            </div>
            Theme Customization
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-gray-400">Primary Color</label>
              <div class="flex items-center gap-2">
                <input type="color" v-model="settings.primary_color" class="h-12 w-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer" />
                <input type="text" v-model="settings.primary_color" class="flex-1 bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-2 text-xs font-mono" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-gray-400">Secondary Color</label>
              <div class="flex items-center gap-2">
                <input type="color" v-model="settings.secondary_color" class="h-12 w-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer" />
                <input type="text" v-model="settings.secondary_color" class="flex-1 bg-gray-50 dark:bg-gray-700/50 border border-[rgb(var(--border-color))] rounded-xl p-2 text-xs font-mono" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge } from '@/utils/frappe-ui'
import { tenantSettings, featureFlags, customFields } from '@/data/platform_modules'

const settings = ref({ ...tenantSettings })
</script>
