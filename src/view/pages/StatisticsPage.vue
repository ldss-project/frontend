<script setup lang="ts">
import {UserScoreHistory} from "@/logic/data/score";
import {getChartData, timeScale} from "@/logic/extensions/chart-extension";
import FormComponent from "@/view/components/FormComponent.vue";
import "chartjs-adapter-date-fns";
import Chart from "primevue/chart";
import {onMounted, ref} from "vue";
import router from "@/router";

const userScoreHistory = ref<UserScoreHistory>({
  username: router.currentRoute.value.params.username as string,
  latestScores: []
})

onMounted(() => {
  // TODO call get score history from statistics service
  userScoreHistory.value.latestScores = []
})
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
      type="line"
      :data="getChartData(
        userScoreHistory.latestScores.map(s => s.insertion),
        { name: 'Ratio', values: userScoreHistory.latestScores.map(s => s.ratio), }
      )"
      :options="{
        maintainAspectRatio: false,
        scales: { x: timeScale },
      }"
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
