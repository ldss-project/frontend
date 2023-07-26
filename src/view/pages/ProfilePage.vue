<script setup lang="ts">
import FormComponent from "@/view/components/FormComponent.vue";
import ErrorText from "@/view/components/ErrorText.vue";
import ButtonComponent from "@/view/components/ButtonComponent.vue";
import {FormCauses, FormError, validatePassword} from "@/logic/extensions/form-extension";
import {onMounted, ref} from "vue";
import router from "@/router";

const form = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  updatingPassword: false,
  error: FormError.none
})

onMounted(() => {
  /* TODO retrieve and set actual user information */
  let currentUser: string = router.currentRoute.value.params.username as string
  form.value.username = currentUser
  form.value.email = "user@placeholder.com "
})

function onSubmit(event: Event){
  event.preventDefault()
  console.log(form.value)
  if (validateForm()) {
    console.log("VALIDATED")
    // TODO call update password on authentication service
    setIsUpdating(false)
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
        :class="{ 'is-invalid': form.error?.hasCause(FormCauses.Password) }"
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
        :class="{ 'is-invalid': form.error?.hasCause(FormCauses.Password) }"
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