<template>
  <div>
    <!-- Hero -->
    <section class="py-32 bg-gradient-to-br from-background via-white to-secondary/10 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-1/2 h-full bg-primary/5" />
      <div class="section-container relative z-10">
        <div class="max-w-3xl">
          <Motion :initial="{ opacity: 0, y: 24 }" :enter="{ opacity: 1, y: 0 }">
            <span class="font-body text-sm uppercase tracking-[0.3em] text-primary font-semibold block mb-4">
              Partner Program
            </span>
            <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-main leading-tight mb-6">
              Grow Your Business Through
              <span class="text-primary"> Strategic Partnerships</span>
            </h1>
            <p class="font-body text-lg text-text-muted mb-8 leading-relaxed">
              Join our network of 200+ referral partners — real estate agents, accountants, financial advisors, and mortgage brokers who trust BPG to deliver exceptional outcomes for their clients.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a href="#partner-form" class="btn-primary text-base px-8 py-4 cursor-pointer" @click.prevent="scrollToForm">
                Apply to Partner
              </a>
              <RouterLink to="/contact" class="btn-outline text-base px-8 py-4 text-center cursor-pointer">
                Speak to Our Team
              </RouterLink>
            </div>
          </Motion>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 bg-text-main">
      <div class="section-container">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div v-for="s in partnerStats" :key="s.value" class="text-center p-6 bg-white/10 rounded-xl">
            <div class="font-heading text-3xl font-bold text-white mb-1">{{ s.value }}</div>
            <div class="font-body text-sm text-white/70">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="py-20 bg-white">
      <div class="section-container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionHeader eyebrow="Why Partner With Us" title="Deliver Excellence to Your Clients" />
            <ul class="space-y-4">
              <li v-for="b in benefits" :key="b" class="flex items-start gap-3">
                <div class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="font-body text-text-muted">{{ b }}</span>
              </li>
            </ul>
          </div>
          <div class="space-y-4">
            <SectionHeader eyebrow="What You Get" title="Partner Benefits" />
            <div v-for="p in perks" :key="p.title" class="flex gap-4 p-5 bg-background rounded-xl">
              <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="p.icon" />
              </div>
              <div>
                <h4 class="font-heading font-semibold text-text-main mb-1">{{ p.title }}</h4>
                <p class="font-body text-sm text-text-muted">{{ p.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-20 bg-background">
      <div class="section-container">
        <SectionHeader eyebrow="How It Works" title="Three Simple Steps" subtitle="Start earning referral commissions in as little as 24 hours." />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div v-for="(step, i) in steps" :key="step.title" class="relative">
            <div class="text-7xl font-heading font-bold text-primary/10 absolute -top-4 -left-2">{{ i + 1 }}</div>
            <div class="relative pt-8">
              <h3 class="font-heading text-xl font-semibold text-text-main mb-3">{{ step.title }}</h3>
              <p class="font-body text-text-muted">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partner Types -->
    <section class="py-20 bg-white">
      <div class="section-container">
        <SectionHeader eyebrow="Who Can Partner" title="Our Partner Network" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="type in partnerTypes" :key="type.title"
            class="p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer">
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="type.icon" />
            </div>
            <h4 class="font-heading font-semibold text-text-main mb-2">{{ type.title }}</h4>
            <p class="font-body text-sm text-text-muted">{{ type.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-background">
      <div class="section-container max-w-3xl">
        <SectionHeader eyebrow="FAQ" title="Partner Questions" />
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- Form -->
    <section id="partner-form" class="py-20 bg-white">
      <div class="section-container">
        <LeadFormPartner />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Motion } from '@oku-ui/motion'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'
import LeadFormPartner from '@/components/forms/LeadFormPartner.vue'

const scrollToForm = () => {
  document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })
}

const partnerStats = [
  { value: '200+', label: 'Active Partners' },
  { value: '$2.5M+', label: 'Commissions Paid' },
  { value: '98%', label: 'Partner Satisfaction' },
  { value: '24h', label: 'Payout Turnaround' },
]

const benefits = [
  'Competitive referral commissions — earn up to $1,000 per referred client',
  'Dedicated partner account manager for all your queries',
  'Real-time referral tracking portal — see your leads and commissions',
  'Joint marketing materials and co-branded collateral',
  'Early access to new services and product launches',
  'Exclusive partner events and networking opportunities',
  'Seamless referral process — we handle the heavy lifting',
]

const perks = [
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />', title: 'Attractive Commissions', desc: 'Earn competitive referral fees for every successful property management placement.' },
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />', title: 'Transparent Tracking', desc: 'Access your referral portal to track lead status and commission payments in real-time.' },
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />', title: 'Dedicated Support', desc: 'Your own partner relationship manager available Monday to Friday.' },
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />', title: 'Fast Payouts', desc: 'Commissions paid within 24 hours of your referred client signing their management agreement.' },
]

const steps = [
  { title: 'Apply Online', desc: "Fill out our partner application form — takes less than 5 minutes. We'll review your application and get back to you within 24 hours." },
  { title: 'Get Approved', desc: 'Once approved, you\'ll receive your partner welcome pack, referral portal access, and your unique partner code.' },
  { title: 'Start Referring', desc: "Send us your referrals through the portal, email, or phone. We'll handle the rest and keep you updated every step of the way." },
]

const partnerTypes = [
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />', title: 'Real Estate Agents', desc: 'Refer clients who need property management alongside your sales business.' },
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />', title: 'Accountants', desc: 'Help property investor clients streamline their property management.' },
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />', title: 'Financial Advisors', desc: 'Provide holistic wealth advice including property investment management.' },
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />', title: 'Mortgage Brokers', desc: "Complete your clients' property journey with management services." },
]

const faqs = [
  { question: 'How does the referral commission work?', answer: 'You earn a commission for every client you refer who signs a property management agreement with BPG. Commissions are typically paid within 24 hours of the management agreement being signed, and range from $250 to $1,000 depending on property type.' },
  { question: 'Who can become a referral partner?', answer: 'Anyone who interacts with property investors can become a partner — real estate agents, accountants, financial advisors, mortgage brokers, solicitors, and more. If you have clients who own investment properties, we want to hear from you.' },
  { question: 'How do I refer a client?', answer: 'You can refer clients through our online partner portal, by email, or by phone. Simply provide your client\'s contact details and we\'ll handle the onboarding. You\'ll receive updates at every stage of the process.' },
  { question: 'Is there a cost to join the partner program?', answer: 'No. Our partner program is completely free to join. There are no membership fees, minimum referral requirements, or ongoing costs. You earn commission only when you successfully refer a client.' },
  { question: 'What support do you provide to partners?', answer: 'Every partner gets a dedicated relationship manager, access to our partner portal for tracking referrals and commissions, co-branded marketing materials, and priority support for any queries.' },
]
</script>
