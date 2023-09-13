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

import {TimeConstraintType} from "@/logic/proxies/game/data/time-constraint-type";
import {type Duration} from "@/logic/proxies/game/data/duration";

/**
 * A constraint on the time available to the
 * {@link Player}s during a {@link ChessGame}.
 */
export interface TimeConstraint {
  /** The {@link TimeConstraintType} of this {@link TimeConstraint}. */
  type: TimeConstraintType,
  /**
   * The duration of the timers of the {@link Player}s by this
   * {@link TimeConstraint}. Absent for {@link TimeConstraintType.NoLimit NoLimit}.
   */
  time?: Duration
}