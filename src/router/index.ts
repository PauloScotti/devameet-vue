import { createRouter, createWebHistory } from 'vue-router'
import LoginVueVue from '@/views/LoginVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginVueVue
    }
  ]
})

export default router
