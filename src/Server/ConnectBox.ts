import { CloseMessage, TaskNameMessage, UuidMessage, PingMessage, ClearMessage } from "../Util/MessageConstants";
import { EventEmitter } from "events";
import { Message, MessageType, TaskInfoKeyMessage, PingInfoMessage } from "../WebSocket/SocketMessage";
import { readFileSync } from "fs";
import { join } from "path";
import { MessageFac, ErrorMsgFac } from "../Util/SocketMessageFac";
import { ValidationMessage } from "../Util/ValidationMessage";

declare class IDWebSocket extends WebSocket {
  tag_id: number;
}
var SocketID = 1000;
export class ConnectBox extends EventEmitter {
  uuid: String;
  //支持的任务Names
  task_names: String[];
  //
  task_info: any[];
  //消息类型
  msg_typs: String[];
  compute: any;
  execClient: WebSocket;
  sourceClients: IDWebSocket[] = [];
  constructor(uuid: String, exec: WebSocket) {
    super();
    this.uuid = uuid;
    this.execClient = exec;
    this._addListener(exec);
    // setInterval(() => {
    //   const data = readFileSync(join(__dirname, "message.json"), "utf-8");
    //   this.send(this.execClient, data);
    // }, 5000)
  }

  addSourceClient(source: WebSocket) {
    this._addListener(source);
    const id_socket = source as IDWebSocket;
    SocketID += 1;
    id_socket.tag_id = SocketID;
    this.sourceClients.push(id_socket);
    this.sendClientInfos(true, [source]);
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
    var msg: Message;
    try {
      msg = JSON.parse(ev.data);
      if (ValidationMessage(msg)) {
        this.isExecClient(socket) ?
          this._execSocketOnMessage(socket, msg)
          : this._clientSocketOnMessage(socket, msg);
      } else {
        throw new Error("ConnectBox/onMessage/格式不对")
      }
    } catch (error) {
      this.send(socket, ErrorMsgFac({ id: msg.id } as any, { reason: error.message, data: ev.data }));
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
        this.task_info = _msg.data.task_info;
        this.msg_typs = _msg.data.message_types;
        break;
      case MessageType.TASK:
        //exec-server-client
        const socket_id = msg.socket_id;
        const tar_socket = this.sourceClients.find($1 => ($1 as IDWebSocket).tag_id == socket_id);
        tar_socket && this.send(tar_socket, MessageFac(msg));
        break
    }

    this.sendClientInfos();
  }
  _clientSocketOnMessage(socket: WebSocket, msg: Message) {
    switch (msg.key) {
      case MessageType.PING:
        const p_msg = { ...PingMessage, data: { ...PingMessage.data, compute: this.compute, uuid: this.uuid } };
        this.send(socket, MessageFac(p_msg));
        break
      case MessageType.TASK:
        msg.socket_id = (socket as IDWebSocket).tag_id;
        this.send(this.execClient, MessageFac(msg, true));
    }
  }
  sendTag: NodeJS.Timer;
  sendClientInfos(now: boolean = false, target: WebSocket[] = null) {
    if (this.sendTag && now == false) return;
    const timeout = now ? 0 : 60000;
    this.sendTag = setTimeout(() => {
      (target || this.sourceClients).forEach((socket) => {
        // this.send(socket, MessageFac({
        //   ...UuidMessage,
        //   data: { uuid: this.uuid }
        // }));
        this.task_names && this.send(socket, MessageFac(
          {
            ...TaskNameMessage,
            data: { uuid: this.uuid, task_names: this.task_names, message_types: this.msg_typs, task_info: this.task_info }
          }
        ));
      })
      this.sendTag = null;
    }, timeout)
  }
  onClose(socket: WebSocket, ev: Event) {
    if (this.isExecClient(socket)) {
      this.sourceClients.forEach($1 => this.send($1, MessageFac(CloseMessage(ev.toString()))));
      this.sourceClients.forEach($1 => $1.close());
      socket.close();
      this.emit("close");
    } else {
      this.sourceClients = this.sourceClients.filter($1 => $1 != socket);
      socket.close();
    }
    if (this.sourceClients.length == 0) {
      this.send(this.execClient, MessageFac(ClearMessage))
    }
  };
  onError(socket: WebSocket, ev: Event) {
  };
  send(socket: WebSocket, data: any) {
    data && socket.readyState == 1 && socket.send(data)
  }
}
