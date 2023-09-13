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

import {TimeUnit} from "@/logic/proxies/game/data/time-unit";

/** A duration in a {@link ChessGame}. */
export interface Duration {
  /** The number of {@link TimeUnit}s this {@link Duration} lasts. */
  value: number
  /** The {@link TimeUnit} of this {@link Duration}. */
  unit: TimeUnit
}

/** Utilities for {@link Duration}. */
export namespace Durations {
  const nanoSecondsToMilliSecondsScale: number = 0.000_001
  const microSecondsToMilliSecondsScale: number = 0.001
  const milliSecondsToMilliSecondsScale: number = 1.0
  const secondsToMilliSecondsScale: number = 1_000.0
  const minutesToMilliSecondsScale: number = 60_000.0
  const hoursToMilliSecondsScale: number = 3_600_000.0
  const daysToMilliSecondsScale: number = 86_400_000.0

  /**
   * @param value the specified amount of {@link TimeUnit}.
   * @param unit the specified {@link TimeUnit}.
   * @return a new {@link Duration} lasting for the specified amount of the
   *         specified {@link TimeUnit}.
   */
  export function of(value: number, unit: TimeUnit): Duration {
    return { value: value, unit: unit }
  }
  /**
   * @param duration the specified {@link Duration}.
   * @return the number of milliseconds in the specified {@link Duration}.
   */
  export function toMilliSeconds(duration: Duration): number {
    switch (duration.unit) {
      case TimeUnit.NANOSECONDS: return duration.value * nanoSecondsToMilliSecondsScale
      case TimeUnit.MICROSECONDS: return duration.value * microSecondsToMilliSecondsScale
      case TimeUnit.MILLISECONDS: return duration.value * milliSecondsToMilliSecondsScale
      case TimeUnit.SECONDS: return duration.value * secondsToMilliSecondsScale
      case TimeUnit.MINUTES: return duration.value * minutesToMilliSecondsScale
      case TimeUnit.HOURS: return duration.value * hoursToMilliSecondsScale
      case TimeUnit.DAYS: return duration.value * daysToMilliSecondsScale
    }
  }

  /**
   * @param duration the specified {@link Duration}.
   * @return the bson representation of the specified {@link Duration}.
   */
  export function asBson(duration: Duration): any {
    return { value: { $numberLong: duration.value.toString(), }, unit: duration.unit, }
  }
}