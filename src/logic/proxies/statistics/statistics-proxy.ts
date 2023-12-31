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

import {type UserScore} from "@/logic/proxies/statistics/data/user-score";
import {type DatedScore} from "@/logic/proxies/statistics/data/dated-score";
import {type StatisticsError} from "@/logic/proxies/statistics/data/statistics-error";
import {Try} from "@/logic/extensions/try-extension";
import axios, {type AxiosInstance} from "axios";

/**
 * A proxy for communicating with the statistics service.
 */
export class StatisticsProxy {
  private static readonly PROTOCOL: string = "http"
  private readonly _serviceHost: string
  private readonly _baseApiPath: string
  private readonly _client: AxiosInstance

  public constructor(serviceHost: string) {
    this._client = axios.create({ withCredentials: true })
    this._serviceHost = serviceHost
    this._baseApiPath = `${StatisticsProxy.PROTOCOL}://${this._serviceHost}`
  }

  /**
   * Get the {@link UserScoreHistory} of the specified user from the statistics service.
   *
   * @param username the name of the specified user.
   * @return a {@link Promise} completing when the request has been served by the statistics service.
   *         The result of the {@link Promise} is a {@link Success} containing a sequence of
   *         {@link DatedScore}s if the operation succeeded or a {@link Failure} caused by an
   *         {@link StatisticsError} otherwise.
   */
  public getUserScoreHistory(username: string): Promise<Try<DatedScore[], StatisticsError>> {
    const path = `${this._baseApiPath}/score/history/${username}`
    return this._client.get(path).then(
      response => Try.success(response.data.scores),
      error => Try.failure(error.response.data as StatisticsError),
    )
  }

  /**
   * Get the leaderboard from the statistics service.
   *
   * @param firstRank the highest rank in the leaderboard to query (included).
   * @param lastRank  the lowest rank in the leaderboard to query (excluded).
   * @return a {@link Promise} completing when the request has been served by the statistics service.
   *         The result of the {@link Promise} is a {@link Success} containing a sequence of
   *         {@link UserScore}s ordered by ascending rank if the operation succeeded or a
   *         {@link Failure} caused by an {@link StatisticsError} otherwise.
   */
  public getLeaderboard(
    firstRank: number = 1,
    lastRank: number = 100
  ): Promise<Try<UserScore[], StatisticsError>> {
    const path = `${this._baseApiPath}/leaderboard?first=${firstRank}&last=${lastRank}`
    return this._client.get(path).then(
      response => Try.success(response.data.scores),
      error => Try.failure(error.response.data as StatisticsError),
    )
  }
}