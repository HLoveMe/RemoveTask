
export enum MessageType {
  ERROR = -99,
  Normal = 0,
  PING = 1,
  INFO_KEY = 2,
  MESSAGE_TYPE = 3,
  CMD_MSG = 200, //CDM消息
  CMD_EXEC = 201,//执行命令
  CMD_CLEAR = 202,//清空指令
}
export declare interface Message {
  key: MessageType,
  date: number;
  id: number;
  name: string;
  data: any;
}
export declare interface CMDData {
  type: MessageType
  path: String;
  id: String;
  timeout: number
  cmd: String;
  args: String[];
  // single:boolean;
}

export declare interface CMDMessage extends Message {
  data: CMDData;
}

export declare interface RemoteDate {
  context: String;
  name: String;
}
export declare interface RemoteMessage extends Message {
  data: RemoteDate[];
}