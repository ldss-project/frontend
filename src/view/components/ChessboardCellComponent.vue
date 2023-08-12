<script setup lang="ts">
import {PieceImages} from "@/assets/piece-image";
import {type Position} from "@/logic/data/game/position";
import {Ranks} from "@/logic/data/game/rank";
import {type Move} from "@/logic/data/game/move";
import {Files} from "@/logic/data/game/file";
import {EnrichedPiece} from "@/logic/data/game/enriched/piece";
import {injectStrict} from "@/logic/extensions/vue-extension";
import {haveSameParity} from "@/logic/extensions/number-extension";
import {InjectionKeys} from "@/injection-keys";
import {isEqual} from "lodash";
import {computed} from "vue";

const context = injectStrict(InjectionKeys.GameContext)

const props = defineProps<{
  position: Position,
  forcePiece?: EnrichedPiece,
  noEffects?: boolean
}>()

const piece = computed(() => props.forcePiece ?? context.value?.state.pieceAt(props.position))
const pieceImage = computed(() => PieceImages.of(piece.value))
const move = computed(() => context.value?.state.perspectiveOfThisPlayer()?.moveAt(props.position))

const isPiece = computed(() => !!piece.value && !!pieceImage.value)
const isAvailableMove = computed(() => !!move.value)
const isStandardMove = computed(() => !isPiece.value && isAvailableMove.value)
const isSelected = computed(() => {
  return effectsEnabled() &&
         isEqual(
           context.value?.state.perspectiveOfThisPlayer()?.selectedPosition,
           props.position
         )
})
const isLastMove = computed(() => {
  const latestMove: Move | undefined = context.value?.state.nextPerspective().history.at(-1)
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