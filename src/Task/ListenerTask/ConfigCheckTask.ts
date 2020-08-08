import { Task, TaskStatus, TaskBase, ListenTask, App } from "../Base/TaskBase";
import Config, { ConfigType, updateConfig } from "../../Config";
import PathConfig, { updatePathConfig } from "../../Util/PathRUL";
import { goRequestJson } from "../../Util/SourceRequest";
import { Message } from "../../WebSocket/SocketMessage";
import { ValidationConfig } from "../../Util/ValidationMessage";
import { saveFile } from "../../Util/SaveFile";

export default class ConfigCheckTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "ConfigCheckTask";
  date: Date = new Date();
  checkConfig = async () => {
    const result: ConfigType = await goRequestJson(PathConfig.source_url.configcheck);
    if (result && ValidationConfig(result)) {
      const success = await saveFile(JSON.stringify(result, null, 2), PathConfig.config_file);
      if (success) {
        updatePathConfig(result);
        updateConfig(result);
        this.app.reconnect();
      } else {
        this.updateInfo(new Error("文件保存出错"), {
          data: result,
          path: PathConfig.config_file
        })
      }
      return success;
    }
    return false;
  }
  async listen(info: Message) {
    const success = await this.checkConfig();
    this.send({ check_config: success }, info);
  }
}