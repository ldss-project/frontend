/** A game mode of a {@link ChessGame}. */
export enum GameMode {
  /**
   * A {@link GameMode} where two human {@link Player}s
   * compete in a {@link ChessGame}.
   */
  PVP = "PVP",
  /**
   * A {@link GameMode} where a human {@link Player}
   * compete against a computer in a {@link ChessGame}.
   */
  PVE = "PVE"
}