import {PieceType} from "@/logic/proxies/game/data/piece-type";
import {Team} from "@/logic/proxies/game/data/team";

/**
 * A piece in a {@link Chessboard} of a {@link ChessGame}.
 */
export interface Piece {
  /** The {@link PieceType} of this {@link Piece}. */
  type: PieceType
  /** The {@link Team} who owns this {@link Piece}. */
  team: Team
}

/** Utilities for {@link Piece}. */
export namespace Pieces {
  /**
   * @param type the specified {@link PieceType}.
   * @param team the specified {@link Team}.
   * @return a new {@link Piece} of the specified
   *         {@link PieceType} and {@link Team}.
   */
  export function piece(type: PieceType, team: Team): Piece {
    return { type: type, team: team }
  }
  /** As {@link piece piece(PieceType.Pawn, team)}. */
  export function pawn(team: Team): Piece { return piece(PieceType.Pawn, team) }
  /** As {@link piece piece(PieceType.Knight, team)}. */
  export function knight(team: Team): Piece { return piece(PieceType.Knight, team) }
  /** As {@link piece piece(PieceType.Bishop, team)}. */
  export function bishop(team: Team): Piece { return piece(PieceType.Bishop, team) }
  /** As {@link piece piece(PieceType.Rook, team)}. */
  export function rook(team: Team): Piece { return piece(PieceType.Rook, team) }
  /** As {@link piece piece(PieceType.Queen, team)}. */
  export function queen(team: Team): Piece { return piece(PieceType.Queen, team) }
  /** As {@link piece piece(PieceType.King, team)}. */
  export function king(team: Team): Piece { return piece(PieceType.King, team) }
}

