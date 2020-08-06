const ws = require("ws");
import { ConnectBox } from "./ConnectBox";
import { Message, MessageType, UuidMessage } from "../WebSocket/SocketMessage";
import Config from "../Config";

// const IP: number = 8080;
class _TWebServeManage {
  serverSocket: any;
  clientSocket: WebSocket[] = [];
  tastKey: Set<String> = new Set();
  connectMap: Map<String, ConnectBox> = new Map();
  constructor() {
  }
  start() {
    this.serverSocket = new ws.Server({ port: Config.ip });
    this.serverSocket.on("connection", this.onConnection.bind(this));
  }
  onConnection(socket: WebSocket) {
    socket.onmessage = this.onMessage.bind(this, socket);
    this.clientSocket.push(socket);
  }
  onMessage(socket: WebSocket, ev: MessageEvent) {
    try {
      var msg: Message = JSON.parse(ev.data);
      if (msg.key == MessageType.UUID) {
        const uuid = (msg as UuidMessage).data.uuid;
      } else if (msg.key == MessageType.LINK) {

      }
    } catch (error) {

    }
  }
}

export default new _TWebServeManage();


