import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'
import { userStore } from './user.store'
import { toast } from 'vue-sonner'
import Service from '@/services/UrlService'
import type { Url, UrlFromDB } from '@/ts/types/url.types'

export const urlStore = defineStore(
  'url',
  () => {
    const storeUser = userStore()
    const { token } = storeToRefs(storeUser)
    const urls: Ref<UrlFromDB[]> = ref([])
    const urlTtl: Ref<Url | null> = ref(null)
    const noAuthLimit: Ref<number> = ref(0)
    const total: Ref<number> = ref(0)

    const createShortUrl = async (url: string): Promise<void> => {
      try {
        if (!token.value) {
          if (noAuthLimit.value === 1) {
            throw new Error('Solo puedes crear una url, espera a que expire la que has creado')
          }

          const {
            data: { url: urlResponse }
          }: { data: { url: Url } } = await Service.createShortUrlTtl(url)
          urlTtl.value = urlResponse

          noAuthLimit.value = 1

          setTimeout(() => {
            urlTtl.value = null
            toast.info('La url generada ha expirado')
            noAuthLimit.value = 0
          }, 300000)
        } else {
          const {
            data: { url: urlResponse }
          }: { data: { url: UrlFromDB } } = await Service.createShortUrl(url, token.value)

          urls.value.push(urlResponse)
        }

        toast.success('URL acortada generada correctamente')
      } catch (e: any) {
        toast.error(e.message)
      }
    }

    const removeUrl = async (shortUrl: string): Promise<void> => {
      try {
        await Service.removeUrl(shortUrl, token.value as string)
        urls.value = urls.value.filter((url) => url.shortURL !== shortUrl)
        toast.info('URL eliminada correctamente')
      } catch (e: any) {
        toast.error(e.message)
      }
    }

    const recoverUserUrls = async (): Promise<void> => {
      try {
        const {
          data: { urls: urlsFromDB, total: totalResponse }
        }: { data: { urls: UrlFromDB[]; total: number } } = await Service.getUserShortedUrls(
          token.value as string
        )
        urls.value = urlsFromDB
        total.value = totalResponse
      } catch (e: any) {
        return
      }
    }

    const pagination = async (page: number = 1): Promise<void> => {
      try {
        const {
          data: { urls: urlsFromDB }
        }: { data: { urls: UrlFromDB[] } } = await Service.getUserShortedUrls(
          token.value as string,
          page
        )
        urls.value = urlsFromDB
      } catch (e: any) {
        return
      }
    }

    return {
      urls,
      urlTtl,
      total,
      createShortUrl,
      recoverUserUrls,
      pagination,
      removeUrl
    }
  },
  { persist: true }
)
