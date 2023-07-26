<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBarComponent from "@/view/components/NavBarComponent.vue";
</script>

<template>
  <div class="application">
    <header>
      <NavBarComponent />
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
  body { overflow-x: hidden }
</style>

<style lang="scss" scoped>
  .application {
    @extend .flex-row;
    min-height: 100vh;
    width: 100vw;
  }
  header {
    @extend .flex-column;
    height: 100%;
    position: fixed;
    z-index: 9000;
    width: $size-nav-bar;
    border: $border-palette-dark;
    background-color: $palette-dark-primary;
  }
  main {
    @extend .flex-column, .flex-center-content;
    width: 100%;
    position: relative;
    padding: $size-padding $size-padding $size-padding $size-nav-bar;
    background-color: $palette-dark-secondary;
  }
</style>