/** An event that caused a {@link ChessGame} to end. */
export enum GameOverCause {
  /**
   * A {@link GameOverCause} triggered when a {@link Player} runs
   * out of time.
   */
  Timeout = "Timeout",
  /**
   * A {@link GameOverCause} triggered when a {@link Player} is under
   * {@link GameSituationType.Checkmate Checkmate}.
   */
  Checkmate = "Checkmate",
  /**
   * A {@link GameOverCause} triggered when the game is
   * {@link GameSituationType.Stale Stale}.
   */
  Stalemate = "Stalemate",
  /**
   * A {@link GameOverCause} triggered when a {@link Player}
   * surrenders.
   */
  Surrender = "Surrender",
}