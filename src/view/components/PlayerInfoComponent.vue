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
import {injectStrict} from "@/logic/extensions/vue-extension";
import {Durations} from "@/logic/proxies/game/data/duration";
import {Team} from "@/logic/proxies/game/data/team";
import {Players} from "@/logic/proxies/game/data/player";
import {Option} from "@/logic/extensions/option-extension";
import {InjectionKeys} from "@/injection-keys";
import {computed} from "vue";

const context = injectStrict(InjectionKeys.ChessGameServer)

const props = withDefaults(defineProps<{
  team?: Team,
}>(), {
  team: Team.White
})

const formatter = (n: number) => n.toLocaleString(undefined, {minimumIntegerDigits: 2})

const playerName = computed(() =>
  Option.of(context.value?.perspectiveOfTeam(props.team).player())
        .filter(_ => !Players.isGuest(_))
        .map(_ => _.name)
        .getOrElse(`${props.team === Team.White ? "White" : "Black"}Player`)
)
const timeRemainingString = computed(() => {
  const timeRemaining =
    context.value?.perspectiveOfTeam(props.team).time()
    ?? context.value?.gameState.configuration.timeConstraint?.time
  if (timeRemaining) {
    const timeRemainingAsDate: Date = new Date(Durations.toMilliSeconds(timeRemaining))
    const hours: string = formatter(timeRemainingAsDate.getUTCHours())
    const minutes: string = formatter(timeRemainingAsDate.getUTCMinutes())
    const seconds: string = formatter(timeRemainingAsDate.getUTCSeconds())
    return `${hours}:${minutes}:${seconds}`
  } else {
    return "--:--:--"
  }
})
</script>

<template>
  <div
    class="player-info"
    :class="{
      'player-info-black': team === Team.Black,
      'player-info-white': team === Team.White,
    }"
  >
    <p>{{ playerName }}</p>
    <p>{{ timeRemainingString }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .player-info {
    @extend .flex-row;
    justify-content: space-between;
    padding: $size-padding * 2;

    p {
      @extend .flex-column, .flex-center-content;
      font: { size: 1.5rem; weight: bold; }
      margin: 0
    }
  }
</style>

<style lang="scss">
  .player-info-black {
    border: $border-heavy-palette-dark;
    background-color: $palette-dark-primary;
    color: $palette-dark-text-primary;
  }
  .player-info-white {
    border: $border-heavy-palette-dark;
    background-color: $palette-dark-tertiary;
    color: $palette-dark-text-tertiary;
  }
</style>