<template>
  <section
    class="max-w-[1000px] mx-auto min-h-[calc(100dvh-80px)] flex items-center justify-center flex-col p-4 space-y-3"
  >
    <Suspense>
      <RouterView></RouterView>
    </Suspense>
  </section>
</template>
