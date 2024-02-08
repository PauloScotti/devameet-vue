import { createRouter, createWebHistory } from 'vue-router'
import LoginVueVue from '@/views/LoginVue.vue'
import RegisterViewVue from '@/views/RegisterView.vue'
import HomeViewVue from '@/views/HomeView.vue'
import { useAccessTokenStore } from '@/stores/accessToken';
import ProfileViewVue from '@/views/ProfileView.vue';
import MeetAddViewVue from '@/views/MeetAddView.vue';
import MeetEditViewVue from '@/views/MeetEditView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewVue,
      meta: {rotaPrivada: true}
    },
    {
      path: '/user',
      name: 'user',
      component: ProfileViewVue,
      meta: {rotaPrivada: true}
    },
    {
      path: '/add',
      name: 'add',
      component: MeetAddViewVue,
      meta: {rotaPrivada: true}
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: MeetEditViewVue,
      meta: {rotaPrivada: true}
    },
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
});

router.beforeEach((to, from) => {
  const store = useAccessTokenStore();

  if(to.name !== 'login' && to.meta.rotaPrivada && !store.isAuthenticated){
    return {name: 'login'}
  } else if(to.name === 'register' && store.isAuthenticated){
    return {name: 'home'}
  }
})

export default router
