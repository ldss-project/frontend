/** A duration in a {@link ChessGame}. */
export interface Duration {
  /** The number of {@link TimeUnit}s this {@link Duration} lasts. */
  value: number
  /** The {@link TimeUnit} of this {@link Duration}. */
  unit: TimeUnit
}

/** Utilities for {@link Duration}. */
export namespace Durations {
  const microSecondsToMilliSecondsScale: number = 1_000.0
  const milliSecondsToMilliSecondsScale: number = 1.0
  const secondsToMilliSecondsScale: number = 1000.0
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
      case TimeUnit.MICROSECONDS: return duration.value / microSecondsToMilliSecondsScale
      case TimeUnit.MILLISECONDS: return duration.value / milliSecondsToMilliSecondsScale
      case TimeUnit.SECONDS: return duration.value * secondsToMilliSecondsScale
      case TimeUnit.MINUTES: return duration.value * minutesToMilliSecondsScale
      case TimeUnit.HOURS: return duration.value * hoursToMilliSecondsScale
      case TimeUnit.DAYS: return duration.value * daysToMilliSecondsScale
    }
  }
}

/** A time unit for a {@link Duration}. */
export enum TimeUnit {
  MICROSECONDS = "MICROSECONDS",
  MILLISECONDS = "MILLISECONDS",
  SECONDS = "SECONDS",
  MINUTES = "MINUTES",
  HOURS = "HOURS",
  DAYS = "DAYS",
}