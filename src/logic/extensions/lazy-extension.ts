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

/**
 * A lazy value, evaluated only once when requested and then cached.
 * Subsequent requests will be served the content of the cache.
 */
export class Lazy<T> {
  /**
   * @param supplier the specified supplier.
   * @return a new {@link Lazy} value, whose content will be evaluated using the
   *         specified supplier when requested for the first time.
   */
  static of<T>(supplier: () => T): Lazy<T> { return new Lazy(supplier) }

  private readonly _supplier: () => T
  private _value?: T

  private constructor(supplier: () => T) { this._supplier = supplier }

  /** @return the content of this {@link Lazy} value. */
  public value(): T {
    if (this._value === undefined) { this._value = this._supplier() }
    return this._value
  }
}