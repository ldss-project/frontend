<script setup lang="ts">
import {Positions} from "@/logic/data/game/position";
import {Ranks} from "@/logic/data/game/rank";
import {Files} from "@/logic/data/game/file";
import {Team} from "@/logic/data/game/team";
import {EnrichedChessGame} from "@/logic/data/game/enriched/game";
import ChessCellComponent from "@/view/components/ChessboardCellComponent.vue";
import {computed, inject, type Ref} from "vue";

const context: Ref<EnrichedChessGame> = inject<EnrichedChessGame>('game-context')

defineEmits(['cell-clicked'])

const orderedRanks = computed(() =>
  context.value?.state.perspectiveOfThisPlayer()?.team === Team.White
  ? Ranks.values().reverse()
  : Ranks.values()
)
const orderedFiles = computed(() =>
  context.value?.state.perspectiveOfThisPlayer()?.team === Team.White
  ? Files.values()
  : Files.values().reverse()
)
</script>

<template>
  <table class="chessboard">
    <tr v-for="row in orderedRanks" :key="row">
      <td
        v-for="position in orderedFiles.map<Position>(column => Positions.of(column, row))"
        :key="position"
        @click="$emit('cell-clicked', position)"
      ><ChessCellComponent :position="position" /></td>
    </tr>
  </table>
</template>

<style lang="scss" scoped>
  .chessboard {
    border: $border-heavy-palette-dark;

    td {
      padding: 0;
      border: $border-palette-dark;
      height: 12.5%;
      width: 12.5%;
    }
  }
</style>