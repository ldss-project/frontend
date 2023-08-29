import {type Duration} from "@/logic/proxies/game/data/duration";

/**
 * A map of the timers of the {@link Player}s during a
 * {@link ChessGame}.
 */
export interface TimerMap {
  /** The current timer of the white {@link Player} in this {@link ChessGame}. */
  white?: Duration
  /** The current timer of the black {@link Player} in this {@link ChessGame}. */
  black?: Duration
}