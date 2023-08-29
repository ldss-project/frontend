import {type User} from "@/logic/proxies/authentication/data/user";
import {type UserSession} from "@/logic/proxies/authentication/data/user-session";
import {type AuthenticationError} from "@/logic/proxies/authentication/data/authentication-error";
import {Option} from "@/logic/extensions/option-extension";
import {Try} from "@/logic/extensions/try-extension";
import {useCookies} from "@vueuse/integrations/useCookies";
import axios, {type AxiosInstance} from "axios";

/**
 * A proxy for communicating with the authentication service.
 */
export class AuthenticationProxy {
  private static readonly PROTOCOL: string = "http"
  private readonly _serviceHost: string
  private readonly _baseApiPath: string
  private readonly _client: AxiosInstance
  private readonly _sessionManager: AuthenticationSessionManager

  public constructor(serviceHost: string) {
    this._client = axios.create({ withCredentials: true })
    this._sessionManager = new AuthenticationSessionManager()
    this._serviceHost = serviceHost
    this._baseApiPath = `${AuthenticationProxy.PROTOCOL}://${this._serviceHost}`
  }

  /** @return the {@link AuthenticationSessionManager} of this {@link AuthenticationProxy}. */
  public sessionManager(): AuthenticationSessionManager { return this._sessionManager }

  /**
   * Register a new user in the authentication service.
   *
   * @param username the name of the user.
   * @param email the email of the user.
   * @param password the password of the user.
   * @return a {@link Promise} completing when the request has been served by the authentication service.
   *         The result of the {@link Promise} is a {@link Success} containing a {@link UserSession}
   *         if the operation succeeded or a {@link Failure} caused by an {@link AuthenticationError}
   *         otherwise.
   */
  public registerUser(username: string, email: string, password: string): Promise<Try<UserSession, AuthenticationError>> {
    const path = `${this._baseApiPath}/user/${username}/sign-in`
    const payload = { user: { email: email, password: password } }
    return this._client.post(path, payload).then(
      response => {
        const userSession: UserSession = response.data.session
        this.sessionManager().saveSession(userSession)
        return Try.success(userSession)
      },
      error => Try.failure(error.response.data as AuthenticationError),
    )
  }

  /**
   * Authenticate a user in the authentication service.
   *
   * @param username the name of the user.
   * @param password the password of the user.
   * @return a {@link Promise} completing when the request has been served by the authentication service.
   *         The result of the {@link Promise} is a {@link Success} containing a {@link UserSession}
   *         if the operation succeeded or a {@link Failure} caused by an {@link AuthenticationError}
   *         otherwise.
   */
  public loginUser(username: string, password: string): Promise<Try<UserSession, AuthenticationError>> {
    const path = `${this._baseApiPath}/user/${username}/log-in`
    const payload = { user: { password: password } }
    return this._client.post(path, payload).then(
      response => {
        const userSession: UserSession = response.data.session
        this.sessionManager().saveSession(userSession)
        return Try.success(userSession)
      },
      error => Try.failure(error.response.data as AuthenticationError),
    )
  }

  /**
   * Revoke the authentication of a user from the authentication service.
   *
   * @param username the name of the user.
   * @return a {@link Promise} completing when the request has been served by the authentication service.
   *         The result of the {@link Promise} is an empty {@link Success} if the operation succeeded or
   *         a {@link Failure} caused by an {@link AuthenticationError} otherwise.
   */
  public logoutUser(
    username: string = this.sessionManager().sessionUsername().getOrThrow()
  ): Promise<Try<void, AuthenticationError>> {
    const path = `${this._baseApiPath}/user/${username}/log-out`
    return this._client.post(path).then(
      () => { this.sessionManager().deleteSession(); return Try.success() },
      error => Try.failure(error.response.data as AuthenticationError),
    )
  }

  /**
   * Get the profile information of the specified user from the authentication service.
   *
   * @param username the name of the user.
   * @return a {@link Promise} completing when the request has been served by the authentication service.
   *         The result of the {@link Promise} is a {@link Success} containing a {@link User} if the
   *         operation succeeded or a {@link Failure} caused by an {@link AuthenticationError} otherwise.
   */
  public getUserInformation(
    username: string = this.sessionManager().sessionUsername().getOrThrow()
  ): Promise<Try<User, AuthenticationError>> {
    const path = `${this._baseApiPath}/user/${username}/profile`
    return this._client.get(path).then(
      response => Try.success({ username: username, email: response.data.user.email } as User),
      error => Try.failure(error.response.data as AuthenticationError),
    )
  }

  /**
   * Update the password of the specified user to the specified password in the authentication service.
   *
   * @param newPassword the specified password.
   * @param username the name of the specified user.
   * @return a {@link Promise} completing when the request has been served by the authentication service.
   *         The result of the {@link Promise} is an empty {@link Success} if the operation succeeded or
   *         a {@link Failure} caused by an {@link AuthenticationError} otherwise.
   */
  public updatePassword(
    newPassword: string,
    username: string = this.sessionManager().sessionUsername().getOrThrow()
  ): Promise<Try<void, AuthenticationError>> {
    const path = `${this._baseApiPath}/user/${username}/password`
    const payload = { user: { password: newPassword } }
    return this._client.put(path, payload).then(
      () => Try.success(),
      error => Try.failure(error.response.data as AuthenticationError),
    )
  }
}

/** A manager of sessions for the authentication service. */
export class AuthenticationSessionManager {
  public static readonly SESSION_COOKIE_NAME = "chess-app-session"
  private readonly $cookies = useCookies([AuthenticationSessionManager.SESSION_COOKIE_NAME])

  /** @return the current {@link UserSession} of this user. */
  public session(): Option<UserSession> {
    return Option.of(this.$cookies.get(AuthenticationSessionManager.SESSION_COOKIE_NAME))
  }

  /**
   * @return true if this user is currently authenticated to the authentication service,
   *         false otherwise.
   */
  public isAuthenticated(): boolean { return this.session().present() }

  /**
   * Save the specified {@link UserSession} as the current session of this user.
   * @param session the specified {@link UserSession}.
   */
  public saveSession(session: UserSession): void {
    this.$cookies.set(
      AuthenticationSessionManager.SESSION_COOKIE_NAME, session,
      { expires: new Date(session.token.expiration.$date) },
    )
  }

  /** Delete the current session of this user. */
  public deleteSession(): void {
    this.$cookies.remove(AuthenticationSessionManager.SESSION_COOKIE_NAME)
  }

  /**
   * @return an {@link Option} containing the username of this user if authenticated
   *         to the authentication service; an empty {@link Option} otherwise.
   */
  public sessionUsername(): Option<string> { return this.session().map(_ => _.username) }
}