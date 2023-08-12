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