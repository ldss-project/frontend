import {type ChessGamePerspective} from "@/logic/data/game/perspective";
import {type Player} from "@/logic/data/game/player";
import {type Move} from "@/logic/data/game/move";
import {type Duration} from "@/logic/data/game/duration";
import {Team} from "@/logic/data/game/team";
import {Lazy} from "@/logic/extensions/lazy-extension";
import {type Position, Positions} from "@/logic/data/game/position";
import {EnrichedChessboard} from "@/logic/data/game/enriched/chessboard";
import {EnrichedChessGameState} from "@/logic/data/game/enriched/state";
import {EnrichedPiece} from "@/logic/data/game/enriched/piece";

/** A decorated {@link ChessGamePerspective}. */
export class EnrichedChessGamePerspective implements ChessGamePerspective {
  /** See {@link ChessGamePerspective.player}. */
  player: Player
  /** See {@link ChessGamePerspective.chessboard}. */
  chessboard: EnrichedChessboard
  /** See {@link ChessGamePerspective.history}. */
  history: Move[]
  /** See {@link ChessGamePerspective.time}. */
  time?: Duration
  /** The {@link Team} of this {@link Player}. */
  team: Team
  /** The {@link Position} currently selected by this {@link Player}. */
  selectedPosition?: Position
  private context: EnrichedChessGameState

  private readonly _piecesLookupTable: Lazy<Map<string, EnrichedPiece>> =
    Lazy.of(() => new Map(this.chessboard.pieces.map(piece => [Positions.hashOf(piece.position), piece])))
  private readonly _movesLookupTable: Lazy<Map<string, Move>> =
    Lazy.of(() => new Map(this.chessboard.moves.map(move => [Positions.hashOf(move.to), move])))

  public constructor(context: EnrichedChessGameState, chessGamePerspective: ChessGamePerspective, team: Team) {
    this.context = context
    this.team = team
    this.player = chessGamePerspective.player
    this.chessboard = new EnrichedChessboard(this, chessGamePerspective.chessboard)
    this.history = chessGamePerspective.history
    this.time = chessGamePerspective.time
  }

  /**
   * @param position the specified {@link Position}.
   * @return the {@link Piece} of this {@link Player} at the specified
   *         {@link Position} in the {@link Chessboard}, if present;
   *         undefined otherwise.
   */
  public pieceAt(position: Position): EnrichedPiece | undefined {
    return this._piecesLookupTable.value().get(Positions.hashOf(position))
  }

  /**
   * @param position the specified {@link Position}.
   * @return the {@link Move} of this {@link Player} arriving
   *         at the specified {@link Position}.
   */
  public moveAt(position: Position): Move | undefined {
    return this._movesLookupTable.value().get(Positions.hashOf(position))
  }
}