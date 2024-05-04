<script setup lang="ts">
import { onMounted } from 'vue'
import { type menuItem } from '@/types/menu'

defineProps({
  menuItems: Array<menuItem>
})

onMounted(() => {
  const menu = document.getElementById('menu')
  const submenu = document.getElementById('submenu')

  menu?.addEventListener('click', () => {
    submenu?.classList.toggle('hidden')
  })
})
</script>

<template>
  <header class="flex items-center p-4 justify-between border-b border-stone-100">
    <RouterLink :to="{ name: 'home' }" class="text-stone-800 font-bold text-2xl">
      URLShorter
    </RouterLink>
    <div class="hidden md:flex gap-2">
      <RouterLink
        class="py-2 px-6 bg-stone-800 hover:bg-stone-700 duration-200 text-white rounded-md"
        v-for="(menuItem, i) in menuItems"
        :key="i"
        :to="{ name: menuItem.to }"
      >
        {{ menuItem.name }}
      </RouterLink>
    </div>
    <div class="block md:hidden relative">
      <button
        class="py-2 px-6 bg-stone-800 hover:bg-stone-700 duration-200 text-white rounded-md"
        id="menu"
      >
        ...
      </button>
      <div
        class="hidden absolute top-12 -left-12 border border-stone-100 bg-white p-2 min-w-max rounded space-y-4"
        id="submenu"
      >
        <RouterLink
          class="block"
          v-for="(menuItem, i) in menuItems"
          :key="i"
          :to="{ name: menuItem.to }"
        >
          {{ menuItem.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>
