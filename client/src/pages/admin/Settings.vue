<template>
  <AdminLayout>
    <div class="max-w-3xl">
      <div class="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="font-heading font-semibold text-text-main">General Settings</h3>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="form-label">Company Name</label>
            <input v-model="form.company_name" type="text" class="form-input" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="form-label">Contact Email</label>
              <input v-model="form.contact_email" type="email" class="form-input" />
            </div>
            <div>
              <label class="form-label">Contact Phone</label>
              <input v-model="form.contact_phone" type="text" class="form-input" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="font-heading font-semibold text-text-main">Integrations</h3>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="form-label">Calendly URL</label>
            <input v-model="form.calendly_url" type="url" class="form-input" placeholder="https://calendly.com/your-link" />
            <p class="font-body text-xs text-text-muted mt-1">Used for the "Book Free Consultation" button</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="form-label">reCAPTCHA Site Key</label>
              <input v-model="form.recaptcha_site_key" type="text" class="form-input" />
            </div>
            <div>
              <label class="form-label">reCAPTCHA Secret Key</label>
              <input v-model="form.recaptcha_secret_key" type="password" class="form-input" />
            </div>
          </div>
          <div>
            <label class="form-label">AI Provider</label>
            <select v-model="form.ai_provider" class="form-input">
              <option value="mock">Mock (Development)</option>
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
              <option value="gemini">Google Gemini</option>
            </select>
          </div>
          <div>
            <label class="form-label">AI API Key</label>
            <input v-model="form.ai_api_key" type="password" class="form-input" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="font-heading font-semibold text-text-main">CRM Integration</h3>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="form-label">CRM Webhook URL</label>
            <div class="flex gap-2">
              <input :value="webhookUrl" type="text" class="form-input flex-1" readonly />
              <button @click="copyWebhook" class="btn-outline py-2 px-4 cursor-pointer">Copy</button>
            </div>
            <p class="font-body text-xs text-text-muted mt-1">POST leads to this URL when status changes to "converted"</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="font-heading font-semibold text-text-main">Email Settings</h3>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="form-label">SMTP Host</label>
            <input v-model="form.smtp_host" type="text" class="form-input" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="form-label">SMTP Port</label>
              <input v-model="form.smtp_port" type="text" class="form-input" />
            </div>
            <div>
              <label class="form-label">SMTP Username</label>
              <input v-model="form.smtp_user" type="text" class="form-input" />
            </div>
            <div>
              <label class="form-label">SMTP Password</label>
              <input v-model="form.smtp_pass" type="password" class="form-input" />
            </div>
          </div>
        </div>
      </div>

      <!-- Save -->
      <div class="mt-6 flex items-center gap-4">
        <button @click="save" :disabled="saving" class="btn-primary cursor-pointer">
          {{ saving ? 'Saving...' : 'Save Settings' }}
        </button>
        <span v-if="saved" class="font-body text-sm text-green-600">Settings saved!</span>
        <span v-if="error" class="font-body text-sm text-red-600">{{ error }}</span>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/pages/admin/AdminLayout.vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const saving = ref(false)
const saved = ref(false)
const error = ref('')

const form = ref({
  company_name: 'Brick Lane Property Group',
  contact_email: 'info@bricklanepropertygroup.com.au',
  contact_phone: '(02) 9123 4567',
  calendly_url: 'https://calendly.com/bpg',
  recaptcha_site_key: '',
  recaptcha_secret_key: '',
  ai_provider: 'mock',
  ai_api_key: '',
  smtp_host: 'mailhog',
  smtp_port: '1025',
  smtp_user: '',
  smtp_pass: '',
})

const webhookUrl = 'https://bricklanepropertygroup.com.au/api/webhooks/crm'

onMounted(async () => {
  await settingsStore.fetch()
  const s = settingsStore.settings
  if (s) {
    form.value.calendly_url = s.calendly_url || form.value.calendly_url
    form.value.recaptcha_site_key = s.recaptcha_site_key || ''
    form.value.ai_provider = s.ai_provider || 'mock'
    form.value.ai_api_key = s.ai_api_key || ''
  }
})

const save = async () => {
  saving.value = true
  error.value = ''
  saved.value = false
  try {
    await settingsStore.updateSettings({
      calendly_url: form.value.calendly_url,
      recaptcha_site_key: form.value.recaptcha_site_key,
      ai_provider: form.value.ai_provider as any,
      ai_api_key: form.value.ai_api_key,
    })
    saved.value = true
    setTimeout(() => { saved.value = false }, 3000)
  } catch (e: any) {
    error.value = e.message || 'Failed to save'
  } finally {
    saving.value = false
  }
}

const copyWebhook = () => {
  navigator.clipboard.writeText(webhookUrl)
}
</script>
