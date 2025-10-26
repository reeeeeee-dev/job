<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const cursorX = ref(0);
const cursorY = ref(0);
const cursorXSm = ref(0);
const cursorYSm = ref(0);
const isHovering = ref(false);

let animationFrameId;

onMounted(() => {
  const updateCursor = () => {
    cursorXSm.value += (cursorX.value - cursorXSm.value) * 0.1;
    cursorYSm.value += (cursorY.value - cursorYSm.value) * 0.1;
    animationFrameId = requestAnimationFrame(updateCursor);
  };

  const handleMouseMove = (e) => {
    cursorX.value = e.clientX;
    cursorY.value = e.clientY;
  };

  const handleMouseEnter = () => {
    isHovering.value = true;
  };

  const handleMouseLeave = () => {
    isHovering.value = false;
  };

  const links = document.querySelectorAll("a, button, .clickable");
  links.forEach((link) => {
    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);
  });

  window.addEventListener("mousemove", handleMouseMove);
  updateCursor();

  onUnmounted(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    links.forEach((link) => {
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseLeave);
    });
  });
});
</script>

<template>
  <div
    class="custom-cursor"
    :class="{ 'cursor-hover': isHovering }"
    :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
  >
    <div class="cursor-dot"></div>
  </div>
  <div
    class="cursor-follower"
    :style="{ left: cursorXSm + 'px', top: cursorYSm + 'px' }"
  ></div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.2s ease;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background-color: var(--dark);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.cursor-hover .cursor-dot {
  transform: translate(-50%, -50%) scale(1.5);
  background-color: var(--yellow);
}

.cursor-follower {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid var(--dark);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s ease;
  mix-blend-mode: difference;
}
</style>
