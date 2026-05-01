<template>
  <!-- Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-xl p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-3">
          <span class="font-body text-sm text-text-muted">{{ stat.label }}</span>
          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', stat.bg]">
            <svg class="w-5 h-5" :class="stat.color" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="stat.icon" />
          </div>
        </div>
        <div class="font-heading text-2xl font-bold text-text-main">{{ stat.value }}</div>
        <div class="font-body text-xs" :class="stat.trend > 0 ? 'text-green-600' : 'text-red-500'">
          {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}% from last month
        </div>
      </div>
    </div>

    <!-- Recent Leads + Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Leads -->
      <div class="lg:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 class="font-heading font-semibold text-text-main">Recent Leads</h3>
          <RouterLink to="/admin/leads" class="font-body text-sm text-primary hover:underline cursor-pointer">View All</RouterLink>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="lead in recentLeads" :key="lead.id" class="hover:bg-gray-50 cursor-pointer" @click="goToLead(lead.id)">
                <td class="px-6 py-4">
                  <div class="font-body font-medium text-text-main text-sm">{{ lead.first_name }} {{ lead.last_name }}</div>
                  <div class="font-body text-xs text-text-muted">{{ lead.email }}</div>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex px-2 py-1 text-xs font-body font-medium rounded-full" :class="typeClass(lead.type)">
                    {{ lead.type }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex px-2 py-1 text-xs font-body font-medium rounded-full" :class="statusClass(lead.status)">
                    {{ lead.status }}
                  </span>
                </td>
                <td class="px-6 py-4 font-body text-sm text-text-muted">{{ formatDate(lead.created_at) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-if="recentLeads.length === 0" class="text-center py-12">
            <p class="font-body text-text-muted">No leads yet</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-6">
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="font-heading font-semibold text-text-main mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <RouterLink to="/admin/leads" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div class="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <span class="font-body text-sm text-text-main">View All Leads</span>
            </RouterLink>
            <RouterLink to="/admin/settings" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div class="w-9 h-9 bg-secondary/10 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <span class="font-body text-sm text-text-main">Settings</span>
            </RouterLink>
          </div>
        </div>

        <!-- Lead Status Breakdown -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="font-heading font-semibold text-text-main mb-4">Leads by Status</h3>
          <div class="space-y-3">
            <div v-for="item in statusBreakdown" :key="item.status">
              <div class="flex items-center justify-between mb-1">
                <span class="font-body text-sm text-text-muted capitalize">{{ item.status }}</span>
                <span class="font-body text-sm font-semibold text-text-main">{{ item.count }}</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all" :class="item.color" :style="{ width: `${item.pct}%` }" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useLeadsStore } from '@/stores/leads'

const router = useRouter()
const leadsStore = useLeadsStore()

const recentLeads = ref<any[]>([])

onMounted(async () => {
  try {
    const data = await leadsStore.fetchLeads({ per_page: 5 })
    recentLeads.value = data.leads || []
  } catch {}
})

const goToLead = (id: number) => {
  router.push(`/admin/leads/${id}`)
}

const formatDate = (d: string) => {
  return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

const typeClass = (type: string) => {
  switch (type) {
    case 'landlord': return 'bg-blue-50 text-blue-700'
    case 'partner': return 'bg-purple-50 text-purple-700'
    case 'contact': return 'bg-gray-50 text-gray-700'
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

const stats = [
  { label: 'Total Leads', value: '247', trend: 12, icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />', bg: 'bg-primary/10', color: 'text-primary' },
  { label: 'This Month', value: '38', trend: 8, icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />', bg: 'bg-secondary/10', color: 'text-secondary' },
  { label: 'Conversion Rate', value: '34%', trend: 5, icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />', bg: 'bg-green-50', color: 'text-green-600' },
  { label: 'Avg Response Time', value: '2.4h', trend: -15, icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />', bg: 'bg-orange-50', color: 'text-orange-600' },
]

const statusBreakdown = [
  { status: 'new', count: 12, pct: 20, color: 'bg-green-500' },
  { status: 'contacted', count: 8, pct: 13, color: 'bg-yellow-500' },
  { status: 'qualified', count: 5, pct: 8, color: 'bg-blue-500' },
  { status: 'converted', count: 20, pct: 33, color: 'bg-primary' },
  { status: 'lost', count: 15, pct: 25, color: 'bg-red-400' },
]
</script>
