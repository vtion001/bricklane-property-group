import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/for-partners',
    name: 'partners',
    component: () => import('@/pages/ForPartnersPage.vue'),
  },
  {
    path: '/for-landlords',
    name: 'landlords',
    component: () => import('@/pages/ForLandlordsPage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/pages/admin/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/pages/admin/Dashboard.vue'),
      },
      {
        path: 'leads',
        name: 'admin-leads',
        component: () => import('@/pages/admin/Leads.vue'),
      },
      {
        path: 'leads/:id',
        name: 'admin-lead-detail',
        component: () => import('@/pages/admin/LeadDetail.vue'),
        props: true,
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: () => import('@/pages/admin/Settings.vue'),
      },
      {
        path: 'analytics',
        name: 'admin-analytics',
        component: () => import('@/pages/admin/Analytics.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
