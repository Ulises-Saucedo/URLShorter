import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import Service from '@/services/UserService'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import type { User } from '@/ts/types/user.types'

export const userStore = defineStore(
  'user',
  () => {
    const user: Ref<User | null> = ref(null)
    const token: Ref<string | null> = ref(null)
    const router = useRouter()

    const signUp = async ({
      name,
      email,
      password
    }: {
      name: string
      email: string
      password: string
    }): Promise<void> => {
      try {
        await Service.register({ name, email, password })
        toast.success('Registro exitoso, inicie sesión')
        router.push('/login')
      } catch (e: any) {
        toast.error(e.message)
      }
    }

    const login = async ({
      email,
      password
    }: {
      email: string
      password: string
    }): Promise<void> => {
      try {
        const {
          data: { token: responseToken }
        }: { data: { token: string } } = await Service.login({ email, password })
        token.value = responseToken
        toast.success('Sesión iniciada correctamente')
        router.push('/')
      } catch (e: any) {
        toast.error(e.message)
      }
    }

    const logout = (): void => {
      token.value = null
      user.value = null
      router.push('/login')
    }

    return {
      user,
      token,
      signUp,
      login,
      logout
    }
  },
  { persist: true }
)
