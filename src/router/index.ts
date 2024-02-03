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
    path: '/gsap',
    component: () => import('../views/Gsap.vue')
  },
  {
    path: '/testScss',
    component: () => import('../views/TestScss.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;