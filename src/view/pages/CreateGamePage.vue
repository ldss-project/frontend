<script setup lang="ts">
import {TimeConstraint} from "@/logic/proxies/game/data/time-constraint";
import {FormCause, FormError, validateGameDuration, validateGameId} from "@/logic/extensions/form-extension";
import FormComponent from "@/view/components/FormComponent.vue";
import ErrorText from "@/view/components/ErrorText.vue";
import ButtonComponent from "@/view/components/ButtonComponent.vue";
import {ref} from "vue";

const form = ref({
  timeConstraint: TimeConstraint.NoLimit,
  timeMinutes: 5,
  isPrivate: false,
  gameId: "",
  error: FormError.none,
})

const timeConstraintOptions = [
  { value: TimeConstraint.NoLimit, name: "No Limit" },
  { value: TimeConstraint.MoveLimit, name: "Move Limit" },
  { value: TimeConstraint.PlayerLimit, name: "Player Limit" },
]

function onSubmit(event: Event){
  event.preventDefault()
  console.log(form.value)
  if (validateForm()) {
    console.log("VALIDATED")
    // TODO call create game on game service
    // TODO call join private game on game service
  }
}

function validateForm(){
  form.value.error =
    validateGameDuration(form.value.timeMinutes) ??
    validateGameId(form.value.gameId, form.value.isPrivate)?.withMessage("Game identifier required for a private game.")
  return form.value.error === FormError.none
}
function hasTimeConstraint(): boolean { return form.value.timeConstraint !== TimeConstraint.NoLimit }
function isPrivate(): boolean { return form.value.isPrivate }
</script>

<template>
  <FormComponent>
    <div class="group" :class="{ 'extended': hasTimeConstraint() }">
      <div class="input">
        <label
          class="form-label"
          for="timeConstraint"
          aria-label="Time Constraint"
        >Time Constraint</label>
        <select
          class="form-select"
          id="timeConstraint"
          v-model="form.timeConstraint"
        >
          <option selected disabled>Choose one...</option>
          <option
            v-for="option in timeConstraintOptions"
            :key="option.value"
            :value="option.value"
          >{{ option.name }}</option>
        </select>
      </div>
      <div class="input" v-if="hasTimeConstraint()">
        <label
          class="form-label"
          for="time"
          aria-label="Time (Minutes)"
        >Time (Minutes)</label>
        <input
          class="form-control"
          :class="{ 'is-invalid': form.error?.hasCause(FormCause.GameDuration) }"
          id="time"
          type="number"
          placeholder="Time (Minutes)"
          autocomplete="on"
          v-model="form.timeMinutes"
          min="5"
          max="60"
          step="5"
        />
      </div>
    </div>
    <div class="group" :class="{ 'extended': isPrivate() }">
      <div class="input form-check">
        <input
          class="form-check-input"
          :class="{ 'is-invalid': form.error?.hasCause(FormCause.GameId) }"
          id="private"
          type="checkbox"
          v-model="form.isPrivate"
        />
        <label
          class="form-check-label"
          for="private"
          aria-label="Private"
        >Private</label>
      </div>
      <div class="input" v-if="isPrivate()">
        <label
          class="form-label visually-hidden"
          for="gameId"
          aria-label="Private Game Identifier"
        >Game Id</label>
        <input
          class="form-control"
          :class="{ 'is-invalid': form.error?.hasCause(FormCause.GameId) }"
          id="gameId"
          type="text"
          placeholder="Private Game Id"
          v-model="form.gameId"
        />
      </div>
    </div>
    <ErrorText v-if="form.error" :text="form.error?.message"/>
    <ButtonComponent
      class="button-primary"
      type="submit"
      @click="onSubmit($event)"
    >Create Game</ButtonComponent>
  </FormComponent>
</template>

<style lang="scss" scoped>
  .group {
    @extend .flex-row;
    width: 100%;
    margin-bottom: $size-margin * 2;

    .input {
      align-self: center;
      input[type=checkbox]:checked { background-color: $palette-dark-primary }
      input[type=checkbox]:checked.is-invalid { background-color: $palette-dark-error
      }
    }
  }

  .group.extended {
    .input {
      width: 50%;
      &:nth-child(1) { margin-right: $size-margin }
      &:nth-child(2) { margin-left: $size-margin }
    }
  }
</style>