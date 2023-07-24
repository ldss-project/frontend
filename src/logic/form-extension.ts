/**
 * The minimum length for the usernames in the application.
 */
const usernameMinLength: number = 3
/**
 * The minimum length for the passwords in the application.
 */
const passwordMinLength: number = 8
/**
 * The standard email format of the application.
 */
const emailRegex: RegExp =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

/**
 * Possible causes of errors in the forms of the application.
 */
export enum FormCauses {
  Username = "username",
  Email = "email",
  Password = "password",
  GameId = "gameId",
}

/**
 * Model an error in a form.
 */
export class FormError {
  /** The cause of the error. */
  readonly cause: string
  /** A description of the error. */
  readonly message: string

  /**
   * Create a new {@link FormError} with the specified cause and description.
   * @param cause the specified cause.
   * @param message the specified description.
   */
  constructor(cause: string, message: string) {
    this.cause = cause
    this.message = message
  }

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
 * @return a {@link FormError} caused by a {@link FormCauses.Username}
 *         if the validation failed, undefined otherwise.
 */
export function validateUsername(username: string | undefined): FormError | undefined {
  const field = username?.trim();
  if (field === undefined || field === "") {
    return new FormError(FormCauses.Username, "Username required.")
  } else if (field.length < usernameMinLength) {
    return new FormError(FormCauses.Username, "Username should be at least 3 characters long.")
  }
}

/**
 * Validate the specified email against the standard format of the
 * application.
 *
 * @param email the specified email.
 * @return a {@link FormError} caused by a {@link FormCauses.Email}
 *         if the validation failed, undefined otherwise.
 */
export function validateEmail(email: string | undefined): FormError | undefined {
  const field = email?.trim();
  if (field === undefined || field === "") {
    return new FormError(FormCauses.Email, "Email required.")
  } else if (field.toLowerCase().match(emailRegex) === null) {
    return new FormError(FormCauses.Email, "Incorrect email format.")
  }
}

/**
 * Validate the specified password against the standard format of the
 * application.
 *
 * @param password the specified password.
 * @param requireConfirmation true if the validation requires the password
 *        to be equal to the specified password confirmation; false otherwise.
 * @param confirmation the specified password confirmation.
 * @return a {@link FormError} caused by a {@link FormCauses.Password}
 *         if the validation failed, undefined otherwise.
 */
export function validatePassword(
  password: string | undefined,
  requireConfirmation: boolean = false,
  confirmation: string | undefined = "",
): FormError | undefined {
  const field = password?.trim()
  const fieldConfirmation = confirmation?.trim()
  if (field === undefined || field === ""){
    return new FormError(FormCauses.Password, "Password Required.")
  } else if (field.length < passwordMinLength){
    return new FormError(FormCauses.Password, "Password should be at least 8 characters long.")
  } else if (!requireConfirmation) {
    return;
  } else if (fieldConfirmation === undefined || fieldConfirmation === ""){
    return new FormError(FormCauses.Password, "Password confirmation required.")
  } else if (fieldConfirmation !== field){
    return new FormError(FormCauses.Password, "Password confirmation does not match the original password.")
  }
}

/**
 * Validate the specified game identifier against the standard format of the
 * application.
 *
 * @param gameId the specified game identifier.
 * @return a {@link FormError} caused by a {@link FormCauses.GameId}
 *         if the validation failed, undefined otherwise.
 */
export function validateGameId(gameId: string | undefined): FormError | undefined {
  const field = gameId?.trim()
  if (field === undefined || field === ""){
    return new FormError(FormCauses.GameId, "Game Identifier Required.")
  }
}