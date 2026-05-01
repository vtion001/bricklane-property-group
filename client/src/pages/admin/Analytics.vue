<template>
  <div class="text-center py-20">
    <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    </div>
    <h2 class="font-heading text-2xl font-bold text-text-main mb-2">Analytics</h2>
    <p class="font-body text-text-muted mb-8 max-w-md mx-auto">
      Analytics integration coming soon. Connect Google Analytics 4 and Google Search Console in Settings to view detailed performance data.
    </p>
    <RouterLink to="/admin/settings" class="btn-primary cursor-pointer">Configure Integrations</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
