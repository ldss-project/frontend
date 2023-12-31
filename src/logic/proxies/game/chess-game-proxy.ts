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

import axios, {type AxiosInstance} from "axios";
import {type GameConfiguration} from "@/logic/proxies/game/data/game-configuration";
import {Try} from "@/logic/extensions/try-extension";
import {type ChessGameError} from "@/logic/proxies/game/data/chess-game-error";
import {Option} from "@/logic/extensions/option-extension";
import {PlayerConnection} from "@/logic/proxies/game/player-connection";

/**
 * A proxy for communicating with the statistics service.
 */
export class ChessGameProxy {
  private static readonly PROTOCOL: string = "http"
  private readonly _serviceHost: string
  private readonly _baseApiPath: string
  private readonly _client: AxiosInstance
  private _playerConnection?: PlayerConnection

  public constructor(serviceHost: string) {
    this._client = axios.create({ withCredentials: true })
    this._serviceHost = serviceHost
    this._baseApiPath = `${ChessGameProxy.PROTOCOL}://${this._serviceHost}`
  }

  /**
   * Create a new {@link ChessGameServer} with the specified {@link GameConfiguration}
   * within the chess game service. Upon creation, the user is automatically connected
   * to the new {@link ChessGameServer}.
   *
   * @param configuration the specified {@link GameConfiguration}.
   * @return a {@link Promise} completing when the request has been served by the chess
   *         game service.
   *
   *         The result of the {@link Promise} is a {@link Success} containing a
   *         {@link PlayerConnection} if the operation succeeded or a {@link Failure}
   *         caused by a {@link ChessGameError} otherwise.
   */
  public createGame(configuration: GameConfiguration): Promise<Try<PlayerConnection, ChessGameError>> {
    const path = `${this._baseApiPath}/game`
    const payload = { gameConfiguration: configuration }
    return this._client.post(path, payload).then(
      response => Try.success(this.connect(response.data.connection.websocket)),
      error => Try.failure(error.response.data as ChessGameError),
    )
  }

  /**
   * Find an available public {@link ChessGameServer} and connect to it.
   *
   * @return a {@link Promise} completing when the request has been served by the chess
   *         game service.
   *
   *         The result of the {@link Promise} is a {@link Success} containing a
   *         {@link PlayerConnection} if the operation succeeded or a {@link Failure}
   *         caused by a {@link ChessGameError} otherwise.
   */
  public connectToPublicGame(): Promise<Try<PlayerConnection, ChessGameError>> {
    const path = `${this._baseApiPath}/game`
    return this._client.get(path).then(
      response => Try.success(this.connect(response.data.connection.websocket)),
      error => Try.failure(error.response.data as ChessGameError),
    )
  }

  /**
   * Find a private {@link ChessGameServer} with the specified identifier and connect
   * to it.
   *
   * @param gameId the specified identifier.
   * @return a {@link Promise} completing when the request has been served by the chess
   *         game service.
   *
   *         The result of the {@link Promise} is a {@link Success} containing a
   *         {@link PlayerConnection} if the operation succeeded or a {@link Failure}
   *         caused by a {@link ChessGameError} otherwise.
   */
  public connectToPrivateGame(gameId: string): Promise<Try<PlayerConnection, ChessGameError>> {
    const path = `${this._baseApiPath}/game/${gameId}`
    return this._client.get(path).then(
      response => Try.success(this.connect(response.data.connection.websocket)),
      error => Try.failure(error.response.data as ChessGameError),
    )
  }

  /**
   * @return an {@link Option} containing the current {@link PlayerConnection},
   *         if present; an empty {@link Option} otherwise.
   */
  public playerConnection(): Option<PlayerConnection> { return Option.of(this._playerConnection) }

  /** Forget the current {@link PlayerConnection}. */
  public resetConnection(): void { this._playerConnection = undefined }

  /**
   * Connect to the {@link ChessGameServer} at the specified path
   * within the chess game service.
   *
   * @param path the specified path.
   * @return the {@link PlayerConnection} that handles the communication
   *         with the {@link ChessGameServer} at the specified path.
   */
  private connect(path: string): PlayerConnection {
    const websocket: PlayerConnection = new PlayerConnection(this, `${this._serviceHost}${path}`)
    this._playerConnection = websocket
    return websocket
  }
}
