import PathConfig from "../Util/PathRUL";
import Config from "../Config";
import { RequestUuidMessage, LineMessage } from "../Util/MessageConstants";
import { Message, MessageType, UuidMessage, PingInfoMessage, CMDMessage } from "../WebSocket/SocketMessage";
import { MessageFac } from "../Util/SocketMessageFac";
import { EventEmitter } from "events";
import { setInterval } from "timers";
import { TaskMessage } from "./createMesage";

enum ClientEvent {
  on_uuids = "on_uuids",
  on_open = "on_open",
  on_message = "on_message",
  on_close = "on_close",
}

class _ClientSocketManager extends EventEmitter {
  url: string;
  webSocket: WebSocket;
  constructor() { super(); }
  start() {
    this.url = `ws://${Config.ip}:${Config.websoket_id}`
    this.webSocket = new WebSocket(this.url);
    this.webSocket.onopen = this.onOpen.bind(this);
    this.webSocket.onmessage = this.onMessage.bind(this);
    this.webSocket.onclose = this.onClose.bind(this);
    this.webSocket.onerror = this.onError.bind(this);
  }
  onOpen() {
    this.emit(ClientEvent.on_open);
  }
  onMessage(msg: MessageEvent) {
    this.emit(ClientEvent.on_close, msg);
  }
  onClose(ev: CloseEvent) {
    this.emit(ClientEvent.on_close, ev);
  }
  onError() { }

  send(msg: Message) {
    this.webSocket.send(MessageFac(msg));
  }
}


class _InfoManager extends EventEmitter {
  uuids: string[];
  compute: any;
  pwd: string;
  taskMsg:Message[]
  webManager: _ClientSocketManager;
  constructor() {
    super();
    this.taskMsg = [];
    this.webManager = new _ClientSocketManager();
    this.webManager.start();
    this.webManager.on(ClientEvent.on_open, this.on_open.bind(this));
    this.webManager.on(ClientEvent.on_message, this.on_message.bind(this));
    this.webManager.on(ClientEvent.on_close, this.on_close.bind(this));
  }
  lineServeForIp(uuid: string) {
    this.webManager.send(LineMessage(uuid));
  }
  on_open() {
    this.webManager.send(RequestUuidMessage);
    setInterval(() => { this.webManager.send(RequestUuidMessage); }, 10000)
  }

  on_message(ev: MessageEvent) {
    let data = ev.data;
    const msg: Message = JSON.parse(data);

    switch (msg.key) {
      case MessageType.UUID:
        this.uuids = ((msg as UuidMessage).data.uuids || []) as string[];
        break
      case MessageType.PING:
        this.compute = (msg as PingInfoMessage).data.compute;
        break
      case MessageType.TASK:
        //回复
        if (msg.name == TaskMessage.CMDCommandTask) {
          const _data = (msg as CMDMessage).data;
          this.pwd = _data.path as string;
        }
        this.taskMsg.push(msg);
        break
    }

    this.emit("update");
  }
  on_close() {
    this.uuids = [];
    this.compute = null;
  }
}
const InfoManager = new _InfoManager();

export {
  InfoManager,
  ClientEvent
}