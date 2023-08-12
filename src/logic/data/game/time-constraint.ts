/**
 * A constraint on the time during a {@link ChessGame}.
 */
export enum TimeConstraint {
  /** No {@link TimeConstraint}s. */
  NoLimit = 'NoLimit',
  /** A {@link TimeConstraint} where the timer of a {@link Player} refreshes at every {@link Move}. */
  MoveLimit = 'MoveLimit',
  /** A {@link TimeConstraint} where the timer of a {@link Player} never refreshes. */
  PlayerLimit = 'PlayerLimit'
}