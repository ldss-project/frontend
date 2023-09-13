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

import {Option} from "@/logic/extensions/option-extension";

/** A runtime environment. */
export interface RuntimeEnvironment {
  /** The host of the authentication service. */
  readonly AUTHENTICATION_SERVICE: string
  /** The host of the statistics service. */
  readonly STATISTICS_SERVICE: string
  /** The host of the chess game service. */
  readonly CHESS_GAME_SERVICE: string
}

/** The runtime environment of this application. */
export const runtimeEnvironment: RuntimeEnvironment =
  Option.of(import.meta.env.VITE_RUNTIME_ENVIRONMENT)
    .map(JSON.parse)
    .ifPresent(_ => console.log("Loaded runtime environment:", _))
    .ifEmpty(() => console.log("Loaded default environment."))
    .getOrElse({
      AUTHENTICATION_SERVICE: "127.0.0.1:8081",
      STATISTICS_SERVICE: "127.0.0.1:8082",
      CHESS_GAME_SERVICE: "127.0.0.1:8083",
    })
