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