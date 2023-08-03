import {type Piece} from "@/logic/data/game/piece";
import {type Move} from "@/logic/data/game/move";

/** A chessboard in a {@link ChessGame} from the perspective of a {@link Player}. */
export interface Chessboard {
  /**
   * The {@link Piece}s of this {@link Chessboard}
   * belonging to this {@link Player}.
   */
  pieces: Piece[]
  /**
   * The {@link Move}s on this {@link Chessboard}
   * available to this {@link Player}.
   */
  moves: Move[]
}