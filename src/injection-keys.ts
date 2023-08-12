import type {InjectionKey, Ref} from "vue";
import {AuthenticationProxy} from "@/logic/proxies/authentication/authentication-proxy";
import {StatisticsProxy} from "@/logic/proxies/statistics/statistics-proxy";
import {EnrichedChessGame} from "@/logic/proxies/game/data/enriched/game";
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
  /** Injection key for an {@link EnrichedChessGame}. */
  public static GameContext =
    Symbol('GameContext') as InjectionKey<Ref<EnrichedChessGame>>
}
