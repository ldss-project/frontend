/**
 * One of the possible choices when promoting a
 * {@link PieceType.Pawn} in {@link ChessGame}.
 */
export enum PromotionChoice {
  /**
   * A {@link PromotionChoice} that will promote the
   * {@link PieceType.Pawn} to a {@link PieceType.Knight}.
   * */
  Knight = "Knight",

  /**
   * A {@link PromotionChoice} that will promote the
   * {@link PieceType.Pawn} to a {@link PieceType.Bishop}.
   */
  Bishop = "Bishop",

  /**
   * A {@link PromotionChoice} that will promote the
   * {@link PieceType.Pawn} to a {@link PieceType.Rook}.
   */
  Rook = "Rook",

  /**
   * A {@link PromotionChoice} that will promote the
   * {@link PieceType.Pawn} to a {@link PieceType.Queen}.
   */
  Queen = "Queen",
}