const ws = require("ws");
import { ConnectBox } from "./ConnectBox";

const IP: number = 8080;
class _TWebServeManage {
  serverSocket:any;
  clientSocket:WebSocket[] = [];
  connectMap: Map<String, ConnectBox> = new Map();
  constructor() {
    this.serverSocket = new ws.Server({ port: IP });
    // this.webSocket.onopen = this.onOpen.bind(this, this.webSocket);
    // this.webSocket.onmessage = this.onMessage.bind(this, this.webSocket);
    // this.webSocket.onclose = this.onClose.bind(this, this.webSocket);
    // this.webSocket.onerror = this.onError.bind(this, this.webSocket);
    this.serverSocket.on("connection",this.onConnection.bind(this));
  }
  onConnection(socket:WebSocket) {
    this.clientSocket.push(socket);
  };
}

export default new _TWebServeManage();


