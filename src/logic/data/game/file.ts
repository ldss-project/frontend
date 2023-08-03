/** A column in the {@link Chessboard} of a {@link ChessGame}. */
export enum File {
  /** The first column of the {@link Chessboard} from left to right. */
  A = "A",
  /** The second column of the {@link Chessboard} from left to right. */
  B = "B",
  /** The third column of the {@link Chessboard} from left to right. */
  C = "C",
  /** The fourth column of the {@link Chessboard} from left to right. */
  D = "D",
  /** The fifth column of the {@link Chessboard} from left to right. */
  E = "E",
  /** The sixth column of the {@link Chessboard} from left to right. */
  F = "F",
  /** The seventh column of the {@link Chessboard} from left to right. */
  G = "G",
  /** The eighth column of the {@link Chessboard} from left to right. */
  H = "H",
}

/** Utilities for {@link File}. */
export namespace Files {
  const _values: File[] = Object.values(File) as File[]
  /** @return a new array containing the values of the {@link File} enumeration. */
  export function values(): File[] { return [..._values] }
  /**
   * @param file the specified {@link File}.
   * @return a numeric representation of the specified {@link File}.
   */
  export function valueOf(file: File): number { return _values.indexOf(file) }
}