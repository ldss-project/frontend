<script setup lang="ts">
import {RouterLink} from "vue-router";
defineProps(['to'])
</script>

<template>
  <div class="nav-bar-link">
    <RouterLink :to="to">
      <slot />
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
  .nav-bar-link {
    height: $size-button;
    border-bottom: $border-palette-dark;
  }
  a {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    text-decoration: none;
    background-color: $palette-dark-primary;
    color: $palette-dark-text-primary;
  }
  a:hover {
    background-color: $palette-dark-secondary;
  }
</style>