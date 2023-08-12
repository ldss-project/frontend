import {type Piece, PieceType} from "@/logic/proxies/game/data/piece";
import {Team} from "@/logic/proxies/game/data/team";
import {type Position} from "@/logic/proxies/game/data/position";
import {EnrichedChessboard} from "@/logic/proxies/game/data/enriched/chessboard";

/** A decorated {@link Piece}. */
export class EnrichedPiece implements Piece {
  /** See {@link Piece.type}. */
  type: PieceType
  /** See {@link Piece.position}. */
  position: Position
  /** The {@link Team} who owns this {@link Piece}. */
  team: Team
  private context: EnrichedChessboard

  public constructor(context: EnrichedChessboard, piece: Piece, team: Team) {
    this.context = context
    this.team = team
    this.type = piece.type
    this.position = piece.position
  }
}