/**
 * A score in the statistics service.
 */
export interface Score {
  /** The rank of the owner of this {@link Score} in the statistics service. */
  rank: number
  /** The number of matches won by the owner of this {@link Score}. */
  wins: number
  /** The number of matches lost by the owner of this {@link Score}. */
  losses: number
  /** The ratio between the wins and the losses of the owner of this {@link Score}. */
  ratio: number
}