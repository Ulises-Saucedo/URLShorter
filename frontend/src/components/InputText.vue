<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  type: {
    type: String,
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
  <div class="mt-3">
    <label :id="id" :label="label" :label-for="id" v-if="label" class="form-label m-0">
      {{ label }}
    </label>
    <input
      :id="id"
      :name="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      class="form-control"
    />

    <div v-if="!!errorMessage" class="text-danger">{{ errorMessage }}</div>
  </div>
</template>
