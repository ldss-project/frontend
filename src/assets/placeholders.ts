import {type ChessGame} from "@/logic/data/game/game";
import {ChessGameServerState} from "@/logic/data/game/server";
import {Team} from "@/logic/data/game/team";
import {Pieces} from "@/logic/data/game/piece";
import {Positions} from "@/logic/data/game/position";
import {File} from "@/logic/data/game/file";
import {Rank} from "@/logic/data/game/rank";
import {Moves} from "@/logic/data/game/move";
import {Durations, TimeUnit} from "@/logic/data/game/duration";
import {type UserScore, type UserScoreHistory} from "@/logic/data/statistics/score";
import {Arrays} from "@/logic/extensions/array-extension";
import {ChessGameServerErrorType} from "@/logic/data/game/server-error";
import {ChessGameSituationType} from "@/logic/data/game/situation";
import {GameOverCause} from "@/logic/data/game/result";

export function chessGamePlaceholder(): ChessGame {
  return {
    server: {
      state: ChessGameServerState.WaitingForPlayers,
      // error: {
      //  type: ChessGameServerErrorType.Generic,
      //  description: "Oops...",
      // }
    },
    state: {
      turn: Team.White,
      // situation: {
      //  type: ChessGameSituationType.Promotion,
      //  promotingPawnPosition: Positions.of(File.H, Rank._8)
      //},
      // gameOver: {
      //  cause: GameOverCause.Stalemate,
      //  winner: Team.Black,
      // },
      white: {
        player: { username: "PlayerWhite", },
        chessboard: {
          pieces: [
            Pieces.rook(Positions.of(File.A, Rank._1)),
            Pieces.knight(Positions.of(File.B, Rank._1)),
            Pieces.bishop(Positions.of(File.C, Rank._1)),
            Pieces.queen(Positions.of(File.D, Rank._1)),
            Pieces.king(Positions.of(File.E, Rank._1)),
            Pieces.bishop(Positions.of(File.F, Rank._1)),
            Pieces.knight(Positions.of(File.G, Rank._1)),
            Pieces.rook(Positions.of(File.H, Rank._1)),
            Pieces.pawn(Positions.of(File.A, Rank._6)),
            Pieces.pawn(Positions.of(File.B, Rank._2)),
            Pieces.pawn(Positions.of(File.C, Rank._2)),
            Pieces.pawn(Positions.of(File.D, Rank._2)),
            Pieces.pawn(Positions.of(File.E, Rank._2)),
            Pieces.pawn(Positions.of(File.F, Rank._2)),
            Pieces.pawn(Positions.of(File.G, Rank._2)),
            Pieces.pawn(Positions.of(File.H, Rank._2)),
          ],
          moves: [
            Moves.move(Positions.of(File.B, Rank._2), Positions.of(File.B, Rank._3)),
            Moves.move(Positions.of(File.B, Rank._2), Positions.of(File.B, Rank._4)),
            Moves.capture(Positions.of(File.B, Rank._2), Positions.of(File.C, Rank._3)),
          ],
        },
        history: [
          Moves.move(Positions.of(File.A, Rank._2), Positions.of(File.A, Rank._3)),
          Moves.move(Positions.of(File.A, Rank._3), Positions.of(File.A, Rank._4)),
          Moves.move(Positions.of(File.A, Rank._4), Positions.of(File.A, Rank._5)),
          Moves.move(Positions.of(File.A, Rank._5), Positions.of(File.A, Rank._6)),
        ],
        time: Durations.of(10, TimeUnit.MINUTES),
      },
      black: {
        player: { username: "PlayerBlack", },
        chessboard: {
          pieces: [
            Pieces.rook(Positions.of(File.A, Rank._8)),
            Pieces.knight(Positions.of(File.B, Rank._8)),
            Pieces.bishop(Positions.of(File.C, Rank._8)),
            Pieces.queen(Positions.of(File.D, Rank._8)),
            Pieces.king(Positions.of(File.E, Rank._8)),
            Pieces.bishop(Positions.of(File.F, Rank._8)),
            Pieces.knight(Positions.of(File.G, Rank._8)),
            Pieces.rook(Positions.of(File.H, Rank._8)),
            Pieces.pawn(Positions.of(File.A, Rank._7)),
            Pieces.pawn(Positions.of(File.B, Rank._7)),
            Pieces.pawn(Positions.of(File.C, Rank._3)),
            Pieces.pawn(Positions.of(File.D, Rank._7)),
            Pieces.pawn(Positions.of(File.E, Rank._7)),
            Pieces.pawn(Positions.of(File.F, Rank._7)),
            Pieces.pawn(Positions.of(File.G, Rank._7)),
            Pieces.pawn(Positions.of(File.H, Rank._5)),
          ],
          moves: [
            Moves.move(Positions.of(File.B, Rank._7), Positions.of(File.B, Rank._6)),
            Moves.move(Positions.of(File.B, Rank._7), Positions.of(File.B, Rank._5)),
            Moves.capture(Positions.of(File.B, Rank._7), Positions.of(File.A, Rank._6)),
          ],
        },
        history: [
          Moves.move(Positions.of(File.C, Rank._7), Positions.of(File.C, Rank._5)),
          Moves.move(Positions.of(File.C, Rank._5), Positions.of(File.C, Rank._4)),
          Moves.move(Positions.of(File.C, Rank._4), Positions.of(File.C, Rank._3)),
          Moves.move(Positions.of(File.H, Rank._7), Positions.of(File.H, Rank._5)),
        ],
        time: Durations.of(10, TimeUnit.MINUTES),
      }
    },
  }
}

export function scoreHistoryPlaceholder(): UserScoreHistory {
  return {
    username: "PlayerPlaceholder",
    latestScores: [
      {
        insertion: new Date("2023-04-04T22:00:00.000Z"),
        rank: 1,
        wins: 1,
        losses: 0,
        ratio: 1
      },
      {
        insertion: new Date("2023-04-10T22:00:00.000Z"),
        rank: 1,
        wins: 2,
        losses: 0,
        ratio: 2
      },
      {
        insertion: new Date("2023-04-20T22:00:00.000Z"),
        rank: 1,
        wins: 2,
        losses: 1,
        ratio: 2
      },
      {
        insertion: new Date("2023-04-24T22:00:00.000Z"),
        rank: 1,
        wins: 3,
        losses: 1,
        ratio: 3
      },
      {
        insertion: new Date("2023-05-01T22:00:00.000Z"),
        rank: 1,
        wins: 3,
        losses: 2,
        ratio: 1.5
      },
      {
        insertion: new Date("2023-05-03T22:00:00.000Z"),
        rank: 1,
        wins: 4,
        losses: 2,
        ratio: 2
      },
      {
        insertion: new Date("2023-05-05T22:00:00.000Z"),
        rank: 1,
        wins: 5,
        losses: 2,
        ratio: 2.5
      },
      {
        insertion: new Date("2023-05-10T22:00:00.000Z"),
        rank: 1,
        wins: 6,
        losses: 2,
        ratio: 3
      },
      {
        insertion: new Date("2023-05-12T22:00:00.000Z"),
        rank: 1,
        wins: 6,
        losses: 3,
        ratio: 2
      },
      {
        insertion: new Date("2023-05-15T22:00:00.000Z"),
        rank: 1,
        wins: 6,
        losses: 4,
        ratio: 1.5
      },
      {
        insertion: new Date("2023-05-18T22:00:00.000Z"),
        rank: 1,
        wins: 6,
        losses: 5,
        ratio: 1.2
      },
      {
        insertion: new Date("2023-05-21T22:00:00.000Z"),
        rank: 1,
        wins: 7,
        losses: 5,
        ratio: 1.4
      },
      {
        insertion: new Date("2023-05-22T22:00:00.000Z"),
        rank: 1,
        wins: 8,
        losses: 5,
        ratio: 1.6
      },
      {
        insertion: new Date("2023-05-27T22:00:00.000Z"),
        rank: 1,
        wins: 9,
        losses: 5,
        ratio: 1.8
      },
      {
        insertion: new Date("2023-06-01T22:00:00.000Z"),
        rank: 1,
        wins: 10,
        losses: 5,
        ratio: 2
      },
      {
        insertion: new Date("2023-06-04T22:00:00.000Z"),
        rank: 1,
        wins: 11,
        losses: 5,
        ratio: 2.2
      },
      {
        insertion: new Date("2023-06-07T22:00:00.000Z"),
        rank: 1,
        wins: 12,
        losses: 5,
        ratio: 2.4
      },
      {
        insertion: new Date("2023-06-10T22:00:00.000Z"),
        rank: 1,
        wins: 13,
        losses: 5,
        ratio: 2.6
      },
      {
        insertion: new Date("2023-06-15T22:00:00.000Z"),
        rank: 1,
        wins: 13,
        losses: 6,
        ratio: 2.16
      },
      {
        insertion: new Date(Date.now()),
        rank: 1,
        wins: 13,
        losses: 6,
        ratio: 2.16
      }
    ]
  }
}

export function leaderboardPlaceholder(firstRank: number, leaderboardWindow: number): UserScore[] {
  return Arrays.Int.sequence(firstRank, leaderboardWindow).map(rank => ({
    rank: rank,
    username: `PlayerPlaceholder${rank}`,
    wins: 1,
    losses: rank,
    ratio: 1 / rank,
  }))
}