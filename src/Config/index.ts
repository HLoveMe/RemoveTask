export declare interface ConfigType {
  version: string;
  ip: string;
  websoket_id: number;
  files: {
    error: string;
  },
  source: {
    check: string;
    project: string;
    task: string;
  }
}
const Config = {
  version: "202008021325",
  ip: "127.0.0.1",
  websoket_id: 8080,
  files: {
    error: "error.log",
  },
  source: {
    check: "project/check",
    project: "source/project.zip", //获取这个工程源文件
    task: "source/tasks",//获取所有任务列表
  }
}

export function updateConfig(config: ConfigType) {
  Config.version = config.version;
  Config.ip = config.ip;
  Config.websoket_id = config.websoket_id;
  Config.files = config.files,
    Config.source = config.source;
}
export default Config;