import {EnrichedPiece} from "@/logic/data/game/enriched/piece";

const pieceImageBasePath = "/chess-pieces"

/** An image of a {@link Piece}. */
export enum PieceImage {
  /** The image of a {@link Team.White White} {@link PieceType.Pawn Pawn}. */
  WhitePawn = `${pieceImageBasePath}/white-pawn.png`,
  /** The image of a {@link Team.White White} {@link PieceType.Knight Knight}. */
  WhiteKnight = `${pieceImageBasePath}/white-knight.png`,
  /** The image of a {@link Team.White White} {@link PieceType.Bishop Bishop}. */
  WhiteBishop = `${pieceImageBasePath}/white-bishop.png`,
  /** The image of a {@link Team.White White} {@link PieceType.Rook Rook}. */
  WhiteRook = `${pieceImageBasePath}/white-rook.png`,
  /** The image of a {@link Team.White White} {@link PieceType.Queen Queen}. */
  WhiteQueen = `${pieceImageBasePath}/white-queen.png`,
  /** The image of a {@link Team.White White} {@link PieceType.King King}. */
  WhiteKing = `${pieceImageBasePath}/white-king.png`,
  /** The image of a {@link Team.Black Black} {@link PieceType.Pawn Pawn}. */
  BlackPawn = `${pieceImageBasePath}/black-pawn.png`,
  /** The image of a {@link Team.Black Black} {@link PieceType.Knight Knight}. */
  BlackKnight = `${pieceImageBasePath}/black-knight.png`,
  /** The image of a {@link Team.Black Black} {@link PieceType.Bishop Bishop}. */
  BlackBishop = `${pieceImageBasePath}/black-bishop.png`,
  /** The image of a {@link Team.Black Black} {@link PieceType.Rook Rook}. */
  BlackRook = `${pieceImageBasePath}/black-rook.png`,
  /** The image of a {@link Team.Black Black} {@link PieceType.Queen Queen}. */
  BlackQueen = `${pieceImageBasePath}/black-queen.png`,
  /** The image of a {@link Team.Black Black} {@link PieceType.King King}. */
  BlackKing = `${pieceImageBasePath}/black-king.png`,
}

/** Utilities for {@link PieceImage}. */
export namespace PieceImages {
  /**
   * @param piece the specified {@link EnrichedPiece}.
   * @return the {@link PieceImage} for the specified {@link EnrichedPiece}.
   */
  export function of(piece: EnrichedPiece | undefined): string | undefined {
    return piece ? PieceImage[`${piece.team}${piece.type}`] : undefined;
  }
}
