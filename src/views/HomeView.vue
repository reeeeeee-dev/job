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
    class="flex gap-4 justify-evenly home-page w-full"
    :class="{ 'page-loaded': pageLoaded }"
  >
    <div class="flex flex-col gap-4 justify-center max-w-prose">
      <h3 class="text-4xl font-bold z-50">Job by Alphonse Mucha</h3>
      <p class="text-lg z-50">
        Art Nouveau poster comissioned by the Joseph Barbey Tobacco Company in
        1896.
      </p>
    </div>
    <div />
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
