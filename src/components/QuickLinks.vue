<template>
	<div class="flex flex-col gap-6 w-full">
		<div class="text-xs font-black uppercase tracking-widest text-[rgb(var(--text-muted))] px-2">
			{{ title || __("Quick Links") }}
		</div>
		<div class="premium-card overflow-hidden">
			<router-link
				class="flex flex-row p-5 items-center justify-between border-b border-[rgb(var(--border-color))] last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
				v-for="link in props.items"
				:key="link.title"
				:to="{ name: link.route }"
			>
				<div class="flex flex-row items-center gap-4 grow">
					<div class="p-2.5 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
						<component :is="link.icon" class="h-5 w-5" />
					</div>
					<div class="text-base font-bold text-[rgb(var(--text-main))]">
						{{ link.title }}
					</div>
				</div>
				<FeatherIcon name="chevron-right" class="h-5 w-5 text-[rgb(var(--text-muted))] group-hover:translate-x-1 transition-transform" />
			</router-link>
		</div>
	</div>
</template>

<script setup>
import { FeatherIcon } from "@/utils/frappe-ui"

const props = defineProps({
	title: {
		type: String,
		required: false,
		default: "",
	},
	items: {
		type: Array,
		required: true,
	},
})
</script>
