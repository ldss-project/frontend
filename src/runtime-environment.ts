/** A runtime environment. */
export interface RuntimeEnvironment {
  /** The host of the authentication service. */
  readonly AUTHENTICATION_SERVICE: string
  /** The host of the statistics service. */
  readonly STATISTICS_SERVICE: string
  /** The host of the chess game service. */
  readonly CHESS_GAME_SERVICE: string
}

/** The runtime environment of this application. */
export const runtimeEnvironment: RuntimeEnvironment =
  import.meta.env.VITE_RUNTIME_ENVIRONMENT ?? {
    AUTHENTICATION_SERVICE: "127.0.0.1:8081",
    STATISTICS_SERVICE: "127.0.0.1:8082",
    CHESS_GAME_SERVICE: "127.0.0.1:8083",
  }