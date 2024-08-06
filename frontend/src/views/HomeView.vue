<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { userStore } from '@/stores/user.store'
import { urlStore } from '@/stores/url.store'
import { useForm } from 'vee-validate'
import { urlSchema } from '@/schemas/url.schema'
import InputText from '@/components/InputText.vue'
import UrlTtlCard from '@/components/UrlTtlCard.vue'
import UrlCard from '@/components/UrlCard.vue'

const storeUser = userStore()
const { user } = storeToRefs(storeUser)
const storeUrl = urlStore()
const { urlTtl, noAuthLimit, urls, total } = storeToRefs(storeUrl)
const { createShortUrl, recoverUserUrls, pagination } = storeUrl

const isPossiblePaginate = computed(() => total.value > 10)
const pages = computed(() => Math.ceil(total.value / 10))

const { handleSubmit, resetForm } = useForm({
  validationSchema: urlSchema
})

const onSubmit = handleSubmit(async ({ url }: { url: string }): Promise<void> => {
  await createShortUrl(url)
  resetForm()
})

onMounted(async () => {
  await recoverUserUrls()

  // Comprobar si el link ha expirado
  if (urlTtl.value && Date.now() > urlTtl.value.exp) {
    urlTtl.value = null
    noAuthLimit.value = 0
  } else if (urlTtl.value) {
    const timeLeft = urlTtl.value.exp - Date.now()

    setTimeout(() => {
      urlTtl.value = null
      noAuthLimit.value = 0
    }, timeLeft)
  }
})
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-8 col-md-6">
      <div class="alert alert-primary" role="alert">
        Mientras no este registrado, sus links durarán 5 minutos unicamente
      </div>

      <form @submit.prevent="onSubmit">
        <InputText id="url" name="url" placeholder="https://instagram.com" />
      </form>

      <div class="row mt-3" v-if="!user && urlTtl">
        <UrlTtlCard :urlTtl="urlTtl" />
      </div>

      <div class="row mt-3" v-if="user">
        <UrlCard v-for="url in urls" :url="url" :key="url._id" />

        <ul class="pagination justify-content-center mt-3" v-if="isPossiblePaginate">
          <li class="page-item" v-for="(page, i) in pages" :key="i">
            <button class="page-link" @click="pagination(page)">{{ page }}</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
