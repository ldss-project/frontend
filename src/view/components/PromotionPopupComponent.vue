<script setup lang="ts">
import {Pieces} from "@/logic/data/game/piece";
import {Option} from "@/logic/extensions/option-extension";
import {EnrichedPiece} from "@/logic/data/game/enriched/piece";
import {EnrichedChessGame} from "@/logic/data/game/enriched/game";
import PopupComponent from "@/view/components/PopupComponent.vue";
import ChessboardCellComponent from "@/view/components/ChessboardCellComponent.vue";
import {type Ref, computed, inject} from "vue";

const context: Ref<EnrichedChessGame> = inject<EnrichedChessGame>('game-context')

defineEmits(['promotion-piece-chosen'])

const choiceBuilders = [Pieces.knight, Pieces.bishop, Pieces.rook, Pieces.queen]
const pieceChoices = computed(() =>
  Option.of(context.value.state.situation?.promotingPawnPosition)
        .flatMap(promotingPawnPosition =>
          Option.of(context.value.state.perspectiveOfThisPlayer()?.team)
                .map(thisPlayerTeam =>
                  choiceBuilders.map(choiceBuilder => {
                    let pieceChoice = choiceBuilder(promotingPawnPosition) as any
                    pieceChoice.team = thisPlayerTeam
                    return pieceChoice as EnrichedPiece
                  })
                )
        ).get()
)
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
            @keyup.enter="$emit('promotion-piece-chosen', pieceChoice)"
            @click="$emit('promotion-piece-chosen', pieceChoice)"
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