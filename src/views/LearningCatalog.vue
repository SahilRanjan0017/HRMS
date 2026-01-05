<template>
  <BaseLayout pageTitle="Learning & Development">
    <template #body>
      <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Header -->
        <div class="premium-card p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
          <h1 class="text-3xl font-black mb-2">Learning Catalog</h1>
          <p class="text-indigo-100">Explore courses to enhance your skills and advance your career</p>
        </div>

        <!-- Course Catalog -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="course in courses" :key="course.id" class="premium-card p-6 hover:ring-2 hover:ring-indigo-500/20 transition-all cursor-pointer group">
            <div class="flex items-start justify-between mb-4">
              <div class="p-3 rounded-2xl bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <FeatherIcon name="book-open" class="h-6 w-6" />
              </div>
              <Badge v-if="course.mandatory" theme="red" variant="subtle" size="sm">Mandatory</Badge>
              <Badge v-else :theme="course.type === 'Self-paced' ? 'blue' : 'purple'" variant="subtle" size="sm">{{ course.type }}</Badge>
            </div>
            
            <h3 class="font-black text-[rgb(var(--text-main))] text-lg mb-2 group-hover:text-indigo-600 transition-colors">{{ course.title }}</h3>
            <p class="text-sm text-gray-500 mb-4">{{ course.category }} • {{ course.duration }}</p>
            
            <div class="flex items-center justify-between pt-4 border-t border-[rgb(var(--border-color))]">
              <div class="flex items-center gap-1 text-sm">
                <FeatherIcon name="star" class="h-4 w-4 text-yellow-500 fill-current" />
                <span class="font-bold">{{ course.rating }}</span>
              </div>
              <div class="text-xs font-bold text-gray-400">{{ course.enrolled }} enrolled</div>
            </div>
            
            <Button variant="solid" class="!bg-indigo-600 !text-white !rounded-xl w-full mt-4">
              {{ isEnrolled(course.id) ? 'Continue Learning' : 'Enroll Now' }}
            </Button>
          </div>
        </div>

        <!-- My Learning -->
        <div class="premium-card p-6">
          <h2 class="text-xl font-black text-[rgb(var(--text-main))] mb-6">My Active Courses</h2>
          <div class="space-y-4">
            <div v-for="enrollment in courseEnrollments.filter(e => e.status === 'In Progress')" :key="enrollment.id" class="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex-1">
                  <h3 class="font-black text-[rgb(var(--text-main))] mb-2">{{ getCourseTitle(enrollment.course_id) }}</h3>
                  <div class="flex items-center gap-4 text-xs font-bold text-gray-400">
                    <span>{{ enrollment.completed_modules }} / {{ getCourseModules(enrollment.course_id) }} modules</span>
                    <span>Started: {{ enrollment.enrolled_date }}</span>
                  </div>
                  <div class="mt-3 space-y-2">
                    <div class="flex items-center justify-between text-xs font-bold">
                      <span class="text-gray-400">Progress</span>
                      <span class="text-indigo-600">{{ enrollment.progress }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-1000" :style="{ width: enrollment.progress + '%' }"></div>
                    </div>
                  </div>
                </div>
                <Button variant="solid" class="!bg-indigo-600 !text-white !rounded-xl px-8">Continue</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
import { Button, FeatherIcon, Badge } from '@/utils/frappe-ui'
import { courses, courseEnrollments } from '@/data/extended_modules'

const isEnrolled = (courseId) => courseEnrollments.some(e => e.course_id === courseId)
const getCourseTitle = (courseId) => courses.find(c => c.id === courseId)?.title || ''
const getCourseModules = (courseId) => courses.find(c => c.id === courseId)?.modules_count || 0
</script>
