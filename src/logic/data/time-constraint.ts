/**
 * Model the possible constraints on the time during a chess game.
 */
export enum TimeConstraints {
  /** No constraints. */
  NoLimit = 'NoLimit',
  /** A time constraint where the timer of a player refreshes at every move. */
  MoveLimit = 'MoveLimit',
  /** A time constraint where the timer of a player never refreshes. */
  PlayerLimit = 'PlayerLimit'
}