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

import {describe, expect, it} from "vitest";

/** Keyword for a defined value. */
export const definedValue: string = "definedValue"
/** Keyword for a default value. */
export const defaultValue: string = "defaultValue"
/** Keyword for a different value. */
export const otherValue: string = "otherValue"
/** Keyword for an undefined value. */
export const undefinedValue: undefined = undefined

/**
 * Makes this test fail with the specified failure message.
 * @param message the specified failure message, if any.
 */
export function fail<T>(message?: string): T { throw new Error(message) }

describe("The Test extension", () => {
  it("should let the user decide when a test is failed", async() => {
    expect(() => fail()).toThrow()
    expect(() => fail("Failure Message")).toThrow("Failure Message")
  })
})
