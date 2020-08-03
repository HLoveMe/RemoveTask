
import Config, { ConfigType } from "../Config";
var path = require("path");
var os = require("os");
const isWindow = os.type() == "Windows_NT";

const transform = (url: string) =>
  isWindow ? url.split(path.sep).join("/") : url;
const projet = path.join(__dirname, "../../");
const new_project = path.join(projet, "new_project")
// 
const root = path.join(__dirname, "../");

const Storage = path.join(root, "Storage");

const Task = path.join(root, "Task");

const errorFile = path.join(Storage, Config.files.error);

const PathConfig = {
  new_project_path: transform(new_project),
  root: transform(root), // dist 工程路径
  storage_root: transform(Storage),
  task_root: transform(Task),
  error_file: transform(errorFile),
  source_url: {
    versioncheck: `http://${Config.ip}/${Config.source.check}`,
    project: `http://${Config.ip}/${Config.source.project}`,
    task: `http://${Config.ip}/${Config.source.task}`,
  },
}
export function updatePathConfig(config:ConfigType){
  PathConfig.source_url = {
    versioncheck: `http://${config.ip}/${config.source.check}`,
    project: `http://${config.ip}/${config.source.project}`,
    task: `http://${config.ip}/${config.source.task}`,
  }
}
export default PathConfig;
