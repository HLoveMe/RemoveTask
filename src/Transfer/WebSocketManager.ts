const ws = require("ws");
import { ConnectBox } from "./ConnectBox";
import { Message, MessageType, UuidMessage, PingInfoMessage } from "../WebSocket/SocketMessage";
import Config from "../Config";
import { ValidationMessage } from "../Util/ValidationMessage";

// const IP: number = 8080;
class _TWebServeManager {
  serverSocket: any;
  clientSocket: Map<String, WebSocket> = new Map();
  tastKey: Set<String> = new Set();
  connectMap: Map<String, ConnectBox> = new Map();
  constructor() { }
  start() {
    console.log("object1", { port: Config.websoket_id, host: Config.ip }, this.onConnection)
    this.serverSocket = new ws.Server({ port: Config.websoket_id, host: Config.ip });
    this.serverSocket.on("connection", (ws) => this.onConnection(ws));
  }
  onConnection(socket: WebSocket) {
    socket.onmessage = this.onMessage.bind(this, socket);
    this.clientSocket.set(socket.url, socket);

  }
  onMessage(socket: WebSocket, ev: MessageEvent) {
    try {
      var msg: Message = JSON.parse(ev.data);
      if (ValidationMessage(msg)) {
        if (msg.key == MessageType.UUID) {
          const uuid = (msg as UuidMessage).data.uuid;
          this.creteBox(uuid, socket);
        } else if (msg.key == MessageType.LINK) {
          const uuid = (msg as PingInfoMessage).data.uuid;
          const has = this.tastKey.has(uuid)
          if (has) {
            this.connectMap.get(uuid).addSourceClient(socket);
            this.clientSocket.delete(socket.url);
          }
        }
      }
    } catch (error) {
      
    }
  }

  creteBox(uuid: String, socket: WebSocket) {
    this.tastKey.add(uuid);
    const box = new ConnectBox(uuid, socket);
    this.connectMap.set(uuid, box);
    box.addListener("close", () => this.execRemove(box))
  }
  execRemove(box: ConnectBox) {
    this.tastKey.delete(box.uuid);
    box.sourceClients.forEach($1 => this.clientSocket.delete($1.url));
    this.connectMap.delete(box.uuid);
  }
}

export default new _TWebServeManager();


