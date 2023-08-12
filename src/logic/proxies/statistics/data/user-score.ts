import {type Score} from "@/logic/proxies/statistics/data/score";

/**
 * The {@link Score} of a user in the leaderboard of the statistics service.
 */
export interface UserScore extends Score {
  /** The name of the user who owns this {@link UserScore}. */
  username: string
}