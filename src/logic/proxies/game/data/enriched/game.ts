import {type ChessGame} from "@/logic/proxies/game/data/game";
import {type ChessGameServer} from "@/logic/proxies/game/data/server";
import {EnrichedChessGameState} from "@/logic/proxies/game/data/enriched/state";

/** A decorated {@link ChessGame}. */
export class EnrichedChessGame implements ChessGame {
  /** An undefined {@link EnrichedChessGame}. */
  static none: EnrichedChessGame | undefined = undefined

  /** See {@link ChessGame.server}. */
  server: ChessGameServer
  /** See {@link ChessGame.state}. */
  state: EnrichedChessGameState

  public constructor(chessGame: ChessGame, thisPlayer: string) {
    this.server = chessGame.server
    this.state = new EnrichedChessGameState(this, chessGame.state, thisPlayer)
  }
}