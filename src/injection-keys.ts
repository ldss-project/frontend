import {AuthenticationProxy} from "@/logic/proxies/authentication/authentication-proxy";
import {StatisticsProxy} from "@/logic/proxies/statistics/statistics-proxy";
import {ChessGameProxy} from "@/logic/proxies/game/chess-game-proxy";
import {RelativeChessGameServer} from "@/logic/proxies/game/data/enriched/relative-chess-game-server";
import type {InjectionKey, Ref} from "vue";
import {provide, inject} from "vue";

/**
 * The injection keys used in the application.
 *
 * An injection key is a {@link Symbol} used during a dependency injection
 * via {@link provide} and {@link inject}, that helps with uniquely identifying
 * such dependency and inferring its type.
 */
export class InjectionKeys {
  /** Injection key for an {@link AuthenticationProxy}. */
  public static AuthenticationService =
    Symbol('AuthenticationService') as InjectionKey<Ref<AuthenticationProxy>>
  /** Injection key for an {@link StatisticsProxy}. */
  public static StatisticsService =
    Symbol('StatisticsService') as InjectionKey<Ref<StatisticsProxy>>
  /** Injection key for a {@link ChessGameProxy}. */
  public static ChessGameService =
    Symbol('ChessGameProxy') as InjectionKey<Ref<ChessGameProxy>>
  /** Injection key for an {@link ChessGameServer}. */
  public static ChessGameServer =
    Symbol('ChessGameServer') as InjectionKey<Ref<RelativeChessGameServer>>
}
