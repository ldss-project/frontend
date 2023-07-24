<script setup lang="ts">
import FormComponent from "@/view/components/FormComponent.vue";
import InputComponent from "@/view/components/InputComponent.vue";
import ErrorText from "@/view/components/ErrorText.vue";
import ButtonComponent from "@/view/components/ButtonComponent.vue";
import ButtonLinkComponent from "@/view/components/ButtonLinkComponent.vue";
import {FormCauses, FormError, validatePassword, validateUsername} from "@/logic/form-extension";
import {ref} from "vue";

const username = ref<string>()
const password = ref<string>()
const error = ref<FormError>()

function onSubmit(event: Event){
  event.preventDefault()
  if (validateForm()) {
    console.log("VALIDATED")
    // TODO call login on authentication service
  }
}

function validateForm(): boolean {
  error.value =
    validateUsername(username.value) ??
    validatePassword(password.value, false)
  return error.value === undefined
}
</script>

<template>
  <FormComponent>
    <InputComponent
      name="username"
      type="text"
      v-model="username"
      :invalid="error?.hasCause(FormCauses.Username)"
      hidden-label
      autocomplete="on"
    />
    <InputComponent
      name="password"
      type="password"
      v-model="password"
      :invalid="error?.hasCause(FormCauses.Password)"
      hidden-label
      autocomplete="on"
    />
    <ErrorText
      v-if="error"
      :text="error?.message"
    />
    <div class="form-actions">
      <ButtonLinkComponent
        class="button-tertiary"
        :to="{ name: 'sign-in' }"
      >Sign In</ButtonLinkComponent>
      <ButtonComponent
        class="button-primary"
        type="submit"
        @click="onSubmit($event)"
      >Log In</ButtonComponent>
    </div>
  </FormComponent>
</template>

<style lang="scss" scoped>
  .form-actions {
    @extend .flex-row;
    justify-content: space-between;
    .button { width: 40%; }
  }
</style>