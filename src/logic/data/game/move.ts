import {type Position} from "@/logic/data/game/position";
import {type Piece} from "@/logic/data/game/piece";

/** A move in a {@link ChessGame}. */
export interface Move {
  /** The {@link MoveType} of this {@link Move}. */
  type: MoveType
  /** The starting {@link Position}. */
  from: Position
  /** The arriving {@link Position}. */
  to: Position
  /** If present, this {@link Move} is a castling. */
  castling?: {
    /** The rook involved in the castling. */
    rook: {
      /** The starting {@link Position} of the rook. */
      from: Position,
      /** The arriving {@link Position} of the rook. */
      to: Position,
    },
  }
  /** If present, this {@link Move} is an en-passant. */
  enPassant?: {
    /** The opponent pawn involved in the en-passant. */
    opponentPawn: Piece
  }
}

/** Utilities for {@link Move}. */
export namespace Moves {
  /**
   * @param from the specified starting {@link Position}.
   * @param to the specified arriving {@link Position}.
   * @return a new {@link Move} from the specified starting {@link Position}
   *         to the specified arriving {@link Position}.
   */
  export function move(from: Position, to: Position): Move {
    return { type: MoveType.Move, from: from, to: to }
  }
  /**
   * @param from the specified starting {@link Position}.
   * @param to the specified arriving {@link Position}.
   * @return a new capture {@link Move} from the specified starting {@link Position}
   *         to the specified arriving {@link Position}.
   */
  export function capture(from: Position, to: Position): Move {
    return { type: MoveType.Capture, from: from, to: to }
  }
  /**
   * @param from the starting {@link Position} of the king.
   * @param to the arriving {@link Position} of the king.
   * @param rookFrom the starting {@link Position} of the rook.
   * @param rookTo the arriving {@link Position} of the rook.
   * @return a new castling {@link Move} from the specified starting {@link Position}s
   *         to the specified arriving {@link Position}s.
   */
  export function castling(from: Position, to: Position, rookFrom: Position, rookTo: Position): Move {
    return { type: MoveType.Move, from: from, to: to, castling: { rook: { from: rookFrom, to: rookTo } } }
  }
  /**
   * @param from the specified starting {@link Position}.
   * @param to the specified arriving {@link Position}.
   * @param opponentPawn the specified opponent pawn.
   * @return an en-passant {@link Move} from the specified starting {@link Position}
   *         to the specified arriving {@link Position}, capturing the specified
   *         opponent pawn.
   */
  export function enPassant(from: Position, to: Position, opponentPawn: Piece): Move {
    return { type: MoveType.Capture, from: from, to: to, enPassant: { opponentPawn: opponentPawn } }
  }
}

/** A type of {@link Move} in a {@link ChessGame}. */
export enum MoveType {
  /** A {@link Move} where a {@link Piece} changes {@link Position}. */
  Move = "Move",
  /**
   * A {@link Move} where a {@link Piece} captures another {@link Piece}
   * belonging to the opponent.
   */
  Capture = "Capture",
}