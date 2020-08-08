
import Config, { ConfigType } from "../Config";
var path = require("path");
var os = require("os");
const isWindow = os.type() == "Windows_NT";

const transform = (url: string) =>
  isWindow ? url.split(path.sep).join("/") : url;
const projet = path.join(__dirname, "..", "..");
const new_project = path.join(projet, "new_project")
// 
const root = path.join(__dirname, "..");
const Static = path.join(root, "..", "Static");

const Storage = path.join(root, "Storage");

const ConfigFile = path.join(Static, "config.json")

const Task = path.join(root, "Task");

const errorFile = path.join(Storage, Config.files.error);

const PathConfig = {
  new_project_path: transform(new_project),
  root: transform(root), // dist 工程路径
  static_dir: Static,
  config_file: transform(ConfigFile),
  storage_root: transform(Storage),
  task_root: transform(Task),
  error_file: transform(errorFile),
  /***
  configcheck:'http://127.0.0.1/project/config', //配置json
  fileupload:'http://127.0.0.1/project/fileupload',//文件上传
  project:'http://127.0.0.1/project/source.zip'//下载工程文件
  versioncheck:'http://127.0.0.1/project/check' //版本检查
   */
  source_url: {
    versioncheck: `http://${Config.ip}:${Config.server_ip}/${Config.source.check}`,
    configcheck: `http://${Config.ip}:${Config.server_ip}/${Config.source.config}`,
    project: `http://${Config.ip}:${Config.server_ip}/${Config.source.project}`,
    fileupload: `http://${Config.ip}:${Config.server_ip}/${Config.source.upload}`,
  },
}
export function updatePathConfig(config: ConfigType) {
  PathConfig.source_url = {
    versioncheck: `http://${config.ip}:${Config.server_ip}/${config.source.check}`,
    project: `http://${config.ip}:${Config.server_ip}/${config.source.project}`,
    configcheck: `http://${config.ip}:${Config.server_ip}/${config.source.config}`,
    fileupload: `http://${Config.ip}:${Config.server_ip}/${Config.source.upload}`,
  }
}
export default PathConfig;
