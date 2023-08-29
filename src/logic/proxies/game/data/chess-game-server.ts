import {ServerSituation} from "@/logic/proxies/game/data/server-situation";
import {type ChessGameError} from "@/logic/proxies/game/data/chess-game-error";
import {type ChessGame} from "@/logic/proxies/game/data/chess-game";

/** A server hosting a {@link ChessGame}. */
export interface ChessGameServer {
  /** The {@link ServerSituation} of this {@link ChessGameServer}. */
  situation: ServerSituation,
  /** The subscription identifiers of this {@link ChessGameServer}. */
  subscriptions: string[],
  /** The latest error of this {@link ChessGameServer}, if any. */
  error?: ChessGameError
  /** The state of the {@link ChessGame} hosted by this {@link ChessGameServer}. */
  gameState: ChessGame
}