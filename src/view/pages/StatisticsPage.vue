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
import {StatisticsErrorType} from "@/logic/proxies/statistics/data/statistics-error";
import {type UserScoreHistory} from "@/logic/proxies/statistics/data/user-score-history";
import {injectStrict} from "@/logic/extensions/vue-extension";
import {getChartData, timeScale} from "@/logic/extensions/chart-extension";
import FormComponent from "@/view/components/FormComponent.vue";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom"
import Chart from "primevue/chart";
import {InjectionKeys} from "@/injection-keys";
import {onMounted, ref} from "vue";
import router from "@/router";

const statisticsService = injectStrict(InjectionKeys.StatisticsService)

const userScoreHistory = ref<UserScoreHistory>({
  username: router.currentRoute.value.params.username as string,
  latestScores: []
})

onMounted(() => {
  statisticsService.value
    .getUserScoreHistory(userScoreHistory.value.username)
    .then(_ => _
      .ifSuccess(userScores => userScoreHistory.value.latestScores = userScores)
      .ifFailure(error => {
        switch (error.type) {
          case StatisticsErrorType.UserNotFoundException:
            router.push({name: "not-found"})
            break;
          default:
            console.log(error)
        }
      })
    )
})

const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    x: timeScale,
    y: { min: 0, suggestedMax: 4 },
  },
  spanGaps: true,
  plugins: {
    zoom: {
      zoom: {
        drag: { enabled: true, },
        mode: 'xy',
      },
      limits: { y: { min: 0, }, },
    }
  }
}
</script>

<template>
  <FormComponent>
    <p>{{ userScoreHistory.username }}</p>
    <div class="input">
      <label
        class="col-form-label"
        for="rank"
        aria-label="Rank"
      >Rank</label>
      <input
        class="form-control"
        id="rank"
        type="number"
        :value="userScoreHistory.latestScores.at(-1)?.rank"
        autocomplete="off"
        disabled
      />
    </div>
    <div class="input">
      <label
        class="col-form-label"
        for="wins"
        aria-label="Wins"
      >Wins</label>
      <input
        class="form-control"
        id="wins"
        type="number"
        :value="userScoreHistory.latestScores.at(-1)?.wins"
        autocomplete="off"
        disabled
      />
    </div>
    <div class="input">
      <label
        class="col-form-label"
        for="losses"
        aria-label="Losses"
      >Losses</label>
      <input
        class="form-control"
        id="losses"
        type="number"
        :value="userScoreHistory.latestScores.at(-1)?.losses"
        autocomplete="off"
        disabled
      />
    </div>
    <div class="input">
      <label
        class="col-form-label"
        for="ratio"
        aria-label="Ratio"
      >Ratio</label>
      <input
        class="form-control"
        id="ratio"
        type="number"
        :value="userScoreHistory.latestScores.at(-1)?.ratio"
        autocomplete="off"
        disabled
      />
    </div>
  </FormComponent>
  <div class="card">
    <Chart
      @dblclick="$refs.ratioChart.getChart().resetZoom()"
      ref="ratioChart"
      type="line"
      :plugins="[zoomPlugin]"
      :data="getChartData(
        userScoreHistory.latestScores.map(s => new Date(s.insertion.$date)),
        { name: 'Ratio', values: userScoreHistory.latestScores.map(s => s.ratio), }
      )"
      :options="chartOptions"
      :canvasProps="{'role': 'img', 'aria-label': `Score history of ${userScoreHistory.username}`}"
    />
  </div>
</template>

<style lang="scss" scoped>
  p {
    font: { size: 1.5rem; weight: bold; }
  }
  .input {
    @extend .flex-row;
    width: 100%;
    margin-bottom: $size-margin * 2;
    label { width: 25% }
    input, .input-group { width: 75% }
  }
  .card {
    height: 50%;
    width: 75%;
    margin-top: $size-margin * 2;

    .p-chart {
      height: 100%;
      width: 100%;
    }
  }
</style>
