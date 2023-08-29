import {type Chessboard} from "@/logic/proxies/game/data/chessboard";
import {type MoveHistory} from "@/logic/proxies/game/data/move-history";
import {Team} from "@/logic/proxies/game/data/team";
import {type GameConfiguration} from "@/logic/proxies/game/data/game-configuration";
import {type GameOver} from "@/logic/proxies/game/data/game-over";
import {type TimerMap} from "@/logic/proxies/game/data/timer-map";
import {type GameSituation} from "@/logic/proxies/game/data/game-situation";

/** The state of a game of chess. */
export interface ChessGame {
  /** The {@link Chessboard} in this {@link ChessGame}. */
  chessboard: Chessboard
  /** The {@link MoveHistory} in this {@link ChessGame}. */
  moveHistory: MoveHistory
  /** The current turn in this {@link ChessGame}. */
  currentTurn: Team
  /** The {@link GameConfiguration} of this {@link ChessGame}. */
  configuration: GameConfiguration
  /** The {@link GameSituation} of this {@link ChessGame}. */
  situation: GameSituation
  /** The {@link GameOver} status of this {@link ChessGame}, if any. */
  gameOver?: GameOver
  /** The {@link TimerMap} of this {@link ChessGame}. */
  timers: TimerMap
}