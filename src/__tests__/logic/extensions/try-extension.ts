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
import {definedValue, otherValue, undefinedValue} from "@/__tests__/test-extension";
import {Failure, Success, Try} from "@/logic/extensions/try-extension";

const success = Try.success(definedValue)
const emptySuccess = Try.success(undefinedValue)
const failure = Try.failure(definedValue)
const emptyFailure = Try.failure(undefinedValue)

describe("In the Try extension", () => {
  describe("success", () => {
    it("should let the user create a successful empty computation", async () => {
      const emptySuccess: Success<void> = Try.success()
      expect(emptySuccess.isSuccess()).toBeTruthy()
      expect(emptySuccess.result()).toEqual(undefined)
    })
    it("should let the user create a successful non-empty computation", async () => {
      const nonEmptySuccess: Success<string> = Try.success(definedValue)
      expect(nonEmptySuccess.isSuccess()).toBeTruthy()
      expect(nonEmptySuccess.result()).toEqual(definedValue)
    })
  })
  describe("failure", () => {
    it("should let the user create an empty failed computation", async () => {
      const emptyFailure: Failure<void> = Try.failure()
      expect(emptyFailure.isFailure()).toBeTruthy()
      expect(emptyFailure.cause()).toEqual(undefined)
    })
    it("should let the user create a non-empty failed computation", async () => {
      const nonEmptyFailure: Failure<string> = Try.failure(definedValue)
      expect(nonEmptyFailure.isFailure()).toBeTruthy()
      expect(nonEmptyFailure.cause()).toEqual(definedValue)
    })
  })

  describe("ifSuccess", () => {
    it("should let the user use the content of a successful empty Try", async () => {
      const successSpy = vi.fn()
      emptySuccess.ifSuccess(successSpy)
      expect(successSpy).toBeCalledTimes(1)
    })
    it("should let the user use the content of a successful non-empty Try", async () => {
      const successSpy = vi.fn()
      success.ifSuccess(successSpy)
      expect(successSpy).toBeCalledTimes(1)
    })
    it("should not execute the callback if the Try is an empty Failure", async () => {
      const successSpy = vi.fn()
      emptyFailure.ifSuccess(successSpy)
      expect(successSpy).not.toBeCalled()
    })
    it("should not execute the callback if the Try is a non-empty Failure", async () => {
      const successSpy = vi.fn()
      failure.ifSuccess(successSpy)
      expect(successSpy).not.toBeCalled()
    })
  })

  describe("ifFailure", () => {
    it("should let the user use the content of a failed empty Try", async () => {
      const failureSpy = vi.fn()
      emptyFailure.ifFailure(failureSpy)
      expect(failureSpy).toBeCalledTimes(1)
    })
    it("should let the user use the content of a failed non-empty Try", async () => {
      const failureSpy = vi.fn()
      failure.ifFailure(failureSpy)
      expect(failureSpy).toBeCalledTimes(1)
    })
    it("should not execute the callback if the Try is an empty Success", async () => {
      const failureSpy = vi.fn()
      emptySuccess.ifFailure(failureSpy)
      expect(failureSpy).not.toBeCalled()
    })
    it("should not execute the callback if the Try is a non-empty Success", async () => {
      const failureSpy = vi.fn()
      success.ifFailure(failureSpy)
      expect(failureSpy).not.toBeCalled()
    })
  })

  describe("fold", () => {
    it("should execute the success callback if the Try is a Success", async () => {
      const successSpy = vi.fn()
      const failureSpy = vi.fn()
      success.fold(successSpy, failureSpy)
      expect(successSpy).toBeCalledTimes(1)
      expect(failureSpy).not.toBeCalled()
    })
    it("should execute the failure callback if the Try is a Failure", async () => {
      const successSpy = vi.fn()
      const failureSpy = vi.fn()
      failure.fold(successSpy, failureSpy)
      expect(successSpy).not.toBeCalled()
      expect(failureSpy).toBeCalledTimes(1)
    })
  })

  describe("isSuccess", () => {
    it("should let the user check if the Try is a Success", async () => {
      expect(success.isSuccess()).toBeTruthy()
      expect(failure.isSuccess()).toBeFalsy()
    })
  })

  describe("isFailure", () => {
    it("should let the user check if the Try is a Failure", async () => {
      expect(success.isFailure()).toBeFalsy()
      expect(failure.isFailure()).toBeTruthy()
    })
  })
})
