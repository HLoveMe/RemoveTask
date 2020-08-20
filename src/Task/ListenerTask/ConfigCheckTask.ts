import { Task, TaskStatus, TaskBase, ListenTask, App } from "../Base/TaskBase";
import Config, { ConfigType, updateConfig } from "../../Config";
import PathConfig, { updatePathConfig } from "../../Util/PathRUL";
import { goRequestJson } from "../../Util/SourceRequest";
import { Message } from "../../WebSocket/SocketMessage";
import { ValidationConfig } from "../../Util/ValidationMessage";
import { saveFile } from "../../Util/SaveFile";

/**
 {
    id: 1000,
    key: 1000,
    date: 10000,
    name: "ConfigCheckTask",
    data: {}
  }
  client->server->exec
  exec --> webServer 请求最新 [Static/next_config.json 为最新的配置文件]
 * 
 */
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
  toString() {
    return {
      desc: "Exec 更新配置",
      dome: {
        id: 11,
        key: 1000,
        date: 10000,
        name: "ConfigCheckTask",
        data: {}
      }
    }
  }
}