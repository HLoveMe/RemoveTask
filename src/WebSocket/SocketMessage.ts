
export enum MessageType {
  ERROR = -99, // Exec 发送过来的Error 日志信息 到服务器
  ExecCLOSE = -98, // server-client  表明 Exec关闭了
  Normal = 0,
  PING = 1, //Exec-->server 连续发送心跳信息 到服务器 | client -->server 请求Ping 
  UUID = 4, //Exec -server 发送uuid标识 到服务器 | 服务费 server-client
  REQUEST_UUID = 7,// client-server 请求uuids信息
  INFO_KEY = 2, //Exec -server 发送Task name 到服务器 | 服务费 server-client
  LINK = 5,//client - server 请求连接Exec
  TASK = 1000,//task message client  <-> server <-> exec
}
export enum CMDMessageType {
  CMD_MSG = 200, //clinet->exec CDM消息
  CMD_EXEC = 201,//clinet->exec执行命令
  CMD_CLEAR = 202,//clinet->exec清空指令
}
export declare interface Message {
  id: number;
  key: MessageType,
  date: number;
  data: any;
  name?: string;
  socket_id?: number;
}
export interface ExexResult {
  id: String;
  sep: String;
  last_path: String;
  close_code: number;
  message: any;
  exec_error: String;
  exit_code: number;
  stderr: any[];
  stdout: any[];
  error: String;
}
export declare interface BaseData {
  uuid: String;
  result?:any;
}
export declare interface TaskInfoData extends BaseData {
  task_names: String[];
  message_types: String[];
}
export declare interface TaskInfoKeyMessage extends Message {
  data: TaskInfoData
}
export declare interface UuidData extends BaseData {
  uuids?: String[]
}
export declare interface UuidMessage extends Message {
  data: UuidData
}
export declare type LinkMessage = UuidMessage/*  */;

export declare interface CMDData extends BaseData {
  type: CMDMessageType
  path: String;
  id: String;
  timeout: number
  cmd: String;
  args: String[];
  // single:boolean;
  result?:ExexResult
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
  name?:String;//指定名称
}
export declare interface FileUplodMessage extends Message {
  data: UploadData
}

export declare interface ErrorInfo {
  reason: String;
  data: String;
}
export declare interface ErrorInfoData extends BaseData {
  error: ErrorInfo
}
export declare interface ErrorInfoMessage extends Message {
  data: ErrorInfoData
}

export declare interface ShellData{
  bin?:string;
  shell:string;
}
export declare interface ShellMessage extends Message{
  data:ShellData;
}