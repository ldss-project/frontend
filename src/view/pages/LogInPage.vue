<script setup lang="ts">
import {FormCause, FormError, validatePassword, validateUsername} from "@/logic/extensions/form-extension";
import {injectStrict} from "@/logic/extensions/vue-extension";
import FormComponent from "@/view/components/FormComponent.vue";
import ErrorText from "@/view/components/ErrorText.vue";
import ButtonComponent from "@/view/components/ButtonComponent.vue";
import ButtonLinkComponent from "@/view/components/ButtonLinkComponent.vue";
import {ref} from "vue";
import {InjectionKeys} from "@/injection-keys";

const authenticationService = injectStrict(InjectionKeys.AuthenticationService)

const form = ref({
  username: "",
  password: "",
  error: FormError.none,
})

function onSubmit(event: Event){
  event.preventDefault()
  console.log(form.value)
  if (validateForm()) {
    console.log("VALIDATED")
    // TODO call login on authentication service
  }
}

function validateForm(): boolean {
  form.value.error =
    validateUsername(form.value.username) ??
    validatePassword(form.value.password, false)
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
        autocomplete="on"
        v-model="form.username"
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
        autocomplete="on"
        v-model="form.password"
      />
    </div>
    <ErrorText v-if="form.error" :text="form.error?.message" />
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
  .form {
    .input {
      width: 100%;
      margin-bottom: $size-margin * 2;
    }

    .form-actions {
      @extend .flex-row;
      width: 100%;
      justify-content: space-between;
      .button { width: 40%; }
    }
  }
</style>