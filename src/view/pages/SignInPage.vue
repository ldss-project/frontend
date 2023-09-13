<!--
  MIT License

  Copyright (c) 2023 Jahrim Gabriele Cesario

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
-->

<script setup lang="ts">
import {AuthenticationErrorType} from "@/logic/proxies/authentication/data/authentication-error";
import {FormCause, FormError, validateEmail, validatePassword, validateUsername} from "@/logic/extensions/form-extension";
import {injectStrict} from "@/logic/extensions/vue-extension";
import FormComponent from "@/view/components/FormComponent.vue";
import ErrorText from "@/view/components/ErrorText.vue";
import ButtonComponent from "@/view/components/ButtonComponent.vue";
import {InjectionKeys} from "@/injection-keys";
import {onMounted, ref} from "vue";
import router from "@/router";

const authenticationService = injectStrict(InjectionKeys.AuthenticationService)

const form = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: FormError.none,
})

onMounted(() =>
  authenticationService.value
    .sessionManager()
    .session()
    .ifPresent(() => router.push({ name: 'homepage' }))
)

function onSubmit(event: Event){
  event.preventDefault()
  if (validateForm()) {
    authenticationService.value
      .registerUser(form.value.username, form.value.email, form.value.password)
      .then(_ => _
        .ifSuccess(() => router.push({ name: "homepage" }))
        .ifFailure(error => {
          switch (error?.type) {
            case AuthenticationErrorType.UsernameAlreadyTakenException:
              form.value.error = new FormError(FormCause.Username, "Username already taken.")
              break;
            default:
              console.error(error)
          }
        })
      )
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