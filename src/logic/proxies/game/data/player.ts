import {Team} from "@/logic/proxies/game/data/team";

/** A player in a {@link ChessGame}. */
export interface Player {
  /** The team of this {@link Player}. */
  team: Team
  /** The name of this {@link Player}. */
  name?: string
}

/** Utilities for {@link Player}. */
export namespace Players {
  /** The name of a guest {@link Player} in the chess game service. */
  export const guestPlayerName: string = "_"

  /**
   * @param player the specified {@link Player}.
   * @return true if the specified {@link Player} is a guest,
   *         false otherwise.
   */
  export function isGuest(player: Player): boolean { return player.name == guestPlayerName }
}