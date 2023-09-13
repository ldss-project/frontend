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
