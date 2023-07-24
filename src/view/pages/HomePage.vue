<script setup lang="ts">
import ButtonLinkComponent from "@/view/components/ButtonLinkComponent.vue";
</script>

<template>
  <ButtonLinkComponent class="button-primary" :to="{ name: 'create-game' }">Create Game</ButtonLinkComponent>
  <ButtonLinkComponent class="button-primary" :to="{ name: 'join-game' }">Join Game</ButtonLinkComponent>
</template>

<style lang="scss" scoped>
  .button {
    width: 30%;
    margin: $size-margin 0;
  }

  @media screen and (max-width: 992px) {
    .button { width: 60%; }
  }
</style>