<script setup lang="ts">
import type { Url } from '@/ts/types/url.types'

defineProps({
  urlTtl: {
    type: Object as Url,
    required: true
  }
})
</script>

<template>
  <div class="col-12">
    <div class="card bg-warning-subtle">
      <div class="card-body">
        <div class="card-title">En 5 minutos su link será eliminado</div>
        <div class="card-text">
          <a :href="`http://localhost:3000/api/url/redirect/${urlTtl.shortURL}`">
            {{ urlTtl.originalURL }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
