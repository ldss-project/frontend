<script setup lang="ts">
import ButtonComponent from "@/view/components/ButtonComponent.vue";
import ErrorText from "@/view/components/ErrorText.vue";
import {ref} from "vue";
import {FormCauses, FormError, validateGameId} from "@/logic/extensions/form-extension";

const form = ref({
  gameId: "",
  error: FormError.none,
})

function joinPublicGame(event: Event) {
  event.preventDefault()
  // TODO join public game
}

function joinPrivateGame(event: Event) {
  event.preventDefault()
  console.log(form.value)
  if (validateForm()){
    // TODO join private game
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
        :class="{ 'is-invalid': form.error?.hasCause(FormCauses.GameId) }"
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