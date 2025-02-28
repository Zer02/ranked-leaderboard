// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Map.vue'
import Leaderboard from "@/components/Leaderboard.vue";
import Matchmaking from '@/components/Matchmaking.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: Leaderboard,
    },
    {
      path: "/matchmaking",
      name: "matchmaking",
      component: Matchmaking,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router
