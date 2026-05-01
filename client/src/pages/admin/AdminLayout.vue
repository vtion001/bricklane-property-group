<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-text-main flex flex-col flex-shrink-0">
      <!-- Logo -->
      <div class="p-6 border-b border-white/10">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span class="font-heading font-bold text-white text-base">B</span>
          </div>
          <div>
            <span class="font-heading font-semibold text-white text-sm block leading-tight">Brick Lane</span>
            <span class="font-body text-white/50 text-xs">Admin Portal</span>
          </div>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 py-4">
        <div class="px-3 mb-2">
          <span class="font-body text-white/40 text-xs uppercase tracking-wider">Overview</span>
        </div>
        <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to"
          class="flex items-center gap-3 px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          :class="{ '!text-white !bg-white/10': isActive(link.to) }">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="link.icon" />
          <span class="font-body text-sm font-medium">{{ link.label }}</span>
        </RouterLink>
      </nav>

      <!-- User -->
      <div class="p-4 border-t border-white/10">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary/30 rounded-full flex items-center justify-center">
            <span class="font-heading font-bold text-white text-xs">A</span>
          </div>
          <div class="flex-1">
            <div class="font-body text-sm text-white">Admin</div>
            <div class="font-body text-xs text-white/50">admin@bpg.com.au</div>
          </div>
          <button class="text-white/50 hover:text-white cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Header -->
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
        <h2 class="font-heading text-lg font-semibold text-text-main">{{ currentPageTitle }}</h2>
        <div class="flex items-center gap-4">
          <button class="p-2 text-text-muted hover:text-primary cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-auto p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [
  { label: 'Dashboard', to: '/admin', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />' },
  { label: 'Leads', to: '/admin/leads', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />' },
  { label: 'Analytics', to: '/admin/analytics', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />' },
  { label: 'Settings', to: '/admin/settings', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />' },
]

const isActive = (path: string) => {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

const currentPageTitle = computed(() => {
  const link = navLinks.find(l => isActive(l.to))
  return link?.label || 'Admin'
})
</script>
