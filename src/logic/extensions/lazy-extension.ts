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