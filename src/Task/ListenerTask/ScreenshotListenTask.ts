import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { ShellMessage } from "../../WebSocket/SocketMessage";

export default class ScreenshotListenTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "ScreenshotListenTask";
  date: Date = new Date();
  constructor(app: App) {
    super(app);
  }
  async listen(info: ShellMessage) {
    
  }
}