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
