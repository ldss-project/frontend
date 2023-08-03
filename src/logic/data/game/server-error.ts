/** An error occurred in a {@link ChessGameServer}. */
export interface ChessGameServerError {
  /** The {@link ChessGameServerErrorType} of this {@link ChessGameServerError}. */
  type: ChessGameServerErrorType
  /** The description of the {@link ChessGameServerError}. */
  description: string
}

/** A type of {@link ChessGameServerError} occurred in a {@link ChessGameServer}. */
export enum ChessGameServerErrorType {
  /** A generic {@link ChessGameServerError}. */
  Generic,
  /**
   * A {@link ChessGameServerError} occurred when a {@link Player}
   * disconnects leaving the {@link ChessGameServer} in an invalid state.
   */
  PlayerDisconnect,
}