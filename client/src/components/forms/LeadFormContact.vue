<template>
  <Motion :initial="{ opacity: 0, y: 24 }" :enter="{ opacity: 1, y: 0 }" class="max-w-xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg p-8 md:p-10">
      <SectionHeader title="Get in Touch" subtitle="Have a question? We'd love to hear from you." />

      <div v-if="submitted" class="text-center py-8 animate-fadeIn">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="font-heading text-2xl font-bold text-text-main mb-2">Message Sent!</h3>
        <p class="font-body text-text-muted">We'll get back to you within 24 hours.</p>
      </div>

      <form v-else @submit.prevent="handleSubmit" :class="{ 'animate-shake': shaking }">
        <div class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="form-label">First Name *</label>
              <input v-model="form.first_name" type="text" required class="form-input" placeholder="Your first name" />
            </div>
            <div>
              <label class="form-label">Last Name *</label>
              <input v-model="form.last_name" type="text" required class="form-input" placeholder="Your last name" />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="form-label">Email *</label>
              <input v-model="form.email" type="email" required class="form-input" placeholder="you@example.com.au" />
            </div>
            <div>
              <label class="form-label">Phone (optional)</label>
              <input v-model="form.phone" type="tel" class="form-input" placeholder="0412 345 678" />
            </div>
          </div>
          <div>
            <label class="form-label">Subject *</label>
            <select v-model="form.subject" required class="form-input">
              <option value="">Select subject...</option>
              <option value="general">General Inquiry</option>
              <option value="property_management">Property Management</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="form-label">Message *</label>
            <textarea v-model="form.message" rows="5" required class="form-input" maxlength="1000" placeholder="How can we help?" />
            <span class="text-xs text-text-muted mt-1 block">{{ form.message.length }}/1000</span>
          </div>
          <div>
            <label class="flex items-start gap-3 cursor-pointer">
              <input v-model="form.consent" type="checkbox" required class="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
              <span class="font-body text-sm text-text-muted">I agree to the <a href="#" class="text-primary underline cursor-pointer">Privacy Policy</a> and consent to being contacted.</span>
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
            Sending...
          </span>
          <span v-else>Send Message</span>
        </button>
      </form>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Motion } from '@oku-ui/motion'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { postContactLead } from '@/services/api'

const form = reactive({
  first_name: '', last_name: '', email: '', phone: '',
  subject: '', message: '', consent: false,
})

const loading = ref(false)
const submitted = ref(false)
const errorMsg = ref('')
const shaking = ref(false)

const triggerShake = () => {
  shaking.value = true
  setTimeout(() => { shaking.value = false }, 500)
}

const handleSubmit = async () => {
  errorMsg.value = ''
  if (!form.consent) {
    errorMsg.value = 'Please agree to the privacy policy to continue.'
    triggerShake()
    return
  }

  loading.value = true
  try {
    await postContactLead({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
      consent: form.consent,
    })
    submitted.value = true
    setTimeout(() => { submitted.value = false }, 5000)
  } catch (err: any) {
    errorMsg.value = err.message || 'Failed to send message. Please try again.'
    triggerShake()
  } finally {
    loading.value = false
  }
}
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
