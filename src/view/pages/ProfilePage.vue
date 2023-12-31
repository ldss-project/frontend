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
import {FormCause, FormError, validatePassword} from "@/logic/extensions/form-extension";
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
  updatingPassword: false,
  error: FormError.none
})

onMounted(() => {
  authenticationService.value
    .sessionManager()
    .session()
    .ifPresent(() => {
      authenticationService.value
        .getUserInformation(router.currentRoute.value.params.username as string)
        .then(_ => _
          .ifSuccess(user => {
            form.value.username = user.username
            form.value.email = user.email
          })
          .ifFailure(error => {
            switch (error.type) {
              case AuthenticationErrorType.TokenExpiredException:
              case AuthenticationErrorType.UserNotAuthorizedException:
                router.push({ name: 'homepage' })
                break;
              default:
                console.error(error)
            }
          })
        )
    })
    .ifEmpty(() => router.push({ name: 'homepage' }))
})

function onSubmit(event: Event){
  event.preventDefault()
  console.log(form.value)
  if (validateForm()) {
    authenticationService.value
      .updatePassword(form.value.password)
      .then(_ => _
        .ifSuccess(() => setIsUpdating(false))
        .ifFailure(error => {
          switch (error.type) {
            case AuthenticationErrorType.TokenExpiredException:
            case AuthenticationErrorType.UserNotAuthorizedException:
              router.push({ name: 'homepage' })
              break;
            default:
              console.error(error)
          }
        })
      )
  }
}

function validateForm(): boolean {
  form.value.error = validatePassword(form.value.password, true, form.value.confirmPassword)
  return form.value.error === FormError.none
}
function setIsUpdating(newValue: boolean) {
  form.value.updatingPassword = newValue
  resetForm()
}
function resetForm(){
  form.value.password = ""
  form.value.confirmPassword = ""
  form.value.error = undefined
}
</script>

<template>
  <FormComponent>
    <div class="input">
      <label
        class="col-form-label"
        for="username"
        aria-label="Username"
      >Username</label>
      <input
        class="form-control"
        id="username"
        type="text"
        v-model="form.username"
        autocomplete="off"
        disabled
      />
    </div>
    <div class="input">
      <label
        class="col-form-label"
        for="email"
        aria-label="Email"
      >Email</label>
      <input
        class="form-control"
        id="email"
        type="email"
        v-model="form.email"
        autocomplete="off"
        disabled
      />
    </div>
    <div class="input">
      <label
        class="col-form-label"
        for="hidden-password"
        aria-label="Password"
      >Password</label>
      <div class="input-group">
        <input
          class="form-control"
          id="hidden-password"
          type="password"
          value="********"
          autocomplete="off"
          disabled
        />
        <button
          type="button"
          class="input-group-text"
          @click="setIsUpdating(!form.updatingPassword)"
        ><span class="bi bi-pencil-square" /></button>
      </div>
    </div>
    <div class="input" v-if="form.updatingPassword">
      <label
        class="col-form-label"
        for="password"
        aria-label="New Password"
      >New Password</label>
      <input
        class="form-control"
        :class="{ 'is-invalid': form.error?.hasCause(FormCause.Password) }"
        id="password"
        type="password"
        autocomplete="off"
        v-model="form.password"
      />
    </div>
    <div class="input" v-if="form.updatingPassword">
      <label
        class="col-form-label"
        for="confirmPassword"
        aria-label="Confirm New Password"
      >Confirm New Password</label>
      <input
        class="form-control"
        :class="{ 'is-invalid': form.error?.hasCause(FormCause.Password) }"
        id="confirmPassword"
        type="password"
        autocomplete="off"
        v-model="form.confirmPassword"
      />
    </div>
    <ErrorText v-if="form.error" :text="form.error?.message" />
    <ButtonComponent
      v-if="form.updatingPassword"
      class="button-primary"
      type="submit"
      @click="onSubmit($event)"
    >Update</ButtonComponent>
  </FormComponent>
</template>

<style lang="scss" scoped>
  .form {
    min-width: 50%;

    .input {
      @extend .flex-row;
      width: 100%;
      margin-bottom: $size-margin * 2;
      label { width: 25% }
      input, .input-group { width: 75% }
      #hidden-password + button {
        background-color: $palette-dark-primary;
        color: $palette-dark-text-primary;
      }
    }
  }
</style>