import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSettings, updateSettings as apiUpdateSettings } from '@/services/api'
import type { SiteSettings } from '@/types'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<SiteSettings>({
    calendly_url: '',
    ai_provider: 'mock',
    recaptcha_site_key: '',
  })
  const loaded = ref(false)

  async function fetch() {
    if (loaded.value) return
    try {
      const result = await getSettings()
      if (result.data) {
        settings.value = { ...settings.value, ...result.data }
      }
      loaded.value = true
    } catch {
    }
  }

  async function updateSettings(data: Partial<SiteSettings>) {
    await apiUpdateSettings(data)
  }

  return { settings, loaded, fetch, updateSettings }
})
