const ws = require("ws");
import { ConnectBox } from "./ConnectBox";
import { Message, MessageType, UuidMessage, LinkMessage } from "../WebSocket/SocketMessage";
import Config from "../Config";
import { ValidationMessage } from "../Util/ValidationMessage";
import { MessageFac, ErrorMsgFac } from "../Util/SocketMessageFac";
import * as MessageConstants from "../Util/MessageConstants";

// const IP: number = 8080;
/**
 * Server    client
 *  <----Connect----
 *  -----Info---->uuid task types
 *  <---Link-----
 *  -----Ping--->
 *  -----Ping--->
 *  -----Ping--->
 */
class _TWebServeManager {
  serverSocket: any;
  clientSocket: Set<WebSocket> = new Set();
  tastKey: Set<String> = new Set();
  connectMap: Map<String, ConnectBox> = new Map();
  constructor() { }
  start() {
    // console.log("object1", { port: Config.websoket_id, host: Config.ip }, this.onConnection)
    this.serverSocket = new ws.Server({ port: Config.websoket_id, host: Config.ip });
    this.serverSocket.on("connection", (ws) => this.onConnection(ws));
  }
  onConnection(socket: WebSocket) {
    this.clientSocket = new Set(Array.from(this.clientSocket.values()).filter($1 => $1.readyState == 1));
    socket.onmessage = this.onMessage.bind(this, socket);
    this.clientSocket.add(socket);
  }
  onMessage(socket: WebSocket, ev: MessageEvent) {
    console.log("1111222", ev.data);
    try {
      var msg: Message = JSON.parse(ev.data);
      if (ValidationMessage(msg)) {
        if (msg.key == MessageType.UUID) {
          const uuid = (msg as UuidMessage).data.uuid;
          this.creteBox(uuid, socket);
        } else if (msg.key == MessageType.LINK) {
          const uuid = (msg as LinkMessage).data.uuid;
          const has = this.tastKey.has(uuid)
          if (has) {
            this.connectMap.get(uuid).addSourceClient(socket);
            this.clientSocket.delete(socket);
          }
        } else if (msg.key == MessageType.REQUEST_UUID) {
          this.sendUuidMsg(socket);
        }
      } else {
        throw new Error("无效消息");
      }
    } catch (error) {
      socket.send(ErrorMsgFac({} as any, { reason: error.message, data: ev.data }, ""));
    }
  }
  sendUuidMsg(socket: WebSocket) {
    const U_msg = MessageConstants.UuidMessage;
    const msg = {
      ...U_msg,
      data: {
        uuid: null,
        uuids: Array.from(this.connectMap.values()).map($1 => $1.uuid)
      }
    };
    socket.send(MessageFac(msg));
  }
  creteBox(uuid: String, socket: WebSocket) {
    console.log(21212);
    socket.onmessage = null;
    this.tastKey.add(uuid);
    this.clientSocket.delete(socket);
    const box = new ConnectBox(uuid, socket);
    this.connectMap.set(uuid, box);
    box.addListener("close", () => this.execRemove(box))
  }
  closeSocket(socket: WebSocket) {
    socket.close();
    socket = null;
  }
  execRemove(box: ConnectBox) {
    this.tastKey.delete(box.uuid);
    box.sourceClients.forEach($1 => this.clientSocket.delete($1));
    this.connectMap.delete(box.uuid);
  }
}

export default new _TWebServeManager();