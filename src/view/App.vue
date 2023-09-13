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
import {AuthenticationProxy} from "@/logic/proxies/authentication/authentication-proxy";
import {StatisticsProxy} from "@/logic/proxies/statistics/statistics-proxy";
import {ChessGameProxy} from "@/logic/proxies/game/chess-game-proxy";
import NavBarComponent from "@/view/components/NavBarComponent.vue";
import {InjectionKeys} from "@/injection-keys";
import {runtimeEnvironment} from "@/runtime-environment";
import {RouterView} from 'vue-router'
import {provide, type Ref, ref} from "vue";

const authenticationService = ref(new AuthenticationProxy(runtimeEnvironment.AUTHENTICATION_SERVICE))
const statisticsService = ref(new StatisticsProxy(runtimeEnvironment.STATISTICS_SERVICE))
const chessGameService = ref(new ChessGameProxy(runtimeEnvironment.CHESS_GAME_SERVICE))

provide(InjectionKeys.AuthenticationService, authenticationService as Ref<AuthenticationProxy>)
provide(InjectionKeys.StatisticsService, statisticsService as Ref<StatisticsProxy>)
provide(InjectionKeys.ChessGameService, chessGameService as Ref<ChessGameProxy>)

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