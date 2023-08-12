import {Option} from "@/logic/extensions/option-extension";

/**
 * A computation that can be either a {@link Success} containing the value of the
 * computation or a {@link Failure} containing the error causing the failure.
 */
export class Try<TS, TF> {
  /**
   * @param cause the specified cause.
   * @return a {@link Failure} caused by the specified cause.
   */
  public static failure<TS, TF>(cause?: TF): Try<TS, TF> & Failure<TF> { return new Failure<TF>(cause) }

  /**
   * @param value the specified value.
   * @return a {@link Success} containing the specified value.
   */
  public static success<TS, TF>(value?: TS): Try<TS, TF> & Success<TS> { return new Success<TS>(value) }

  private readonly _type: "success" | "failure"
  protected readonly _value: Option<TS | TF> = Option.none()

  protected constructor(type: "failure" | "success", value?: TS | TF) {
    this._type = type
    this._value = Option.of(value)
  }

  /**
   * Executes the specified callbacks depending on the type of this {@link Try}.
   *
   * @param ifSuccess the callback that is executed if this {@link Try} is a
   *                  {@link Success}.
   * @param ifFailure the callback that is executed if this {@link Try} is a
   *                  {@link Failure}.
   */
  public fold(
    ifSuccess: ((success: TS) => void),
    ifFailure: ((failure: TF) => void),
  ): this {
    return this.ifSuccess(ifSuccess).ifFailure(ifFailure)
  }

  /**
   * Executes the specified callback if this {@link Try} is a {@link Success}.
   *
   * @param callback the specified callback.
   */
  public ifSuccess(callback: ((success: TS) => void)): this {
    this.asSuccess().ifPresent(_ => callback(_.result()))
    return this
  }

  /**
   * Executes the specified callback if this {@link Try} is a {@link Failure}.
   *
   * @param callback the specified callback.
   */
  public ifFailure(callback: ((failure: TF) => void)): this {
    this.asFailure().ifPresent(_ => callback(_.cause()))
    return this
  }

  /** @return true if this {@link Try} is a {@link Success}; false otherwise. */
  public isSuccess(): boolean { return this._type === "success" }
  /** @return true if this {@link Try} is a {@link Failure}; false otherwise. */
  public isFailure(): boolean { return this._type === "failure" }

  /**
   * @return an {@link Option} containing this {@link Try} as a {@link Success}
   *         if it's a {@link Success}, an empty {@link Option} otherwise.
   */
  private asSuccess(): Option<Success<TS>> {
    return Option.of(this)
                 .filter(() => this.isSuccess())
                 .map(_ => _ as unknown as Success<TS>)
  }
  /**
   * @return an {@link Option} containing this {@link Try} as a {@link Failure}
   *         if it's a {@link Failure}, an empty {@link Option} otherwise.
   */
  private asFailure(): Option<Failure<TF>> {
    return Option.of(this)
                 .filter(() => this.isFailure())
                 .map(_ => _ as unknown as Failure<TF>)
  }
}

/**
 * A successful computation.
 */
export class Success<TS> extends Try<TS, any> {
  public constructor(value?: TS) { super("success", value); }

  /** @return the result of this {@link Success}. */
  public result(): TS { return this._value.get() as TS }
}

/**
 * A failed computation.
 */
export class Failure<TF> extends Try<any, TF> {
  public constructor(value?: TF) { super("failure", value); }

  /** @return the cause of this {@link Failure}. */
  public cause(): TF { return this._value.get() as TF }
}