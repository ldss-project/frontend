<script setup lang="ts">
import {injectStrict} from "@/logic/extensions/vue-extension";
import {Durations} from "@/logic/data/game/duration";
import {InjectionKeys} from "@/injection-keys";
import {computed} from "vue";

const context = injectStrict(InjectionKeys.GameContext)

const props = withDefaults(defineProps<{
  playerName?: string,
}>(), {
  playerName: "PlayerNamePlaceholder"
})

const formatter = (n: number) => n.toLocaleString(undefined, {minimumIntegerDigits: 2})

const timeRemainingString = computed(() => {
  const timeRemaining = context.value?.state.perspectiveOfPlayer(props.playerName)?.time
  if (timeRemaining !== undefined) {
    const timeRemainingAsDate: Date = new Date(Durations.toMilliSeconds(timeRemaining))
    const hours: string = formatter(timeRemainingAsDate.getUTCHours())
    const minutes: string = formatter(timeRemainingAsDate.getUTCMinutes())
    const seconds: string = formatter(timeRemainingAsDate.getUTCSeconds())
    return `${hours}:${minutes}:${seconds}`
  } else {
    return ""
  }
})
</script>

<template>
  <div class="player-info">
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