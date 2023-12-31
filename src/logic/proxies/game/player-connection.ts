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

import {WebSocketClient} from "@/logic/extensions/websocket-extension";
import {type Position} from "@/logic/proxies/game/data/position";
import {type Move} from "@/logic/proxies/game/data/move";
import {type Player} from "@/logic/proxies/game/data/player";
import {PromotionChoice} from "@/logic/proxies/game/data/promotion-choice";
import {Option} from "@/logic/extensions/option-extension";
import {ChessGameProxy} from "@/logic/proxies/game/chess-game-proxy";

/**
 * A connection handling the communication between a {@link Player} and a
 * {@link ChessGameServer}.
 */
export class PlayerConnection extends WebSocketClient {
  private static readonly PROTOCOL: string = "ws"
  private readonly _owner: ChessGameProxy
  private readonly _opened: Promise<void>
  private _player?: Player

  constructor(owner: ChessGameProxy, connectionString: string, protocols?: string | string[]) {
    super(`${PlayerConnection.PROTOCOL}://${connectionString}`, protocols)
    this._owner = owner
    this._opened = new Promise((resolve, reject) => {
      this.addEventListener("close", () => reject())
      if (this.readyState !== this.OPEN) {
        this.addEventListener("open", () => resolve())
      } else {
        resolve()
      }
    })
  }

  override close(code?: number, reason?: string): void {
    this._player = undefined
    this._owner.resetConnection()
    super.close(code, reason);
  }

  /**
   * @return an {@link Option} containing the {@link Player} owning this
   *         {@link PlayerConnection}, if present; an empty {@link Option}
   *         otherwise.
   */
  public player(): Option<Player> { return Option.of(this._player) }

  /**
   * @return a {@link Promise} completing when this {@link PlayerConnection}
   *         has been successfully established.
   */
  public async opened(): Promise<void> { return this._opened }

  /** Send a message to retrieve the state of the {@link ChessGameServer}. */
  public getState(): void {
    const methodName: string = "GetState"
    this.send(
      JSON.stringify({
        methodCall: {
          method: methodName,
        },
      })
    )
  }

  /**
   * Send a message to join the {@link ChessGameServer} as the specified {@link Player}.
   *
   * @param player the specified {@link Player}.
   */
  public joinGame(player: Player): void {
    const methodName: string = "JoinGame"
    this._player = player
    this.send(
      JSON.stringify({
        methodCall: {
          method: methodName,
          input: {
            player: player,
          },
        },
      })
    )
  }

  /**
   * Send a message to find the available {@link Move}s for the {@link Piece}
   * at the specified {@link Position} within the {@link ChessGameServer}.
   *
   * @param position the specified {@link Position}.
   */
  public findMoves(position: Position): void {
    const methodName: string = "FindMoves"
    this.send(
      JSON.stringify({
        methodCall: {
          method: methodName,
          input: {
            position: position,
          },
        }
      })
    )
  }

  /**
   * Send a message to apply the specified {@link Move} within the
   * {@link ChessGameServer}.
   *
   * @param move the specified {@link Move}.
   */
  public applyMove(move: Move): void {
    const methodName: string = "ApplyMove"
    this.send(
      JSON.stringify({
        methodCall: {
          method: methodName,
          input: {
            move: move,
          },
        },
      })
    )
  }

  /**
   * Send a message to promote the pawn currently in promotion to
   * the specified {@link PromotionChoice} within the {@link ChessGameServer}.
   *
   * @param promotionChoice the specified {@link PromotionChoice}.
   */
  public promote(promotionChoice: PromotionChoice): void {
    const methodName: string = "Promote"
    this.send(
      JSON.stringify({
        methodCall: {
          method: methodName,
          input: {
            promotionChoice: promotionChoice,
          },
        },
      })
    )
  }
}