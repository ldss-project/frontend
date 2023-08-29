import {type Piece} from "@/logic/proxies/game/data/piece";
import {type Position} from "@/logic/proxies/game/data/position";

/**
 * A chessboard in a {@link ChessGame}.
 */
export interface Chessboard {
  /** The {@link Piece}s on this {@link Chessboard}. */
  pieces: {
    /** The {@link Piece} on this {@link Position}. */
    piece: Piece
    /** The {@link Position} of this {@link Piece}. */
    position: Position
  }[]
}