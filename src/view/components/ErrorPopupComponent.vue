<script setup lang="ts">
import {EnrichedChessGame} from "@/logic/data/game/enriched/game";
import ButtonLinkComponent from "@/view/components/ButtonLinkComponent.vue";
import PopupComponent from "@/view/components/PopupComponent.vue";
import {type Ref, computed, inject} from "vue";

const context: Ref<EnrichedChessGame> = inject<EnrichedChessGame>('game-context')

const errorDescription = computed(() => context.value.server.error?.description)
</script>

<template>
  <PopupComponent class="error-popup" header="Server Error">
    <template #content>
      <p>{{ errorDescription ?? "" }}</p>
    </template>
    <template #footer>
      <ButtonLinkComponent
        class="button-error"
        :to="{ name: 'homepage' }"
      >Back to Main Menu</ButtonLinkComponent>
    </template>
  </PopupComponent>
</template>

<style lang="scss" scoped>
  .error-popup {
    p { margin: 0; }
  }
</style>