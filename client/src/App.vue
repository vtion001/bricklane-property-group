<template>
  <AppShell>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </AppShell>
</template>

<script setup lang="ts">
import { RouterView, watch } from 'vue-router'
import { useRoute } from 'vue-router'
import AppShell from '@/components/layout/AppShell.vue'
import { initGA, trackPageView } from '@/services/analytics'

initGA()

const route = useRoute()
watch(() => route.path, (path) => {
  trackPageView(path, document.title)
}, { immediate: true })
</script>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
