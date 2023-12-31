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

import {type ChessGameServer} from "@/logic/proxies/game/data/chess-game-server";
import {type ChessGameError} from "@/logic/proxies/game/data/chess-game-error";
import {type ChessGame} from "@/logic/proxies/game/data/chess-game";
import {ServerSituation} from "@/logic/proxies/game/data/server-situation";
import {Team, Teams} from "@/logic/proxies/game/data/team";
import {type Player} from "@/logic/proxies/game/data/player";
import {type Position, Positions} from "@/logic/proxies/game/data/position";
import {type Piece} from "@/logic/proxies/game/data/piece";
import {PlayerPerspective} from "@/logic/proxies/game/data/enriched/player-perspective";

/**
 * The state of a {@link ChessGameServer} relative to a {@link Player}.
 */
export class RelativeChessGameServer implements ChessGameServer {
  /** An undefined {@link RelativeChessGameServer}. */
  static none: RelativeChessGameServer | undefined = undefined

  /** The perspective of this {@link Player} on this {@link ChessGameServer}. */
  thisPerspective: PlayerPerspective
  /** The perspective of the opponent of this {@link Player} on this {@link ChessGameServer}. */
  opponentPerspective: PlayerPerspective
  /** See {@link ChessGameServer.situation}. */
  situation: ServerSituation
  /** See {@link ChessGameServer.subscriptions}. */
  subscriptions: string[]
  /** See {@link ChessGameServer.error}. */
  error?: ChessGameError
  /** See {@link ChessGameServer.gameState}. */
  gameState: ChessGame

  public constructor(owner: Team, chessGameServer: ChessGameServer, deepCopy: Boolean = true) {
    const copy: ChessGameServer = deepCopy ? JSON.parse(JSON.stringify(chessGameServer)) : chessGameServer
    this.error = copy.error
    this.gameState = copy.gameState
    this.situation = copy.situation
    this.subscriptions = copy.subscriptions
    this.thisPerspective = new PlayerPerspective(this, owner)
    this.opponentPerspective = this.thisPerspective.opponentPerspective()
  }

  /**
   * @param position the specified {@link Position}.
   * @param team the specified {@link Team}.
   * @return the {@link Piece} of the specified {@link Team} at the
   *         specified {@link Position} in the {@link Chessboard},
   *         if present; undefined otherwise.
   */
  public pieceAt(position: Position, team?: Team): Piece | undefined {
    return this.gameState.chessboard.pieces
      .filter(_ => team ? _.piece.team === team : true)
      .find(_ => Positions.equal(_.position, position))
      ?.piece
  }
  /**
   * @param team the team of the specified {@link Player}.
   * @return the {@link PlayerPerspective} of the specified {@link Player}.
   */
  public perspectiveOfTeam(team: Team): PlayerPerspective {
    return this.thisPerspective.team() === team
           ? this.thisPerspective
           : this.opponentPerspective
  }
  /**
   * @return the {@link PlayerPerspective} of the {@link Player}
   *         currently in control of the {@link Chessboard}.
   */
  public perspectiveOfCurrentTurn(): PlayerPerspective {
    return this.perspectiveOfTeam(this.gameState.currentTurn)
  }
  /**
   * @return the {@link PlayerPerspective} of the {@link Player}
   *         next in control of the {@link Chessboard}.
   */
  public perspectiveOfNextTurn(): PlayerPerspective {
    return this.perspectiveOfTeam(Teams.opponent(this.gameState.currentTurn))
  }
}


