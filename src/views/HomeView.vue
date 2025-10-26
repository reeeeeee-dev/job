<script setup>
import { ref, onMounted, nextTick } from "vue";
import jobImage from "@/assets/job_transparent.png";

const imageLoaded = ref(false);

onMounted(async () => {
  // Reset animation state on mount
  imageLoaded.value = false;

  // Wait for DOM to update and apply initial styles
  await nextTick();

  // Trigger animation after a brief delay to ensure smooth transition
  setTimeout(() => {
    imageLoaded.value = true;
  }, 100);
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1>Home</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
    </p>
    <img
      src="@/assets/job_transparent.png"
      alt="Job"
      class="absolute -bottom-1/4 -right-1/4 h-full w-4/5 object-contain home-image"
      :class="{ 'image-loaded': imageLoaded }"
    />
  </div>
</template>

<style scoped>
.home-image {
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.home-image.image-loaded {
  opacity: 1;
  transform: translateX(0);
}
</style>
