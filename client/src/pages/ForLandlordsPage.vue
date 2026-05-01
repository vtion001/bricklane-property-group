<template>
  <div>
    <!-- Hero -->
    <section class="py-32 bg-gradient-to-br from-background via-white to-secondary/10 relative overflow-hidden">
      <div class="section-container relative z-10">
        <div class="max-w-3xl">
          <Motion :initial="{ opacity: 0, y: 24 }" :enter="{ opacity: 1, y: 0 }">
            <span class="font-body text-sm uppercase tracking-[0.3em] text-primary font-semibold block mb-4">For Landlords</span>
            <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-main leading-tight mb-6">
              Professional Property Management
              <span class="text-primary"> That Delivers Results</span>
            </h1>
            <p class="font-body text-lg text-text-muted mb-8 leading-relaxed">
              Maximize your rental returns while we handle the day-to-day management. Our proven system ensures quality tenants, optimal yields, and complete peace of mind.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a href="#landlord-form" class="btn-primary text-base px-8 py-4 cursor-pointer" @click.prevent="scrollToForm">
                Get Free Appraisal
              </a>
              <RouterLink to="/contact" class="btn-outline text-base px-8 py-4 text-center cursor-pointer">
                Speak to Us
              </RouterLink>
            </div>
          </Motion>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-20 bg-white">
      <div class="section-container">
        <SectionHeader eyebrow="Our Services" title="Complete Property Management" subtitle="Every service you need, backed by 12 years of expertise." />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div v-for="s in services" :key="s.title" class="p-8 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all">
            <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
              <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="s.icon" />
            </div>
            <h3 class="font-heading text-xl font-semibold text-text-main mb-3">{{ s.title }}</h3>
            <p class="font-body text-text-muted leading-relaxed">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="py-20 bg-background">
      <div class="section-container">
        <SectionHeader eyebrow="Our Process" title="Getting Started is Simple" />
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div v-for="(step, i) in processSteps" :key="step.title" class="text-center">
            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="font-heading text-2xl font-bold text-white">{{ i + 1 }}</span>
            </div>
            <h4 class="font-heading font-semibold text-text-main mb-2">{{ step.title }}</h4>
            <p class="font-body text-sm text-text-muted">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="py-20 bg-white">
      <div class="section-container">
        <SectionHeader eyebrow="Transparent Pricing" title="No Hidden Fees, Ever" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
          <div v-for="plan in pricingPlans" :key="plan.name"
            :class="['p-8 rounded-2xl border-2 transition-all', plan.popular
              ? 'border-primary shadow-xl relative'
              : 'border-gray-100 hover:border-primary/30']">
            <div v-if="plan.popular" class="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-body font-semibold px-4 py-1 rounded-full">
              Most Popular
            </div>
            <h4 class="font-heading text-lg font-semibold text-text-main mb-2">{{ plan.name }}</h4>
            <div class="mb-4">
              <span class="font-heading text-4xl font-bold text-text-main">{{ plan.rate }}</span>
              <span class="font-body text-text-muted"> of rental income</span>
            </div>
            <ul class="space-y-3">
              <li v-for="f in plan.features" :key="f" class="flex items-start gap-2">
                <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="font-body text-sm text-text-muted">{{ f }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Form -->
    <section id="landlord-form" class="py-20 bg-background">
      <div class="section-container">
        <LeadFormLandlord />
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-white">
      <div class="section-container max-w-3xl">
        <SectionHeader eyebrow="FAQ" title="Common Landlord Questions" />
        <FaqAccordion :items="faqs" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Motion } from 'motion-vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'
import LeadFormLandlord from '@/components/forms/LeadFormLandlord.vue'

const scrollToForm = () => {
  document.getElementById('landlord-form')?.scrollIntoView({ behavior: 'smooth' })
}

const services = [
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />', title: 'Tenant Placement', desc: 'Comprehensive marketing, rigorous screening, and professional photography to secure quality tenants quickly.' },
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />', title: 'Property Maintenance', desc: '24/7 emergency response, preventive maintenance programs, and vetted contractor network.' },
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />', title: 'Financial Reporting', desc: 'Monthly statements, real-time owner portal, annual summaries, and rent guarantee option.' },
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />', title: 'Compliance Management', desc: 'Stay ahead of regulations with our dedicated compliance team monitoring legislative changes.' },
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />', title: 'Rent Collection', desc: 'Automated rent collection, late payment follow-up, and flexible payment options for tenants.' },
  { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />', title: 'Lease Management', desc: 'Lease renewals, rent reviews at market rates, and seamless tenant transition management.' },
]

const processSteps = [
  { title: 'Free Appraisal', desc: "We assess your property's rental potential and provide a market comparison." },
  { title: 'Sign Agreement', desc: 'Simple paperwork — we handle the contracts so you can focus on what matters.' },
  { title: 'Property Prepared', desc: 'Professional photography, market listing, and tenant search begins immediately.' },
  { title: 'Start Earning', desc: 'Quality tenants move in and your rental income starts flowing.' },
]

const pricingPlans = [
  {
    name: 'Standard',
    rate: '8%',
    popular: false,
    features: [
      'Tenant placement',
      'Rent collection',
      'Maintenance coordination',
      'Monthly statements',
      '24/7 support',
    ],
  },
  {
    name: 'Premium',
    rate: '9%',
    popular: true,
    features: [
      'Everything in Standard',
      'Guaranteed rent scheme',
      'Annual rent review',
      'Priority maintenance',
      'Dedicated manager',
      'Quarterly strategy review',
    ],
  },
  {
    name: 'Full Management',
    rate: 'Custom',
    popular: false,
    features: [
      'All Premium features',
      'Multi-property discounts',
      'Portfolio reporting',
      'Custom integrations',
      'Priority support',
    ],
  },
]

const faqs = [
  { question: 'How do you determine the right rental price for my property?', answer: 'We conduct a comprehensive market analysis comparing similar properties in your area, factoring in location, condition, amenities, and current market demand to set the optimal rental price that maximizes returns while minimizing vacancy periods.' },
  { question: 'What if my property sits vacant?', answer: "Our premium plan includes a rent guarantee scheme — if your property is vacant, you receive a percentage of the expected rent. Our average vacancy period is under 10 days thanks to our multi-channel marketing approach." },
  { question: 'How do you handle maintenance requests?', answer: 'Tenants submit maintenance requests through our portal. Urgent issues (leaks, no hot water) receive a response within 2 hours. Non-urgent repairs are assessed and scheduled within 48 hours. All work requires your approval for costs above $300.' },
  { question: 'Can I choose my own tenants?', answer: 'Yes. You can specify tenant preferences and approve the final selection. However, all tenants must pass our standard screening process regardless of your preference.' },
  { question: 'How often will I receive updates about my property?', answer: "You'll receive monthly financial statements and access to your real-time owner portal 24/7. We also proactively contact you for major decisions, annual reviews, and any urgent matters requiring your input." },
]
</script>
