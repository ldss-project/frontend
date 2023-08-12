/**
 * A score in the application.
 */
export interface Score {
  /** The rank of the user in the application. */
  rank: number
  /** The number of matches won by the user. */
  wins: number
  /** The number of matches lost by the user. */
  losses: number
  /** The ratio between the wins and the losses of the user. */
  ratio: number
}

/**
 * The {@link Score} of a user in the leaderboard of the application.
 */
export interface UserScore extends Score {
  /** The name of the user. */
  username: string
}

/**
 * A {@link Score} bound to the {@link Date} it was registered in the application.
 */
export interface DatedScore extends Score {
  /** The date when this score was registered in the application. */
  insertion: Date
}

/**
 * The {@link Score} history of a user in the application.
 */
export interface UserScoreHistory {
  /** The name of the user. */
  username: string
  /** The latest scores of the user. */
  latestScores: DatedScore[]
}