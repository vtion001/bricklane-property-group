import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getLeads, getLead, updateLead as apiUpdateLead, deleteLead } from '@/services/api'
import type { Lead } from '@/types'

interface FetchLeadsParams {
  page?: number
  per_page?: number
  sort_by?: string
  sort_dir?: string
  type?: string
  status?: string
  search?: string
}

interface FetchLeadsResult {
  leads: Lead[]
  total: number
}

export const useLeadsStore = defineStore('leads', () => {
  const leads = ref<Lead[]>([])
  const currentLead = ref<Lead | null>(null)
  const loading = ref(false)
  const total = ref(0)
  const page = ref(1)
  const search = ref('')

  const hasMore = computed(() => leads.value.length < total.value)

  async function fetchLeads(params: FetchLeadsParams = {}): Promise<FetchLeadsResult> {
    loading.value = true
    const p = params.page || 1
    const s = params.search || ''
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
      const ret: FetchLeadsResult = { leads: leads.value, total: total.value }
      loading.value = false
      return ret
    } catch {
      loading.value = false
      return { leads: [], total: 0 }
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

  async function updateLead(id: number, data: Partial<Lead>) {
    const result = await apiUpdateLead(id, data)
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

  return { leads, currentLead, loading, total, page, search, hasMore, fetchLeads, fetchLead, updateLead, remove, reset }
})
