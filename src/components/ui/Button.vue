<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
      variantClasses[variant] || variantClasses.solid,
      sizeClasses[size] || sizeClasses.md,
      $attrs.class
    ]"
    v-bind="$attrs"
  >
    <div v-if="loading" class="mr-2 animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
    <slot name="prefix"></slot>
    <component :is="icon" v-if="icon" class="w-4 h-4 mr-2" />
    <slot></slot>
    <slot name="suffix"></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'solid'
  },
  size: {
    type: String,
    default: 'md'
  },
  loading: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: null
  }
})

const variantClasses = {
  solid: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  subtle: 'bg-blue-50 text-blue-600 hover:bg-blue-100 focus:ring-blue-500',
  outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 hover:text-gray-900',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg'
}
</script>
