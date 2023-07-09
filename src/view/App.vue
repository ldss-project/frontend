<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Homepage</RouterLink> |
      <RouterLink :to="{ name: 'not-found' }">Not a page </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped></style>
