<script setup lang="ts">
import NavBarLink from "@/view/components/NavBarLink.vue";
defineProps(['to'])
</script>

<template>
  <div class="nav-bar-logo">
    <NavBarLink :to="to">
      <img class="logo" src="/icon/favicon.ico" alt="ChessGame Logo">Chess Game
    </NavBarLink>
  </div>
</template>

<style lang="scss" scoped>
  .nav-bar-logo {
    height: $size-button;
    border-bottom: $border-palette-dark;
  }
  .logo {
    height: $size-icon;
    width: $size-icon;
    margin-right: 5px;
  }
</style>