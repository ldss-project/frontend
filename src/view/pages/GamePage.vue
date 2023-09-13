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
import {GameSituationType} from "@/logic/proxies/game/data/game-situation-type";
import {ServerSituation} from "@/logic/proxies/game/data/server-situation";
import {type Position} from "@/logic/proxies/game/data/position";
import {PromotionChoice} from "@/logic/proxies/game/data/promotion-choice";
import {RelativeChessGameServer} from "@/logic/proxies/game/data/enriched/relative-chess-game-server";
import {Team, Teams} from "@/logic/proxies/game/data/team";
import {Option} from "@/logic/extensions/option-extension";
import {injectStrict} from "@/logic/extensions/vue-extension";
import PlayerInfoComponent from "@/view/components/PlayerInfoComponent.vue";
import ChessboardComponent from "@/view/components/ChessboardComponent.vue";
import ErrorPopupComponent from "@/view/components/ErrorPopupComponent.vue";
import GameOverPopupComponent from "@/view/components/GameOverPopupComponent.vue";
import LobbyPopupComponent from "@/view/components/LobbyPopupComponent.vue";
import PromotionPopupComponent from "@/view/components/PromotionPopupComponent.vue";
import {InjectionKeys} from "@/injection-keys";
import {computed, onMounted, onUnmounted, provide, type Ref, ref} from "vue";

import router from "@/router";

const chessGameService = injectStrict(InjectionKeys.ChessGameService)
const chessGameServer = ref(RelativeChessGameServer.none)
provide(InjectionKeys.ChessGameServer, chessGameServer as Ref<RelativeChessGameServer>)

onMounted(() => {
  chessGameService.value
    .playerConnection()
    .ifPresent(async playerConnection => {
      await playerConnection.opened()
      playerConnection
        .onMessage(message => {
          console.log(message.data)
          const data = JSON.parse(message.data)
          Option.of(data.methodCall).ifPresent(methodCall => {
            switch (methodCall.method) {
              case "GetState":
                chessGameServer.value = new RelativeChessGameServer(
                    chessGameService.value
                      .playerConnection()
                      .flatMap(_ => _.player())
                      .map(_ => _.team)
                      .getOrElse(Team.White),
                    methodCall.output.serverState
                )
                break;
              case "FindMoves":
                Option.of(chessGameServer.value).ifPresent(_ =>
                    _.thisPerspective.availableMoves = methodCall.output.moves
                )
                break;
              case "JoinGame":
              case "ApplyMove":
              case "Promote":
            }
        })
        Option.of(data.event).ifPresent(event =>
          Option.of(chessGameServer.value).ifPresent(serverState => {
            switch (event.type) {
              case "ChessboardUpdateEvent":
                serverState.gameState.chessboard = event.payload
                break;
              case "GameOverUpdateEvent":
                serverState.gameState.gameOver = event.payload
                break;
              case "GameSituationUpdateEvent":
                serverState.gameState.situation = event.payload
                break;
              case "MoveHistoryUpdateEvent":
                serverState.gameState.moveHistory = event.payload
                break;
              case "WhitePlayerUpdateEvent":
                serverState.gameState.configuration.whitePlayer = event.payload
                break;
              case "BlackPlayerUpdateEvent":
                serverState.gameState.configuration.blackPlayer = event.payload
                break;
              case "WhiteTimerUpdateEvent":
                serverState.gameState.timers.white = event.payload
                break;
              case "BlackTimerUpdateEvent":
                serverState.gameState.timers.black = event.payload
                break;
              case "TurnUpdateEvent":
                serverState.gameState.currentTurn = event.payload
                break;
              case "ServerErrorUpdateEvent":
                serverState.error = event.payload
                break;
              case "ServerSituationUpdateEvent":
                serverState.situation = event.payload
                if (serverState.situation === ServerSituation.Terminated && !serverState.gameState.gameOver){
                  serverState.error = {
                    type: "ServerTerminatedException",
                    message: "The server terminated abruptly.",
                  }
                }
                break;
              case "SubscriptionUpdateEvent":
                serverState.subscriptions = event.payload
                break;
            }
          })
        )
      })
      .getState()
    })
    .ifEmpty(() => router.push({ name: "homepage" }))
})

onUnmounted(() => {
  chessGameService.value
    .playerConnection()
    .ifPresent(_ => _.close())
})

const isWaitingForPlayers = computed(() =>
    chessGameServer.value?.situation === ServerSituation.WaitingForPlayers
)
const isGameOver = computed(() => !!chessGameServer.value?.gameState.gameOver)
const hasError = computed(() => !!chessGameServer.value?.error)
const isPromotion = computed(() =>
  Option.of(chessGameServer.value)
        .filter(_ => _.thisPerspective.isTurnOwner() && _.gameState.situation?.type === GameSituationType.Promotion)
        .present()
)
const thisPlayerTeam = computed(() => chessGameServer.value?.thisPerspective.team() ?? Team.White)

function onCellClicked(position: Position){
  chessGameService.value.playerConnection().ifPresent(playerConnection =>
    Option.of(chessGameServer.value?.thisPerspective).ifPresent(playerPerspective => {
      playerPerspective.selectedPosition = undefined
      let selectedMove = playerPerspective.moveAt(position)
      if (chessGameServer.value?.pieceAt(position, playerPerspective.team()) !== undefined) {
        playerPerspective.selectedPosition = position
        playerConnection.findMoves(playerPerspective.selectedPosition)
      } else if (selectedMove !== undefined) {
        playerConnection.applyMove(selectedMove)
        playerPerspective.availableMoves = []
      }
    })
  )
}

function onPromotionPieceChosen(promotionChoice: PromotionChoice){
  chessGameService.value.playerConnection().ifPresent(playerConnection => {
    playerConnection.promote(promotionChoice)
  })
}
</script>

<template>
  <ErrorPopupComponent v-if="hasError" />
  <GameOverPopupComponent v-else-if="isGameOver" />
  <LobbyPopupComponent v-else-if="isWaitingForPlayers" />
  <PromotionPopupComponent v-else-if="isPromotion" @promotion-piece-chosen="onPromotionPieceChosen"/>
  <PlayerInfoComponent :team="Teams.opponent(thisPlayerTeam)" />
  <ChessboardComponent @cell-clicked="onCellClicked" />
  <PlayerInfoComponent :team="thisPlayerTeam" />
</template>

<style lang="scss" scoped>
  .player-info, .chessboard { width: $size-chessboard; }
  .player-info { height: 10%; }
  .chessboard { height: $size-chessboard; }

  @media screen and (max-width: 1200px) {
    .player-info, .chessboard { width: $size-chessboard * 1.5; }
    .chessboard { height: $size-chessboard * 1.5; }
  }

  @media screen and (max-width: 768px) {
    .player-info, .chessboard { width: $size-chessboard * 2; }
    .chessboard { height: $size-chessboard * 2; }
  }
</style>
