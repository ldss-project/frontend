/** A row in the {@link Chessboard} of a {@link ChessGame}. */
export enum Rank {
  /** The first row of the {@link Chessboard} from bottom to top. */
  _1 = "_1",
  /** The second row of the {@link Chessboard} from bottom to top. */
  _2 = "_2",
  /** The third row of the {@link Chessboard} from bottom to top. */
  _3 = "_3",
  /** The fourth row of the {@link Chessboard} from bottom to top. */
  _4 = "_4",
  /** The fifth row of the {@link Chessboard} from bottom to top. */
  _5 = "_5",
  /** The sixth row of the {@link Chessboard} from bottom to top. */
  _6 = "_6",
  /** The seventh row of the {@link Chessboard} from bottom to top. */
  _7 = "_7",
  /** The eighth row of the {@link Chessboard} from bottom to top. */
  _8 = "_8",
}

/** Utilities for {@link Rank}. */
export namespace Ranks {
  const _values: Rank[] = Object.values(Rank) as Rank[]
  /** @return a new array containing the values of the {@link Rank} enumeration. */
  export function values(): Rank[] { return [..._values] }
  /**
   * @param rank the specified {@link Rank}.
   * @return a numeric representation of the specified {@link Rank}.
   */
  export function valueOf(rank: Rank): number { return _values.indexOf(rank) }
}