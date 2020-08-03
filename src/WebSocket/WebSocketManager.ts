import Config from "../Config";
var ws = require("ws");
class WebSocketManager {
  url: string;
  webSocket: WebSocket;
  constructor() {}
  onOpen = () => { 
    setInterval(()=>{
      this.webSocket.send("ping ")
    },5000)
  };
  onMessage = (ev: MessageEvent) => { };
  onClose = () => { };
  onError = (ev: Event) => {
    throw new Error("Socket");
  };
  start() {
    this.url = `ws://${Config.ip}:${Config.websoket_id}`;
    this.webSocket = new ws(this.url);
    this.webSocket.onopen = this.onOpen;
    this.webSocket.onmessage = this.onMessage;
    this.webSocket.onclose = this.onClose;
    this.webSocket.onerror = this.onError;
  }
  addEventListener(){

  }
}

export const WebManager = new WebSocketManager();
