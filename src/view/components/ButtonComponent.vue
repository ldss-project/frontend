<script setup lang="ts"></script>

<template>
  <button class="button" type="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
  .button {
    @extend .flex-row, .flex-center-content;
    height: $size-button;
    border: $border-palette-dark;
    border-radius: $size-border-radius;
    background-color: $palette-dark-primary;
    font-weight: bold;
    color: $palette-dark-text-primary;
  }
  .button:hover {
    cursor: pointer;
    background-color: $palette-dark-primary-hover;
  }
  .button:active {
    background-color: $palette-dark-secondary;
  }
</style>