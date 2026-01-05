<template>
	<div class="saas-card p-6 flex flex-col md:flex-row gap-6 items-start transition-all duration-200">
		<!-- Profile Image -->
		<div class="flex-shrink-0 relative">
			<div class="w-32 h-32 rounded-card overflow-hidden border-2 border-app-border">
				<img 
					:src="userImage" 
					@error="handleImageError"
					alt="Profile" 
					class="w-full h-full object-cover"
				/>
			</div>
			<!-- Online Indicator -->
			<div class="absolute bottom-2 right-2 w-3 h-3 bg-success border-2 border-app-card rounded-full"></div>
		</div>

		<!-- Info Section -->
		<div class="flex-grow w-full">
			<div class="flex flex-col md:flex-row justify-between items-start gap-6">
				<div class="flex-1">
					<h2 class="text-2xl font-semibold text-text-primary mb-1">
						{{ __('Delighted to have you back') }}
					</h2>
					<h3 class="text-xl font-medium text-text-secondary mb-6">
						{{ fullName }}
					</h3>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
						<div class="flex items-center gap-3">
							<div class="p-2 rounded-lg bg-gray-100 text-text-secondary">
								<FeatherIcon name="hash" class="w-4 h-4" />
							</div>
							<span class="font-normal text-text-secondary">{{ employeeId }}</span>
						</div>
						<div class="flex items-center gap-3">
							<div class="p-2 rounded-lg bg-gray-100 text-text-secondary">
								<FeatherIcon name="briefcase" class="w-4 h-4" />
							</div>
							<span class="font-normal text-text-secondary">{{ designation }}</span>
						</div>
						<div class="flex items-center gap-3">
							<div class="p-2 rounded-lg bg-gray-100 text-text-secondary">
								<FeatherIcon name="map-pin" class="w-4 h-4" />
							</div>
							<span class="font-normal text-text-secondary">{{ branch }}</span>
						</div>
						<div class="flex items-center gap-3">
							<div class="p-2 rounded-lg bg-gray-100 text-text-secondary">
								<FeatherIcon name="mail" class="w-4 h-4" />
							</div>
							<span class="font-normal text-text-secondary">{{ email }}</span>
						</div>
						<div class="flex items-center gap-3">
							<div class="p-2 rounded-lg bg-gray-100 text-text-secondary">
								<FeatherIcon name="calendar" class="w-4 h-4" />
							</div>
							<span class="font-normal text-text-secondary">{{ formatDate(joiningDate) }}</span>
						</div>
					</div>
				</div>

				<!-- Actions -->
				<div class="flex gap-3">
					<button class="btn-secondary">
						{{ __('VIEW') }}
					</button>
					<button class="btn-primary">
						{{ __('EDIT') }}
					</button>
				</div>
			</div>

			<!-- Profile Completion -->
			<div class="mt-6 flex items-center gap-4 p-4 bg-gray-50 rounded-card border border-app-border">
				<span class="text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">{{ __('Profile Completion') }}</span>
				<div class="flex items-center gap-3 flex-grow">
					<div class="progress-track w-full">
						<div class="progress-fill" style="width: 82%"></div>
					</div>
					<span class="text-sm font-semibold text-text-primary whitespace-nowrap">82%</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { inject, computed } from 'vue'
import { FeatherIcon, Button } from '@/utils/frappe-ui'
import dayjs from 'dayjs'

const user = inject('$user')
const employee = inject('$employee') // Assuming employee resource is provided globally or we might need to import
const __ = inject('$translate')

const userImage = computed(() => {
	return user.data?.user_image || user.data?.user_image || ''
})

const fullName = computed(() => {
	return employee.data?.employee_name || user.data?.full_name || 'User'
})

const designation = computed(() => employee.data?.designation || 'Designation')
const branch = computed(() => employee.data?.branch || 'Bangalore')
const joiningDate = computed(() => employee.data?.date_of_joining)
const email = computed(() => user.data?.email || 'email@example.com')
const employeeId = computed(() => employee.data?.name || 'EMP-XXXX')

const formatDate = (date) => {
	if (!date) return ''
	return dayjs(date).format('DD-MMM-YYYY')
}

const handleImageError = (e) => {
	// Fallback to initial avatar or generic image
	const name = user.data?.full_name || 'User'
	e.target.src = `https://ui-avatars.com/api/?name=${name}&background=random`
}
</script>
