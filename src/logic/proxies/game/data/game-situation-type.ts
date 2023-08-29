/**
 * A type of {@link GameSituation} in a {@link ChessGame}.
 */
export enum GameSituationType {
  /** The {@link GameSituation} where nothing happened in particular. */
  None = 'None',
  /**
   * The {@link GameSituation} where the king of the {@link Player}
   * of the current turn is threatened by a {@link Piece} of the opponent.
   */
  Check = 'Check',
  /**
   * The {@link GameSituation} where the {@link Player} of the
   * current turn has no available {@link Move}s.
   */
  Stale = 'Stale',
  /**
   * The {@link GameSituation} where both {@link GameSituationType.Check Check}
   * and {@link GameSituationType.Stale Stale} hold.
   */
  Checkmate = 'Checkmate',
  /**
   * The {@link GameSituation} where the {@link Player} of the
   * current turn is promoting a pawn.
   */
  Promotion = 'Promotion',
}