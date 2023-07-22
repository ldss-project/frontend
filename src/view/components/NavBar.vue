<script setup lang="ts">
import NavBarLink from "@/view/components/NavBarLink.vue";
import NavBarLogo from "@/view/components/NavBarLogo.vue";

// TODO Find if the user is a guest or is authenticated
const isGuest = false

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
  <div class="nav-bar">
    <NavBarLogo :to="{ name: 'homepage' }"/>
    <NavBarLink v-for="link in links()" :to="link.to">{{ link.text }}</NavBarLink>
  </div>
</template>

<style lang="scss" scoped>
  .nav-bar {
    height: 100%;
    border: $border-palette-dark;
  }
</style>