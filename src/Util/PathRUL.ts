
import Config, { ConfigType } from "../Config";
import { UploadedFile } from "routing-controllers";
var path = require("path");
var os = require("os");
// const isWindow = os.type() == "Windows_NT";

const transform = (url: string) => url;


const projet = path.join(__dirname, "..", "..");
const new_project = path.join(projet, "new_project")
// 
const root = path.join(__dirname, "..");
const Static = path.join(root, "..", "Static");
const Upload = path.join(root, "..", "Upload");
const Temp = path.join(root, "..", "Temp");

const Storage = path.join(root, "Storage");

const ConfigFile = path.join(Static, "config.json")

const NextConfigFile = path.join(Static, "next_config.json")

const Task = path.join(root, "Task");

const PyUtil = path.join(root, "Util", "Py");

const errorFile = path.join(Storage, Config.files.error);

function resetURLS(config: ConfigType) {
  return {
    versioncheck: `http://${config.ip}:${config.server_ip}/${config.source.check}`,
    project: `http://${config.ip}:${config.server_ip}/${config.source.project}`,
    configcheck: `http://${config.ip}:${config.server_ip}/${config.source.config}`,
    fileupload: `http://${config.ip}:${config.server_ip}/${config.source.upload}`,
    files: `http://${config.ip}:${config.server_ip}/${config.source.files}`,
    download: `http://${config.ip}:${config.server_ip}/${config.source.download}`,
  }
}
const PathConfig = {
  new_project_path: transform(new_project),
  root: transform(root), // dist 工程路径
  static_dir: transform(Static),
  upload_dir: transform(Upload),
  temp_dir: transform(Temp),
  config_file: transform(ConfigFile),
  next_config_file: transform(NextConfigFile),
  storage_root: transform(Storage),
  task_root: transform(Task),
  error_file: transform(errorFile),
  py_util: transform(PyUtil),
  /***
  configcheck:'http://127.0.0.1/project/config', //配置json
  fileupload:'http://127.0.0.1/project/fileupload',//文件上传
  project:'http://127.0.0.1/project/source.zip'//下载工程文件
  versioncheck:'http://127.0.0.1/project/check' //版本检查
  files:"..." //所有上传文件信息
   */
  source_url: resetURLS(Config),
}

export function updatePathConfig(config: ConfigType) {
  PathConfig.source_url = resetURLS(config)
}
export default PathConfig;
