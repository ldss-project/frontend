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

import {type Chessboard} from "@/logic/proxies/game/data/chessboard";
import {type MoveHistory} from "@/logic/proxies/game/data/move-history";
import {Team} from "@/logic/proxies/game/data/team";
import {type GameConfiguration} from "@/logic/proxies/game/data/game-configuration";
import {type GameOver} from "@/logic/proxies/game/data/game-over";
import {type TimerMap} from "@/logic/proxies/game/data/timer-map";
import {type GameSituation} from "@/logic/proxies/game/data/game-situation";

/** The state of a game of chess. */
export interface ChessGame {
  /** The {@link Chessboard} in this {@link ChessGame}. */
  chessboard: Chessboard
  /** The {@link MoveHistory} in this {@link ChessGame}. */
  moveHistory: MoveHistory
  /** The current turn in this {@link ChessGame}. */
  currentTurn: Team
  /** The {@link GameConfiguration} of this {@link ChessGame}. */
  configuration: GameConfiguration
  /** The {@link GameSituation} of this {@link ChessGame}. */
  situation: GameSituation
  /** The {@link GameOver} status of this {@link ChessGame}, if any. */
  gameOver?: GameOver
  /** The {@link TimerMap} of this {@link ChessGame}. */
  timers: TimerMap
}