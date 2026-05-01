<template>
  <AdminLayout>
    <div v-if="lead">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <button @click="router.back()" class="font-body text-sm text-text-muted hover:text-primary mb-2 cursor-pointer flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            Back to Leads
          </button>
          <h1 class="font-heading text-2xl font-bold text-text-main">
            {{ lead.first_name }} {{ lead.last_name }}
          </h1>
          <div class="flex items-center gap-3 mt-1">
            <span class="inline-flex px-2 py-1 text-xs font-body font-medium rounded-full capitalize" :class="typeClass(lead.type)">{{ lead.type }}</span>
            <span class="inline-flex px-2 py-1 text-xs font-body font-medium rounded-full" :class="statusClass(lead.status)">{{ lead.status }}</span>
            <span class="font-body text-sm text-text-muted">Source: {{ lead.source || 'Direct' }}</span>
          </div>
        </div>
        <div class="flex gap-3">
          <select :value="lead.status" @change="updateStatus" class="form-input py-2 text-sm">
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Contact Info -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 p-6">
            <h3 class="font-heading font-semibold text-text-main mb-4">Contact Information</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="font-body text-xs text-text-muted mb-1">Email</div>
                <div class="font-body text-sm text-text-main">{{ lead.email }}</div>
              </div>
              <div>
                <div class="font-body text-xs text-text-muted mb-1">Phone</div>
                <div class="font-body text-sm text-text-main">{{ lead.phone || '—' }}</div>
              </div>
              <div v-if="lead.property_address">
                <div class="font-body text-xs text-text-muted mb-1">Property Address</div>
                <div class="font-body text-sm text-text-main">{{ lead.property_address }}</div>
              </div>
              <div v-if="lead.company_name">
                <div class="font-body text-xs text-text-muted mb-1">Company</div>
                <div class="font-body text-sm text-text-main">{{ lead.company_name }}</div>
              </div>
              <div v-if="lead.message" class="col-span-2">
                <div class="font-body text-xs text-text-muted mb-1">Message</div>
                <div class="font-body text-sm text-text-main bg-gray-50 p-3 rounded-lg">{{ lead.message }}</div>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="bg-white rounded-xl border border-gray-100 p-6">
            <h3 class="font-heading font-semibold text-text-main mb-4">Activity Timeline</h3>
            <div class="space-y-4">
              <div v-for="event in timeline" :key="event.id" class="flex gap-4">
                <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" :class="event.bg">
                  <svg class="w-4 h-4" :class="event.color" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div class="flex-1 pb-4 border-b border-gray-50 last:border-0">
                  <div class="font-body text-sm font-medium text-text-main">{{ event.event }}</div>
                  <div class="font-body text-xs text-text-muted">{{ formatDate(event.created_at) }}</div>
                </div>
              </div>
              <div v-if="timeline.length === 0" class="text-center py-8">
                <p class="font-body text-text-muted text-sm">No activity recorded</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 p-6">
            <h3 class="font-heading font-semibold text-text-main mb-4">Details</h3>
            <div class="space-y-3">
              <div>
                <div class="font-body text-xs text-text-muted">Created</div>
                <div class="font-body text-sm text-text-main">{{ formatDate(lead.created_at) }}</div>
              </div>
              <div>
                <div class="font-body text-xs text-text-muted">Updated</div>
                <div class="font-body text-sm text-text-main">{{ formatDate(lead.updated_at) }}</div>
              </div>
              <div v-if="lead.utm_source">
                <div class="font-body text-xs text-text-muted">UTM Source</div>
                <div class="font-body text-sm text-text-main">{{ lead.utm_source }}</div>
              </div>
              <div v-if="lead.utm_medium">
                <div class="font-body text-xs text-text-muted">UTM Medium</div>
                <div class="font-body text-sm text-text-main">{{ lead.utm_medium }}</div>
              </div>
              <div v-if="lead.utm_campaign">
                <div class="font-body text-xs text-text-muted">UTM Campaign</div>
                <div class="font-body text-sm text-text-main">{{ lead.utm_campaign }}</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-gray-100 p-6">
            <h3 class="font-heading font-semibold text-text-main mb-4">Quick Actions</h3>
            <div class="space-y-2">
              <a :href="`mailto:${lead.email}`" class="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span class="font-body text-sm text-text-main">Send Email</span>
              </a>
              <a v-if="lead.phone" :href="`tel:${lead.phone}`" class="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span class="font-body text-sm text-text-main">Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else class="text-center py-20">
      <p class="font-body text-text-muted">Lead not found</p>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/pages/admin/AdminLayout.vue'
import { useLeadsStore } from '@/stores/leads'

const route = useRoute()
const router = useRouter()
const leadsStore = useLeadsStore()

const lead = ref<any>(null)
const loading = ref(true)
const timeline = ref<any[]>([])

onMounted(async () => {
  try {
    lead.value = await leadsStore.fetchLead(Number(route.params.id))
    if (lead.value.events) timeline.value = lead.value.events
  } catch {}
  loading.value = false
})

const updateStatus = async (e: Event) => {
  const target = e.target as HTMLSelectElement
  try {
    await leadsStore.updateLead(Number(route.params.id), { status: target.value })
    if (lead.value) lead.value.status = target.value
  } catch {}
}

const formatDate = (d: string) => new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

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
