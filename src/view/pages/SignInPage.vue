<script setup lang="ts">
import {FormCause, FormError, validateEmail, validatePassword, validateUsername} from "@/logic/extensions/form-extension";
import {injectStrict} from "@/logic/extensions/vue-extension";
import FormComponent from "@/view/components/FormComponent.vue";
import ErrorText from "@/view/components/ErrorText.vue";
import ButtonComponent from "@/view/components/ButtonComponent.vue";
import {InjectionKeys} from "@/injection-keys";

const authenticationService = injectStrict(InjectionKeys.AuthenticationService)

const form = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: FormError.none,
})

function onSubmit(event: Event){
  event.preventDefault()
  console.log(form.value)
  if (validateForm()) {
    console.log("VALIDATED")
    // TODO call sign in on authentication service
  }
}

function validateForm(): boolean {
  form.value.error =
    validateUsername(form.value.username) ??
    validateEmail(form.value.email) ??
    validatePassword(form.value.password, true, form.value.confirmPassword)
  return form.value.error === FormError.none
}
</script>

<template>
  <FormComponent>
    <div class="input">
      <label
        class="form-label visually-hidden"
        for="username"
        aria-label="Username"
      >Username</label>
      <input
        class="form-control"
        :class="{ 'is-invalid': form.error?.hasCause(FormCause.Username) }"
        id="username"
        type="text"
        placeholder="Username"
        autocomplete="off"
        v-model="form.username"
      />
    </div>
    <div class="input">
      <label
        class="form-label visually-hidden"
        for="email"
        aria-label="Email"
      >Email</label>
      <input
        class="form-control"
        :class="{ 'is-invalid': form.error?.hasCause(FormCause.Email) }"
        id="email"
        type="email"
        placeholder="Email"
        autocomplete="off"
        v-model="form.email"
      />
    </div>
    <div class="input">
      <label
        class="form-label visually-hidden"
        for="password"
        aria-label="Password"
      >Password</label>
      <input
        class="form-control"
        :class="{ 'is-invalid': form.error?.hasCause(FormCause.Password) }"
        id="password"
        type="password"
        placeholder="Password"
        autocomplete="off"
        v-model="form.password"
      />
    </div>
    <div class="input">
      <label
        class="form-label visually-hidden"
        for="confirmPassword"
        aria-label="Confirm Password"
      >Confirm Password</label>
      <input
        class="form-control"
        :class="{ 'is-invalid': form.error?.hasCause(FormCause.Password) }"
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        autocomplete="off"
        v-model="form.confirmPassword"
      />
    </div>
    <ErrorText v-if="form.error" :text="form.error?.message" />
    <ButtonComponent
      class="button-primary"
      type="submit"
      @click="onSubmit($event)"
    >Sign In</ButtonComponent>
  </FormComponent>
</template>

<style lang="scss" scoped>
  .form {
    .input {
      width: 100%;
      margin-bottom: $size-margin * 2;
    }
  }
</style>