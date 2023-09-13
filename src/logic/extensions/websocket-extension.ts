// MIT License
//
// Copyright (c) 2023 Jahrim Gabriele Cesario
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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