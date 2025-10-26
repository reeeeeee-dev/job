<script setup>
import { ref, onMounted, nextTick } from "vue";

const imageLoaded = ref(false);

onMounted(async () => {
  imageLoaded.value = false;

  // Wait for router transition
  await nextTick();

  // Small delay to ensure styles are applied
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Show the image with fly-in animation
  imageLoaded.value = true;
});
</script>

<template>
  <div class="flex gap-4 justify-evenly w-full items-center">
    <ul
      class="list-inside flex flex-col gap-4 max-w-prose max-h-[calc(2/3*100vh)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
    >
      <li>
        Visconti, Will. "Alphonse Mucha and Art Nouveau: 100 Years after Its
        Creation, His Work Is Still a Balm for a World in Upheaval."
        <em>The Conversation</em>, 5 May 2025,
        theconversation.com/alphonse-mucha-and-art-nouveau-100-years-after-its-creation-his-work-is-still-a-balm-for-a-world-in-upheaval-230674.
      </li>
    </ul>
    <img
      class="h-[calc(2/3*100vh)] reference-image"
      :class="{ 'image-loaded': imageLoaded }"
      src="@/assets/mucha.png"
      alt="Alphonse Mucha"
    />
  </div>
</template>

<style scoped>
/* Image fly-in animation */
.reference-image {
  opacity: 0 !important;
  transform: translateX(50px);
  transition: transform 0.8s ease, opacity 0.8s ease;
}

.reference-image.image-loaded {
  opacity: 1 !important;
  transform: translateX(0);
}
</style>
