import {type Position} from "@/logic/data/game/position";

/** A situation in a {@link ChessGame}. */
export interface ChessGameSituation {
  /** The type of this {@link ChessGameSituation}. */
  type: ChessGameSituationType
  /**
   * In case this is a {@link ChessGameSituationType.Promotion Promotion},
   * the {@link Position} of the pawn to promote.
   */
  promotingPawnPosition?: Position
}

/** A type of {@link ChessGameSituation}. */
export enum ChessGameSituationType {
  /**
   * The {@link ChessGameSituation} where the king of the {@link Player}
   * of the current turn is threatened by a {@link Piece} of the opponent.
   */
  Check = "Check",
  /**
   * The {@link ChessGameSituation} where the {@link Player} of the
   * current turn has no available {@link Move}s.
   */
  Stale = "Stale",
  /**
   * The {@link ChessGameSituation} where both {@link ChessGameSituationType.Check Check}
   * and {@link ChessGameSituationType.Stale Stale} hold.
   */
  Checkmate = "Checkmate",
  /**
   * The {@link ChessGameSituation} where the {@link Player}
   * of the current turn is promoting a pawn.
   */
  Promotion = "Promotion",
}