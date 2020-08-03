import { Task, TaskStatus, TaskBase, ListenTask, App } from "./TaskBase";
import Config from "../Config";
import PathConfig from "../Util/PathRUL";
import { goRequestJson } from "../Util/SourceRequest";
import { Message } from "../WebSocket/SocketMessage";

export class ConfigCheckTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "ConfigCheckTask";
  date: Date = new Date();
  constructor(app: App) {
    super();
    this.app = app;
  }
  checkConfig = async () => {
    const result = await goRequestJson(PathConfig.source_url.configcheck);
    if (result == null) return false;
    const current = parseInt(Config.version);
    const remote = parseInt(result.version);
    if (remote > current) {
      return true;
    }
    return false;
  }
  downloadConfig = async () => {
    return true;
  }
  listen(info: Message) {

  }
}