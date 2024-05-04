import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { firebaseApp } from '@/config/firebase'
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where
} from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { toast } from 'vue-sonner'
import { type Url } from '@/types/url'
import { useCurrentUser } from 'vuefire'

export const useUrlStore = defineStore('url', () => {
  const urls = ref<Url[] | any>([])
  const currentUrl = ref<any>(null)
  const db = getFirestore(firebaseApp)
  const user: any = useCurrentUser()

  const pages = computed(() => Math.ceil(urls.value.length / 6))

  const pagination = (page: number) => {
    return urls.value.slice((page - 1) * 6, page * 6)
  }

  const getOwnerUrls = async () => {
    const owner = user.value.uid

    const docRef = collection(db, 'trimmer')

    const q = query(docRef, where('owner', '==', owner))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const url = doc.data()
      urls.value.push(url)
    })
  }

  const createShorterUrl = async (longUrl: string) => {
    const owner = user.value.uid ? user.value.uid : null

    try {
      const docRef = await addDoc(collection(db, 'trimmer'), {
        owner,
        longUrl,
        shortUrl: nanoid()
      })

      const document = await getDoc(docRef)

      if (owner) {
        const url = document.data()
        urls.value.push(url)
      } else {
        currentUrl.value = document.data()
      }

      toast.success('Url creada 😁')
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  const deleteUrl = async (nanoid: string) => {
    const docRef = collection(db, 'trimmer')

    const q = query(docRef, where('shortUrl', '==', nanoid))

    try {
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref)
      })

      toast.success('Url eliminada 😢')
      urls.value = urls.value.filter((url: any) => url.shortUrl !== nanoid)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const redirectToOriginalUrl = async (nanoid: any) => {
    let originalLink: any = {}
    const docRef = collection(db, 'trimmer')

    const q = query(docRef, where('shortUrl', '==', nanoid))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      originalLink = doc.data().longUrl
    })

    return originalLink
  }

  return {
    urls,
    currentUrl,
    pages,
    pagination,
    getOwnerUrls,
    createShorterUrl,
    deleteUrl,
    redirectToOriginalUrl
  }
})
