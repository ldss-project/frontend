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