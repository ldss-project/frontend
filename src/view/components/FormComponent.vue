<script setup lang="ts"></script>

<template>
  <form class="form">
    <slot />
  </form>
</template>

<style lang="scss" scoped>
  .form {
    @extend .flex-column, .flex-center-content;
    margin: $size-margin;
    padding: $size-form-border-radius;
    border: $border-palette-dark;
    border-radius: $size-form-border-radius;
    color: $palette-dark-text-tertiary;
    background-color: $palette-dark-tertiary;
  }
</style>