import { createRouter, createWebHistory } from 'vue-router'
import LoginVueVue from '@/views/LoginVue.vue'
import RegisterViewVue from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginVueVue,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterViewVue
    }
  ]
})

export default router
