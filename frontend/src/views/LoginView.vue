<script setup lang="ts">
import FormLayout from '@/layouts/FormLayout.vue'
import { userStore } from '@/stores/user.store'
import { useForm } from 'vee-validate'
import { loginSchema } from '@/schemas/auth.schema'
import InputText from '@/components/InputText.vue'

const { login } = userStore()

const { handleSubmit } = useForm({
  validationSchema: loginSchema
})

const onSubmit = handleSubmit(async (values): Promise<void> => {
  const { email, password } = values
  await login({ email, password })
})
</script>

<template>
  <FormLayout>
    <form @submit.prevent="onSubmit">
      <InputText id="email" name="email" label="Email" />
      <InputText type="password" id="password" name="password" label="Contraseña" />
      <div class="d-grid mt-3">
        <button type="submit" class="btn btn-warning">Iniciar sesión</button>
      </div>
    </form>
  </FormLayout>
</template>
