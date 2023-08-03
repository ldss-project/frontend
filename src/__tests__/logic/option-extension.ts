import {describe, expect, it, vi} from "vitest";
import {Option} from "@/logic/extensions/option-extension";
import {defaultValue, definedValue, otherValue, undefinedValue} from "@/__tests__/test-extension";

const none = Option.none()
const some = Option.of(definedValue)

describe("In the Option extension", () => {
  describe("none", () => {
    it("should let the user create an empty Option", async () => {
      const emptyOption: Option = Option.none()
      expect(emptyOption.get()).toEqual(undefined)
    })
  })
  describe("of", () => {
    it("should let the user create an Option with a value", async () => {
      const fullOption: Option = Option.of(definedValue)
      expect(fullOption.get()).toEqual(definedValue)
    })
    it("should let the user create an Option with a possibly undefined value", async () => {
      const option: Option = Option.of(undefinedValue)
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

  describe("tapEach", () => {
    it("should let the user optionally use the content of the Option", async () => {
      const someSpy = vi.fn()
      some.tapEach(someSpy)
      expect(someSpy).toBeCalledTimes(1)
    })
    it("should not use the content of the Option if empty", async () => {
      const noneSpy = vi.fn()
      none.tapEach(noneSpy)
      expect(noneSpy).not.toBeCalled()
    })
  })
})
