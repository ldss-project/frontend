/**
 * An optional value that can either be present or not.
 */
export class Option<V> {
  /**
   * @param value the specified value.
   * @return a new {@link Option} containing the specified value.
   */
  public static of<V>(value: V | undefined): Option<V> { return new Option<V>(value) }
  /** @return a new empty {@link Option}. */
  public static none<V>(): Option<V> { return Option.of<V>(undefined) }

  private readonly _value: V | undefined

  private constructor(value: V | undefined) { this._value = value }

  /**
   * @return the content of this {@link Option} if present;
   *         undefined otherwise.
   */
  public get(): V | undefined { return this._value }
  /**
   * @param defaultValue the specified default value.
   * @return the content of this {@link Option} if present;
   *         the specified default value otherwise.
   */
  public getOrElse(defaultValue: V): V { return this._value ?? defaultValue }
  /**
   * @return the content of this {@link Option} if present;
   *         throws an {@link Error} otherwise.
   */
  public getOrThrow(): V {
    if (!this._value) { throw new Error("NoSuchElementException: this option is empty.") }
    return this._value
  }

  /**
   * @return true if the content of this {@link Option} is not present;
   *         false otherwise.
   */
  public empty(): boolean { return !this.present() }
  /**
   * @return true if the content of this {@link Option} is present;
   *         false otherwise.
   */
  public present(): boolean { return !!this._value }

  /**
   * Transforms the content of this {@link Option} using the specified
   * mapping function.
   *
   * @param mapper the specified mapping function.
   * @return a new {@link Option} containing the transformed value
   *         obtained by applying the specified mapping function on
   *         the content of this {@link Option}.
   */
  public map<T>(mapper: (source: V) => T | undefined): Option<T> {
    return new Option<T>(this.present() ? mapper(this._value as V) : undefined)
  }

  /**
   * Transforms the content of this {@link Option} into another {@link Option}
   * using the specified mapping function.
   *
   * @param mapper the specified mapping function.
   * @return a new {@link Option} containing the content of the {@link Option}
   *         obtained by applying the specified mapping function on the content
   *         of this {@link Option}.
   */
  public flatMap<T>(mapper: (source: V) => Option<T | undefined>): Option<T> {
    return this.map(_ => mapper(_).get())
  }

  /**
   * Filters the content of this {@link Option} using the specified
   * filtering function.
   *
   * @param filter the specified filtering function.
   * @return a new {@link Option} containing the previous value if it
   *         satisfied the specified filtering function; an empty
   *         {@link Option} otherwise.
   */
  public filter(filter: (source: V) => boolean): Option<V> {
    return this.map(value => filter(value) ? value : undefined)
  }

  /**
   * Executes the specified callback on the content of this {@link Option}
   * if present.
   *
   * @param callback the specified callback.
   * @return this.
   */
  public ifPresent(callback: (source: V) => void): this {
    this.map(callback)
    return this
  }

  /**
   * Executes the specified callback if this {@link Option} is empty.
   *
   * @param callback the specified callback.
   * @return this.
   */
  public ifEmpty(callback: () => void): this {
    if (this.empty()) { callback() }
    return this
  }
}
