<script setup lang="ts">
import {Piece, Pieces} from "@/logic/proxies/game/data/piece";
import {EnrichedPiece} from "@/logic/proxies/game/data/enriched/piece";
import {PromotionChoice} from "@/logic/proxies/game/data/promotion-choice";
import {PieceType} from "@/logic/proxies/game/data/piece-type";
import {Option} from "@/logic/extensions/option-extension";
import {injectStrict} from "@/logic/extensions/vue-extension";
import PopupComponent from "@/view/components/PopupComponent.vue";
import ChessboardCellComponent from "@/view/components/ChessboardCellComponent.vue";
import {InjectionKeys} from "@/injection-keys";
import {computed} from "vue";

const context = injectStrict(InjectionKeys.ChessGameServer)

defineEmits(['promotion-piece-chosen'])

const choiceBuilders = [Pieces.knight, Pieces.bishop, Pieces.rook, Pieces.queen]
const pieceChoices = computed(() =>
  Option.of(context.value.gameState.situation?.promotingPawnPosition)
        .map(promotingPawnPosition =>
          choiceBuilders.map(choiceBuilder =>
            new EnrichedPiece(
              choiceBuilder(context.value.thisPerspective.team()),
              promotingPawnPosition
            )
          )
        ).get()
)

function toPromotionChoice(piece: Piece): PromotionChoice {
  switch (piece.type){
    case PieceType.Knight: return PromotionChoice.Knight
    case PieceType.Bishop: return PromotionChoice.Bishop
    case PieceType.Rook: return PromotionChoice.Rook
    case PieceType.Queen: return PromotionChoice.Queen
    default: throw Error("No promotion choice corresponds to the specified piece")
  }
}
</script>

<template>
  <PopupComponent class="promotion-popup popup-no-footer" header="Promotion" draggable>
    <template #content>
      <div class="promotion-piece-dialog">
        <p>Choose the piece your pawn will be promoted to...</p>
        <div class="promotion-piece-choices">
          <ChessboardCellComponent
            class="promotion-piece-choice"
            v-for="(pieceChoice, index) in pieceChoices"
            :key="pieceChoice.type"
            :position="pieceChoice.position"
            :force-piece="pieceChoice"
            :tabindex="index+1"
            @keyup.enter="$emit('promotion-piece-chosen', toPromotionChoice(pieceChoice))"
            @click="$emit('promotion-piece-chosen', toPromotionChoice(pieceChoice))"
          />
        </div>
      </div>
    </template>
  </PopupComponent>
</template>

<style lang="scss" scoped>
  .promotion-popup {
    :deep(.p-dialog) { .chess-cell { @extend .clickable; } }

    .promotion-piece-dialog {
      @extend .flex-column, .flex-center-content;

      p {
        text-align: center;
        word-wrap: break-word;
      }

      .promotion-piece-choices {
        @extend .flex-row, .flex-center-content;

        .promotion-piece-choice {
          height: $size-chessboard-cell;
          width: $size-chessboard-cell;
          margin: 0 $size-margin;
          border: $border-palette-dark;
        }
      }
    }
  }

  @media screen and (max-width: 1200px) {
    .promotion-popup .promotion-piece-dialog .promotion-piece-choices .promotion-piece-choice {
      height: $size-chessboard-cell * 1.5;
      width: $size-chessboard-cell * 1.5;
    }
  }

  @media screen and (max-width: 768px) {
    .promotion-popup .promotion-piece-dialog .promotion-piece-choices .promotion-piece-choice {
      height: $size-chessboard-cell * 2;
      width: $size-chessboard-cell * 2;
    }
  }
</style>