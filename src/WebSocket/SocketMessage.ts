
export enum MessageType {
  ERROR = -99, // Exec 发送过来的Error 日志信息 到服务器
  ExecCLOSE = -98, // server-client  表明 Exec关闭了
  Normal = 0,
  PING = 1, //Exec -server 连续发送心跳信息 到服务器
  UUID = 4, //Exec -server 发送uuid标识 到服务器 | 服务费 server-client
  INFO_KEY = 2, //Exec -server 发送Task name 到服务器 | 服务费 server-client
  LINK = 5,//client - server 请求连接Exec
  FILEUP = 6,// client->exec  exec上报info
  CMD_MSG = 200, //clinet->exec CDM消息
  CMD_EXEC = 201,//clinet->exec执行命令
  CMD_CLEAR = 202,//clinet->exec清空指令
}
export declare interface Message {
  key: MessageType,
  date: number;
  id: number;
  data: any;
  name?: string;
  // uuid?:String;
}
export declare interface BaseData {
  uuid: String;
}
export declare interface TaskInfoData extends BaseData {
  task_names: String[];
  message_types: String[];
}
export declare interface TaskInfoKeyMessage extends Message {
  data: TaskInfoData
}
export declare interface UuidData extends BaseData {
  uuids?:String[]
}
export declare interface UuidMessage extends Message {
  data: UuidData
}
export declare type LinkMessage = UuidMessage/*  */;

export declare interface CMDData extends BaseData {
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
declare type Base64String = String;
export declare interface RemoteDate extends BaseData {
  context: Base64String;
  name: String;
}
export declare interface RemoteMessage extends Message {
  data: RemoteDate[];
}

export declare interface PingData extends BaseData {
  compute: any;
}
export declare interface PingInfoMessage extends Message {
  data: PingData
}

export declare interface UploadData extends BaseData {
  path: String;
}
export declare interface FileUplodMessage extends Message {
  data: UploadData
}

export declare interface ErrorInfo{
  reason:String;
  data:String;
}
export declare interface ErrorInfoData extends BaseData{
  error:ErrorInfo
}
export declare interface ErrorInfoMessage extends Message{
  data:ErrorInfoData
}