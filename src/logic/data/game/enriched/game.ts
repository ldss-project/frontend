import {type ChessGame} from "@/logic/data/game/game";
import {type ChessGameServer} from "@/logic/data/game/server";
import {EnrichedChessGameState} from "@/logic/data/game/enriched/state";

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