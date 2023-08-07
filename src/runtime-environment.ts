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
    AUTHENTICATION_SERVICE: "localhost:8081",
    STATISTICS_SERVICE: "localhost:8082",
    CHESS_GAME_SERVICE: "localhost:8083",
  }