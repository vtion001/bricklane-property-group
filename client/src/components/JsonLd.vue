<template>
  <component :is="'script'" type="application/ld+json" v-html="JSON.stringify(schema)" />
</template>

<script setup lang="ts">
defineProps<{ schema: object }>()
</script>
