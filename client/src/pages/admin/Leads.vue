<template>
  <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <!-- Filters -->
      <div class="px-6 py-4 border-b border-gray-100 flex flex-wrap gap-4 items-center">
        <select v-model="filters.type" class="form-input py-2 text-sm max-w-[160px]">
          <option value="">All Types</option>
          <option value="landlord">Landlord</option>
          <option value="partner">Partner</option>
          <option value="contact">Contact</option>
        </select>
        <select v-model="filters.status" class="form-input py-2 text-sm max-w-[160px]">
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>
        <input v-model="filters.search" type="text" placeholder="Search name or email..." class="form-input py-2 text-sm flex-1 max-w-xs" />
        <span class="font-body text-sm text-text-muted ml-auto">{{ total }} leads</span>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left font-body text-xs font-semibold text-text-muted uppercase tracking-wider cursor-pointer" @click="sort('first_name')">
                Name {{ sortIcon('first_name') }}
              </th>
              <th class="px-6 py-3 text-left font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left font-body text-xs font-semibold text-text-muted uppercase tracking-wider cursor-pointer" @click="sort('status')">
                Status {{ sortIcon('status') }}
              </th>
              <th class="px-6 py-3 text-left font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Source</th>
              <th class="px-6 py-3 text-left font-body text-xs font-semibold text-text-muted uppercase tracking-wider cursor-pointer" @click="sort('created_at')">
                Date {{ sortIcon('created_at') }}
              </th>
              <th class="px-6 py-3 text-left font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="lead in leads" :key="lead.id" class="hover:bg-gray-50 cursor-pointer" @click="goToLead(lead.id)">
              <td class="px-6 py-4">
                <div class="font-body font-medium text-text-main text-sm">{{ lead.first_name }} {{ lead.last_name }}</div>
                <div class="font-body text-xs text-text-muted">{{ lead.email }}</div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex px-2 py-1 text-xs font-body font-medium rounded-full capitalize" :class="typeClass(lead.type)">
                  {{ lead.type }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex px-2 py-1 text-xs font-body font-medium rounded-full" :class="statusClass(lead.status)">
                  {{ lead.status }}
                </span>
              </td>
              <td class="px-6 py-4 font-body text-sm text-text-muted">{{ lead.source || '—' }}</td>
              <td class="px-6 py-4 font-body text-sm text-text-muted">{{ formatDate(lead.created_at) }}</td>
              <td class="px-6 py-4" @click.stop>
                <div class="flex gap-2">
                  <button @click="updateStatus(lead.id, 'contacted')" class="p-1.5 text-text-muted hover:text-primary cursor-pointer" title="Mark contacted">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </button>
                  <button @click="goToLead(lead.id)" class="p-1.5 text-text-muted hover:text-primary cursor-pointer" title="View">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="leads.length === 0" class="text-center py-16">
          <p class="font-body text-text-muted">No leads found</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <span class="font-body text-sm text-text-muted">Page {{ currentPage }} of {{ totalPages }}</span>
        <div class="flex gap-2">
          <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 cursor-pointer">
            Previous
          </button>
          <button @click="nextPage" :disabled="currentPage >= totalPages" class="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLeadsStore } from '@/stores/leads'

const router = useRouter()
const leadsStore = useLeadsStore()

const leads = ref<any[]>([])
const total = ref(0)
const currentPage = ref(1)
const perPage = 20
const sortField = ref('created_at')
const sortDir = ref('desc')

const filters = ref({ type: '', status: '', search: '' })

const totalPages = computed(() => Math.ceil(total.value / perPage))

const fetchData = async () => {
  try {
    const params: any = {
      page: currentPage.value,
      per_page: perPage,
      sort_by: sortField.value,
      sort_dir: sortDir.value,
    }
    if (filters.value.type) params.type = filters.value.type
    if (filters.value.status) params.status = filters.value.status
    if (filters.value.search) params.search = filters.value.search

    const data = await leadsStore.fetchLeads(params)
    leads.value = data.leads || []
    total.value = data.total || 0
  } catch {}
}

const sort = (field: string) => {
  if (sortField.value === field) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDir.value = 'asc'
  }
  fetchData()
}

const sortIcon = (field: string) => {
  if (sortField.value !== field) return ''
  return sortDir.value === 'asc' ? '↑' : '↓'
}

const prevPage = () => { if (currentPage.value > 1) { currentPage.value--; fetchData() } }
const nextPage = () => { if (currentPage.value < totalPages.value) { currentPage.value++; fetchData() } }

watch(filters, () => { currentPage.value = 1; fetchData() }, { deep: true })
onMounted(fetchData)

const goToLead = (id: number) => router.push(`/admin/leads/${id}`)

const updateStatus = async (id: number, status: string) => {
  try {
    await leadsStore.updateLead(id, { status })
    fetchData()
  } catch {}
}

const formatDate = (d: string) => new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })

const typeClass = (type: string) => {
  switch (type) {
    case 'landlord': return 'bg-blue-50 text-blue-700'
    case 'partner': return 'bg-purple-50 text-purple-700'
    default: return 'bg-gray-50 text-gray-700'
  }
}

const statusClass = (status: string) => {
  switch (status) {
    case 'new': return 'bg-green-50 text-green-700'
    case 'contacted': return 'bg-yellow-50 text-yellow-700'
    case 'qualified': return 'bg-blue-50 text-blue-700'
    case 'converted': return 'bg-primary/10 text-primary'
    case 'lost': return 'bg-red-50 text-red-700'
    default: return 'bg-gray-50 text-gray-700'
  }
}
</script>
