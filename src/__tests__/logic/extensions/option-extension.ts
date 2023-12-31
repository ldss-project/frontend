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
import {Option} from "@/logic/extensions/option-extension";
import {defaultValue, definedValue, otherValue, undefinedValue} from "@/__tests__/test-extension";

const none = Option.none()
const some = Option.of(definedValue)

describe("In the Option extension", () => {
  describe("none", () => {
    it("should let the user create an empty Option", async () => {
      const emptyOption: Option<any> = Option.none()
      expect(emptyOption.get()).toEqual(undefined)
    })
  })
  describe("of", () => {
    it("should let the user create an Option with a value", async () => {
      const fullOption: Option<any> = Option.of(definedValue)
      expect(fullOption.get()).toEqual(definedValue)
    })
    it("should let the user create an Option with a possibly undefined value", async () => {
      const option: Option<any> = Option.of(undefinedValue)
      expect(option.get()).toEqual(undefinedValue)
    })
  })

  describe("getOrElse", () => {
    it("should let the user get a default value when the Option is empty", async () => {
      expect(none.getOrElse(defaultValue)).toEqual(defaultValue)
    })
    it("should let the user get the content of the Option", async () => {
      expect(some.getOrElse(defaultValue)).toEqual(definedValue)
    })
  })

  describe("getOrThrow", () => {
    it("should throw when the Option is empty", async () => {
      expect(none.getOrThrow).toThrow()
    })
    it("should let the user get the content of the Option", async () => {
      expect(some.getOrThrow()).toEqual(definedValue)
    })
  })

  describe("empty", () => {
    it("should let the user check if the Option is empty", async () => {
      expect(none.empty()).toBeTruthy()
      expect(some.empty()).toBeFalsy()
    })
  })

  describe("present", () => {
    it("should let the user check if the Option is full", async () => {
      expect(none.present()).toBeFalsy()
      expect(some.present()).toBeTruthy()
    })
  })

  describe("map", () => {
    it("should let the user transform the content of the Option to another value", async () => {
      const transformedSome = some.map(() => otherValue)
      expect(transformedSome.get()).toEqual(otherValue)
    })
    it("should not transform the content of the Option if empty", async () => {
      const spy = vi.fn(() => otherValue)
      expect(none.map(spy).get()).toEqual(none.get())
      expect(spy).not.toBeCalled()
    })
  })

  describe("flatMap", () => {
    it("should let the user transform the content of the Option to another Option", async () => {
      const transformedSome = some.flatMap(() => Option.of(otherValue))
      expect(transformedSome.get()).toEqual(otherValue)
    })
    it("should not transform the content of the Option if empty", async () => {
      const spy = vi.fn(() => Option.of(otherValue))
      expect(none.flatMap(spy).get()).toEqual(none.get())
      expect(spy).not.toBeCalled()
    })
  })

  describe("filter", () => {
    it("should let the user filter the content of the Option", async () => {
      const filteredSome = some.filter(() => false)
      const unfilteredSome = some.filter(() => true)
      expect(filteredSome.empty()).toBeTruthy()
      expect(unfilteredSome.get()).toEqual(some.get())
    })
    it("should not filter the content of the Option if empty", async () => {
      const spy = vi.fn(() => false)
      expect(spy).not.toBeCalled()
    })
  })

  describe("ifPresent", () => {
    it("should let the user optionally use the content of the Option", async () => {
      const someSpy = vi.fn()
      some.ifPresent(someSpy)
      expect(someSpy).toBeCalledTimes(1)
    })
    it("should not use the content of the Option if empty", async () => {
      const noneSpy = vi.fn()
      none.ifPresent(noneSpy)
      expect(noneSpy).not.toBeCalled()
    })
  })

  describe("ifEmpty", () => {
    it("should let the user execute a callback if the Option is empty", async () => {
      const noneSpy = vi.fn()
      none.ifEmpty(noneSpy)
      expect(noneSpy).toBeCalledTimes(1)
    })
    it("should execute the callback if the Option is not empty", async () => {
      const someSpy = vi.fn()
      some.ifEmpty(someSpy)
      expect(someSpy).not.toBeCalled()
    })
  })
})
