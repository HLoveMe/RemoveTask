import { CloseMessage } from "../Util/MessageConstants";
import { EventEmitter } from "events";
import { Message, MessageType, TaskInfoKeyMessage, PingInfoMessage } from "../WebSocket/SocketMessage";
import { readFileSync } from "fs";
import { join } from "path";

export class ConnectBox extends EventEmitter {
  uuid: String;
  //支持的任务Names
  task_names: String[];
  //消息类型
  msg_typs: String[];
  compute: any;
  execClient: WebSocket;
  sourceClients: WebSocket[] = [];
  constructor(uuid: String, exec: WebSocket) {
    super();
    this.uuid = uuid;
    this.execClient = exec;
    this._addListener(exec);

    setInterval(() => {
      const data = readFileSync(join(__dirname, "message.json"), "utf-8");
      this.send(this.execClient, data);
    }, 5000)
  }

  addSourceClient(source: WebSocket) {
    this._addListener(source);
    this.sourceClients.push(source);
  }
  _addListener(socket: WebSocket) {
    socket.onopen = this.onOpen.bind(this, socket);
    socket.onmessage = this.onMessage.bind(this, socket);
    socket.onclose = this.onClose.bind(this, socket);
    socket.onerror = this.onError.bind(this, socket);
  }
  isExecClient(socket: WebSocket) {
    return socket == this.execClient;
  }
  onOpen(socket: WebSocket, ev: MessageEvent) { };
  onMessage(socket: WebSocket, ev: MessageEvent) {
    try {
      const msg = JSON.parse(ev.data);
      console.log(11, msg)
      this.isExecClient(socket) ?
        this._execSocketOnMessage(socket, msg)
        : this._clientSocketOnMessage(socket, msg);
    } catch (error) {

    }
  };
  _execSocketOnMessage(socket: WebSocket, msg: Message) {
    switch (msg.key) {
      case MessageType.PING:
        this.compute = (msg as PingInfoMessage).data.compute;
        break
      case MessageType.UUID: break;
      case MessageType.INFO_KEY:
        const _msg = msg as TaskInfoKeyMessage;
        this.task_names = _msg.data.task_names;
        this.msg_typs = _msg.data.message_types;
        break;
    }

  }
  _clientSocketOnMessage(socket: WebSocket, msg: Message) {

  }
  onClose(socket: WebSocket, ev: Event) {
    if (this.isExecClient(socket)) {
      this.sourceClients.forEach($1 => this.send($1, CloseMessage(ev.toString())));
      this.sourceClients.forEach($1 => $1.close());
      socket.close();
      this.emit("close");
    } else {
      this.sourceClients = this.sourceClients.filter($1 => $1 != socket);
      socket.close();
    }
  };
  onError(socket: WebSocket, ev: Event) {
    // this.onClose(socket, ev);
  };
  send(socket: WebSocket, data: any) {
    data && socket.readyState == 1 && socket.send(data)
  }
}