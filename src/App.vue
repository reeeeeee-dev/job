<script setup>
import { RouterLink, RouterView } from "vue-router";
import CustomCursor from "./components/CustomCursor.vue";
import { ref, onMounted, onUnmounted } from "vue";

const isLoaded = ref(false);

onMounted(() => {
  const handleLoad = () => {
    isLoaded.value = true;
  };

  // Wait for all resources (including images) to be fully loaded
  if (document.readyState === "complete") {
    // Already loaded
    isLoaded.value = true;
  } else {
    // Wait for load event
    window.addEventListener("load", handleLoad);
  }

  onUnmounted(() => {
    window.removeEventListener("load", handleLoad);
  });
});
</script>

<template>
  <div
    class="flex gap-4 items-center w-full p-8 overflow-hidden bg-linear-to-br from-[#ffffff] to-[#F0E8CC] min-h-screen"
  >
    <!-- Loading Screen -->
    <Transition name="fade-loading" appear>
      <div
        v-if="!isLoaded"
        class="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-[#ffffff] to-[#F0E8CC]"
      >
        <div class="flex flex-col items-center gap-4">
          <div class="loading-spinner"></div>
          <p class="text-lg text-gray-600 animate-pulse">Loading...</p>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <div v-if="isLoaded" class="flex gap-4 items-center w-full">
      <Transition name="fade" appear>
        <nav
          class="flex flex-col gap-4 text-left p-8 h-screen justify-center text-2xl"
        >
          <RouterLink
            class="nav-link hover:text-yellow transition-colors duration-300 cursor-pointer"
            active-class="active-link"
            to="/"
          >
            Home
          </RouterLink>
          <RouterLink
            class="nav-link hover:text-yellow transition-colors duration-300 cursor-pointer"
            active-class="active-link"
            to="/essay"
          >
            Essay
          </RouterLink>
          <RouterLink
            class="nav-link hover:text-yellow transition-colors duration-300 cursor-pointer"
            active-class="active-link"
            to="/references"
          >
            References
          </RouterLink>
        </nav>
      </Transition>

      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>

    <CustomCursor />
  </div>
</template>

<style scoped>
/* Fade transition for navigation and router-view */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Additional enter transition for smoother entry */
.fade-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Loading screen transition */
.fade-loading-enter-active {
  transition: opacity 0.3s ease;
}

.fade-loading-leave-active {
  transition: opacity 0.3s ease;
}

.fade-loading-leave-to {
  opacity: 0;
}

/* Loading spinner animation */
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #f0e8cc;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Active link underline animation */
.nav-link {
  position: relative;
  text-decoration: none;
}

.nav-link.active-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--dark);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
