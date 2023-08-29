import {GameOverCause} from "@/logic/proxies/game/data/game-over-cause";
import {type Player} from "@/logic/proxies/game/data/player";

/**
 * The result of a {@link ChessGame}.
 */
export interface GameOver {
  /** The {@link GameOverCause} of this {@link GameOver}. */
  cause: GameOverCause
  /** The {@link Player} who won this {@link ChessGame}, if any. */
  winner?: Player
}