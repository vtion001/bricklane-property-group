<template>
  <footer class="bg-text-main text-white py-16 mt-auto">
    <div class="section-container">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="font-heading font-bold text-white text-lg">B</span>
            </div>
            <div>
              <span class="font-heading font-semibold text-white text-lg block">Brick Lane</span>
              <span class="font-body text-xs text-white/60 tracking-wider uppercase">Property Group</span>
            </div>
          </div>
          <p class="text-white/70 text-sm font-body leading-relaxed">
            Expert property management across Australia. Maximizing returns for landlords, exceptional service for tenants.
          </p>
        </div>

        <div>
          <h4 class="font-heading text-sm uppercase tracking-wider mb-4 text-white/60">Services</h4>
          <ul class="space-y-2">
            <li v-for="link in serviceLinks" :key="link.to">
              <RouterLink :to="link.to" class="text-white/80 text-sm hover:text-white transition-colors duration-200 cursor-pointer">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-heading text-sm uppercase tracking-wider mb-4 text-white/60">Company</h4>
          <ul class="space-y-2">
            <li v-for="link in companyLinks" :key="link.to">
              <RouterLink :to="link.to" class="text-white/80 text-sm hover:text-white transition-colors duration-200 cursor-pointer">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-heading text-sm uppercase tracking-wider mb-4 text-white/60">Contact</h4>
          <ul class="space-y-2">
            <li class="text-white/80 text-sm">(02) 9123 4567</li>
            <li class="text-white/80 text-sm">info@bricklanepropertygroup.com.au</li>
            <li class="text-white/80 text-sm">Sydney, NSW 2000</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-white/50 text-sm">© 2026 Brick Lane Property Group. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="text-white/50 text-sm hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
          <a href="#" class="text-white/50 text-sm hover:text-white transition-colors cursor-pointer">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const serviceLinks = [
  { label: 'For Landlords', to: '/for-landlords' },
  { label: 'For Partners', to: '/for-partners' },
  { label: 'Property Appraisal', to: '/contact' },
  { label: 'Tenant Screening', to: '/about' },
]

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Blog', to: '/about' },
  { label: 'Careers', to: '/about' },
]
</script>
