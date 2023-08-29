import {type TimeConstraint} from "@/logic/proxies/game/data/time-constraint";
import {type Player} from "@/logic/proxies/game/data/player";
import {GameMode} from "@/logic/proxies/game/data/game-mode";

/**
 * The configuration of a {@link ChessGame}.
 */
export interface GameConfiguration {
  /** The {@link TimeConstraint} applied to this {@link ChessGame}, if any. */
  timeConstraint?: TimeConstraint
  /** The white {@link Player} in this {@link ChessGame}, if any. */
  whitePlayer?: Player
  /** The black {@link Player} in this {@link ChessGame}, if any. */
  blackPlayer?: Player
  /** The {@link GameMode} of this {@link ChessGame}, if any. */
  gameMode?: GameMode
  /**
   * True if this {@link ChessGame} can only be accessed by those
   * who know its identifier; false otherwise.
   */
  isPrivate?: boolean
  /** The unique identifier bound to this {@link ChessGame}. */
  gameId?: string
}
