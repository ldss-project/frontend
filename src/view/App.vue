<style lang="scss"> @import "src/assets/global"; </style>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from "@/view/components/NavBar.vue";
</script>

<template>
  <div class="application">
    <header>
      <nav>
        <NavBar />
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .application {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
  }
  header {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 9000;
    width: $size-nav-bar;
    background-color: $palette-dark-primary;
  }
  main {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-left: $size-nav-bar;
    background-color: $palette-dark-secondary;
  }
</style>