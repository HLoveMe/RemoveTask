import { Message } from "../WebSocket/SocketMessage";


class LocalInfoData {
  id: number;
  date: Date;
  uuid: String;
  key: number;
  msg_id: number;
  data: String;
  constructor(msg: Message) {
    this.date = new Date();
    this.uuid = (msg.data as any).uuid;
    this.key = msg.key;
    this.msg_id = msg.id;
    this.data = JSON.stringify(msg);
  }
}
class _BaseDataManage {
  addMsg(data: Message) {

  }
}

const DataManager = new _BaseDataManage();
export {
  LocalInfoData,
  DataManager
}