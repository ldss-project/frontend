import {describe, expect, it, vi} from "vitest";
import {Lazy} from "@/logic/extensions/lazy-extension";
import {definedValue} from "@/__tests__/test-extension";

describe("In the Lazy extension", () => {
  describe("of", () => {
    it("should let the user create a Lazy value", async () => {
      const lazy: Lazy = Lazy.of(() => definedValue)
      expect(lazy.value()).toEqual(definedValue)
    })
  })

  describe("value", () => {
    it("should call the supplier function provided in the constructor only once upon multiple requests", async () => {
      const spy = vi.fn(() => definedValue)
      const lazy: Lazy = Lazy.of(spy)
      lazy.value()
      lazy.value()
      expect(spy).toBeCalledTimes(1)
    })
  })
})
