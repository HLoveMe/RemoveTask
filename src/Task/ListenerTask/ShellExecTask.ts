import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { RemoteMessage } from "../../WebSocket/SocketMessage";
import { parseTask } from "../Util/loadClass";

export default class RemoteListenTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "ShellExecTask";
  date: Date = new Date();
  constructor(app: App) {
    super(app);
  }
  loadRemoteClass(routes: string[]) {
    const remoteTasks = parseTask(routes);
    this.app.addListenTask(remoteTasks);
  }
  async listen(info: RemoteMessage) {
    
  }
}