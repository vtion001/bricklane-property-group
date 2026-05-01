<template>
  <div>
    <!-- Hero -->
    <section class="py-32 bg-gradient-to-br from-background via-white to-secondary/10">
      <div class="section-container">
        <div class="max-w-3xl">
          <Motion :initial="{ opacity: 0, y: 24 }" :enter="{ opacity: 1, y: 0 }">
            <span class="font-body text-sm uppercase tracking-[0.3em] text-primary font-semibold block mb-4">About Us</span>
            <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-main leading-tight mb-6">
              Building Stronger Communities
              <span class="text-primary"> One Property at a Time</span>
            </h1>
            <p class="font-body text-lg text-text-muted leading-relaxed">
              Founded in 2014, Brick Lane Property Group has grown from a small Sydney operation to a national property management company managing over 500 properties across Australia.
            </p>
          </Motion>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="py-20 bg-white">
      <div class="section-container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader eyebrow="Our Story" title="From Local Experts to National Leaders" />
            <div class="space-y-4 font-body text-text-muted leading-relaxed">
              <p>What started as a single office in Sydney's Inner West has grown into a nationwide network of property management professionals. Our journey has been driven by a simple belief: every landlord deserves exceptional service, and every tenant deserves a home they can be proud of.</p>
              <p>Today, we manage over 500 properties across Sydney, Melbourne, Brisbane, Perth, and Adelaide. Our team of 45+ property professionals brings together decades of experience in real estate, finance, and customer service.</p>
              <p>We're not just property managers — we're partners invested in the success of your property investment journey.</p>
            </div>
          </div>
          <div class="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl aspect-square flex items-center justify-center">
            <div class="text-center p-8">
              <div class="font-heading text-8xl font-bold text-primary/30 mb-4">12+</div>
              <div class="font-body text-primary/50 text-lg">Years Serving<br/>Australian Landlords</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-20 bg-background">
      <div class="section-container">
        <SectionHeader eyebrow="Our Values" title="What Drives Everything We Do" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div v-for="v in values" :key="v.title" class="text-center p-8">
            <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="v.icon" />
            </div>
            <h3 class="font-heading text-xl font-semibold text-text-main mb-3">{{ v.title }}</h3>
            <p class="font-body text-text-muted leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 bg-text-main">
      <div class="section-container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="s in stats" :key="s.label">
            <div class="font-heading text-3xl md:text-4xl font-bold text-white mb-1">{{ s.value }}</div>
            <div class="font-body text-sm text-white/70">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-gradient-to-r from-primary to-secondary">
      <div class="section-container text-center">
        <h2 class="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Ready to Work With Us?</h2>
        <p class="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto">Let's discuss how we can help you achieve your property investment goals.</p>
        <RouterLink to="/contact" class="bg-white text-primary font-body font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
          Get in Touch
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Motion } from '@oku-ui/motion'
import SectionHeader from '@/components/ui/SectionHeader.vue'

const values = [
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />',
    title: 'Integrity First',
    desc: 'We operate with complete transparency. No hidden fees, no surprises — just honest, straightforward property management.',
  },
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />',
    title: 'Results Driven',
    desc: 'We measure our success by your outcomes — rental yields, tenant retention, and property condition. Your success is our priority.',
  },
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />',
    title: 'People Centric',
    desc: 'From our dedicated property managers to our vetted contractor network — we build relationships that last.',
  },
]

const stats = [
  { value: '500+', label: 'Properties Managed' },
  { value: '45+', label: 'Team Members' },
  { value: '200+', label: 'Partner Network' },
  { value: '4.9★', label: 'Client Rating' },
]
</script>
