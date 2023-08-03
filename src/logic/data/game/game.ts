import {type ChessGameServer} from "@/logic/data/game/server";
import {type ChessGameState} from "@/logic/data/game/state";

/** A game of chess. */
export interface ChessGame {
  /** The {@link ChessGameServer} hosting this {@link ChessGame}. */
  server: ChessGameServer
  /** The current {@link ChessGameState} of this {@link ChessGame}. */
  state: ChessGameState
}