import { TaskStatus,ListenTask, App } from "./TaskBase";
import { RemoteMessage } from "../WebSocket/SocketMessage";



export class RemoteListenTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "RemoteListenTask";
  date: Date = new Date();

  async listen(info: RemoteMessage) {
    
  }
}