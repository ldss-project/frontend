// MIT License
//
// Copyright (c) 2023 Jahrim Gabriele Cesario
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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