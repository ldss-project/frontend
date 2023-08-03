import {describe, expect, it} from "vitest";
import {Arrays} from "@/logic/extensions/array-extension";
import Int = Arrays.Int;

const negativeLength: Int = -10
function charSuccessor(char: string): string { return String.fromCharCode(char.charCodeAt(0) + 1) }

describe("In the Array extension", () => {
  describe("generate", () => {
    it("should let the user generate an Array from a starting value and a generator", async () => {
      expect(Arrays.generate("a", 5, charSuccessor)).toEqual(["a", "b", "c", "d", "e"])
    })
    it("should throw when the requested length is negative or null", async () => {
      expect(() => Arrays.generate("a", negativeLength, charSuccessor)).toThrow()
    })
  })

  describe("repeat", () => {
    it("should let the user generate an Array as a repeated element", async () => {
      expect(Arrays.repeat("a", 5)).toEqual(["a", "a", "a", "a", "a"])
    })
    it("should throw when the requested length is negative or null", async () => {
      expect(() => Arrays.repeat("a", negativeLength)).toThrow()
    })
  })

  describe("sequence", () => {
    it("should let the user generate a sequence of integers", async () => {
      expect(Arrays.Int.sequence(3, 5)).toEqual([3, 4, 5, 6, 7])
    })
    it("should throw when the requested length is negative or null", () => {
      expect(() => Arrays.Int.sequence(0, negativeLength)).toThrow()
    })
  })

  describe("range", () => {
    it("should let the user generate a range of integers", async () => {
      expect(Arrays.Int.range(3, 5)).toEqual([3, 4])
    })
    it("should throw when the width of the required range is null", () => {
      expect(() => Arrays.Int.range(3, 3)).toThrow()
    })
    it("should throw when the width of the required range is negative", () => {
      expect(() => Arrays.Int.range(3, 2)).toThrow()
    })
  })

  describe("until", () => {
    it("should let the user generate a range of integers starting from zero", async () => {
      expect(Arrays.Int.until(3)).toEqual([0, 1, 2])
    })
    it("should throw when the requested end is negative or null", async () => {
      expect(() => Arrays.Int.until(negativeLength)).toThrow()
    })
  })
})
