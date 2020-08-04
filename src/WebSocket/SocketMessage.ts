
export enum MessageType {
  INFO_KEY = 100,
  CMD_EXEC = 200,//执行命令
  CMD_CLEAR = 201,//清空指令
}
export declare interface Message {
  date: number;
  id: number;
  name: string;
  data: any;
}
export declare interface CMDData {
  type:MessageType
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