import Config from "../Config";
import { ListenTask } from "../Task/TaskBase";
import { ValidationMessage } from "../Util/ValidationMessage";
import { Message, MessageType } from "./SocketMessage";
import { MessageFac } from "../Util/SocketMessageFac";
var ws = require("ws");
class WebSocketManager {
  url: string;
  webSocket: WebSocket;
  subscriber: Map<String, ListenTask>;
  pingId: NodeJS.Timeout;
  constructor() {
    this.subscriber = new Map();
  }
  onOpen = () => {
    this._ininMessage();
    this._Ping();
  };
  onMessage(ev: MessageEvent) {
    console.log("接收到消息", ev.data);
    var data: Message;
    var err_info: any;
    try {
      data = JSON.parse(ev.data);
    } catch (err) {
      err_info = { data: ev.data, error: "WebSocketManager/onMessage/data解析错误" };
      return this.send(MessageFac(err_info));
    }
    if (err_info == null && ValidationMessage(data) == false) {
      err_info = { data: ev.data, error: "WebSocketManager/onMessage/格式不对" };
      return this.send(MessageFac(err_info));
    };
    let task: ListenTask = this.subscriber.get(data.name);
    if (err_info == null && task == null) {
      err_info = { data: ev.data, error: "WebSocketManager/onMessage/name不正确" };
      return this.send(MessageFac(err_info));
    }
    task.listen(data);
  };
  onClose() { };
  onError(ev: Event) { };
  clear() {
    if (this.webSocket) {
      this.webSocket.close();
      this.webSocket = null;
      this.url = null;
      this.subscriber.clear();
    }
  }
  start() {
    this.clear();
    this.url = `ws://${Config.ip}:${Config.websoket_id}`;
    this.webSocket = new ws(this.url);
    this.webSocket.onopen = this.onOpen.bind(this);
    this.webSocket.onmessage = this.onMessage.bind(this);
    this.webSocket.onclose = this.onClose.bind(this);
    this.webSocket.onerror = this.onError.bind(this);
  }
  _ininMessage() {
    this.send(MessageFac({
      task_names: Array.from(this.subscriber.keys()),
      message_types: Object.keys(MessageType)
    }, MessageType.INFO_KEY));
  }
  _Ping() {
    this.pingId && clearInterval(this.pingId);
    this.pingId = setInterval(() => { this.send(MessageFac({ ping: 99 }, MessageType.PING)) }, 10000)
  }
  send(data: string) {
    this.webSocket && data && this.webSocket.send(data);
  }
  addEventListeners(...tasks: ListenTask[]) {
    tasks.forEach($1 => this.subscriber.set($1.name, $1))
  }
  removeTask(task: ListenTask) {
    this.subscriber.delete(task.name);
  }
}

export const WebManager = new WebSocketManager();
