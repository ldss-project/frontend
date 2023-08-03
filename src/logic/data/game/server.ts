import {type ChessGameServerError} from "@/logic/data/game/server-error";

/** A server hosting a {@link ChessGame}. */
export interface ChessGameServer {
  /** The {@link ChessGameServerState} of this {@link ChessGameServer}. */
  state: ChessGameServerState
  /**
   * The latest {@link ChessGameServerError} occurred in this
   * {@link ChessGameServer}, if any.
   */
  error?: ChessGameServerError
}

/** The state of a {@link ChessGameServer}. */
export enum ChessGameServerState {
  /**
   * The state where the {@link ChessGameServer} is waiting for more
   * {@link Player}s to join before starting the {@link ChessGame}.
   */
  WaitingForPlayers = "WaitingForPlayers",
  /** The state where the {@link ChessGameServer} is running a {@link ChessGame}. */
  Running = "Running",
  /** The state where the {@link ChessGameServer} has stopped running a {@link ChessGame}. */
  Terminated = "Terminated",
}