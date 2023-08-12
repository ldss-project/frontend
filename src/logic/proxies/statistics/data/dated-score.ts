import {type Score} from "@/logic/proxies/statistics/data/score";

/**
 * A {@link Score} bound to the date it was registered in the statistics service.
 */
export interface DatedScore extends Score {
  /** The date when this {@link DatedScore} was registered in the statistics service. */
  insertion: { $date: string }
}