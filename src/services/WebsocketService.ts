class WebSocketService {
  private static instance: WebSocketService | null = null;
  private socket!: WebSocket;
  private url: string;
  private reconnectionDelay = 3000;
  private maxReconnectionDelay = 30000; // Maximum delay to avoid unbounded delay
  private reconnectionAttempts = 0;
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
      this.reconnectionAttempts = 0; // Reset attempts on successful connection
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
        this.reconnect();
      }
    };

    this.socket.onerror = (error) => {
      if (this.onErrorCallback) {
        //@ts-ignore
        this.onErrorCallback(error);
      }
      if (!this.isReconnecting) {
        this.reconnect();
      }
    };
  }

  private reconnect() {
    this.isReconnecting = true;
    this.reconnectionAttempts += 1;

    const delay = Math.min(
      this.reconnectionDelay * Math.pow(2, this.reconnectionAttempts - 1),
      this.maxReconnectionDelay,
    );

    setTimeout(() => {
      this.connect();
      this.isReconnecting = false;
    }, delay);
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
