import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/redirect/:nanoid',
      name: 'redirect',
      component: () => import('../views/RedirectView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue')
        },
        {
          path: 'logout',
          name: 'logout',
          component: () => import('../views/auth/LogoutView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        return { name: '404' }
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    }
  ]
})

export default router
