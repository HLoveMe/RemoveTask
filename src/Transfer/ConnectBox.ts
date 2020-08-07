import { CloseMessage } from "../Util/MessageConstants";
import { EventEmitter } from "events";
import { Message, MessageType } from "../WebSocket/SocketMessage";

export class ConnectBox extends EventEmitter {
  uuid: String;
  execClient: WebSocket;
  sourceClients: WebSocket[] = [];
  constructor(uuid: String, exec: WebSocket) {
    super();
    this.uuid = uuid;
    this.execClient = exec;
    this._addListener(exec);
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
      this.isExecClient(socket) ?
        this._execSocketOnMessage(socket, ev)
        : this._clientSocketOnMessage(socket, ev);
    } catch (error) {

    }
  };
  _execSocketOnMessage(socket: WebSocket, ev: Event) {

  }
  _clientSocketOnMessage(socket: WebSocket, ev: Event) {

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
    this.onClose(socket, ev);
  };
  send(socket: WebSocket, data: any) {
    socket.send(JSON.stringify(data || {}))
  }
}