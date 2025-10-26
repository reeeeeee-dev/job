<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const cursorX = ref(0);
const cursorY = ref(0);
const cursorXSm = ref(0);
const cursorYSm = ref(0);
const isHovering = ref(false);
const isVisible = ref(false);

let animationFrameId;

onMounted(() => {
  const handleLoad = () => {
    isVisible.value = true;
  };

  // Wait for page to be fully loaded before showing cursor
  if (document.readyState === "complete") {
    isVisible.value = true;
  } else {
    window.addEventListener("load", handleLoad);
  }

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
    window.removeEventListener("load", handleLoad);
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
  <Transition name="fade-cursor">
    <div
      v-if="isVisible"
      class="custom-cursor"
      :class="{ 'cursor-hover': isHovering }"
      :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
    >
      <div class="cursor-dot"></div>
    </div>
  </Transition>
  <Transition name="fade-cursor">
    <div
      v-if="isVisible"
      class="cursor-follower"
      :style="{ left: cursorXSm + 'px', top: cursorYSm + 'px' }"
    ></div>
  </Transition>
</template>

<style scoped>
/* Fade transition for cursor entry */
.fade-cursor-enter-active {
  transition: opacity 0.6s ease;
}

.fade-cursor-enter-from {
  opacity: 0;
}

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
