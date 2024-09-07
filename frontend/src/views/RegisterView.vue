<script setup lang="ts">
import FormLayout from '@/layouts/FormLayout.vue'
import { userStore } from '@/stores/user.store'
import { useForm } from 'vee-validate'
import { registerSchema } from '@/schemas/auth.schema'
import InputText from '@/components/InputText.vue'

const { signUp } = userStore()

const { handleSubmit } = useForm({
  validationSchema: registerSchema
})

const onSubmit = handleSubmit(async (values): Promise<void> => {
  const { name, email, password } = values
  await signUp({ name, email, password })
})
</script>

<template>
  <FormLayout>
    <form @submit.prevent="onSubmit">
      <InputText id="name" name="name" label="Nombre" />
      <InputText id="email" name="email" label="Email" />
      <InputText type="password" id="password" name="password" label="Contraseña" />
      <div class="d-grid mt-3">
        <button type="submit" class="btn btn-warning">Registrarme</button>
      </div>
    </form>
  </FormLayout>
</template>
