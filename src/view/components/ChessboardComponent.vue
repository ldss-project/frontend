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
import {Positions} from "@/logic/proxies/game/data/position";
import {Ranks} from "@/logic/proxies/game/data/rank";
import {Files} from "@/logic/proxies/game/data/file";
import {Team} from "@/logic/proxies/game/data/team";
import {injectStrict} from "@/logic/extensions/vue-extension";
import ChessCellComponent from "@/view/components/ChessboardCellComponent.vue";
import {InjectionKeys} from "@/injection-keys";
import {computed} from "vue";

const context = injectStrict(InjectionKeys.ChessGameServer)

defineEmits(['cell-clicked'])

const orderedRanks = computed(() =>
  context.value?.thisPerspective.team() === Team.White
  ? Ranks.values().reverse()
  : Ranks.values()
)
const orderedFiles = computed(() =>
  context.value?.thisPerspective.team() === Team.White
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