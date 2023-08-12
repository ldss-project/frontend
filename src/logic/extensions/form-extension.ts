/**
 * The minimum length for the usernames in the application.
 */
export const usernameMinLength: number = 3
/**
 * The minimum length for the passwords in the application.
 */
export const passwordMinLength: number = 8
/**
 * The minimum duration for a game in the application.
 */
export const minGameDurationMinutes: number = 5
/**
 * The maximum duration for a game in the application.
 */
export const maxGameDurationMinutes: number = 60
/**
 * The standard email format of the application.
 */
export const emailRegex: RegExp =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

/**
 * Possible causes of errors in the forms of the application.
 */
export enum FormCause {
  Username = "Username",
  Email = "Email",
  Password = "Password",
  GameId = "GameId",
  GameDuration = "GameDuration",
  Rank = "Rank"
}

/**
 * Model an error in a form.
 */
export class FormError {
  /** An undefined {@link FormError}. */
  static none: FormError | undefined = undefined

  /** The cause of the error. */
  readonly cause: string
  /** A description of the error. */
  readonly message: string

  /**
   * Create a new {@link FormError} with the specified cause and description.
   *
   * @param cause the specified cause.
   * @param message the specified description.
   */
  constructor(cause: string, message: string) {
    this.cause = cause
    this.message = message
  }

  /**
   * @param message the specified description.
   * @return a new {@link FormError} with the same cause as this one, but with the specified
   *         description.
   */
  public withMessage(message: string): FormError { return new FormError(this.cause, message) }
  /**
   * @param cause the specified cause.
   * @return true if this error was caused by the specified cause; false otherwise.
   */
  public hasCause(cause: string): boolean { return this.cause === cause }

  /** Negation of {@link hasCause}. */
  public hasNotCause(cause: string): boolean { return !this.hasCause(cause) }
}

/**
 * Validate the specified username against the standard format of the
 * application.
 *
 * @param username the specified username.
 * @return a {@link FormError} caused by a {@link FormCause.Username}
 *         if the validation failed, undefined otherwise.
 */
export function validateUsername(username: string): FormError | undefined {
  const field = username?.trim();
  return field === "" ?
           new FormError(FormCause.Username, "Username required.") :
         field.length < usernameMinLength ?
           new FormError(FormCause.Username, `Username should be at least ${usernameMinLength} characters long.`) :
           undefined;
}

/**
 * Validate the specified email against the standard format of the
 * application.
 *
 * @param email the specified email.
 * @return a {@link FormError} caused by a {@link FormCause.Email}
 *         if the validation failed, undefined otherwise.
 */
export function validateEmail(email: string): FormError | undefined {
  const field = email?.trim();
  return field === "" ?
           new FormError(FormCause.Email, "Email required.") :
         field.toLowerCase().match(emailRegex) === null ?
           new FormError(FormCause.Email, "Incorrect email format.") :
           undefined;
}

/**
 * Validate the specified password against the standard format of the
 * application.
 *
 * @param password the specified password.
 * @param requireConfirmation true if the validation requires the password
 *        to be equal to the specified password confirmation; false otherwise.
 * @param confirmation the specified password confirmation.
 * @return a {@link FormError} caused by a {@link FormCause.Password}
 *         if the validation failed, undefined otherwise.
 */
export function validatePassword(
  password: string,
  requireConfirmation: boolean = false,
  confirmation: string = "",
): FormError | undefined {
  const field = password?.trim()
  const fieldConfirmation = confirmation?.trim()
  return field === "" ?
           new FormError(FormCause.Password, "Password required.") :
         field.length < passwordMinLength ?
           new FormError(FormCause.Password, `Password should be at least ${passwordMinLength} characters long.`) :
         !requireConfirmation ?
           undefined :
         fieldConfirmation === "" ?
           new FormError(FormCause.Password, "Password confirmation required.") :
         fieldConfirmation !== field ?
           new FormError(FormCause.Password, "Password confirmation does not match the original password.") :
           undefined;
}

/**
 * Validate the specified game identifier against the standard format of the
 * application.
 *
 * @param gameId the specified game identifier.
 * @param required true if the game id is required for the validation,
 *        false otherwise.
 * @return a {@link FormError} caused by a {@link FormCause.GameId}
 *         if the validation failed, undefined otherwise.
 */
export function validateGameId(gameId: string, required: boolean = true): FormError | undefined {
  const field = gameId?.trim()
  return required && field === "" ?
           new FormError(FormCause.GameId, "Game identifier required.") :
           undefined;
}

/**
 * Validate the specified duration against the standard format of the
 * application.
 *
 * @param duration the specified duration.
 * @return a {@link FormError} caused by a {@link FormCause.GameDuration}
 *         if the validation failed, undefined otherwise.
 */
export function validateGameDuration(duration: number): FormError | undefined {
  return duration <= 0 ?
           new FormError(FormCause.GameDuration, "Duration must be greater than zero.") :
         !Number.isInteger(duration) ?
           new FormError(FormCause.GameDuration, "Duration must be an integer.") :
         duration < minGameDurationMinutes ?
           new FormError(FormCause.GameDuration, `Duration must be at least ${minGameDurationMinutes} minutes.`) :
         duration > maxGameDurationMinutes ?
           new FormError(FormCause.GameDuration, `Duration must be at most ${maxGameDurationMinutes} minutes.`) :
           undefined;
}

/**
 * Validate the specified rank against the standard format of the
 * application.
 *
 * @param rank the specified rank.
 * @return a {@link FormError} caused by a {@link FormCause.Rank}
 *         if the validation failed, undefined otherwise.
 */
export function validateRank(rank: number): FormError | undefined {
  return rank <= 0 ?
           new FormError(FormCause.Rank, "Rank must be greater than zero.") :
         !Number.isInteger(rank) ?
           new FormError(FormCause.Rank, "Rank must be an integer.") :
           undefined;
}