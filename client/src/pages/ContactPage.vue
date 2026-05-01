<template>
  <div>
    <!-- Hero -->
    <section class="py-24 bg-gradient-to-br from-background via-white to-secondary/10">
      <div class="section-container">
        <div class="max-w-2xl">
          <Motion :initial="{ opacity: 0, y: 24 }" :enter="{ opacity: 1, y: 0 }">
            <span class="font-body text-sm uppercase tracking-[0.3em] text-primary font-semibold block mb-4">Contact</span>
            <h1 class="font-heading text-4xl md:text-5xl font-bold text-text-main leading-tight mb-6">
              Let's Start a Conversation
            </h1>
            <p class="font-body text-lg text-text-muted leading-relaxed">
              Whether you're a landlord looking for management, a partner seeking referral opportunities, or simply have questions — we're here to help.
            </p>
          </Motion>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 bg-white">
      <div class="section-container">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <!-- Info -->
          <div class="lg:col-span-2">
            <h2 class="font-heading text-2xl font-bold text-text-main mb-6">Get in Touch</h2>
            <div class="space-y-6 mb-10">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div class="font-body font-semibold text-text-main">Phone</div>
                  <div class="font-body text-text-muted">(02) 9123 4567</div>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div class="font-body font-semibold text-text-main">Email</div>
                  <div class="font-body text-text-muted">info@bricklanepropertygroup.com.au</div>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div class="font-body font-semibold text-text-main">Head Office</div>
                  <div class="font-body text-text-muted">Level 5, 123 Collins Street<br/>Sydney NSW 2000</div>
                </div>
              </div>
            </div>

            <!-- Office Hours -->
            <div class="p-6 bg-background rounded-xl">
              <h3 class="font-heading font-semibold text-text-main mb-3">Office Hours</h3>
              <div class="space-y-2 font-body text-sm text-text-muted">
                <div class="flex justify-between"><span>Monday – Friday</span><span>9:00 AM – 6:00 PM</span></div>
                <div class="flex justify-between"><span>Saturday</span><span>10:00 AM – 2:00 PM</span></div>
                <div class="flex justify-between"><span>Sunday</span><span>Closed</span></div>
              </div>
              <p class="font-body text-xs text-text-muted mt-3">24/7 emergency maintenance support available for current clients.</p>
            </div>
          </div>

          <!-- Form -->
          <div class="lg:col-span-3">
            <LeadFormContact />
          </div>
        </div>
      </div>
    </section>

    <!-- Office Locations -->
    <section class="py-20 bg-background">
      <div class="section-container">
        <SectionHeader eyebrow="Our Offices" title="Nationwide Presence" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div v-for="office in offices" :key="office.city" class="bg-white p-8 rounded-2xl border border-gray-100">
            <h4 class="font-heading text-xl font-semibold text-text-main mb-2">{{ office.city }}</h4>
            <p class="font-body text-sm text-text-muted mb-4">{{ office.address }}</p>
            <div class="space-y-1 font-body text-sm text-text-muted">
              <div>{{ office.phone }}</div>
              <div>{{ office.hours }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Motion } from '@oku-ui/motion'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import LeadFormContact from '@/components/forms/LeadFormContact.vue'

const offices = [
  { city: 'Sydney (HQ)', address: 'Level 5, 123 Collins Street, Sydney NSW 2000', phone: '(02) 9123 4567', hours: 'Mon–Fri 9am–6pm' },
  { city: 'Melbourne', address: 'Level 3, 456 Bourke Street, Melbourne VIC 3000', phone: '(03) 9876 5432', hours: 'Mon–Fri 9am–6pm' },
  { city: 'Brisbane', address: 'Level 2, 789 Queen Street, Brisbane QLD 4000', phone: '(07) 3456 7890', hours: 'Mon–Fri 9am–6pm' },
]
</script>
