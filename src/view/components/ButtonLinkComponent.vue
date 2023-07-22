<script setup lang="ts">
import {RouterLink} from "vue-router";
import ButtonComponent from "@/view/components/ButtonComponent.vue";
defineProps(['to'])
</script>

<template>
  <ButtonComponent>
    <RouterLink :to="to">
      <slot />
    </RouterLink>
  </ButtonComponent>
</template>

<style lang="scss" scoped>
  a {
    @extend .flex-row, .flex-center-content;
    text-decoration: none;
    color: $palette-dark-text-primary;
  }
</style>