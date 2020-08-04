const ws = require("ws");
import { ConnectBox } from "./ConnectBox";
import { Message, MessageType, UuidMessage } from "../WebSocket/SocketMessage";

const IP: number = 8080;
class _TWebServeManage {
  serverSocket: any;
  clientSocket: WebSocket[] = [];
  tastKey: Set<String> = new Set();
  connectMap: Map<String, ConnectBox> = new Map();
  constructor() {
    this.serverSocket = new ws.Server({ port: IP });
    // this.webSocket.onopen = this.onOpen.bind(this, this.webSocket);
    // this.webSocket.onmessage = this.onMessage.bind(this, this.webSocket);
    // this.webSocket.onclose = this.onClose.bind(this, this.webSocket);
    // this.webSocket.onerror = this.onError.bind(this, this.webSocket);
    this.serverSocket.on("connection", this.onConnection.bind(this));
  }
  onConnection(socket: WebSocket) {
    socket.onmessage = this.onMessage.bind(this, socket);
    this.clientSocket.push(socket);
  }
  onMessage(socket: WebSocket, ev: MessageEvent) {
    try {
      var msg: Message = JSON.parse(ev.data);
      if(msg.key == MessageType.UUID){
          const uuid  = (msg as UuidMessage).data.uuid;
      }else if(msg.key == MessageType.LINK){
        
      }
    } catch (error) {

    }
  }
}

export default new _TWebServeManage();


