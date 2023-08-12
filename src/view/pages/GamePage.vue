<script setup lang="ts">
import {chessGamePlaceholder} from "@/assets/placeholders";
import {type Position} from "@/logic/proxies/game/data/position";
import {ChessGameSituationType} from "@/logic/proxies/game/data/situation";
import {ChessGameServerState} from "@/logic/proxies/game/data/server";
import {EnrichedChessGame} from "@/logic/proxies/game/data/enriched/game";
import {EnrichedPiece} from "@/logic/proxies/game/data/enriched/piece";
import {Option} from "@/logic/extensions/option-extension";
import PlayerInfoComponent from "@/view/components/PlayerInfoComponent.vue";
import ChessboardComponent from "@/view/components/ChessboardComponent.vue";
import ErrorPopupComponent from "@/view/components/ErrorPopupComponent.vue";
import GameOverPopupComponent from "@/view/components/GameOverPopupComponent.vue";
import LobbyPopupComponent from "@/view/components/LobbyPopupComponent.vue";
import PromotionPopupComponent from "@/view/components/PromotionPopupComponent.vue";
import {InjectionKeys} from "@/injection-keys";
import {computed, onMounted, onUnmounted, provide, type Ref, ref} from "vue";

const chessGame = ref(EnrichedChessGame.none)
provide(InjectionKeys.GameContext, chessGame as Ref<EnrichedChessGame>)

onMounted(() => {
  /* TODO connect to game service websocket */
  chessGame.value = new EnrichedChessGame(
      chessGamePlaceholder(),
      "PlayerWhite" /* TODO get actual username */
  )
})
onUnmounted(() => { /* TODO disconnect from game service websocket */ })

const isWaitingForPlayers = computed(() =>
  chessGame.value?.server.state === ChessGameServerState.WaitingForPlayers
)
const isGameOver = computed(() => !!chessGame.value?.state.gameOver)
const hasError = computed(() => !!chessGame.value?.server.error)
const isPromotion = computed(() =>
  Option.of(chessGame.value?.state)
        .filter(_ => _.situation?.type === ChessGameSituationType.Promotion && _.isTurnOfThisPlayer())
        .present()
)

function onCellClicked(position: Position){
  console.log(position)

  Option.of(chessGame.value?.state.perspectiveOfThisPlayer()).ifPresent(_ => {
    _.selectedPosition = undefined
    if (_.pieceAt(position) !== undefined) {
      _.selectedPosition = position
      /* TODO call find moves on game service websocket */
    } else if (_.moveAt(position) !== undefined) {
      /* TODO call apply move on game service websocket */
    }
  })
}

function onPromotionPieceChosen(piece: EnrichedPiece){
  console.log(piece.type)
  /* TODO call promote on game service websocket */
}
</script>

<template>
  <ErrorPopupComponent v-if="hasError" />
  <GameOverPopupComponent v-else-if="isGameOver" />
  <LobbyPopupComponent v-else-if="isWaitingForPlayers" />
  <PromotionPopupComponent v-else-if="isPromotion" @promotion-piece-chosen="onPromotionPieceChosen"/>
  <PlayerInfoComponent
    class="player-info-black"
    :player-name="chessGame?.state.black.player.username"
  />
  <ChessboardComponent @cell-clicked="onCellClicked" />
  <PlayerInfoComponent
    class="player-info-white"
    :player-name="chessGame?.state.white.player.username"
  />
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
