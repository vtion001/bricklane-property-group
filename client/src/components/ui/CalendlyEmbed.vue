<template>
  <div class="calendly-inline-widget" :data-url="resolvedUrl" style="min-width:320px;height:700px;" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

const props = defineProps<{ url?: string }>()

const resolvedUrl = computed(() => props.url || 'https://calendly.com/bpg')

onMounted(() => {
  const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
  if (!existing) {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
  }
})
</script>
