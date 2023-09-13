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
import {GameOverCause} from "@/logic/proxies/game/data/game-over-cause";
import {injectStrict} from "@/logic/extensions/vue-extension";
import ButtonLinkComponent from "@/view/components/ButtonLinkComponent.vue";
import PopupComponent from "@/view/components/PopupComponent.vue";
import {InjectionKeys} from "@/injection-keys";
import {computed} from "vue";

const context = injectStrict(InjectionKeys.ChessGameServer)

const resultMessage = computed(() => {
  let causeMessage: string = ""
  let result = context.value?.gameState.gameOver
  if (result) {
    switch (result.cause) {
      case GameOverCause.Timeout: causeMessage = "Timeout!"; break;
      case GameOverCause.Checkmate: causeMessage = "Checkmate!"; break;
      case GameOverCause.Stalemate: causeMessage = "Stalemate..."; break;
    }
    if (!result.winner) {
      return { cause: causeMessage, result: "It's a par..." }
    } else if (result.winner.team === context.value?.thisPerspective.team()) {
      return { cause: causeMessage, result: "You won!" }
    } else if (result.winner.team === context.value?.opponentPerspective.team()) {
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