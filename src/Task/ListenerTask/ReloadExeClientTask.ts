
import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { Message } from "../../WebSocket/SocketMessage";

// 重启任务
// {id:1000,key:1000,date:10000,name:"ReloadExeClient",data:{}}
export default class ReloadExeClient extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "ReloadExeClient";
  date: Date = new Date();
  constructor(app: App) {
    super(app);
  }
  async listen(info: Message) {
    this.app.reload();
  }
}