class WebSocketService {
  private static instance: WebSocketService | null = null;
  private socket!: WebSocket;
  private url: string;
  private reconnectionDelay = 3000;
  private isReconnecting = false;
  private onOpenCallback: (() => void) | null = null;
  private onCloseCallback: (() => void) | null = null;
  private onMessageCallback: ((message: string) => void) | null = null;
  private onErrorCallback: ((error: ErrorEvent) => void) | null = null;

  private constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.isReconnecting = false;
      if (this.onOpenCallback) {
        this.onOpenCallback();
      }
    };

    this.socket.onmessage = (event) => {
      if (this.onMessageCallback) {
        this.onMessageCallback(event.data);
      }
    };

    this.socket.onclose = () => {
      if (this.onCloseCallback) {
        this.onCloseCallback();
      }

      if (!this.isReconnecting) {
        this.isReconnecting = true;
        setTimeout(() => {
          this.connect();
        }, this.reconnectionDelay);
      }
    };
    //@ts-ignore
    this.socket.onerror = (error: any) => {
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }

      if (!this.isReconnecting) {
        this.isReconnecting = true;
        setTimeout(() => {
          this.connect();
        }, this.reconnectionDelay);
      }
    };
  }

  public static getInstance(url: string): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(url);
    }
    return WebSocketService.instance;
  }

  public sendMessage(message: string) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not open.');
    }
  }

  public onOpen(callback: () => void) {
    this.onOpenCallback = callback;
  }

  public onClose(callback: () => void) {
    this.onCloseCallback = callback;
  }

  public onMessage(callback: (message: string) => void) {
    this.onMessageCallback = callback;
  }

  public onError(callback: (error: ErrorEvent) => void) {
    this.onErrorCallback = callback;
  }

  public close() {
    this.isReconnecting = false;
    if (this.socket) {
      this.socket.close();
    }
    WebSocketService.instance = null;
  }
}

export default WebSocketService;
