import {type Piece} from "@/logic/proxies/game/data/piece";
import {Team} from "@/logic/proxies/game/data/team";
import {type Position} from "@/logic/proxies/game/data/position";
import {PieceType} from "@/logic/proxies/game/data/piece-type";

/** A decorated {@link Piece}. */
export class EnrichedPiece implements Piece {
  /** See {@link Piece.type}. */
  readonly type: PieceType
  /** See {@link Piece.position}. */
  readonly position: Position
  /** The {@link Team} who owns this {@link Piece}. */
  readonly team: Team

  public constructor(piece: Piece, position: Position) {
    this.team = piece.team
    this.type = piece.type
    this.position = position
  }
}