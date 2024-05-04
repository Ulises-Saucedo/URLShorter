<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCurrentUser } from 'vuefire'
import { Form } from 'vee-validate'
import { urlSchema } from '@/schemas/urlshorterSchema'
import { useUrlStore } from '@/stores/url'
import PaginationComponent from '@/components/PaginationComponent.vue'
import InputText from '@/components/InputText.vue'

const currentUser = ref()
const page = ref(1)
const urlStore = useUrlStore()
const URI = import.meta.env.VITE_FRONTEND_URL

const onSubmit = ({ longUrl }: any) => {
  urlStore.createShorterUrl(longUrl)
}

const onPageChange = (pageRecover: any) => {
  page.value = pageRecover
}

onMounted(async () => {
  currentUser.value = await getCurrentUser()

  if (currentUser.value) {
    urlStore.getOwnerUrls()
  }
})
</script>

<template>
  <main class="flex flex-col items-center max-w-[1000px] my-6 p-6 mx-auto gap-4">
    <Form @submit="onSubmit" :validation-schema="urlSchema" class="w-full">
      <InputText type="text" placeholder="https://github.com" name="longUrl" id="longUrl" />
    </Form>

    <div
      class="bg-stone-100 border border-stone-200 rounded mx-auto p-4"
      v-if="urlStore.currentUrl && !currentUser"
    >
      <h1 class="text-stone-800 font-bold">{{ urlStore.currentUrl.longUrl }}</h1>
      <RouterLink
        :to="{ name: 'redirect', params: { nanoid: urlStore.currentUrl.shortUrl } }"
        class="text-stone-600 underline underline-offset-4"
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
        <PaginationComponent
          :maxVisibleButtons="2"
          :totalPages="urlStore.urls.length"
          :perPage="6"
          :currentPage="page"
          @pagechanged="onPageChange"
          v-if="urlStore.urls.length > 6"
        />
      </section>
    </section>
  </main>
</template>
