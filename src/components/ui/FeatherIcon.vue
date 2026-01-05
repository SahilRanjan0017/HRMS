<template>
  <i v-html="svgContent" class="inline-flex items-center justify-center" :class="$attrs.class"></i>
</template>

<script setup>
import { computed } from 'vue'
import feather from 'feather-icons'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const svgContent = computed(() => {
  return feather.icons[props.name]?.toSvg({ 
    class: 'w-full h-full', 
    width: '100%', 
    height: '100%' 
  }) || ''
})
</script>
