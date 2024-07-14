<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-12 col-sm-8 col-md-6">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.row {
  height: calc(100dvh - 350px);
}
</style>
