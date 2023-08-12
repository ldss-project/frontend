<script setup lang="ts">
import {Positions} from "@/logic/proxies/game/data/position";
import {Ranks} from "@/logic/proxies/game/data/rank";
import {Files} from "@/logic/proxies/game/data/file";
import {Team} from "@/logic/proxies/game/data/team";
import {injectStrict} from "@/logic/extensions/vue-extension";
import ChessCellComponent from "@/view/components/ChessboardCellComponent.vue";
import {InjectionKeys} from "@/injection-keys";
import {computed} from "vue";

const context = injectStrict(InjectionKeys.GameContext)

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