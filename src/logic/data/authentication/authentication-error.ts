/**
 * An error in the authentication service.
 */
export interface AuthenticationError {
  /** The type of this {@link AuthenticationError}. */
  type: AuthenticationErrorType | string
  /** A description of this {@link AuthenticationError}. */
  message: string
}

/**
 * A type of {@link AuthenticationError}.
 */
export enum AuthenticationErrorType {
  /**
   * An {@link AuthenticationError} triggered when a user attempts to
   * log in with an incorrect password in the authentication service.
   */
  IncorrectPasswordException = "IncorrectPasswordException",
  /**
   * An {@link AuthenticationError} triggered when the user attempts to
   * call the api of the authentication service with invalid input
   * parameters.
   */
  MalformedInputException = "MalformedInputException",
  /**
   * An {@link AuthenticationError} triggered when a user attempts to
   * validate an expired token in the authentication service.
   */
  TokenExpiredException = "TokenExpiredException",
  /**
   * An {@link AuthenticationError} triggered when a user attempts to
   * sign in to the authentication service with a username that is
   * already taken.
   */
  UsernameAlreadyTakenException = "UsernameAlreadyTakenException",
  /**
   * An {@link AuthenticationError} triggered when a user attempts to
   * access a sensitive operation in the authentication service without
   * authorization.
   */
  UserNotAuthorizedException = "UserNotAuthorizedException",
  /**
   * An {@link AuthenticationError} triggered when a user is queried
   * but not found in the authentication service.
   */
  UserNotFoundException = "UserNotFoundException",
}