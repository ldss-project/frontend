<script setup lang="ts">
import {injectStrict} from "@/logic/extensions/vue-extension";
import {InjectionKeys} from "@/injection-keys";
import {onMounted} from "vue";
import router from "@/router";

onMounted(() => {
  // TODO call log out on authentication service
  router.push({ name: 'homepage'})
})
</script>

<template></template>

<style lang="scss" scoped></style>