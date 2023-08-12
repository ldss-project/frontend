import {type ChessGameServer} from "@/logic/proxies/game/data/server";
import {type ChessGameState} from "@/logic/proxies/game/data/state";

/** A game of chess. */
export interface ChessGame {
  /** The {@link ChessGameServer} hosting this {@link ChessGame}. */
  server: ChessGameServer
  /** The current {@link ChessGameState} of this {@link ChessGame}. */
  state: ChessGameState
}