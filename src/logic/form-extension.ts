/**
 * Possible causes of errors in the forms of the application.
 */
export enum FormCauses {
  Username = "username",
  Email = "email",
  Password = "password",
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
  if (username === undefined) {
    return new FormError(FormCauses.Username, "Username required.")
  } else if (username.length < 3) {
    return new FormError(FormCauses.Username, "Username should be at least 3 characters long.")
  }
}

/**
 * The standard email format of the application.
 */
const emailRegex: RegExp =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

/**
 * Validate the specified email against the standard format of the
 * application.
 *
 * @param email the specified email.
 * @return a {@link FormError} caused by a {@link FormCauses.Email}
 *         if the validation failed, undefined otherwise.
 */
export function validateEmail(email: string | undefined): FormError | undefined {
  console.log(email)
  if (email === undefined) {
    return new FormError(FormCauses.Email, "Email required.")
  } else if (email.toLowerCase().match(emailRegex) === null) {
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
  if (password === undefined){
    return new FormError(FormCauses.Password, "Password Required.")
  } else if (password.length < 8){
    return new FormError(FormCauses.Password, "Password should be at least 8 characters long.")
  } else if (!requireConfirmation) {
    return;
  } else if (confirmation === undefined){
    return new FormError(FormCauses.Password, "Password confirmation required.")
  } else if (confirmation !== password){
    return new FormError(FormCauses.Password, "Password confirmation does not match the original password.")
  }
}