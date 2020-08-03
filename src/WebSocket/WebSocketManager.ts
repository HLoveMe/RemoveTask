import Config from "../Config";
import { ListenTask } from "../Task/TaskBase";
import { ValidationMessage } from "../Util/ValidationMessage";
import { Message } from "./SocketMessage";
import { MessageFac } from "../Util/SocketMessageFac";
var ws = require("ws");

class WebSocketManager {
  url: string;
  webSocket: WebSocket;
  subscriber: Map<String, ListenTask> = new Map();
  constructor() { }
  onOpen = () => {
    setInterval(() => {
      this.webSocket.send("ping ")
    }, 5000);
    this._ininMessage();
  };
  onMessage = (ev: MessageEvent) => {
    var data: Message;
    var err_info:any;
    try {
      data = JSON.parse(ev.data);
    } catch (err) {
      err_info = { data: ev.data, error: err.stack };
    }
    if (err_info == null && ValidationMessage(data) == false){
      err_info = {data: ev.data,error:"WebSocketManager/onMessage/格式不对"};
    };
    let task:ListenTask = this.subscriber.get(data.name);
    if(err_info == null && task == null) {
      err_info = {data: ev.data,error:"WebSocketManager/onMessage/name不正确"};
    }
    if(err_info){
      return this.send(MessageFac(err_info));
    }
    task.listen(data);
  };
  onClose = () => { };
  onError = (ev: Event) => { };
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
    this.webSocket.onopen = this.onOpen;
    this.webSocket.onmessage = this.onMessage;
    this.webSocket.onclose = this.onClose;
    this.webSocket.onerror = this.onError;
  }
  _ininMessage(){

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
