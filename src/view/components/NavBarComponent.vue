<!--
  MIT License

  Copyright (c) 2023 Jahrim Gabriele Cesario

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
-->

<script setup lang="ts">
import {injectStrict} from "@/logic/extensions/vue-extension";
import ButtonLinkComponent from "@/view/components/ButtonLinkComponent.vue";
import {InjectionKeys} from "@/injection-keys";
import {computed} from "vue";

const authenticationService = injectStrict(InjectionKeys.AuthenticationService)

const links = computed(() =>
  authenticationService?.value
    .sessionManager()
    .session()
    .map(session => [
      {to: {name: "profile", params: {username: session.username}}, text: "Profile",},
      {to: {name: "statistics", params: {username: session.username},}, text: "Statistics",},
      {to: {name: "leaderboard"}, text: "Leaderboard"},
      {to: {name: "log-out"}, text: "Logout"},
    ])
    .getOrElse([
      {to: {name: "log-in"}, text: "Log in"},
      {to: {name: "leaderboard"}, text: "Leaderboard"},
    ])
)
</script>

<template>
  <nav class="nav-bar">
    <ButtonLinkComponent class="button-primary" :to="{ name: 'homepage' }">
      <img class="logo" src="/icon/favicon.ico" alt="Chess Logo">Chess Game
    </ButtonLinkComponent>
    <ButtonLinkComponent class="button-primary" v-for="link in links" :key="link.to.name" :to="link.to">
      {{ link.text }}
    </ButtonLinkComponent>
  </nav>
</template>

<style lang="scss" scoped>
  .button-link {
    border-width: 0 0 $size-border 0;
    border-radius: 0;
  }

  .logo {
    height: $size-icon;
    width: $size-icon;
    margin-right: $size-margin;
  }
</style>