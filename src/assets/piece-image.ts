// MIT License
//
// Copyright (c) 2023 Jahrim Gabriele Cesario
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import {type Piece} from "@/logic/proxies/game/data/piece";
import {Team} from "@/logic/proxies/game/data/team";

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
   * @param piece the specified {@link Piece}.
   * @return the {@link PieceImage} for the specified {@link Piece}.
   */
  export function of(piece: Piece | undefined): string | undefined {
    const teamAsString: "White" | "Black" = piece?.team === Team.White ? "White" : "Black"
    return piece ? PieceImage[`${teamAsString}${piece.type}`] : undefined;
  }
}
