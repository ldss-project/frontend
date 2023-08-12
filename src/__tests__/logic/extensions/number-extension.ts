import {describe, expect, it} from "vitest";
import {haveSameParity} from "@/logic/extensions/number-extension";

const odd = 1
const even = 2

describe("In the Number extension", () => {
  describe("haveSameParity", () => {
    it("should let the user check if two numbers have the same parity", async () => {
      expect(haveSameParity(odd, odd)).toBeTruthy()
      expect(haveSameParity(even, even)).toBeTruthy()
      expect(haveSameParity(odd, even)).toBeFalsy()
    })
  })
})
