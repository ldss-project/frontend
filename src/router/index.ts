import { createRouter, createWebHistory } from 'vue-router'
import Homepage from "@/view/pages/Homepage.vue";
import NotFoundPage from "@/view/pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'homepage', component: Homepage },
    { path: '/log-in', name: 'log-in', component: NotFoundPage },
    { path: '/log-out', name: 'log-out', component: NotFoundPage },
    { path: '/sign-in', name: 'sign-in', component: NotFoundPage },
    { path: '/create-game', name: 'create-game', component: NotFoundPage },
    { path: '/join-game', name: 'join-game', component: NotFoundPage },
    { path: '/game', name: 'create-game', component: NotFoundPage },
    { path: '/profile', name: 'profile', component: NotFoundPage },
    { path: '/statistics', name: 'statistics', component: NotFoundPage },
    { path: '/leaderboard', name: 'leaderboard', component: NotFoundPage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ]
})

export default router
