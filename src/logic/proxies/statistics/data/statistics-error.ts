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
   * An {@link StatisticsError} triggered when the user attempts to
   * call the api of the statistics service with invalid input
   * parameters.
   */
  MalformedInputException = "MalformedInputException",
  /**
   * An {@link StatisticsError} triggered when a user is queried
   * but not found in the statistics service.
   */
  UserNotFoundException = "UserNotFoundException",
}