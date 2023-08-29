<script setup lang="ts">
import {ChessGameErrorType} from "@/logic/proxies/game/data/chess-game-error";
import {Durations} from "@/logic/proxies/game/data/duration";
import {Team} from "@/logic/proxies/game/data/team";
import {TimeConstraintType} from "@/logic/proxies/game/data/time-constraint-type";
import {TimeUnit} from "@/logic/proxies/game/data/time-unit";
import {FormCause, FormError, validateGameDuration, validateGameId} from "@/logic/extensions/form-extension";
import {injectStrict} from "@/logic/extensions/vue-extension";
import FormComponent from "@/view/components/FormComponent.vue";
import ErrorText from "@/view/components/ErrorText.vue";
import ButtonComponent from "@/view/components/ButtonComponent.vue";
import {InjectionKeys} from "@/injection-keys";
import {ref} from "vue";
import router from "@/router";

const authenticationService = injectStrict(InjectionKeys.AuthenticationService)
const chessGameService = injectStrict(InjectionKeys.ChessGameService)

const form = ref({
  timeConstraintType: TimeConstraintType.NoLimit,
  timeMinutes: 5,
  isPrivate: false,
  gameId: "",
  error: FormError.none,
})

const timeConstraintOptions = [
  { value: TimeConstraintType.NoLimit, name: "No Limit" },
  { value: TimeConstraintType.MoveLimit, name: "Move Limit" },
  { value: TimeConstraintType.PlayerLimit, name: "Player Limit" },
]

function onSubmit(event: Event){
  event.preventDefault()
  console.log(form.value)
  if (validateForm()) {
    chessGameService.value
      ?.createGame({
        timeConstraint: {
          type: form.value.timeConstraintType,
          time: Durations.asBson(Durations.of(form.value.timeMinutes, TimeUnit.MINUTES))
        },
        isPrivate: form.value.isPrivate,
        gameId: form.value.gameId === "" ? undefined : form.value.gameId
      })
      .then(_ => _
        .ifSuccess(async playerConnection => {
          await playerConnection.opened()
          playerConnection.joinGame({
            team: Team.White,
            name: authenticationService.value.sessionManager().sessionUsername().get()
          })
          await router.push({name: "game"})
        })
        .ifFailure(error => {
          switch (error.type) {
            case ChessGameErrorType.GameIdAlreadyTakenException:
              form.value.error = new FormError(FormCause.GameId, "Game id already taken.")
              break;
            default:
              console.error(error)
          }
        })
      )
  }
}

function validateForm(){
  form.value.error =
    validateGameDuration(form.value.timeMinutes) ??
    validateGameId(form.value.gameId, form.value.isPrivate)?.withMessage("Game identifier required for a private game.")
  return form.value.error === FormError.none
}
function hasTimeConstraint(): boolean { return form.value.timeConstraintType !== TimeConstraintType.NoLimit }
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
          v-model="form.timeConstraintType"
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
      input[type=checkbox]:checked.is-invalid { background-color: $palette-dark-error }
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