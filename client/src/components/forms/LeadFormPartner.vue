<template>
  <Motion :initial="{ opacity: 0, y: 24 }" :enter="{ opacity: 1, y: 0 }" class="max-w-2xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg p-8 md:p-10">
      <SectionHeader eyebrow="Partner Program" title="Refer Your Clients to Us" subtitle="Partner with us to deliver exceptional property management services to your clients." />

      <div v-if="submitted" class="text-center py-8 animate-fadeIn">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="font-heading text-2xl font-bold text-text-main mb-2">Thank You!</h3>
        <p class="font-body text-text-muted">We'll be in touch within 24 hours.</p>
      </div>

      <form v-else @submit.prevent="handleSubmit" :class="{ 'animate-shake': shaking }">
        <input type="hidden" name="recaptcha_token" :value="recaptchaToken" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="form-label">First Name *</label>
            <input v-model="form.first_name" type="text" required class="form-input" placeholder="Sarah" />
          </div>
          <div>
            <label class="form-label">Last Name *</label>
            <input v-model="form.last_name" type="text" required class="form-input" placeholder="Mitchell" />
          </div>
          <div>
            <label class="form-label">Email *</label>
            <input v-model="form.email" type="email" required class="form-input" placeholder="sarah@agency.com.au" />
          </div>
          <div>
            <label class="form-label">Phone *</label>
            <input v-model="form.phone" type="tel" required class="form-input" placeholder="0412 345 678" />
          </div>
          <div class="md:col-span-2">
            <label class="form-label">Company Name *</label>
            <input v-model="form.company_name" type="text" required class="form-input" placeholder="Mitchell & Associates" />
          </div>
          <div>
            <label class="form-label">Partner Type *</label>
            <select v-model="form.partner_type" required class="form-input">
              <option value="">Select type...</option>
              <option value="real_estate_agent">Real Estate Agent</option>
              <option value="accountant">Accountant</option>
              <option value="financial_advisor">Financial Advisor</option>
              <option value="mortgage_broker">Mortgage Broker</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="form-label">Referrals Per Month *</label>
            <select v-model="form.referral_count_per_month" required class="form-input">
              <option value="">Select range...</option>
              <option value="0-5">0–5</option>
              <option value="6-10">6–10</option>
              <option value="11-20">11–20</option>
              <option value="20+">20+</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label class="form-label">Message (optional)</label>
            <textarea v-model="form.message" rows="3" class="form-input" maxlength="500" placeholder="Tell us about your typical client or any specific needs..." />
            <span class="text-xs text-text-muted mt-1 block">{{ form.message.length }}/500</span>
          </div>
          <div class="md:col-span-2">
            <label class="flex items-start gap-3 cursor-pointer">
              <input v-model="form.consent" type="checkbox" required class="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
              <span class="font-body text-sm text-text-muted">I agree to the <a href="#" class="text-primary underline cursor-pointer">Terms of Service</a> and consent to being contacted about partnership opportunities.</span>
            </label>
          </div>
        </div>

        <div v-if="errorMsg" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="font-body text-sm text-red-700">{{ errorMsg }}</p>
        </div>

        <button type="submit" :disabled="loading" class="btn-primary w-full mt-6">
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
          <span v-else>Submit Partner Inquiry</span>
        </button>
      </form>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Motion } from 'motion-vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { postPartnerLead } from '@/services/api'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company_name: '',
  partner_type: '',
  referral_count_per_month: '',
  message: '',
  consent: false,
})

const loading = ref(false)
const submitted = ref(false)
const errorMsg = ref('')
const shaking = ref(false)
const recaptchaToken = ref('')

const triggerShake = () => {
  shaking.value = true
  setTimeout(() => { shaking.value = false }, 500)
}

const handleSubmit = async () => {
  errorMsg.value = ''
  if (!form.consent) {
    errorMsg.value = 'Please agree to the terms to continue.'
    triggerShake()
    return
  }
  if (form.partner_type === '' || form.referral_count_per_month === '') {
    errorMsg.value = 'Please fill in all required fields.'
    triggerShake()
    return
  }

  loading.value = true
  try {
    await postPartnerLead({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      company_name: form.company_name,
      partner_type: form.partner_type,
      referral_count_per_month: form.referral_count_per_month,
      message: form.message,
      consent: form.consent,
      recaptcha_token: recaptchaToken.value,
    })
    submitted.value = true
    setTimeout(() => { submitted.value = false }, 5000)
  } catch (err: any) {
    errorMsg.value = err.message || 'Submission failed. Please try again.'
    triggerShake()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (settingsStore.settings.recaptcha_site_key) {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${settingsStore.settings.recaptcha_site_key}`
    script.async = true
    document.head.appendChild(script)
    script.onload = async () => {
      try {
        // @ts-ignore
        recaptchaToken.value = await window.grecaptcha?.execute(settingsStore.settings.recaptcha_site_key, { action: 'partner_form' }) || ''
      } catch {}
    }
  }
})
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-8px); }
  80% { transform: translateX(8px); }
}
.animate-shake { animation: shake 0.5s ease-in-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn { animation: fadeIn 0.4s ease-out; }
</style>
