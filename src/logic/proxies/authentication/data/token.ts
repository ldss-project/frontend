/**
 * A permit granted to a {@link User} for accessing sensitive operations
 * within the authentication service.
 */
export interface Token {
  /** The unique identifier of this {@link Token}. */
  id: string
  /** The date of expiration of this {@link Token}. */
  expiration: { $date: string }
}
