<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.logout()
})
</script>

<template>
  <p>Cerrando sesión...</p>
</template>
