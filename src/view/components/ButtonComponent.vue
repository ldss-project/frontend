<script setup lang="ts">
withDefaults(defineProps<{
  type?: string
}>(), {
  type: "button"
})
</script>

<template>
  <button class="button" :type="type">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
  .button {
    @extend .flex-row, .flex-center-content;
    height: $size-button;
    width: 100%;
    border: $border-palette-dark;
    border-radius: $size-button-border-radius;
    font-weight: bold;
    &:hover { cursor: pointer; }
  }
</style>

<style lang="scss">
  .button-primary {
    background-color: $palette-dark-primary;
    color: $palette-dark-text-primary;
    &:hover { background-color: $palette-dark-primary-hover; }
    &:active { background-color: $palette-dark-primary-active; }
  }

  .button-tertiary {
    background-color: $palette-dark-tertiary;
    color: $palette-dark-text-tertiary;
    &:hover { background-color: $palette-dark-tertiary-hover; }
    &:active { background-color: $palette-dark-tertiary-active; }
  }
</style>