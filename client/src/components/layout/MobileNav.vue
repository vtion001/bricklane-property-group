<template>
  <Transition name="slide-right">
    <div v-if="open" class="fixed inset-0 z-50 lg:hidden">
      <div class="absolute inset-0 bg-black/50" @click="$emit('update:open', false)" />
      <nav class="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl p-6 flex flex-col">
        <div class="flex justify-between items-center mb-8">
          <span class="font-heading font-semibold text-text-main">Menu</span>
          <button @click="$emit('update:open', false)" class="p-2 cursor-pointer" aria-label="Close">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to"
          class="py-3 text-text-main font-body font-medium border-b border-gray-100 hover:text-primary transition-colors cursor-pointer"
          @click="$emit('update:open', false)">
          {{ link.label }}
        </RouterLink>
        <button class="btn-primary mt-6" @click="openCalendly">
          Book Free Consultation
        </button>
        <div class="mt-auto pt-6 border-t border-gray-100">
          <p class="text-xs text-text-muted">(02) 9123 4567</p>
          <p class="text-xs text-text-muted">info@bricklanepropertygroup.com.au</p>
        </div>
      </nav>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()
const settingsStore = useSettingsStore()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Partners', to: '/for-partners' },
  { label: 'Landlords', to: '/for-landlords' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const openCalendly = () => {
  const url = settingsStore.settings.calendly_url || 'https://calendly.com/bpg'
  window.open(url, '_blank', 'noopener,noreferrer')
  emit('update:open', false)
}
</script>

<style scoped>
.slide-right-enter-active, .slide-right-leave-active { transition: all 0.3s ease; }
.slide-right-enter-from, .slide-right-leave-to { opacity: 0; transform: translateX(100%); }
</style>
