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
import {type UserScore} from "@/logic/proxies/statistics/data/user-score";
import {FormCause, FormError, validateRank} from "@/logic/extensions/form-extension";
import ErrorText from "@/view/components/ErrorText.vue";
import {InjectionKeys} from "@/injection-keys";
import {debounce} from "lodash";
import {ref, watch} from "vue";
import router from "@/router";

const statisticsService = injectStrict(InjectionKeys.StatisticsService)

const leaderboardWindow = 15
const shiftWindow = leaderboardWindow
const rankDebouncingMilliseconds = 200

const scores = ref<UserScore[]>([])
const rank = ref(1)
const error = ref(FormError.none)

watch(rank, debounce(updateLeaderboard, rankDebouncingMilliseconds), { deep: true })
updateLeaderboard(rank.value)

function updateLeaderboard(firstRank: number) {
  if (validateForm()) {
    statisticsService.value
      .getLeaderboard(firstRank, firstRank + leaderboardWindow)
      .then(_ => _
        .ifSuccess(leaderboard => scores.value = leaderboard)
        .ifFailure(console.log)
      )
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
        :class="{ 'is-invalid': error?.hasCause(FormCause.Rank) }"
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

    tr {
      height: $size-button;

      &:nth-child(1) {
        background-color: $palette-dark-primary;
        color: $palette-dark-text-primary;
      }
      &:not(:nth-child(1)){
        @extend .clickable;
        background-color: $palette-dark-tertiary;
        color: $palette-dark-text-tertiary;
      }
      &:nth-child(even){
        background-color: $palette-dark-tertiary-lighter;
      }
    }
  }
</style>