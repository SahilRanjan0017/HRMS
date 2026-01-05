<template>
	<div class="flex p-1.5 bg-[rgb(var(--bg-panel))] border border-[rgb(var(--border-color))] rounded-[1.2rem] shadow-sm">
		<button
			v-for="button in buttons"
			:key="button.key ?? button.label ?? button"
			class="px-6 py-2.5 transition-all rounded-2xl flex-auto font-black text-sm uppercase tracking-widest whitespace-nowrap"
			:class="
				modelValue === (button.key ?? button.label ?? button)
					? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
					: 'text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-main))] hover:bg-black/5 dark:hover:bg-white/5'
			"
			@click="$emit('update:modelValue', button.key ?? button.label ?? button)"
		>
			{{ button.label ?? __(button) }}
		</button>
	</div>
</template>

<script setup>
const props = defineProps({
	buttons: {
		type: Array,
		required: true,
	},
	modelValue: {
		type: String,
	},
})

defineEmits(["update:modelValue"])
</script>
