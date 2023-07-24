<script setup lang="ts">
import ButtonComponent from "@/view/components/ButtonComponent.vue";
import InputComponent from "@/view/components/InputComponent.vue";
import ErrorText from "@/view/components/ErrorText.vue";
import {ref} from "vue";
import {FormCauses, FormError, validateGameId} from "@/logic/form-extension";

const gameId = ref<string>()
const error = ref<FormError>()

function joinPublicGame(event: Event) {
  event.preventDefault()
  // TODO join game private
}

function joinPrivateGame(event: Event) {
  event.preventDefault()
  if (validateForm()){
    // TODO join game private
  }
}

function validateForm(){
  error.value = validateGameId(gameId.value)
  return error.value === undefined
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
    <InputComponent
      name="gameId"
      v-model="gameId"
      type="text"
      placeholder="Game Id"
      :invalid="error?.hasCause(FormCauses.GameId)"
      hidden-label
    />
  </form>
  <ErrorText
    v-if="error"
    :text="error?.message"
  />
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
    .input:deep(input){
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