import { InfoUpdateManager } from "../ErrorManager";
import { WebManager } from "../WebSocket/WebSocketManager";
import { Message } from "../WebSocket/SocketMessage";
import { MessageFac } from "../Util/SocketMessageFac";
export interface App {
  reload: Function
  reconnect: Function
}

export enum TaskStatus {
  Prepare = 0,//"准备中",
  Doing = 1,//"进行中",
  Success = 2,//"完成",
  Fail = 3,//"失败"
  Reload = 4,//强制重启
  ReSocket = 5,//重启Socket
}

export interface Task {
  status: TaskStatus;
  name: String;
  date: Date;
  do(): Promise<TaskStatus>;
}

export interface TaskQueue {
  list: Array<Task>;
  do(): Promise<TaskStatus[]>;
}

export class TaskBase implements Task {
  status: TaskStatus;
  name: String;
  date: Date;
  do(): Promise<TaskStatus> {
    throw new Error("Method not implemented.");
  }
  updateInfo(error: Error, info: any = null) {
    InfoUpdateManager.update(error, {
      name: this.name,
      status: this.status,
      date: this.date,
      info: typeof info == 'object' ? info : { info: info }
    })
  }
}


export class ListenTask extends TaskBase {
  app: App;
  status: TaskStatus;
  name: String;
  date: Date;
  async do(): Promise<TaskStatus> { return TaskStatus.Success; }
  constructor(app: App) {
    super();
    this.app = app;
  }
  async listen(info: Message) { }
  send(data: Object) {
    var res = MessageFac(data);
    if (res.length == 0) {
      this.updateInfo(new Error("Json 解析失败 ListenTask/send"));
      return
    }
    WebManager.send(res)
  }
}