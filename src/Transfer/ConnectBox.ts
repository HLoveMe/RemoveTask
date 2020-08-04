 
export class ConnectBox {
  tag: String;
  execClient: WebSocket;
  sourceClients: WebSocket[] = [];
  constructor(tag: String, exec: WebSocket) {
    this.tag = tag;
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
  
  onOpen(socket: WebSocket, ev: Event) {
    if(socket == this.execClient){

    }
  };
  onMessage(socket: WebSocket, ev: MessageEvent) { };
  onClose(socket: WebSocket, ev: CloseEvent) { };
  onError(socket: WebSocket, ev: Event) { };
}