/** A team in a {@link ChessGame}. */
export enum Team {
  /** The white {@link Team}. */
  White = "White",
  /** The black {@link Team}. */
  Black = "Black",
}
export namespace Teams {
  /**
   * @param team the specified {@link Team}.
   * @return the opponent's {@link Team} with respect to the specified {@link Team}.
   */
  export function opponent(team: Team): Team {
    return team === Team.White ? Team.Black : Team.White;
  }
}