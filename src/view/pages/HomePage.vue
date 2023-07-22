<script setup lang="ts">
import ButtonLinkComponent from "@/view/components/ButtonLinkComponent.vue";
</script>

<template>
  <ButtonLinkComponent :to="{ name: 'create-game' }">Create Game</ButtonLinkComponent>
  <ButtonLinkComponent :to="{ name: 'join-game' }">Join Game</ButtonLinkComponent>
</template>

<style lang="scss" scoped>
  .button {
    width: 30%;
    margin: 5px;
  }
</style>