import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/for-partners',
    name: 'partners',
    component: () => import('@/pages/Partners.vue'),
  },
  {
    path: '/for-landlords',
    name: 'landlords',
    component: () => import('@/pages/Landlords.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/Contact.vue'),
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
