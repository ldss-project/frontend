// MIT License
//
// Copyright (c) 2023 Jahrim Gabriele Cesario
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
import { createRouter, createWebHistory } from 'vue-router'

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
