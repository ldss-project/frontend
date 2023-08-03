import {type ChessGamePerspective} from "@/logic/data/game/perspective";
import {type ChessGameResult} from "@/logic/data/game/result";
import {type ChessGameSituation} from "@/logic/data/game/situation";
import {Team} from "@/logic/data/game/team";


/** The state of a {@link ChessGame}. */
export interface ChessGameState {
  /**
   * The {@link Team} currently in control of the {@link Chessboard}
   * in this {@link ChessGame}.
   */
  turn: Team
  /**
   * The {@link ChessGamePerspective} of the {@link Player}
   * belonging to the {@link Team.White} in this {@link ChessGame}.
   */
  white: ChessGamePerspective
  /**
   * The {@link ChessGamePerspective} of the {@link Player}
   * belonging to the {@link Team.Black} in this {@link ChessGame}.
   */
  black: ChessGamePerspective
  /** The current {@link ChessGameSituation} in this {@link ChessGame}. */
  situation?: ChessGameSituation
  /**
   * The information about the {@link ChessGameResult} of this {@link ChessGame}.
   * If present, this {@link ChessGame} is over.
   */
  gameOver?: ChessGameResult
}