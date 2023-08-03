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