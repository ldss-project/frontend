import {type Position} from "@/logic/data/game/position";

/** A piece in a {@link Chessboard} of a {@link ChessGame}. */
export interface Piece {
  /** The {@link PieceType} of this {@link Piece}. */
  type: PieceType
  /** The {@link Position} of this {@link Piece} in the {@link Chessboard}. */
  position: Position
}

/** Utilities for {@link Piece}. */
export namespace Pieces {
  /**
   * @param type the specified {@link PieceType}.
   * @param position the specified {@link Position}.
   * @return a new {@link Piece} of the specified {@link PieceType} at
   *         the specified {@link Position} in the {@link Chessboard}.
   */
  export function of(type: PieceType, position: Position): Piece {
    return { type: type, position: position}
  }
  /** As {@link of of(PieceType.Pawn, position)}. */
  export function pawn(position: Position): Piece { return of(PieceType.Pawn, position) }
  /** As {@link of of(PieceType.Knight, position)}. */
  export function knight(position: Position): Piece { return of(PieceType.Knight, position) }
  /** As {@link of of(PieceType.Bishop, position)}. */
  export function bishop(position: Position): Piece { return of(PieceType.Bishop, position) }
  /** As {@link of of(PieceType.Rook, position)}. */
  export function rook(position: Position): Piece { return of(PieceType.Rook, position) }
  /** As {@link of of(PieceType.Queen, position)}. */
  export function queen(position: Position): Piece { return of(PieceType.Queen, position) }
  /** As {@link of of(PieceType.King, position)}. */
  export function king(position: Position): Piece { return of(PieceType.King, position) }
}

/** A type for a {@link Piece} in a {@link ChessGame}. */
export enum PieceType {
  /** A pawn in a {@link ChessGame}. */
  Pawn = "Pawn",
  /** A knight in a {@link ChessGame}. */
  Knight = "Knight",
  /** A bishop in a {@link ChessGame}. */
  Bishop = "Bishop",
  /** A rook in a {@link ChessGame}. */
  Rook = "Rook",
  /** A queen in a {@link ChessGame}. */
  Queen = "Queen",
  /** A king in a {@link ChessGame}. */
  King = "King",
}