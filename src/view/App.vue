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

<style lang="scss" scoped>
  .application {
    @extend .flex-row;
    height: 100vh;
    width: 100vw;
  }
  header {
    @extend .flex-column;
    height: 100%;
    position: absolute;
    z-index: 9000;
    width: $size-nav-bar;
    border: $border-palette-dark;
    background-color: $palette-dark-primary;
  }
  main {
    @extend .flex-column, .flex-center-content;
    width: 100%;
    position: relative;
    padding-left: $size-nav-bar;
    background-color: $palette-dark-secondary;
  }
</style>