import {type Player} from "@/logic/data/game/player";
import {type Chessboard} from "@/logic/data/game/chessboard";
import {type Move} from "@/logic/data/game/move";
import {type Duration} from "@/logic/data/game/duration";

/** The state of a {@link ChessGame} from the perspective of a {@link Player}. */
export interface ChessGamePerspective {
  /** The {@link Player} owning this {@link ChessGamePerspective}. */
  player: Player
  /** The {@link Chessboard} components owned by this {@link Player}. */
  chessboard: Chessboard
  /** The history of {@link Move}s executed by this {@link Player}. */
  history: Move[]
  /** The time remaining for this {@link Player}. */
  time?: Duration
}