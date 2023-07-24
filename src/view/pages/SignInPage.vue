<script setup lang="ts">
import FormComponent from "@/view/components/FormComponent.vue";
import InputComponent from "@/view/components/InputComponent.vue";
import ErrorText from "@/view/components/ErrorText.vue";
import ButtonComponent from "@/view/components/ButtonComponent.vue";
import {ref} from "vue";
import {FormCauses, FormError, validateEmail, validatePassword, validateUsername} from "@/logic/form-extension";

const username = ref<string>()
const email = ref<string>()
const password = ref<string>()
const confirmPassword = ref<string>()
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
    validateEmail(email.value) ??
    validatePassword(password.value, true, confirmPassword.value)
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
      name="email"
      type="email"
      v-model="email"
      :invalid="error?.hasCause(FormCauses.Email)"
      hidden-label
      autocomplete="on"
    />
    <InputComponent
      name="password"
      type="password"
      v-model="password"
      :invalid="error?.hasCause(FormCauses.Password)"
      hidden-label
    />
    <InputComponent
      name="confirm password"
      type="password"
      v-model="confirmPassword"
      :invalid="error?.hasCause(FormCauses.Password)"
      hidden-label
    />
    <ErrorText
      v-if="error"
      :text="error?.message"
    />
    <div>
      <ButtonComponent
        class="button-primary"
        type="submit"
        @click="onSubmit($event)"
      >Sign In</ButtonComponent>
    </div>
  </FormComponent>
</template>

<style lang="scss" scoped></style>