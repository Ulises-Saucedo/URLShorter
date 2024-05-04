<script setup lang="ts">
import { Form } from 'vee-validate'
import { authSchema } from '@/schemas/authSchema'
import { useAuthStore } from '@/stores/auth'
import InputForm from '@/components/InputForm.vue'

const authStore = useAuthStore()

const onSubmit = ({ email, password }: any) => {
  authStore.signUp(email, password)
}
</script>

<template>
  <Form @submit="onSubmit" :validation-schema="authSchema" class="space-y-3 w-full">
    <InputForm
      id="email"
      name="email"
      type="email"
      label="Dirección de correo:"
      placeholder="Email"
    />

    <InputForm
      id="password"
      name="password"
      type="password"
      label="Contraseña:"
      placeholder="Contraseña"
    />

    <button
      type="submit"
      class="py-2 rounded bg-stone-800 hover:bg-stone-700 duration-200 w-full text-white"
    >
      Registrarse
    </button>
    <button
      type="submit"
      class="py-2 rounded bg-stone-800 hover:bg-stone-700 duration-200 w-full text-white"
      @click="authStore.signInPopup"
    >
      Google
    </button>
  </Form>
</template>
