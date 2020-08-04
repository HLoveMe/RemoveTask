export enum MessageType {
  ERROR = -99,
  Normal = 0,
  PING = 1,
  UUID = 4,
  INFO_KEY = 2,
  MESSAGE_TYPE = 3,
  CMD_MSG = 200, //CDM消息
  CMD_EXEC = 201,//执行命令
  CMD_CLEAR = 202,//清空指令
}