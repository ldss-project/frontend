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

import {PieceType} from "@/logic/proxies/game/data/piece-type";
import {Team} from "@/logic/proxies/game/data/team";

/**
 * A piece in a {@link Chessboard} of a {@link ChessGame}.
 */
export interface Piece {
  /** The {@link PieceType} of this {@link Piece}. */
  type: PieceType
  /** The {@link Team} who owns this {@link Piece}. */
  team: Team
}

/** Utilities for {@link Piece}. */
export namespace Pieces {
  /**
   * @param type the specified {@link PieceType}.
   * @param team the specified {@link Team}.
   * @return a new {@link Piece} of the specified
   *         {@link PieceType} and {@link Team}.
   */
  export function piece(type: PieceType, team: Team): Piece {
    return { type: type, team: team }
  }
  /** As {@link piece piece(PieceType.Pawn, team)}. */
  export function pawn(team: Team): Piece { return piece(PieceType.Pawn, team) }
  /** As {@link piece piece(PieceType.Knight, team)}. */
  export function knight(team: Team): Piece { return piece(PieceType.Knight, team) }
  /** As {@link piece piece(PieceType.Bishop, team)}. */
  export function bishop(team: Team): Piece { return piece(PieceType.Bishop, team) }
  /** As {@link piece piece(PieceType.Rook, team)}. */
  export function rook(team: Team): Piece { return piece(PieceType.Rook, team) }
  /** As {@link piece piece(PieceType.Queen, team)}. */
  export function queen(team: Team): Piece { return piece(PieceType.Queen, team) }
  /** As {@link piece piece(PieceType.King, team)}. */
  export function king(team: Team): Piece { return piece(PieceType.King, team) }
}

