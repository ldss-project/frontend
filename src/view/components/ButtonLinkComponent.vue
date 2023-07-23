<script setup lang="ts">
import {RouteLocationRaw} from "vue-router";
import ButtonComponent from "@/view/components/ButtonComponent.vue";

defineProps<{
  to: RouteLocationRaw
}>()
</script>

<template>
  <ButtonComponent class="button-link" @click="this.$router.push(to)">
    <slot />
  </ButtonComponent>
</template>

<style lang="scss" scoped></style>