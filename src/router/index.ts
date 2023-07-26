import { createRouter, createWebHistory } from 'vue-router'
import Homepage from "@/view/pages/HomePage.vue";
import NotFoundPage from "@/view/pages/NotFoundPage.vue";
import LogInPage from "@/view/pages/LogInPage.vue";
import LogOutPage from "@/view/pages/LogOutPage.vue";
import SignInPage from "@/view/pages/SignInPage.vue";
import CreateGamePage from "@/view/pages/CreateGamePage.vue";
import JoinGamePage from "@/view/pages/JoinGamePage.vue";
import GamePage from "@/view/pages/GamePage.vue";
import ProfilePage from "@/view/pages/ProfilePage.vue";
import StatisticsPage from "@/view/pages/StatisticsPage.vue";
import LeaderboardPage from "@/view/pages/LeaderboardPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'homepage', component: Homepage },
    { path: '/log-in', name: 'log-in', component: LogInPage },
    { path: '/log-out', name: 'log-out', component: LogOutPage },
    { path: '/sign-in', name: 'sign-in', component: SignInPage },
    { path: '/create-game', name: 'create-game', component: CreateGamePage },
    { path: '/join-game', name: 'join-game', component: JoinGamePage },
    { path: '/game', name: 'game', component: GamePage },
    { path: '/profile/:username', name: 'profile', component: ProfilePage },
    { path: '/statistics/:username', name: 'statistics', component: StatisticsPage },
    { path: '/leaderboard', name: 'leaderboard', component: LeaderboardPage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ]
})

export default router
