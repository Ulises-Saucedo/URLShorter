<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUrlStore } from '@/stores/url'
import { useRouter, useRoute } from 'vue-router'

const isBeingRedirected = ref(true)
const urlStore = useUrlStore()
const route = useRoute()
const router = useRouter()
const { nanoid } = route.params

onMounted(async () => {
  const originalLink = await urlStore.redirectToOriginalUrl(nanoid)

  if (originalLink && typeof originalLink === 'string') {
    window.location.href = originalLink
  } else {
    router.push('/404')
  }
})
</script>

<template>
  <div class="min-h-[calc(100dvh-80px)] flex items-center justify-center flex-col">
    <div class="loader" v-if="isBeingRedirected"></div>
    <p class="text-stone-300 text-2xl">Estás siendo redirigido</p>
  </div>
</template>

<style scoped>
.loader {
  width: 120px;
  height: 60px;
  border-radius: 200px 200px 0 0;
  -webkit-mask: repeating-radial-gradient(
    farthest-side at bottom,
    #0000 0,
    #000 1px 12%,
    #0000 calc(12% + 1px) 20%
  );
  background: radial-gradient(farthest-side at bottom, #514b82 0 95%, #0000 0) bottom/0% 0%
    no-repeat #ddd;
  animation: l10 2s infinite steps(6);
}
@keyframes l10 {
  100% {
    background-size: 120% 120%;
  }
}
</style>
