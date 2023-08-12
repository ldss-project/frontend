import {type Chessboard} from "@/logic/proxies/game/data/chessboard";
import {type Move} from "@/logic/proxies/game/data/move";
import {EnrichedPiece} from "@/logic/proxies/game/data/enriched/piece";
import {EnrichedChessGamePerspective} from "@/logic/proxies/game/data/enriched/perspective";

/** A decorated {@link Chessboard}. */
export class EnrichedChessboard implements Chessboard {
  /** See {@link Chessboard.pieces}. */
  pieces: EnrichedPiece[]
  /** See {@link Chessboard.moves}. */
  moves: Move[]

  private context: EnrichedChessGamePerspective
  public constructor(context: EnrichedChessGamePerspective, chessboard: Chessboard) {
    this.context = context
    this.pieces = chessboard.pieces.map(p => new EnrichedPiece(this, p, context.team))
    this.moves = chessboard.moves
  }
}