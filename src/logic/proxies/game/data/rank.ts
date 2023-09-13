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

/** A row in the {@link Chessboard} of a {@link ChessGame}. */
export enum Rank {
  /** The first row of the {@link Chessboard} from bottom to top. */
  _1 = "1",
  /** The second row of the {@link Chessboard} from bottom to top. */
  _2 = "2",
  /** The third row of the {@link Chessboard} from bottom to top. */
  _3 = "3",
  /** The fourth row of the {@link Chessboard} from bottom to top. */
  _4 = "4",
  /** The fifth row of the {@link Chessboard} from bottom to top. */
  _5 = "5",
  /** The sixth row of the {@link Chessboard} from bottom to top. */
  _6 = "6",
  /** The seventh row of the {@link Chessboard} from bottom to top. */
  _7 = "7",
  /** The eighth row of the {@link Chessboard} from bottom to top. */
  _8 = "8",
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