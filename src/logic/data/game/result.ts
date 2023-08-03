import {Team} from "@/logic/data/game/team";

/** The result of a {@link ChessGame}. */
export interface ChessGameResult {
  /** The event that caused this {@link ChessGame} to end. */
  cause: GameOverCause
  /** The winner of this {@link ChessGame}, if any. */
  winner?: Team
}

/** An event that caused a {@link ChessGame} to end. */
export enum GameOverCause {
  /** A {@link GameOverCause} triggered when a {@link Player} has run out of time. */
  Timeout = "Timeout",
  /**
   * A {@link GameOverCause} triggered when a {@link Player} is under
   * {@link ChessGameSituationType.Checkmate Checkmate}.
   */
  Checkmate = "Checkmate",
  /**
   * A {@link GameOverCause} triggered when the game is
   * {@link ChessGameSituationType.Stale Stale}.
   */
  Stalemate = "Stalemate",
}