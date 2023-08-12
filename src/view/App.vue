<script setup lang="ts">
import {AuthenticationProxy} from "@/logic/proxies/authentication/authentication-proxy";
import NavBarComponent from "@/view/components/NavBarComponent.vue";
import {runtimeEnvironment} from "@/runtime-environment";
import {RouterView} from 'vue-router'
import {provide, type Ref, ref} from "vue";
import {InjectionKeys} from "@/injection-keys";

const authenticationService = ref(new AuthenticationProxy(runtimeEnvironment.AUTHENTICATION_SERVICE))
provide(InjectionKeys.AuthenticationService, authenticationService as Ref<AuthenticationProxy>)

</script>

<template>
  <div class="application">
    <aside>
      <NavBarComponent />
    </aside>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
  body { overflow-x: hidden }
</style>

<style lang="scss" scoped>
  .application {
    @extend .flex-row;
    min-height: 100vh;
    width: 100vw;
  }
  aside {
    @extend .flex-column;
    height: 100%;
    position: fixed;
    z-index: 1000;
    width: $size-nav-bar;
    border: $border-palette-dark;
    background-color: $palette-dark-primary;
  }
  main {
    @extend .flex-column, .flex-center-content;
    width: 100%;
    position: relative;
    padding: $size-padding $size-padding $size-padding ($size-nav-bar + $size-padding);
    background-color: $palette-dark-secondary;
  }
</style>