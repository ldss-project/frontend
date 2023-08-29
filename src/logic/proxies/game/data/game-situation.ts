import {type Position} from "@/logic/proxies/game/data/position";
import {GameSituationType} from "@/logic/proxies/game/data/game-situation-type";

/** A situation in a {@link ChessGame}. */
export interface GameSituation {
  /** The {@link GameSituationType} of this {@link GameSituation}. */
  type: GameSituationType,
  /**
   * The {@link Position} of the pawn to be promoted. Present only if
   * this is a {@link GameSituationType.Promotion Promotion}.
   */
  promotingPawnPosition?: Position
}
