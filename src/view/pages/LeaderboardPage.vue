<script setup lang="ts">
import ErrorText from "@/view/components/ErrorText.vue";
import {FormCauses, FormError, validateRank} from "@/logic/extensions/form-extension";
import {ref, watch} from "vue";
import router from "@/router";
import {debounce} from "lodash";

const leaderboardWindow = 15
const shiftWindow = leaderboardWindow
const rankDebouncingMilliseconds = 200

const scores = ref<UserScore[]>([])
const rank = ref(1)
const error = ref(FormError.none)

watch(rank, debounce(updateLeaderboard, rankDebouncingMilliseconds), { deep: true })
updateLeaderboard(rank.value)

function updateLeaderboard(firstRank: number) {
  console.log(firstRank)
  if (validateForm()) {
    // TODO retrieve ranks starting from the first rank
    scores.value = Array.from(Array.from(Array(leaderboardWindow).keys()).map(e => e + firstRank), value => ({
      rank: value,
      username: `Player${value}`,
      wins: 1,
      losses: value,
      ratio: 1 / value,
    }))
  }
}
function visitStatistics(username: string) {
  router.push({ name: 'statistics', params: { username: username } })
}
function validateForm(): boolean {
  error.value = validateRank(rank.value)
  return error.value === FormError.none
}
</script>

<template>
  <div class="leaderboard">
    <div class="search-bar form-floating">
      <input
        class="form-control"
        :class="{ 'is-invalid': error?.hasCause(FormCauses.Rank) }"
        id="rank"
        type="number"
        min="1"
        :step="shiftWindow"
        placeholder="Search Rank..."
        v-model="rank"
      />
      <label
        for="rank"
        aria-label="First Displayed Rank"
      >First Displayed Rank</label>
    </div>
    <ErrorText v-if="error" :text="error?.message" />
    <table>
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Wins</th>
        <th>Losses</th>
        <th>Ratio</th>
      </tr>
      <tr v-for="score in scores" :key="score.username" @click="visitStatistics(score.username)">
        <td>{{ score.rank }}</td>
        <td>{{ score.username }}</td>
        <td>{{ score.wins }}</td>
        <td>{{ score.losses }}</td>
        <td>{{ score.ratio.toFixed(2) }}</td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  .leaderboard {
    @extend .flex-column;
    width: 50%;
    min-width: fit-content;
  }

  .search-bar, .error-text {
    margin-bottom: $size-margin;
  }

  .error-text {
    padding: $size-padding;
    border: $border-palette-dark;
    background-color: $palette-dark-tertiary;
  }

  table {
    text-align: center;
    border: $border-palette-dark;

    tr {
      height: $size-button;

      &:nth-child(1) {
        background-color: $palette-dark-primary;
        color: $palette-dark-text-primary;
      }
      &:not(:nth-child(1)){
        background-color: $palette-dark-tertiary;
        color: $palette-dark-text-tertiary;
        &:hover {
          cursor: pointer;
          background-color: $palette-dark-tertiary-hover;
        }
      }
      &:nth-child(even){
        background-color: $palette-dark-tertiary-active;
      }
    }
  }
</style>