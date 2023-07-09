<script setup lang="ts">
import MyComponent from "@/view/components/MyComponent.vue";
import {greet} from "@/logic/my-logic";
</script>

<template>
  <p>{{ greet() }}</p>
  <MyComponent />
</template>

<style lang="scss" scoped></style>