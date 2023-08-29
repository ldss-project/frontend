import {type Piece} from "@/logic/proxies/game/data/piece";
import {type Move} from "@/logic/proxies/game/data/move";

/** A history of the {@link Move}s made during a {@link ChessGame}. */
export interface MoveHistory {
  /** The entries registered in this {@link MoveHistory}. */
  entries: {
    /** The {@link Piece} involved in this {@link Move}. */
    piece: Piece
    /** The {@link Move} applied to this {@link Piece}. */
    move: Move
  }[]
}