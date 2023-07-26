/**
 * Model the score of a user in the leaderboard of the application.
 */
interface UserScore {
  /** The name of the user. */
  readonly username: string
  /** The rank of the user in the application. */
  readonly rank: number
  /** The number of matches won by the user. */
  readonly wins: number
  /** The number of matches lost by the user. */
  readonly losses: number
  /** The ratio between the wins and the losses of the user. */
  readonly ratio: number
}