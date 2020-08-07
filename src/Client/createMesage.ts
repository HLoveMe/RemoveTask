import { MessageType, Message, CMDData } from "../WebSocket/SocketMessage";
import { RequestUuidMessage } from "../Util/MessageConstants";
const uuidv4 = require('uuid/v4');
enum TaskMessage {
  ConfigCheckTask = "ConfigCheckTask",
  RemoteListenTask = "RemoteListenTask",
  CMDCommandTask = "CMDCommandTask",
  UploadFileTask = "UploadFileTask",
}

const taskMap: Map<string, Message> = new Map();
Object.keys(TaskMessage).forEach($1 => $1.indexOf("Task") >= 0 && taskMap.set(TaskMessage[$1], { get id() { return uuidv4() }, key: MessageType.Normal, name: TaskMessage[$1], data: null, date: null } as Message))


function CreateTaskMessage(data: any, type: TaskMessage): Message {
  const basetask = taskMap.get(type);
  return {
    ...basetask,
    date: new Date().getTime(),
    data
  }
}


export {
  TaskMessage,
  CreateTaskMessage
}