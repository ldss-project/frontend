import { createRouter, createWebHistory } from 'vue-router'
import Homepage from "@/view/pages/Homepage.vue";
import NotFoundPage from "@/view/pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'homepage', component: Homepage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ]
})

export default router
