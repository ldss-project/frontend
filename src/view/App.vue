<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink class="btn btn-link" to="/">Homepage</RouterLink>
      <RouterLink class="btn btn-link" :to="{ name: 'not-found' }">Not a page </RouterLink>
    </nav>
  </header>
  <hr>

  <RouterView />
</template>

<style lang="scss" scoped></style>
