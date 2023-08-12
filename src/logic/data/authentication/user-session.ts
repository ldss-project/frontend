import {type Token} from "@/logic/data/authentication/token";

/**
 * A session of a user in the authentication service.
 */
export interface UserSession {
  /** The name of the user owning this {@link UserSession}. */
  username: string
  /** The token granted to the user by the authentication service. */
  token: Token
}