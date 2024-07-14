import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Service from '@/services/UserService'
import { storeToRefs } from 'pinia'
import { userStore } from '@/stores/user.store'
import type { User } from '@/ts/types/user.types'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = userStore()
  const { user, token } = storeToRefs(store)

  try {
    const {
      data: { user: userResponse }
    }: { data: { user: User } } = await Service.verify(token.value as string)

    user.value = userResponse
  } catch (e) {
    token.value = null
    user.value = null
  }

  next()
})

export default router
