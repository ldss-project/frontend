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
import {PieceImages} from "@/assets/piece-image";
import {type Position} from "@/logic/proxies/game/data/position";
import {type Piece} from "@/logic/proxies/game/data/piece";
import {Ranks} from "@/logic/proxies/game/data/rank";
import {type Move} from "@/logic/proxies/game/data/move";
import {Files} from "@/logic/proxies/game/data/file";
import {injectStrict} from "@/logic/extensions/vue-extension";
import {haveSameParity} from "@/logic/extensions/number-extension";
import {InjectionKeys} from "@/injection-keys";
import {isEqual} from "lodash";
import {computed} from "vue";

const context = injectStrict(InjectionKeys.ChessGameServer)

const props = defineProps<{
  position: Position,
  forcePiece?: Piece,
  noEffects?: boolean
}>()

const piece = computed(() => props.forcePiece ?? context.value?.pieceAt(props.position))
const pieceImage = computed(() => PieceImages.of(piece.value))
const move = computed(() => context.value?.thisPerspective.moveAt(props.position))

const isPiece = computed(() => !!piece.value && !!pieceImage.value)
const isAvailableMove = computed(() => !!move.value)
const isStandardMove = computed(() => !isPiece.value && isAvailableMove.value)
const isSelected = computed(() => {
  return effectsEnabled() &&
         isEqual(
           context.value?.thisPerspective.selectedPosition,
           props.position
         )
})
const isLastMove = computed(() => {
  const latestMove: Move | undefined = context.value?.perspectiveOfNextTurn().moveHistory().at(-1)
  return effectsEnabled() &&
         (isEqual(latestMove?.from, props.position) || isEqual(latestMove?.to, props.position))
})
const isCaptureMove = computed(() => {
  return effectsEnabled() && isPiece.value && isAvailableMove.value
})

function isLightBrown(): boolean {
  return haveSameParity(Files.valueOf(props.position.file), Ranks.valueOf(props.position.rank))
}
function effectsEnabled(): boolean { return !props.noEffects }
</script>

<template>
  <div
    class="chess-cell"
    :class="{
      'dark-brown': !isLightBrown(),
      'light-brown': isLightBrown(),
      'last-move': isLastMove,
      'capture-move': isCaptureMove,
      'piece-selected': isSelected,
    }"
  >
    <img v-if="isPiece" class="piece" :src="pieceImage" :alt="piece?.team.concat(' ', piece?.type)">
    <img v-if="isStandardMove" class="move" src="/effects/available-move.png" alt="Available Move">
  </div>
</template>

<style lang="scss" scoped>
  .chess-cell {
    @extend .flex-row, .flex-center-content;
    height: 100%;
    width: 100%;
    cursor: pointer;

    &.dark-brown { background-color: $palette-chessboard-primary; }
    &.light-brown { background-color: $palette-chessboard-secondary; }
    &.last-move { background-color: $palette-chessboard-last-move; }
    &.capture-move { background-color: $palette-chessboard-capture; }
    &.piece-selected { background-color: $palette-chessboard-piece-selected; }
    &:hover { background-color: $palette-chessboard-piece-selected; }

    .piece { height: 75%; width: 75%; }
    .move { height: 25%; width: 25%; opacity: 0.75; }
  }
</style>