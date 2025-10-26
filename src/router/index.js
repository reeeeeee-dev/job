import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/essay",
      name: "essay",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/references",
      name: "references",
      component: () => import("../views/HomeView.vue"),
    },
  ],
});

export default router;
