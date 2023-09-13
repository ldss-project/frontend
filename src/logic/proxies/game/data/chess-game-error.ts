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

/**
 * An error in the chess game service.
 */
export interface ChessGameError {
  /** The type of this {@link ChessGameError}. */
  type: ChessGameErrorType | string
  /** A description of this {@link ChessGameError}. */
  message: string
}

/**
 * A type of {@link ChessGameError}.
 */
export enum ChessGameErrorType {
  /** A generic {@link ChessGameError}. */
  ChessGameServiceException = "ChessGameServiceException",
  /**
   * A {@link ChessGameError} triggered when a user attempts to
   * find a private {@link ChessGameServer} when it has already
   * started.
   */
  GameAlreadyStartedException = "GameAlreadyStartedException",
  /**
   * A {@link ChessGameError} triggered when a user attempts to
   * perform an action that requires a {@link ChessGameServer}
   * not to be configured, but the {@link ChessGameServer} is
   * configured.
   */
  GameConfiguredException = "GameConfiguredException",
  /**
   * A {@link ChessGameError} triggered when a user attempts to
   * create a {@link ChessGameServer} with an id that is already
   * taken.
   */
  GameIdAlreadyTakenException = "GameIdAlreadyTakenException",
  /**
   * A {@link ChessGameError} triggered when a {@link ChessGameServer}
   * with a specific id is queried but not found.
   */
  GameNotFoundException = "GameNotFoundException",
  /**
   * A {@link ChessGameError} triggered when a user attempts to
   * perform an action that requires a {@link ChessGameServer}
   * to be ready, but the {@link ChessGameServer} is not ready.
   */
  GameNotReadyException = "GameNotReadyException",
  /**
   * A {@link ChessGameError} triggered when a user attempts to
   * perform an action that requires a {@link ChessGameServer}
   * to be running, but the {@link ChessGameServer} is not running.
   */
  GameNotRunningException = "GameNotRunningException",
  /**
   * A {@link ChessGameError} triggered when a user attempts to
   * perform an action that requires a {@link ChessGameServer}
   * to be waiting for players, but the {@link ChessGameServer} is
   * not waiting for players.
   */
  GameNotWaitingForPlayersException = "GameNotWaitingForPlayersException",
  /**
   * A {@link ChessGameError} triggered when a user attempts to
   * perform an action that requires a {@link ChessGameServer} to
   * be waiting for a promotion, but the {@link ChessGameServer} is
   * not waiting for a promotion.
   */
  GameNotWaitingForPromotionException = "GameNotWaitingForPromotionException",
  /**
   * A {@link ChessGameError} triggered when a user attempts to
   * perform an action that requires a {@link ChessGameServer} not to
   * be terminated, but the {@link ChessGameServer} is terminated.
   */
  GameTerminatedException = "GameTerminatedException",
  /**
   * A {@link ChessGameError} triggered when a user attempts to
   * perform an action that requires a {@link ChessGameServer} not
   * to be waiting for a promotion, but the {@link ChessGameServer}
   * is waiting for a promotion.
   */
  GameWaitingForPromotionException = "GameWaitingForPromotionException",
  /**
   * A {@link ChessGameError} triggered by an internal error during
   * the execution of the chess game service, probably due to its
   * implementation.
   */
  InternalServerException = "InternalServerException",
  /**
   * A {@link ChessGameError} triggered when the user attempts to
   * call the api of the chess game service with invalid input
   * parameters.
   */
  MalformedInputException = "MalformedInputException",
  /**
   * A {@link ChessGameError} triggered when a {@link ChessGameServer}
   * is queried, but no {@link ChessGameServer}s are available in the
   * chess game service.
   */
  NoAvailableGamesException = "NoAvailableGamesException",
  /**
   * A {@link ChessGameError} triggered when a user attempts to
   * join a {@link ChessGameServer} as a {@link Player} of a {@link Team}
   * whose {@link Player} is already assigned.
   */
  PlayerAlreadyExistingException = "PlayerAlreadyExistingException",
}