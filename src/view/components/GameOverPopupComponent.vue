<script setup lang="ts">
import {GameOverCause} from "@/logic/data/game/result";
import {EnrichedChessGame} from "@/logic/data/game/enriched/game";
import ButtonLinkComponent from "@/view/components/ButtonLinkComponent.vue";
import PopupComponent from "@/view/components/PopupComponent.vue";
import {type Ref, computed, inject} from "vue";

const context: Ref<EnrichedChessGame> = inject<EnrichedChessGame>('game-context')

const resultMessage = computed(() => {
  let causeMessage: string = ""
  let result = context.value?.state.gameOver
  if (result !== undefined) {
    switch (result.cause) {
      case GameOverCause.Timeout: causeMessage = "Timeout!"; break;
      case GameOverCause.Checkmate: causeMessage = "Checkmate!"; break;
      case GameOverCause.Stalemate: causeMessage = "Stalemate..."; break;
    }
    if (result.winner === undefined) {
      return { cause: causeMessage, result: "It's a par..." }
    } else if (result.winner === context.value?.state.perspectiveOfThisPlayer()?.team) {
      return { cause: causeMessage, result: "You won!" }
    } else if (result.winner === context.value?.state.perspectiveOfOpponentPlayer()?.team) {
      return { cause: causeMessage, result: "You lost..." }
    }
  }
  throw new Error("NotImplementedException: no matches for the specified game result.")
})
</script>

<template>
  <PopupComponent class="game-over-popup" header="Game Over!" draggable>
    <template #content>
      <div class="result-message">
        <p>{{ resultMessage.cause }}</p>
        <p>{{ resultMessage.result }}</p>
      </div>
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
  .result-message {
    @extend .flex-column, .flex-center-content;
    p { margin: 0; }
  }
</style>