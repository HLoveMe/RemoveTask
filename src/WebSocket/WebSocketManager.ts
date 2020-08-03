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
  constructor() {
    this.subscriber = new Map();
  }
  onOpen = () => {
    setInterval(() => {
      this.webSocket.send("ping ")
    }, 5000);
    this._ininMessage();
  };
  onMessage(ev: MessageEvent) {
    console.log("接收到消息",ev.data);
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
    this.webSocket.send(MessageFac(Array.from(this.subscriber.keys()), MessageType.INFO_KEY));
    // this.send(MessageFac(Array.from(this.subscriber.keys()), MessageType.INFO_KEY));
  }
  send(data: string) {
    console.log("data", data);
    // this.webSocket && data && this.webSocket.send(data);
  }
  addEventListeners(...tasks: ListenTask[]) {
    tasks.forEach($1 => this.subscriber.set($1.name, $1))
  }
  removeTask(task: ListenTask) {
    this.subscriber.delete(task.name);
  }
}

export const WebManager = new WebSocketManager();
