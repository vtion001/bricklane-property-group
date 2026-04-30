<template>
  <div class="text-center mb-12">
    <span v-if="eyebrow"
      class="font-body text-sm uppercase tracking-widest text-primary font-semibold block mb-3">
      {{ eyebrow }}
    </span>
    <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-main leading-tight mb-4">
      {{ title }}
    </h2>
    <p v-if="subtitle"
      class="font-body text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
}>()
</script>
