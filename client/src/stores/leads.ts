import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getLeads, getLead, updateLead, deleteLead } from '@/services/api'
import type { Lead } from '@/types'

export const useLeadsStore = defineStore('leads', () => {
  const leads = ref<Lead[]>([])
  const currentLead = ref<Lead | null>(null)
  const loading = ref(false)
  const total = ref(0)
  const page = ref(1)
  const search = ref('')

  const hasMore = computed(() => leads.value.length < total.value)

  async function fetchLeads(p = 1, s = '') {
    loading.value = true
    search.value = s
    try {
      const result = await getLeads(p, s)
      if (p === 1) {
        leads.value = result.data || []
      } else {
        leads.value.push(...(result.data || []))
      }
      total.value = result.meta?.total || 0
      page.value = result.meta?.page || 1
    } finally {
      loading.value = false
    }
  }

  async function fetchLead(id: number) {
    loading.value = true
    try {
      const result = await getLead(id)
      currentLead.value = result.data || null
    } finally {
      loading.value = false
    }
  }

  async function update(id: number, data: Partial<Lead>) {
    const result = await updateLead(id, data)
    currentLead.value = result.data || null
    const idx = leads.value.findIndex(l => l.id === id)
    if (idx !== -1 && result.data) {
      leads.value[idx] = result.data
    }
  }

  async function remove(id: number) {
    await deleteLead(id)
    leads.value = leads.value.filter(l => l.id !== id)
    total.value = Math.max(0, total.value - 1)
  }

  function reset() {
    leads.value = []
    currentLead.value = null
    total.value = 0
    page.value = 1
    search.value = ''
  }

  return { leads, currentLead, loading, total, page, search, hasMore, fetchLeads, fetchLead, update, remove, reset }
})
