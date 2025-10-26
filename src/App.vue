<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div
    class="flex gap-4 items-center w-full p-8 overflow-hidden bg-linear-to-br from-[#ffffff] to-[#F0E8CC] min-h-screen"
  >
    <nav class="flex flex-col gap-4 text-left p-8 h-screen justify-center">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/essay">Essay</RouterLink>
      <RouterLink to="/references">References</RouterLink>
    </nav>

    <router-view v-slot="{ Component }">
      <Transition>
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
