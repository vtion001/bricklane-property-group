<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-white/95 shadow-md backdrop-blur-sm py-3' : 'bg-transparent py-5'"
  >
    <div class="section-container flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-3 cursor-pointer">
        <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <span class="font-heading font-bold text-white text-lg">B</span>
        </div>
        <div>
          <span class="font-heading font-semibold text-text-main text-lg leading-tight block">Brick Lane</span>
          <span class="font-body text-xs text-text-muted tracking-wider uppercase">Property Group</span>
        </div>
      </RouterLink>

      <nav class="hidden lg:flex items-center gap-8">
        <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to"
          class="font-body font-medium text-text-main hover:text-primary transition-colors duration-200 relative group cursor-pointer">
          {{ link.label }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
        </RouterLink>
        <RouterLink to="/admin" class="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer">
          Admin
        </RouterLink>
        <button class="btn-primary text-sm py-2 px-5" @click="openCalendly">
          Book Free Consultation
        </button>
      </nav>

      <button class="lg:hidden p-2 cursor-pointer" @click="$emit('toggleMobile')" aria-label="Toggle menu">
        <svg v-if="!mobileOpen" class="w-6 h-6 text-text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6 text-text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

const scrolled = ref(false)
const mobileOpen = ref(false)
const settingsStore = useSettingsStore()

const emit = defineEmits<{ toggleMobile: [] }>()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Partners', to: '/for-partners' },
  { label: 'Landlords', to: '/for-landlords' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  settingsStore.fetch()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const openCalendly = () => {
  const url = settingsStore.settings.calendly_url || 'https://calendly.com/bpg'
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>
