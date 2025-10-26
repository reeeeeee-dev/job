<script setup>
import { ref, onMounted, nextTick } from "vue";
import jobImage from "@/assets/job_transparent.png";

const imageLoaded = ref(false);
const pageLoaded = ref(false);

onMounted(async () => {
  // Ensure image and page start hidden
  imageLoaded.value = false;
  pageLoaded.value = false;

  // Wait for router transition to complete
  await nextTick();

  // Small delay to ensure all styles are applied
  await new Promise((resolve) => setTimeout(resolve, 50));

  // First fade in the page content
  pageLoaded.value = true;

  // Wait for page fade to complete
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Now show the image with animation
  imageLoaded.value = true;
});
</script>

<template>
  <div
    class="flex flex-col gap-4 home-page"
    :class="{ 'page-loaded': pageLoaded }"
  >
    <h1>Home</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
    </p>
    <img
      src="@/assets/job_transparent.png"
      alt="Job"
      class="absolute -bottom-1/4 -right-1/4 h-full w-4/5 object-contain home-image"
      :class="{ 'image-loaded': imageLoaded }"
      style="
        position: absolute;
        bottom: -25%;
        right: -25%;
        height: 100%;
        width: 80%;
        object-fit: contain;
      "
    />
  </div>
</template>

<style scoped>
/* Page fade in */
.home-page {
  opacity: 0;
  transition: opacity 0.4s ease;
}

.home-page.page-loaded {
  opacity: 1;
}

/* Image animation */
.home-image {
  opacity: 0 !important;
  transform: translateX(50px);
  transition: transform 0.8s ease, opacity 0.8s ease;
}

.home-image.image-loaded {
  opacity: 1 !important;
  transform: translateX(0);
}
</style>
