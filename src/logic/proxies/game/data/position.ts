import {Rank} from "@/logic/proxies/game/data/rank";
import {File} from "@/logic/proxies/game/data/file";

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

  /**
   * @param p1 the first specified {@link Position}.
   * @param p2 the second specified {@link Position}.
   * @return true if the specified {@link Position}s are the same;
   *         false otherwise.
   */
  export function equal(p1: Position, p2: Position): Boolean {
    return hashOf(p1) === hashOf(p2)
  }
}