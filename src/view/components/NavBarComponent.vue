<script setup lang="ts">
import {injectStrict} from "@/logic/extensions/vue-extension";
import ButtonLinkComponent from "@/view/components/ButtonLinkComponent.vue";
import {InjectionKeys} from "@/injection-keys";

// TODO Find if the user is a guest or is authenticated
const isGuest = true
const authenticationService = injectStrict(InjectionKeys.AuthenticationService)

const guestLinks = [
  { to: { name: "log-in" }, text: "Log in" },
  { to: { name: "leaderboard" }, text: "Leaderboard" },
]

const userLinks = [
  { to: { name: "profile" }, text: "Profile" },
  { to: { name: "statistics" }, text: "Statistics" },
  { to: { name: "leaderboard" }, text: "Leaderboard" },
  { to: { name: "log-out" }, text: "Logout" },
]

function links() { return isGuest ? guestLinks : userLinks }
</script>

<template>
  <nav class="nav-bar">
    <ButtonLinkComponent class="button-primary" :to="{ name: 'homepage' }">
      <img class="logo" src="/icon/favicon.ico" alt="Chess Logo">Chess Game
    </ButtonLinkComponent>
    <ButtonLinkComponent class="button-primary" v-for="link in links()" :key="link.to.name" :to="link.to">
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