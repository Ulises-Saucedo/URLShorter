<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCurrentUser } from 'vuefire'
import { Form } from 'vee-validate'
import { urlSchema } from '@/schemas/urlshorterSchema'
import { useUrlStore } from '@/stores/url'
import { useOffsetPagination } from '@vueuse/core'
import InputText from '@/components/InputText.vue'

const currentUser = ref()
const page = ref<any>(1)
const totalPages = ref(0)
const urlStore = useUrlStore()
const URI = import.meta.env.VITE_FRONTEND_URL

const onSubmit = ({ longUrl }: any) => {
  urlStore.createShorterUrl(longUrl)
}

const fetchData = async ({ currentPage }: { currentPage: number }) => {
  page.value = currentPage
}

onMounted(async () => {
  currentUser.value = await getCurrentUser()

  if (currentUser.value) {
    await urlStore.getOwnerUrls()
  }

  const { pageCount } = useOffsetPagination({
    total: urlStore.urls.length,
    page: 1,
    pageSize: 6,
    onPageChange: fetchData
  })

  totalPages.value = pageCount.value

  await fetchData({ currentPage: page.value })
})
</script>

<template>
  <main class="flex flex-col items-center max-w-[1000px] my-6 p-6 mx-auto gap-4">
    <Form @submit="onSubmit" :validation-schema="urlSchema" class="w-full">
      <InputText type="text" placeholder="https://github.com" name="longUrl" id="longUrl" />
    </Form>

    <div
      class="bg-stone-100 border border-stone-200 rounded mx-auto p-4 max-w-full"
      v-if="urlStore.currentUrl && !currentUser"
    >
      <h1 class="text-stone-800 font-bold">{{ urlStore.currentUrl.longUrl }}</h1>
      <RouterLink
        :to="{ name: 'redirect', params: { nanoid: urlStore.currentUrl.shortUrl } }"
        class="text-stone-600 underline underline-offset-4 break-all"
      >
        {{ URI + '/redirect/' + urlStore.currentUrl.shortUrl }}
      </RouterLink>
    </div>

    <section class="space-y-4" v-if="!!currentUser">
      <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div
          class="bg-stone-100 border border-stone-200 rounded p-4 relative"
          v-for="url in urlStore.pagination(page)"
          :key="url.shortUrl"
        >
          <h1 class="text-stone-800 font-bold">{{ url.longUrl }}</h1>
          <RouterLink
            :to="{ name: 'redirect', params: { nanoid: url.shortUrl } }"
            class="text-stone-600 underline underline-offset-4 break-all"
          >
            {{ URI + '/redirect/' + url.shortUrl }}
          </RouterLink>
          <button class="absolute top-0 right-0" @click="urlStore.deleteUrl(url.shortUrl)">
            ❌
          </button>
        </div>
      </section>

      <section class="space-x-2 flex justify-center">
        <button
          v-for="item in totalPages"
          :key="item"
          :disabled="page === item"
          @click="page = item"
          class="bg-stone-100 border border-stone-200 py-1 px-3 rounded"
        >
          {{ item }}
        </button>
      </section>
    </section>
  </main>
</template>
