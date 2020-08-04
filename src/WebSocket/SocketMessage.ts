
export enum MessageType {
  ERROR = -99, // Exec 发送过来的Error 日志信息 到服务器
  ExecCLOSE=-98, // 服务器发送信息  表明 Exec关闭了
  Normal = 0, 
  PING = 1, //Exec 连续发送心跳信息 到服务器
  UUID = 4, //Exec 发送uuid标识 到服务器
  INFO_KEY = 2, //Exec 发送Task name 到服务器
  CMD_MSG = 200, //CDM消息
  CMD_EXEC = 201,//执行命令
  CMD_CLEAR = 202,//清空指令
}
export declare interface Message {
  key: MessageType,
  date: number;
  id: number;
  data: any;
  name?: string;
  uuid?:String;
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