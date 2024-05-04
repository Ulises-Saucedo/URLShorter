<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import { useCurrentUser } from 'vuefire'
import HeaderComponent from '@/components/HeaderComponent.vue'

const user = useCurrentUser()
const menuItems = [
  {
    name: 'Iniciar sesión',
    to: 'login'
  },
  {
    name: 'Registrarse',
    to: 'register'
  }
]
const userMenuItems = [
  {
    name: 'Inicio',
    to: 'home'
  },
  {
    name: 'Cerrar sesión',
    to: 'logout'
  }
]
</script>

<template>
  <Toaster position="top-right" richColors />
  <HeaderComponent :menuItems="menuItems" v-if="!user" />
  <HeaderComponent :menuItems="userMenuItems" v-if="user" />

  <RouterView />
</template>
