var ws = require("ws");
import Config from "../Config";
import { ListenTask } from "../Task/Base/TaskBase";
import { ValidationMessage } from "../Util/ValidationMessage";
import { Message, MessageType, TaskInfoKeyMessage } from "./SocketMessage";
import { MessageFac, ErrorMsgFac } from "../Util/SocketMessageFac";
import { PingMessage, UuidMessage, TaskNameMessage } from "../Util/MessageConstants";

class WebSocketManager {
  app: any;
  url: string;
  webSocket: WebSocket;
  subscriber: Map<String, ListenTask>;
  pingId: NodeJS.Timeout;
  constructor() {
    this.subscriber = new Map();
  }
  onOpen = () => {
    this._uuidMessage();
    this._taskMessage();
    this._Ping();
  };
  onMessage(ev: MessageEvent) {
    try {
      console.log("接收到消息", ev.data);
      var data: Message;
      var err_info: any;
      try {
        data = JSON.parse(ev.data);
      } catch (err) {
        err_info = { data: ev.data, reason: "WebSocketManager/onMessage/data解析错误" };
        return this._send(ErrorMsgFac({ id: -1, key: MessageType.ERROR } as any, err_info))
      }
      if (err_info == null && ValidationMessage(data) == false) {
        err_info = { data: ev.data, errreasonor: "WebSocketManager/onMessage/格式不对" };
        return this._send(ErrorMsgFac({ id: data.id, key: MessageType.ERROR } as any, err_info))
      };
      if (data.key == MessageType.CLEAR) {
        this.subscriber.forEach(task => task.clear())
        return;
      }
      let task: ListenTask = this.subscriber.get(data.name);
      if (err_info == null && task == null) {
        err_info = { data: ev.data, reason: "WebSocketManager/onMessage/name不正确" };
        return this._send(ErrorMsgFac({ id: data.id, key: MessageType.ERROR } as any, err_info))
      }
      task.listen(data);
    } catch (error) {
    }
  };
  onClose(ev: CloseEvent) {
    this.app.reconnect();
  };
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
  _uuidMessage() {
    this.send(UuidMessage);
  }
  _taskMessage() {
    this.send({
      ...TaskNameMessage,
      data: {
        ...TaskNameMessage.data,
        task_names: Array.from(this.subscriber.keys()),
        task_info: Array.from(this.subscriber.values()).map($1 => $1.toString())
      }
    })
  }
  _Ping() {
    this.pingId && clearInterval(this.pingId);
    this.pingId = setInterval(() => this.send(PingMessage), 10000)
  }
  send(msg: Message) {
    var result = MessageFac(msg);
    if (result == null || result == "") {
      result = ErrorMsgFac(msg, "WebSocketManager/send/JSON")
    }
    result && this._send(result);
  }
  _send(data: string) {
    this.webSocket && this.webSocket.readyState == 1 && data && this.webSocket.send(data);
  }
  addEventListeners(...tasks: ListenTask[]) {
    tasks.forEach($1 => {
      $1.app = $1.app || this.app;
      this.subscriber.set($1.name, $1)
    });
    this.webSocket && this._taskMessage();
  }
  removeTask(task: ListenTask) {
    this.subscriber.delete(task.name);
  }
}

export const WebManager = new WebSocketManager();
