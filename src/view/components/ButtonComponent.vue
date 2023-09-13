<!--
  MIT License

  Copyright (c) 2023 Jahrim Gabriele Cesario

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
-->

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