<script setup>
import { ref, computed, onMounted, nextTick } from "vue";

const rotateX = ref(0);
const rotateY = ref(0);
const cardLoaded = ref(false);

onMounted(async () => {
  cardLoaded.value = false;

  // Wait for router transition
  await nextTick();

  // Small delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Fade in the card
  cardLoaded.value = true;

  // After slide-in animation completes, update transition to only include transform
  setTimeout(() => {
    const card = document.querySelector(".tilt-card");
    if (card) {
      card.style.transition = "transform 0.6s ease-out, opacity 0.8s ease";
    }
  }, 800);
});

const handleMouseMove = (event) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateXValue = ((y - centerY) / centerY) * 10;
  const rotateYValue = ((centerX - x) / centerX) * 10;

  rotateX.value = rotateXValue;
  rotateY.value = rotateYValue;
};

const handleMouseLeave = () => {
  rotateX.value = 0;
  rotateY.value = 0;
};

const transform = computed(() => {
  const rotation = `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale3d(1, 1, 1)`;
  const slideIn = cardLoaded.value ? "translateX(0)" : "translateX(50px)";
  return `${rotation} ${slideIn}`;
});
</script>

<template>
  <div
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    class="max-w-xl cursor-pointer tilt-card"
    :class="{ 'card-loaded': cardLoaded }"
    :style="{ transform }"
  >
    <div
      class="rounded-4xl shadow-2xl flex flex-col justify-between relative overflow-hidden"
    >
      <!-- Shine effect overlay -->
      <div
        class="absolute inset-0 opacity-30 bg-linear-to-br from-white/20 to-transparent pointer-events-none"
      />

      <!-- Content -->
      <div class="relative z-10">
        <img
          src="@/assets/job.jpg"
          alt="Job"
          class="w-full h-full object-contain"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tilt-card {
  opacity: 0;
  transition: opacity 0.8s ease, transform 0.8s ease;
  will-change: transform, opacity;
}

.tilt-card.card-loaded {
  opacity: 1;
}

/* Additional smooth transitions */
div {
  will-change: transform;
}
</style>
