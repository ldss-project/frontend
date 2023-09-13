// MIT License
//
// Copyright (c) 2023 Jahrim Gabriele Cesario
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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