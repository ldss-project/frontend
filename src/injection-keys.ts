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

import {AuthenticationProxy} from "@/logic/proxies/authentication/authentication-proxy";
import {StatisticsProxy} from "@/logic/proxies/statistics/statistics-proxy";
import {ChessGameProxy} from "@/logic/proxies/game/chess-game-proxy";
import {RelativeChessGameServer} from "@/logic/proxies/game/data/enriched/relative-chess-game-server";
import type {InjectionKey, Ref} from "vue";
import {provide, inject} from "vue";

/**
 * The injection keys used in the application.
 *
 * An injection key is a {@link Symbol} used during a dependency injection
 * via {@link provide} and {@link inject}, that helps with uniquely identifying
 * such dependency and inferring its type.
 */
export class InjectionKeys {
  /** Injection key for an {@link AuthenticationProxy}. */
  public static AuthenticationService =
    Symbol('AuthenticationService') as InjectionKey<Ref<AuthenticationProxy>>
  /** Injection key for an {@link StatisticsProxy}. */
  public static StatisticsService =
    Symbol('StatisticsService') as InjectionKey<Ref<StatisticsProxy>>
  /** Injection key for a {@link ChessGameProxy}. */
  public static ChessGameService =
    Symbol('ChessGameProxy') as InjectionKey<Ref<ChessGameProxy>>
  /** Injection key for an {@link ChessGameServer}. */
  public static ChessGameServer =
    Symbol('ChessGameServer') as InjectionKey<Ref<RelativeChessGameServer>>
}
