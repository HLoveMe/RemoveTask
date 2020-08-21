"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("../Config");
var path = require("path");
var os = require("os");
var isWindow = os.type() == "Windows_NT";
var transform = function (url) { return url; };
var projet = path.join(__dirname, "..", "..");
var new_project = path.join(projet, "new_project");
// 
var root = path.join(__dirname, "..");
var Static = path.join(root, "..", "Static");
var Upload = path.join(root, "..", "Upload");
var Temp = path.join(root, "..", "Temp");
var Storage = path.join(root, "Storage");
var ConfigFile = path.join(Static, "config.json");
var NextConfigFile = path.join(Static, "next_config.json");
var Task = path.join(root, "Task");
var errorFile = path.join(Storage, Config_1.default.files.error);
function resetURLS(config) {
    return {
        versioncheck: "http://" + config.ip + ":" + config.server_ip + "/" + config.source.check,
        project: "http://" + config.ip + ":" + config.server_ip + "/" + config.source.project,
        configcheck: "http://" + config.ip + ":" + config.server_ip + "/" + config.source.config,
        fileupload: "http://" + config.ip + ":" + config.server_ip + "/" + config.source.upload,
        files: "http://" + config.ip + ":" + config.server_ip + "/" + config.source.files,
        download: "http://" + config.ip + ":" + config.server_ip + "/" + config.source.download,
    };
}
var PathConfig = {
    new_project_path: transform(new_project),
    root: transform(root),
    static_dir: transform(Static),
    upload_dir: transform(Upload),
    temp_dir: transform(Temp),
    config_file: transform(ConfigFile),
    next_config_file: transform(NextConfigFile),
    storage_root: transform(Storage),
    task_root: transform(Task),
    error_file: transform(errorFile),
    /***
    configcheck:'http://127.0.0.1/project/config', //配置json
    fileupload:'http://127.0.0.1/project/fileupload',//文件上传
    project:'http://127.0.0.1/project/source.zip'//下载工程文件
    versioncheck:'http://127.0.0.1/project/check' //版本检查
    files:"..." //所有上传文件信息
     */
    source_url: resetURLS(Config_1.default),
};
function updatePathConfig(config) {
    PathConfig.source_url = resetURLS(config);
}
exports.updatePathConfig = updatePathConfig;
exports.default = PathConfig;
//# sourceMappingURL=PathRUL.js.map