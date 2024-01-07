import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/colorSelector',
    component: () => import('../views/ColorSelector.vue')
  },
  {
    path: '/dayNight',
    component: () => import('../views/DayNight.vue')
  },
  {
    path: '/Gsap',
    component: () => import('../views/Gsap.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;