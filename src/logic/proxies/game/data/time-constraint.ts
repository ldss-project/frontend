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