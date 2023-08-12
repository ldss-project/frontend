import {type DatedScore} from "@/logic/proxies/statistics/data/dated-score";

/**
 * The {@link Score} history of a user in the statistics service.
 */
export interface UserScoreHistory {
  /** The name of the user who owns this {@link UserScoreHistory}. */
  username: string
  /** The latest {@link DatedScore}s of the owner of this {@link UserScoreHistory}. */
  latestScores: DatedScore[]
}