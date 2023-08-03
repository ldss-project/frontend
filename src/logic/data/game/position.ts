import {Rank} from "@/logic/data/game/rank";
import {File} from "@/logic/data/game/file";

/** A position in a {@link Chessboard} of a {@link ChessGame}. */
export interface Position {
  /** The column of this {@link Position}. */
  file: File
  /** The row of this {@link Position}. */
  rank: Rank
}

/** Utilities for {@link Position}. */
export namespace Positions {
  /**
   * @param file the specified {@link File}.
   * @param rank the specified {@link Rank}.
   * @return the {@link Position} on the {@link Chessboard} at
   *         the specified {@link File} and {@link Rank}.
   */
  export function of(file: File, rank: Rank): Position {
    return { file: file, rank: rank }
  }
  /**
   * @param position the specified {@link Position}.
   * @return an hash string for the specified {@link Position}.
   */
  export function hashOf(position: Position): string {
    return position.rank.toString().concat(position.file.toString())
  }
}