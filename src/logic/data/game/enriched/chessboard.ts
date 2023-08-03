import {type Chessboard} from "@/logic/data/game/chessboard";
import {type Move} from "@/logic/data/game/move";
import {EnrichedPiece} from "@/logic/data/game/enriched/piece";
import {EnrichedChessGamePerspective} from "@/logic/data/game/enriched/perspective";

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