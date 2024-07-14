<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { userStore } from '@/stores/user.store'

const store = userStore()
const { logout } = store
const { user } = storeToRefs(store)
</script>

<template>
  <header>
    <nav
      class="d-flex align-items-center justify-content-center navbar navbar-expand-md bg-body-tertiary border-bottom border-light-subtle"
    >
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">URLShorter</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item mt-3 mb-2 my-md-0 me-0 me-md-2 d-grid d-md-block" v-if="!user">
              <RouterLink :to="{ name: 'login' }" class="btn btn-outline-primary">
                Iniciar sesión
              </RouterLink>
            </li>
            <li class="nav-item d-grid d-md-block" v-if="!user">
              <RouterLink :to="{ name: 'register' }" class="btn btn-primary">
                Registrarme
              </RouterLink>
            </li>
            <li class="nav-item d-grid d-md-block" v-if="user">
              <button class="btn btn-danger" @click="logout">Cerrar sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
