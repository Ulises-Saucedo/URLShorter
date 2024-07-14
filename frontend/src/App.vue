<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import BaseLayout from './layouts/BaseLayout.vue'
import { Toaster } from 'vue-sonner'
</script>

<template>
  <Toaster position="top-right" richColors />
  <HeaderComponent />

  <BaseLayout>
    <RouterView />
  </BaseLayout>
</template>
