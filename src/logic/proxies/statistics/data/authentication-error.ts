/**
 * An error in the statistics service.
 */
export interface StatisticsError {
  /** The type of this {@link StatisticsError}. */
  type: StatisticsErrorType | string
  /** A description of this {@link StatisticsError}. */
  message: string
}

/**
 * A type of {@link StatisticsError}.
 */
export enum StatisticsErrorType {
  /**
   * An {@link StatisticsError} triggered when a user attempts to
   * log in with an incorrect password in the authentication service.
   */
  IncorrectPasswordException = "IncorrectPasswordException",
  /**
   * An {@link StatisticsError} triggered when the user attempts to
   * call the api of the authentication service with invalid input
   * parameters.
   */
  MalformedInputException = "MalformedInputException",
  /**
   * An {@link StatisticsError} triggered when a user attempts to
   * validate an expired token in the authentication service.
   */
  TokenExpiredException = "TokenExpiredException",
  /**
   * An {@link StatisticsError} triggered when a user attempts to
   * sign in to the authentication service with a username that is
   * already taken.
   */
  UsernameAlreadyTakenException = "UsernameAlreadyTakenException",
  /**
   * An {@link StatisticsError} triggered when a user attempts to
   * access a sensitive operation in the authentication service without
   * authorization.
   */
  UserNotAuthorizedException = "UserNotAuthorizedException",
  /**
   * An {@link StatisticsError} triggered when a user is queried
   * but not found in the authentication service.
   */
  UserNotFoundException = "UserNotFoundException",
}