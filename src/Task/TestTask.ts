import { Task, TaskStatus, TaskBase, ListenTask, App } from "./TaskBase";
import Config from "../Config";
import PathConfig from "../Util/PathRUL";
import { goRequestJson } from "../Util/SourceRequest";
import { Message } from "../WebSocket/SocketMessage";

export class TestTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "TestTask";
  date: Date = new Date();
  async listen(info: Message) {

  }
}