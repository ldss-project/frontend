import {type ChessGameState} from "@/logic/proxies/game/data/state";
import {type ChessGameResult} from "@/logic/proxies/game/data/result";
import {type Position} from "@/logic/proxies/game/data/position";
import {type ChessGameSituation} from "@/logic/proxies/game/data/situation";
import {Team, Teams} from "@/logic/proxies/game/data/team";
import {EnrichedChessGame} from "@/logic/proxies/game/data/enriched/game";
import {EnrichedPiece} from "@/logic/proxies/game/data/enriched/piece";
import {EnrichedChessGamePerspective} from "@/logic/proxies/game/data/enriched/perspective";
import {Option} from "@/logic/extensions/option-extension";

/** A decorated {@link ChessGameState}. */
export class EnrichedChessGameState implements ChessGameState {
  /** See {@link ChessGameState.turn}. */
  turn: Team
  /** See {@link ChessGameState.white}. */
  white: EnrichedChessGamePerspective
  /** See {@link ChessGameState.black}. */
  black: EnrichedChessGamePerspective
  /** See {@link ChessGameState.situation}. */
  situation?: ChessGameSituation
  /** See {@link ChessGameState.gameOver}. */
  gameOver?: ChessGameResult

  private context: EnrichedChessGame
  private readonly _thisPlayer: string

  public constructor(context: EnrichedChessGame, chessGameState: ChessGameState, thisPlayer: string) {
    this.context = context
    this.turn = chessGameState.turn
    this.white = new EnrichedChessGamePerspective(this, chessGameState.white, Team.White)
    this.black = new EnrichedChessGamePerspective(this, chessGameState.black, Team.Black)
    this.situation = chessGameState.situation
    this.gameOver = chessGameState.gameOver
    this._thisPlayer = thisPlayer
  }

  /**
   * @param position the specified {@link Position}.
   * @return the {@link Piece} at the specified {@link Position}
   *         in the {@link Chessboard} if present; undefined otherwise.
   */
  public pieceAt(position: Position): EnrichedPiece | undefined {
    return this.white.pieceAt(position) ?? this.black.pieceAt(position) ?? undefined
  }

  /**
   * @return true if the {@link Player} owning this object is
   *         currently in control of the {@link Chessboard}.
   */
  public isTurnOfThisPlayer() : boolean {
    return this.perspectiveOfThisPlayer()?.team === this.turn
  }
  /**
   * @return true if the opponent of the {@link Player} owning
   *         this object is currently in control of the
   *         {@link Chessboard}.
   */
  public isTurnOfOpponentPlayer() : boolean {
    return this.perspectiveOfOpponentPlayer()?.team === this.turn
  }
  /**
   * @return the {@link ChessGamePerspective} of the {@link Player}
   *         owning this object.
   */
  public perspectiveOfThisPlayer(): EnrichedChessGamePerspective | undefined {
    return this.perspectiveOfPlayer(this._thisPlayer)
  }
  /**
   * @return the {@link ChessGamePerspective} of the opponent of
   *         the {@link Player} owning this object.
   */
  public perspectiveOfOpponentPlayer(): EnrichedChessGamePerspective | undefined {
    return Option.of(this.perspectiveOfThisPlayer()?.team)
                 .map(_ => this.perspectiveOfTeam(Teams.opponent(_)))
                 .get()
  }
  /**
   * @param username the specified username.
   * @return the {@link ChessGamePerspective} of the {@link Player}
   *         with the specified username.
   */
  public perspectiveOfPlayer(username: string): EnrichedChessGamePerspective | undefined {
    return this.white.player.username === username ? this.white :
           this.black.player.username === username ? this.black : undefined;
  }
  /**
   * @return the {@link ChessGamePerspective} of the {@link Player} that is
   *         currently in control of the {@link Chessboard}.
   */
  public currentPerspective(): EnrichedChessGamePerspective {
    return this.perspectiveOfTeam(this.turn)
  }
  /**
   * @return the {@link ChessGamePerspective} of the {@link Player} that is
   *         next in control of the {@link Chessboard}.
   */
  public nextPerspective(): EnrichedChessGamePerspective {
    return this.perspectiveOfTeam(Teams.opponent(this.turn))
  }
  /**
   * @param team the specified {@link Team}.
   * @return the {@link ChessGamePerspective} of the {@link Player}
   *         belonging to the specified {@link Team}.
   */
  public perspectiveOfTeam(team: Team): EnrichedChessGamePerspective {
    return team === Team.White ? this.white : this.black;
  }
}