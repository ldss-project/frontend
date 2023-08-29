/**
 * The situation of a {@link ChessGameServer}.
 */
export enum ServerSituation {
  /**
   * The {@link ServerSituation} where the {@link ChessGameServer} is
   * waiting for the {@link ChessGame} to be configured.
   */
  NotConfigured = "NotConfigured",
  /**
   * The {@link ServerSituation} where the {@link ChessGameServer} is
   * waiting for enough {@link Player}s to join the {@link ChessGame}.
   */
  WaitingForPlayers = "WaitingForPlayers",
  /**
   * The {@link ServerSituation} where the {@link ChessGameServer} is
   * waiting for the {@link ChessGame} to be started.
   */
  Ready = "Ready",
  /**
   * The {@link ServerSituation} where the {@link ChessGameServer} is
   * listening for actions to be applied to the {@link ChessGame}.
   */
  Running = "Running",
  /**
   * The {@link ServerSituation} where the {@link ChessGameServer} has
   * stopped due to the {@link ChessGame} ending or a fatal exception.
   */
  Terminated = "Terminated",
}