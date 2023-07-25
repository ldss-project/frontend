<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <small class="error-text">{{ text }}</small>
</template>

<style lang="scss" scoped>
  .error-text {
    width: 100%;
    margin-bottom: $size-margin * 2;
    color: $palette-dark-text-error;
  }
</style>