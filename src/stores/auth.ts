import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { useUrlStore } from './url'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { toast } from 'vue-sonner'

export const useAuthStore = defineStore('auth', () => {
  const auth = <any>useFirebaseAuth()!
  const googleAuthProvider = new GoogleAuthProvider()
  const router = useRouter()
  const urlStore = useUrlStore()

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success('Registrado correctamente')
      router.push({ name: 'home' })
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Iniciaste sesión correctamente')
      router.push({ name: 'home' })
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  const signInPopup = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider)
      toast.success('Iniciaste sesión correctamente')
      router.push({ name: 'home' })
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      toast.success('Cerraste sesión correctamente')
      urlStore.urls = []
      router.push({ name: 'login' })
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  return {
    auth,
    signUp,
    signIn,
    signInPopup,
    logout
  }
})
