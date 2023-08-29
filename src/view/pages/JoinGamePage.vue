<script setup lang="ts">
import {FormCause, FormError, validateGameId} from "@/logic/extensions/form-extension";
import ButtonComponent from "@/view/components/ButtonComponent.vue";
import ErrorText from "@/view/components/ErrorText.vue";
import {ChessGameErrorType} from "@/logic/proxies/game/data/chess-game-error";
import {Team} from "@/logic/proxies/game/data/team";
import {injectStrict} from "@/logic/extensions/vue-extension";
import {InjectionKeys} from "@/injection-keys";
import {ref} from "vue";
import router from "@/router";

const authenticationService = injectStrict(InjectionKeys.AuthenticationService)
const chessGameService = injectStrict(InjectionKeys.ChessGameService)

const form = ref({
  gameId: "",
  error: FormError.none,
})

function joinPublicGame(event: Event) {
  event.preventDefault()
  chessGameService.value
    ?.connectToPublicGame()
    .then(_ => _
      .ifSuccess(async playerConnection => {
        await playerConnection.opened()
        playerConnection.joinGame({
          team: Team.Black,
          name: authenticationService.value.sessionManager().sessionUsername().get()
        })
        await router.push({name: "game"})
      })
      .ifFailure(error => {
        switch (error.type) {
          case ChessGameErrorType.NoAvailableGamesException:
            form.value.error = new FormError("", "No available public games.")
            break;
          default:
            console.error(error)
        }
      })
    )
}

function joinPrivateGame(event: Event) {
  event.preventDefault()
  console.log(form.value)
  if (validateForm()){
    chessGameService.value
      ?.connectToPrivateGame(form.value.gameId)
      .then(_ => _
        .ifSuccess(async playerConnection => {
          await playerConnection.opened()
          playerConnection.joinGame({
            team: Team.Black,
            name: authenticationService.value.sessionManager().sessionUsername().get()
          })
          await router.push({name: "game"})
        })
        .ifFailure(error => {
          switch (error.type) {
            case ChessGameErrorType.GameAlreadyStartedException:
              form.value.error = new FormError(
                FormCause.GameId,
                `Game ${form.value.gameId} has already started.`
              )
              break;
            case ChessGameErrorType.GameNotFoundException:
              form.value.error = new FormError(
                FormCause.GameId,
                `Game ${form.value.gameId} does not exist.`
              )
              break;
            default:
              console.error(error)
          }
        })
      )
  }
}

function validateForm(){
  form.value.error = validateGameId(form.value.gameId)
  return form.value.error === FormError.none
}
</script>

<template>
  <ButtonComponent
    class="button-primary"
    type="button"
    @click="joinPublicGame($event)"
  >Join Public Game</ButtonComponent>
  <form>
    <ButtonComponent
      class="button-primary"
      type="submit"
      @click="joinPrivateGame($event)"
    >Join Private Game</ButtonComponent>
    <div class="input">
      <label
        class="form-label visually-hidden"
        for="gameId"
        aria-label="Private Game Identifier"
      >Private Game Identifier</label>
      <input
        class="form-control"
        :class="{ 'is-invalid': form.error?.hasCause(FormCause.GameId) }"
        id="gameId"
        type="text"
        placeholder="Game Id"
        autocomplete="off"
        v-model="form.gameId"
      />
    </div>
  </form>
  <ErrorText v-if="form.error" :text="form.error?.message" />
</template>

<style lang="scss" scoped>
  .button, form, .error-text {
    width: 30%;
    margin: $size-margin 0;
  }

  form {
    @extend .flex-row, .flex-center-content;
    height: $size-button;

    .button, .input {
      width: 50%;
      margin: 0;
    }
    .button {
      border-radius: $size-button-border-radius 0 0 $size-button-border-radius;
    }
    .input input{
      height: $size-button;
      border-radius: 0 $size-button-border-radius $size-button-border-radius 0;
    }
  }

  .error-text {
    height: fit-content;
    padding: $size-padding;
    border: $border-palette-dark;
    background-color: $palette-dark-tertiary;
  }

  @media screen and (max-width: 992px) {
    .button, form, .error-text { width: 60%; }
  }
</style>