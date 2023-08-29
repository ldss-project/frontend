/**
 * A client for communicating via the websocket protocol.
 */
export class WebSocketClient extends WebSocket {
  constructor(url: string | URL, protocols?: string | string[]) {
    super(url, protocols)
  }

  /**
   * Set the specified handler to be executed when this socket is opened.
   *
   * @param callback the specified handler.
   * @return this.
   */
  public onOpen(callback: (event: Event) => void): this { this.onopen = callback; return this; }
  /**
   * Set the specified handler to be executed when this socket receives a message.
   *
   * @param callback the specified handler.
   * @return this.
   */
  public onMessage(callback: (message: MessageEvent) => void): this { this.onmessage = callback; return this; }
  /**
   * Set the specified handler to be executed when this socket throws an error.
   * @param callback the specified handler.
   * @return this.
   */
  public onError(callback: (event: Event) => void): this { this.onerror = callback; return this; }
  /**
   * Set the specified handler to be executed when this socket is closed.
   *
   * @param callback the specified handler.
   * @return this.
   */
  public onClose(callback: (event: CloseEvent) => void): this { this.onclose = callback; return this; }
}