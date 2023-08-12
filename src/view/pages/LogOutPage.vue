<script setup lang="ts">
import {injectStrict} from "@/logic/extensions/vue-extension";
import {InjectionKeys} from "@/injection-keys";
import {onMounted} from "vue";
import router from "@/router";

const authenticationService = injectStrict(InjectionKeys.AuthenticationService)

onMounted(() =>
  authenticationService.value.sessionManager().session()
    .ifPresent(() =>
      authenticationService.value.logoutUser().finally(() => router.push({ name: 'homepage' }))
    )
    .ifEmpty(() =>
      router.push({ name: 'homepage' })
    )
)
</script>

<template></template>

<style lang="scss" scoped></style>