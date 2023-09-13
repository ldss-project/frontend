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

import {type Player} from "@/logic/proxies/game/data/player";
import {Lazy} from "@/logic/extensions/lazy-extension";
import {type ChessGameServer} from "@/logic/proxies/game/data/chess-game-server";
import {type Position, Positions} from "@/logic/proxies/game/data/position";
import {type Move} from "@/logic/proxies/game/data/move";
import {Option} from "@/logic/extensions/option-extension";
import {Team, Teams} from "@/logic/proxies/game/data/team";
import {type Duration} from "@/logic/proxies/game/data/duration";

/**
 * The perspective of a {@link Player} on a {@link ChessGameServer}.
 */
export class PlayerPerspective {
  private readonly _owner: Team
  private readonly _opponentPerspective: Lazy<PlayerPerspective>
  private readonly _chessGameServer: ChessGameServer

  /** The {@link Position} on the {@link Chessboard} selected by this {@link Player}. */
  selectedPosition?: Position
  /** The {@link Move}s on the {@link Chessboard} available to this {@link Player}. */
  availableMoves?: Move[]

  public constructor(chessGameServer: ChessGameServer, owner: Team, opponentPerspective?: PlayerPerspective) {
    this._chessGameServer = chessGameServer
    this._owner = owner
    this._opponentPerspective =
      Lazy.of(() =>
        opponentPerspective ??
        new PlayerPerspective(chessGameServer, Teams.opponent(owner), this)
      )
  }

  /** @return the {@link Team} of the {@link Player} who owns this {@link PlayerPerspective}. */
  public team(): Team { return this._owner }

  /** @return the {@link Player} who owns this {@link PlayerPerspective}. */
  public player(): Player | undefined { return this.playerOfTeam(this.team()) }
  /**
   * @return true if the {@link Player} who owns this {@link PlayerPerspective}
   *         is currently in control of the {@link Chessboard}; false otherwise.
   */
  public isTurnOwner(): boolean { return this.team() === this._chessGameServer.gameState.currentTurn }

  /** @return the timer of the {@link Player} who owns this {@link PlayerPerspective}. */
  public time(): Duration | undefined { return this.timeOfTeam(this.team()) }

  /**
   * @param position the specified {@link Position}.
   * @return the {@link Move} of this {@link Player} arriving
   *         at the specified {@link Position}.
   */
  public moveAt(position: Position): Move | undefined {
    return this.availableMoves?.find(_ => Positions.equal(_.to, position))
  }

  /**
   * @return the sequence of {@link Move}s executed by the {@link Player}
   *         who owns this {@link PlayerPerspective}, in order of decreasing
   *         age (the first is the oldest; the last is the most recent).
   */
  public moveHistory(): Move[] {
    return this._chessGameServer.gameState.moveHistory.entries
      .filter(_ => _.piece.team === this.team())
      .map(_ => _.move)
  }

  /** @return the {@link PlayerPerspective} of the opponent of this {@link Player}. */
  public opponentPerspective(): PlayerPerspective { return this._opponentPerspective.value() }

  /**
   * @param team the specified {@link Team}.
   * @return the {@link Player} of the specified {@link Team}.
   */
  private playerOfTeam(team: Team): Player | undefined {
    return team === Team.White
      ? this._chessGameServer.gameState.configuration.whitePlayer
      : this._chessGameServer.gameState.configuration.blackPlayer
  }

  /**
   * @param team the specified {@link Team}.
   * @return the timer of the {@link Player} of the specified {@link Team}.
   */
  private timeOfTeam(team: Team): Duration | undefined {
    return Option.of(this._chessGameServer.gameState.timers)
      .map(_ => team === Team.White ? _.white : _.black)
      .get()
  }
}
