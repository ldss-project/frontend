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

import {describe, expect, expectTypeOf, it} from "vitest";
import {
  FormCause,
  FormError, maxGameDurationMinutes, minGameDurationMinutes, passwordMinLength,
  usernameMinLength,
  validateEmail, validateGameDuration, validateGameId, validatePassword, validateRank,
  validateUsername
} from "@/logic/extensions/form-extension";

describe("In the Form extension", () => {
  const errorCause: FormCause = FormCause.Username
  const errorMessage: string = "ErrorMessage"
  const otherErrorCause: FormCause = FormCause.Password
  const otherErrorMessage: string = "OtherErrorMessage"
  const error: FormError = new FormError(errorCause, errorMessage)

  describe("in FormError", () => {
    describe("none", () => {
      it("should let the user create an undefined FormError", async () => {
        expect(FormError.none).toBeUndefined()
        expectTypeOf(FormError.none).toMatchTypeOf<FormError>
      })
    })
    describe("hasCause", () => {
      it("should let the user check if the FormError has a specific cause", async () => {
        expect(error.hasCause(errorCause)).toBeTruthy()
        expect(error.hasCause(otherErrorCause)).toBeFalsy()
      })
    })
    describe("hasNotCause", () => {
      it("should let the user check if the FormError has not a specific cause", async () => {
        expect(error.hasNotCause(errorCause)).toBeFalsy()
        expect(error.hasNotCause(otherErrorCause)).toBeTruthy()
      })
    })
    describe("withMessage", () => {
      it("should let the user change the message of a FormError", async () => {
        const newError: FormError = error.withMessage(otherErrorMessage)
        expect(newError.cause).toEqual(error.cause)
        expect(newError.message).toEqual(otherErrorMessage)
      })
    })
  })

  describe("validateUsername", () => {
    it("should accept a valid username", async () => {
      const validUsername: string = "ValidUsername"
      expect(validateUsername(validUsername)).toBeUndefined()
    })
    it("should reject empty usernames", async () => {
      const invalidUsername: string = ""
      expect(validateUsername(invalidUsername)?.cause).toEqual(FormCause.Username)
    })
    it(`should reject usernames whose length is less than ${usernameMinLength} characters`, async () => {
      const invalidUsername: string = "a".repeat(usernameMinLength - 1)
      expect(validateUsername(invalidUsername)?.cause).toEqual(FormCause.Username)
    })
  })

  describe("validateEmail", () => {
    const invalidEmails : string[] = [
      "email",
      "email@",
      "email@.",
      "email@domain",
      "email@domain.",
      "@domain.",
    ]

    it("should accept a valid email", async () => {
      const validEmail: string = "valid.email@test.com"
      expect(validateEmail(validEmail)).toBeUndefined()
    })
    it("should reject empty emails", async () => {
      const invalidEmail: string = ""
      expect(validateEmail(invalidEmail)?.cause).toEqual(FormCause.Email)
    })
    it(`should reject invalid emails`, async () => {
      invalidEmails.forEach(invalidEmail => {
        expect(validateEmail(invalidEmail)?.cause, `Validation of '${invalidEmail}'`)
          .toEqual(FormCause.Email)
      })
    })
  })

  describe("validatePassword", () => {
    it("should accept a valid password", async () => {
      const validPassword: string = "ValidPassword"
      expect(validatePassword(validPassword)).toBeUndefined()
    })
    it("should reject an empty password", async () => {
      const invalidPassword: string = ""
      expect(validatePassword(invalidPassword)?.cause).toEqual(FormCause.Password)
    })
    it(`should reject passwords whose length is less than ${passwordMinLength} characters`, async () => {
      const invalidPassword: string = "a".repeat(passwordMinLength - 1)
      expect(validatePassword(invalidPassword)?.cause).toEqual(FormCause.Password)
    })
    it(`should accept a valid password with a valid confirmation password`, async () => {
      const validPassword: string = "ValidPassword"
      expect(validatePassword(validPassword, true, validPassword)).toBeUndefined()
    })
    it(`should reject a valid password with an empty confirmation password`, async () => {
      const validPassword: string = "ValidPassword"
      expect(validatePassword(validPassword, true, "")?.cause)
        .toEqual(FormCause.Password)
      expect(validatePassword(validPassword, true, undefined)?.cause)
        .toEqual(FormCause.Password)
    })
    it(`should reject a valid password with a different confirmation password`, async () => {
      const validPassword: string = "ValidPassword"
      const invalidConfirmationPassword: string = "invalidConfirmationPassword"
      expect(
        validatePassword(
          validPassword,
          true,
          invalidConfirmationPassword
        )?.cause
      ).toEqual(FormCause.Password)
    })
  })

  describe("validateGameId", () => {
    it("should accept a valid game identifier", async () => {
      const validGameId: string = "ValidGameId"
      expect(validateGameId(validGameId)).toBeUndefined()
    })
    it("should accept an empty game identifier if not required", async () => {
      const validGameId: string = ""
      expect(validateGameId(validGameId, false)).toBeUndefined()
    })
    it("should reject an empty game identifier if required", async () => {
      const invalidGameId: string = ""
      expect(validateGameId(invalidGameId, true)?.cause).toEqual(FormCause.GameId)
    })
  })

  describe("validateGameDuration", () => {
    it("should accept a valid game duration", async () => {
      const validDuration: number = minGameDurationMinutes
      expect(validateGameDuration(validDuration)).toBeUndefined()
    })
    it("should reject a negative game duration", async () => {
      const invalidDuration: number = -1
      expect(validateGameDuration(invalidDuration)?.cause).toEqual(FormCause.GameDuration)
    })
    it("should reject a non-integer game duration", async () => {
      const invalidDuration: number = minGameDurationMinutes + 0.1
      expect(validateGameDuration(invalidDuration)?.cause).toEqual(FormCause.GameDuration)
    })
    it(`should reject a game duration lasting less than ${minGameDurationMinutes} minutes`, async () => {
      const invalidDuration: number = minGameDurationMinutes - 1
      expect(validateGameDuration(invalidDuration)?.cause).toEqual(FormCause.GameDuration)
    })
    it(`should reject a game duration lasting more than ${maxGameDurationMinutes} minutes`, async () => {
      const invalidDuration: number = maxGameDurationMinutes + 1
      expect(validateGameDuration(invalidDuration)?.cause).toEqual(FormCause.GameDuration)
    })
  })

  describe("validateRank", () => {
    it("should accept a valid rank", async () => {
      const validRank: number = 1
      expect(validateRank(validRank)).toBeUndefined()
    })
    it("should reject a negative rank", async () => {
      const invalidRank: number = -1
      expect(validateRank(invalidRank)?.cause).toEqual(FormCause.Rank)
    })
    it("should reject a non-integer rank", async () => {
      const invalidRank: number = 1.1
      expect(validateRank(invalidRank)?.cause).toEqual(FormCause.Rank)
    })
  })
})
