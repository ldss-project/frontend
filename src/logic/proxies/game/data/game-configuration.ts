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

import {type TimeConstraint} from "@/logic/proxies/game/data/time-constraint";
import {type Player} from "@/logic/proxies/game/data/player";
import {GameMode} from "@/logic/proxies/game/data/game-mode";

/**
 * The configuration of a {@link ChessGame}.
 */
export interface GameConfiguration {
  /** The {@link TimeConstraint} applied to this {@link ChessGame}, if any. */
  timeConstraint?: TimeConstraint
  /** The white {@link Player} in this {@link ChessGame}, if any. */
  whitePlayer?: Player
  /** The black {@link Player} in this {@link ChessGame}, if any. */
  blackPlayer?: Player
  /** The {@link GameMode} of this {@link ChessGame}, if any. */
  gameMode?: GameMode
  /**
   * True if this {@link ChessGame} can only be accessed by those
   * who know its identifier; false otherwise.
   */
  isPrivate?: boolean
  /** The unique identifier bound to this {@link ChessGame}. */
  gameId?: string
}
