<template>
  <BaseLayout pageTitle="Recognition & Announcements">
    <template #body>
      <div class="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Give Recognition -->
        <div class="premium-card p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-2 border-dashed border-amber-200 dark:border-amber-800">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="text-4xl">🎉</div>
              <div>
                <h3 class="font-black text-[rgb(var(--text-main))]">Recognize a Colleague</h3>
                <p class="text-sm text-gray-500">Appreciate great work and boost team morale</p>
              </div>
            </div>
            <Button variant="solid" class="!bg-amber-600 !text-white !rounded-xl !font-black px-8">Give Recognition</Button>
          </div>
        </div>

        <!-- Announcements -->
        <div class="premium-card p-6">
          <h2 class="text-xl font-black text-[rgb(var(--text-main))] mb-6 flex items-center gap-3">
            <div class="p-2 rounded-xl bg-blue-100 text-blue-600">
              <FeatherIcon name="megaphone" class="h-5 w-5" />
            </div>
            Company Announcements
          </h2>
          <div class="space-y-4">
            <div v-for="announcement in announcements" :key="announcement.id" class="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  <Badge :theme="announcement.priority === 'High' ? 'red' : 'blue'" variant="subtle">{{ announcement.type }}</Badge>
                  <span class="text-xs font-bold text-gray-400">{{ announcement.posted_date }}</span>
                </div>
                <Badge v-if="announcement.priority === 'High'" theme="red" variant="subtle" size="sm">{{ announcement.priority }} Priority</Badge>
              </div>
              <h3 class="font-black text-[rgb(var(--text-main))] text-lg mb-2">{{ announcement.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ announcement.content }}</p>
              <div class="mt-3 text-xs font-bold text-gray-400">Posted by {{ announcement.posted_by }}</div>
            </div>
          </div>
        </div>

        <!-- Recognition Feed -->
        <div class="premium-card p-6">
          <h2 class="text-xl font-black text-[rgb(var(--text-main))] mb-6">Recent Recognition</h2>
          <div class="space-y-4">
            <div v-for="rec in recognitions" :key="rec.id" class="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-100 dark:border-purple-800">
              <div class="flex items-start gap-4">
                <Avatar :label="getEmployeeName(rec.from_employee_id)" size="lg" class="rounded-2xl" />
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="font-bold text-[rgb(var(--text-main))]">{{ getEmployeeName(rec.from_employee_id) }}</span>
                    <span class="text-gray-400">recognized</span>
                    <span class="font-bold text-[rgb(var(--text-main))]">{{ getEmployeeName(rec.to_employee_id) }}</span>
                  </div>
                  <div class="flex items-center gap-2 mb-3">
                    <div class="px-3 py-1 bg-white dark:bg-gray-800 rounded-full border-2 border-purple-200 dark:border-purple-700 flex items-center gap-2">
                      <span class="text-lg">{{ getBadgeIcon(rec.badge) }}</span>
                      <span class="text-sm font-black text-purple-600">{{ rec.badge }}</span>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-300 italic">"{{ rec.message }}"</p>
                  <div class="mt-3 text-xs font-bold text-gray-400">{{ rec.date }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Available Badges -->
        <div class="premium-card p-6">
          <h3 class="text-lg font-black text-[rgb(var(--text-main))] mb-4">Recognition Badges</h3>
          <div class="flex flex-wrap gap-3">
            <div v-for="badge in badges" :key="badge.id" class="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-full border-2 border-gray-200 dark:border-gray-600 flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
              <span class="text-xl">{{ badge.icon }}</span>
              <span class="text-sm font-black">{{ badge.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge, Avatar } from '@/utils/frappe-ui'
import { recognitions, announcements, badges } from '@/data/extended_modules'
import { employeeMasterData } from '@/data/employee_master'

const getEmployeeName = (id) => employeeMasterData.find(e => e.id === id)?.name || id
const getBadgeIcon = (badgeName) => badges.find(b => b.name === badgeName)?.icon || '🏆'
</script>
