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
import ButtonLinkComponent from "@/view/components/ButtonLinkComponent.vue";
import PopupComponent from "@/view/components/PopupComponent.vue";
import ProgressSpinner from "primevue/progressspinner";
</script>

<template>
  <PopupComponent class="lobby-popup" header="Waiting for players...">
    <template #content>
      <ProgressSpinner aria-label="Loading spinner" />
    </template>
    <template #footer>
      <ButtonLinkComponent
        class="button-primary"
        :to="{ name: 'homepage' }"
      >Back to Main Menu</ButtonLinkComponent>
    </template>
  </PopupComponent>
</template>

<style lang="scss" scoped>
  .lobby-popup {
    :deep(.p-progress-spinner-circle){
      stroke: $palette-dark-primary;
      stroke-width: 2;
      animation: none;
    }
  }
</style>