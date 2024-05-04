<script setup lang="ts">
import { useField } from 'vee-validate'
import { type InputType } from 'vee-validate'

const props = defineProps({
  type: {
    type: String as () => InputType | any,
    default: 'text'
  },
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const {
  value: inputValue,
  errorMessage,
  handleChange
} = useField(props.name, undefined, {
  initialValue: ''
})
</script>

<template>
  <label :id="id" :label="label" :label-for="id" v-if="label">{{ label }}</label>
  <input
    :id="id"
    :name="name"
    :type="type"
    :value="inputValue"
    :placeholder="placeholder"
    @input="handleChange"
    class="border w-full py-1 px-4 rounded-full placeholder:text-stone-200 outline-none"
    :class="!!errorMessage ? 'border-red-400' : 'border-stone-100'"
  />

  <div v-if="!!errorMessage" class="text-red-400 text-sm">{{ errorMessage }}</div>
</template>
