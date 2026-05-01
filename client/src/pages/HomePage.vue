<template>
  <div>
    <!-- Hero -->
    <section class="min-h-screen bg-gradient-to-br from-background via-white to-secondary/10 flex items-center relative overflow-hidden">
      <div class="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div class="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div class="section-container py-32 text-center relative z-10">
        <Motion :initial="{ opacity: 0, y: 32 }" :enter="{ opacity: 1, y: 0 }" class="max-w-4xl mx-auto">
          <span class="font-body text-sm uppercase tracking-[0.3em] text-primary font-semibold block mb-6">
            Australia's Property Management Experts
          </span>
          <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-main leading-[1.1] mb-6">
            Maximize Your Property Returns with
            <span class="text-primary"> Expert Management</span>
          </h1>
          <p class="font-body text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Brick Lane Property Group delivers exceptional property management across Australia. Trusted by 500+ landlords and 200+ referral partners.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="scrollToForm" class="btn-primary text-base px-8 py-4 cursor-pointer">
              Get Free Appraisal
            </button>
            <RouterLink to="/for-partners" class="btn-outline text-base px-8 py-4 text-center cursor-pointer">
              Partner With Us
            </RouterLink>
          </div>
        </Motion>

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg class="w-6 h-6 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="bg-text-main py-10">
      <div class="section-container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="stat in stats" :key="stat.label">
            <div class="font-heading text-3xl md:text-4xl font-bold text-white mb-1">{{ stat.value }}</div>
            <div class="font-body text-sm text-white/70">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-20 bg-white">
      <div class="section-container">
        <SectionHeader
          eyebrow="What We Do"
          title="Comprehensive Property Management"
          subtitle="Everything you need to maximize your investment, under one roof."
        />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.title"
            class="group p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="service.icon" />
            </div>
            <h3 class="font-heading text-xl font-semibold text-text-main mb-3">{{ service.title }}</h3>
            <p class="font-body text-text-muted leading-relaxed">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-20 bg-background">
      <div class="section-container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="Why Brick Lane"
              title="Why Landlords Choose Us"
            />
            <ul class="space-y-4">
              <li v-for="benefit in benefits" :key="benefit" class="flex items-start gap-3">
                <div class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="font-body text-text-muted">{{ benefit }}</span>
              </li>
            </ul>
          </div>
          <div class="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl aspect-[4/3] flex items-center justify-center">
            <div class="text-center">
              <div class="font-heading text-6xl font-bold text-primary/30">12</div>
              <div class="font-body text-primary/50 mt-2">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 bg-white">
      <div class="section-container">
        <SectionHeader
          eyebrow="What Our Clients Say"
          title="Trusted by Landlords Across Australia"
        />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="t in testimonials" :key="t.name" class="bg-background rounded-2xl p-8">
            <div class="flex gap-1 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="font-body text-text-muted mb-6 leading-relaxed">"{{ t.quote }}"</p>
            <div>
              <div class="font-heading font-semibold text-text-main">{{ t.name }}</div>
              <div class="font-body text-sm text-text-muted">{{ t.property }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="py-20 bg-gradient-to-r from-primary to-secondary">
      <div class="section-container text-center">
        <h2 class="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Maximize Your Property Returns?
        </h2>
        <p class="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Book your free, no-obligation consultation today and discover how we can transform your property management experience.
        </p>
        <button @click="scrollToForm" class="bg-white text-primary font-body font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
          Book Your Free Consultation
        </button>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-background">
      <div class="section-container max-w-3xl">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
        />
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- Form -->
    <section id="appraisal-form" class="py-20 bg-white">
      <div class="section-container">
        <LeadFormLandlord />
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
  document.getElementById('appraisal-form')?.scrollIntoView({ behavior: 'smooth' })
}

const stats = [
  { value: '500+', label: 'Properties Managed' },
  { value: '98%', label: 'Tenant Retention' },
  { value: '12 Years', label: 'Experience' },
  { value: '4.9★', label: 'Google Rating' },
]

const services = [
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />',
    title: 'Full-Service Property Management',
    description: "Complete end-to-end management including tenant relations, maintenance coordination, and rent collection. We handle everything so you don't have to.",
  },
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />',
    title: 'Tenant Screening & Placement',
    description: 'Rigorous background checks, credit verification, and reference checks. We find quality, long-term tenants who pay on time and care for your property.',
  },
  {
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />',
    title: 'Financial Reporting & Transparency',
    description: 'Monthly detailed financial statements, real-time owner portals, and annual tax summaries. Complete transparency with zero surprises.',
  },
]

const benefits = [
  'Guaranteed rent payments — even during vacancies',
  '24/7 emergency maintenance response',
  'Dedicated property manager for every client',
  'Market-leading tenant placement success rate',
  'Comprehensive insurance and compliance management',
  'No hidden fees — transparent pricing model',
]

const testimonials = [
  {
    quote: 'Brick Lane transformed our property management experience. Our rental yield increased by 15% in the first year alone.',
    name: 'Michael Chen',
    property: '3 Properties — Sydney NSW',
  },
  {
    quote: 'The team at Brick Lane are responsive, professional, and genuinely care about their landlords. Highly recommended.',
    name: 'Sarah Thompson',
    property: 'Investment Property — Melbourne VIC',
  },
  {
    quote: "After switching to Brick Lane, we haven't had a single vacancy longer than two weeks. Their tenant screening is exceptional.",
    name: 'David & Jane Williams',
    property: '5 Properties — Brisbane QLD',
  },
]

const faqs = [
  {
    question: 'What are your property management fees?',
    answer: 'Our fees are competitive and transparent. We charge a management fee of 7-9% of rental income depending on property type and number of units. There are no hidden costs, setup fees, or ongoing charges. Contact us for a personalized quote.',
  },
  {
    question: 'How do you screen potential tenants?',
    answer: 'We conduct comprehensive tenant screening including national tenancy database checks, employment verification, previous landlord references, and financial capability assessment. Our screening process ensures quality, long-term tenants.',
  },
  {
    question: 'What happens if a tenant damages my property?',
    answer: 'All tenants are required to provide a security deposit (typically 4 weeks rent) which is held in trust. We conduct thorough condition reports at move-in and move-out, documenting any damages for claim purposes.',
  },
  {
    question: 'How quickly can you fill a vacancy?',
    answer: 'Our average vacancy period is under 10 days, significantly below the industry average. We use a multi-channel marketing approach, professional photography, and competitive pricing to attract quality tenants quickly.',
  },
  {
    question: 'What areas do you service?',
    answer: 'We manage properties across Australia with a strong presence in Sydney, Melbourne, Brisbane, Perth, and Adelaide. Our network of local contractors and service providers ensures quality maintenance coverage nationwide.',
  },
]
</script>
