/**
 * A type of {@link TimeConstraint} in a {@link ChessGame}.
 */
export enum TimeConstraintType {
  /** A {@link TimeConstraintType} where no constraints on the time are enforced. */
  NoLimit = 'NoLimit',
  /**
   * A {@link TimeConstraintType} where the timer of a {@link Player}
   * refreshes at every {@link Move}.
   */
  MoveLimit = 'MoveLimit',
  /**
   * A {@link TimeConstraintType} where the timer of a {@link Player}
   * never refreshes.
   */
  PlayerLimit = 'PlayerLimit'
}