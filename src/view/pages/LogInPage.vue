<script setup lang="ts">
import FormComponent from "@/view/components/FormComponent.vue";
import InputComponent from "@/view/components/InputComponent.vue";
import ErrorText from "@/view/components/ErrorText.vue";
import ButtonComponent from "@/view/components/ButtonComponent.vue";
import ButtonLinkComponent from "@/view/components/ButtonLinkComponent.vue";
import {ref} from "vue";

const error = ref<{
  input: "username" | "password",
  message: string,
}>()
</script>

<template>
  <FormComponent>
    <InputComponent
      name="username"
      type="text"
      :valid="error?.input !== 'username'"
      hidden-label
      autocomplete="on"
      required
    />
    <InputComponent
      name="password"
      type="password"
      :valid="error?.input !== 'password'"
      hidden-label
      autocomplete="on"
      required
    />
    <ErrorText
      v-if="error"
      :text="error.message"
    />
    <div class="form-actions">
      <ButtonLinkComponent
        class="button-tertiary"
        :to="{ name: 'sign-in' }"
      >Sign In</ButtonLinkComponent>
      <ButtonComponent
        class="button-primary"
        type="submit"
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