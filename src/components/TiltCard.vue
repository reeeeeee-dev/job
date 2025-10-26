<script setup>
import { ref, computed } from "vue";

const rotateX = ref(0);
const rotateY = ref(0);

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
  return `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale3d(1, 1, 1)`;
});
</script>

<template>
  <div
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    class="max-w-xl cursor-pointer transition-transform duration-75 ease-out"
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
/* Additional smooth transitions */
div {
  will-change: transform;
}
</style>
