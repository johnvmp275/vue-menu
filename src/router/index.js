import { createRouter, createWebHistory } from 'vue-router'
import MenuRequests from '@/views/MenuRequests.vue'
import DashboardRequests from '@/views/DashboardRequests.vue'
import CreateFoods from '@/views/CreateFoods.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MenuRequests
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardRequests
    },
    {
      path: '/create',
      name: 'create',
      component: CreateFoods
    },
  ]
})

export default router
