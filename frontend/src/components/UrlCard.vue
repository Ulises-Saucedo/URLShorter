<script setup lang="ts">
import { urlStore } from '@/stores/url.store'
import type { UrlFromDB } from '@/ts/types/url.types'

const { removeUrl } = urlStore()

defineProps({
  url: {
    type: Object as UrlFromDB,
    required: true
  }
})
</script>

<template>
  <div class="my-2 col-12 col-sm-6 col-md-4">
    <div class="card bg-success-subtle">
      <div class="card-body">
        <div class="card-text">
          <a :href="`http://localhost:3000/api/url/redirect/${url.shortURL}`">
            {{ url.shortURL }}
          </a>
          <div class="row">
            <div class="col-12">
              <button class="btn btn-sm btn-danger" @click="removeUrl(url.shortURL)">
                Remover
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
