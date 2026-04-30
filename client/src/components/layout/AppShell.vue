<template>
  <div class="min-h-screen flex flex-col bg-background">
    <AppHeader @toggle-mobile="mobileOpen = !mobileOpen" />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <MobileNav v-model:open="mobileOpen" />
    <CookieBanner />
    <ChatWidget />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import MobileNav from './MobileNav.vue'
import CookieBanner from '@/components/ui/CookieBanner.vue'
import ChatWidget from '@/components/chat/ChatWidget.vue'

const mobileOpen = ref(false)
</script>
