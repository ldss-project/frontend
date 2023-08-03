<script setup lang="ts">
withDefaults(defineProps<{
  type?: "submit" | "reset" | "button"
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
    @extend .flex-row, .flex-center-content, .clickable;
    height: $size-button;
    width: 100%;
    border: $border-palette-dark;
    border-radius: $size-button-border-radius;
    font-weight: bold;
  }
</style>

<style lang="scss">
  .button-primary {
    background-color: $palette-dark-primary;
    color: $palette-dark-text-primary;
  }

  .button-tertiary {
    background-color: $palette-dark-tertiary;
    color: $palette-dark-text-tertiary;
  }

  .button-error {
    background-color: $palette-dark-error;
    color: $palette-dark-text-primary;
  }
</style>