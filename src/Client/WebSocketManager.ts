import { RequestUuidMessage, LineMessage, PingMessage } from "../Util/MessageConstants";
import { MessageFac } from "../Util/SocketMessageFac";
import { Message, MessageType, UuidMessage, PingInfoMessage, CMDMessage, TaskInfoData, TaskInfoKeyMessage } from "../WebSocket/SocketMessage";
import { EventEmitter } from "events"
import { TaskMessage } from "./createMesage";
const Config = require("../../Static/config.json")

enum ClientEvent {
  on_uuids = "on_uuids",
  on_open = "on_open",
  on_message = "on_message",
  on_close = "on_close",
}
declare type Path = Array<Set<String>>;

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
    this.emit(ClientEvent.on_message, msg);
  }
  onClose(ev: CloseEvent) {
    this.emit(ClientEvent.on_close, ev);
  }
  onError() { }

  send(msg: Message) {
    this.webSocket && this.webSocket.readyState == 1 && this.webSocket.send(MessageFac(msg));
  }
  clear() {
    this.webSocket.close();
    this.webSocket = null;
  }
}


class InfoManager extends EventEmitter {
  uuid: string;
  uuids: string[];
  compute: any;
  pwd: string;
  msgList: Message[]
  infoData: TaskInfoData;
  webManager: _ClientSocketManager;
  sysPath: Path;
  interval:any;
  constructor() {
    super();
  }
  init() {
    this.msgList = [];
    this.uuids = null;
    this.uuid = null;
    this.compute = null;
    this.pwd = null;
    this.infoData = null;
    this.interval = null;
    this.sysPath = [];
  }
  connect() {
    this.init();
    this.webManager && this.webManager.clear();
    this.webManager = new _ClientSocketManager();
    this.webManager.start();
    this.webManager.on(ClientEvent.on_open, this.on_open.bind(this));
    this.webManager.on(ClientEvent.on_message, this.on_message.bind(this));
    this.webManager.on(ClientEvent.on_close, this.on_close.bind(this));
  }
  connecrServeForMac(uuid: string) {
    this.uuid = uuid;
    this.webManager.send(LineMessage(uuid));
  }
  on_open() {
    this.interval && clearInterval(this.interval);
    this.webManager.send(RequestUuidMessage);
    this.interval = setInterval(() => {
      this.webManager.send(RequestUuidMessage);
      this.webManager.send(PingMessage);
    }, 10000)
  }
  handlePathMsg(route: String, sep: string) {
    const paths: string[] = [sep];
    paths.push(...route.split(sep).filter($1 => $1.length >= 1));
    paths.forEach((_path, index) => {
      const jh = this.sysPath[index] || new Set();
      jh.add(_path);
      this.sysPath[index] = jh;
    })
  }
  on_message(ev: MessageEvent) {
    let data = ev.data;
    const msg: Message = JSON.parse(data);
    console.log(1111, msg);
    switch (msg.key) {
      case MessageType.UUID:
        this.uuids = ((msg as UuidMessage).data.uuids || []) as string[];
        break
      case MessageType.PING:
        this.compute = (msg as PingInfoMessage).data.compute;
        break
      case MessageType.INFO_KEY:
        this.infoData = (msg as TaskInfoKeyMessage).data;
        break
      case MessageType.TASK:
        //回复
        if (msg.name == TaskMessage.CMDCommandTask) {
          const _data = (msg as CMDMessage).data;
          this.pwd = _data.result.last_path as string;
          this.handlePathMsg(_data.result.last_path, _data.result.sep as string)
        }
        break
    }
    this.msgList.push(msg);
    this.emit("update");
  }
  on_close() {
    this.uuids = [];
    this.compute = null;
  }
}

export {
  InfoManager,
  ClientEvent
}