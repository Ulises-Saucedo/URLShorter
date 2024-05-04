<script setup lang="ts">
import { computed } from 'vue'

const emits = defineEmits(['pagechanged'])

const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3
  },
  totalPages: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const startPage = computed(() => {
  if (props.currentPage === 1) {
    return 1
  }

  if (props.currentPage === props.totalPages) {
    return props.totalPages - props.maxVisibleButtons
  }

  return props.currentPage - 1
})

const pages = computed(() => {
  const range = []

  for (
    let i = startPage.value;
    i <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage
    })
  }

  return range
})

const onClickPage = (page: number) => {
  emits('pagechanged', page)
}
</script>

<template>
  <button
    v-for="page in pages"
    :key="page.name"
    type="button"
    @click="onClickPage(page.name)"
    class="bg-stone-100 border border-stone-200 rounded px-3 py-1"
  >
    {{ page.name }}
  </button>
</template>
