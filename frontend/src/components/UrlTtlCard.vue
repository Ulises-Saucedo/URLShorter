<script setup lang="ts">
import type { Url } from '@/ts/types/url.types'

const API_URL = 'https://urlshorter-31n1.onrender.com'

defineProps({
  urlTtl: {
    type: Object as () => Url,
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
          <a :href="`${API_URL}/api/url/redirect/${urlTtl.shortURL}`">
            {{ urlTtl.originalURL }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
