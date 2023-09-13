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