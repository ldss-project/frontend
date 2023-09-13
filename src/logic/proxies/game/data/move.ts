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

import {type Position} from "@/logic/proxies/game/data/position";
import {type Piece} from "@/logic/proxies/game/data/piece";

/** A move in a {@link ChessGame}. */
export interface Move {
  /** The starting {@link Position}. */
  from: Position
  /** The arriving {@link Position}. */
  to: Position
  /** The piece captured by this {@link Move}, if any. */
  capturedPiece?: Piece
  /** If present, this {@link Move} is a castling. */
  castling?: {
    /** The starting {@link Position} of the rook. */
    rookFrom: Position,
    /** The arriving {@link Position} of the rook. */
    rookTo: Position,
  }
  /** If present, this {@link Move} is the double move of a pawn. */
  doubleMove?: {
    /** The {@link Position} between the starting and arriving {@link Position}s. */
    passingBy: Position
  }
  /** If present, this {@link Move} is an en-passant. */
  enPassant?: {
    /** The {@link Position} of the opponent pawn captured by the en-passant. */
    capturedPawnPosition: Position
  }
}

/** Utilities for {@link Move}. */
export namespace Moves {
  /**
   * @param move the specified {@link Move}.
   * @return true if the specified {@link Move} is a standard {@link Move},
   *         false otherwise.
   */
  export function isMove(move: Move): Boolean { return !isCapture(move) }
  /**
   * @param move the specified {@link Move}.
   * @return true if the specified {@link Move} is a capture {@link Move},
   *         false otherwise.
   */
  export function isCapture(move: Move): Boolean { return !!move.capturedPiece }
  /**
   * @param from the specified starting {@link Position}.
   * @param to the specified arriving {@link Position}.
   * @return a new {@link Move} from the specified starting {@link Position}
   *         to the specified arriving {@link Position}.
   */
  export function move(from: Position, to: Position): Move {
    return {
      from: from,
      to: to,
    }
  }
  /**
   * @param from the specified starting {@link Position}.
   * @param to the specified arriving {@link Position}.
   * @param capturedPiece the {@link Piece} captured by this {@link Move}.
   * @return a new capture {@link Move} from the specified starting {@link Position}
   *         to the specified arriving {@link Position}.
   */
  export function capture(from: Position, to: Position, capturedPiece: Piece): Move {
    return {
      from: from,
      to: to,
      capturedPiece: capturedPiece,
    }
  }
  /**
   * @param from the starting {@link Position} of the king.
   * @param to the arriving {@link Position} of the king.
   * @param rookFrom the starting {@link Position} of the rook.
   * @param rookTo the arriving {@link Position} of the rook.
   * @return a new castling {@link Move} from the specified starting {@link Position}s
   *         to the specified arriving {@link Position}s.
   */
  export function castling(from: Position, to: Position, rookFrom: Position, rookTo: Position): Move {
    return {
      from: from,
      to: to,
      castling: {
        rookFrom: rookFrom,
        rookTo: rookTo,
      }
    }
  }
  /**
   * @param from the starting {@link Position} of the king.
   * @param to the arriving {@link Position} of the king.
   * @param passingBy the {@link Position} between the starting and arriving {@link Position}s.
   * @return a new double {@link Move} from the specified starting {@link Position}s
   *         to the specified arriving {@link Position}s.
   */
  export function doubleMove(from: Position, to: Position, passingBy: Position): Move {
    return {
      from: from,
      to: to,
      doubleMove: {
        passingBy: passingBy
      }
    }
  }
  /**
   * @param from the specified starting {@link Position}.
   * @param to the specified arriving {@link Position}.
   * @param capturedPawn the specified opponent pawn.
   * @param capturedPawnPosition the position of the specified opponent pawn.
   * @return an en-passant {@link Move} from the specified starting {@link Position}
   *         to the specified arriving {@link Position}, capturing the specified
   *         opponent pawn.
   */
  export function enPassant(from: Position, to: Position, capturedPawn: Piece, capturedPawnPosition: Position): Move {
    return {
      from: from,
      to: to,
      capturedPiece: capturedPawn,
      enPassant: {
        capturedPawnPosition: capturedPawnPosition,
      },
    }
  }
}