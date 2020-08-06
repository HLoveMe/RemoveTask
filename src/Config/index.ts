export declare interface ConfigType {
  version: string;
  ip: string;
  websoket_id: number;
  files: {
    error: string;
  },
  source: {
    check: string;
    config: string;
    project: string;
    task: string;
    upload:string;
  }
}

const Config:ConfigType = require("./source.json");

export function updateConfig(config: ConfigType) {
  Config.version = config.version;
  Config.ip = config.ip;
  Config.websoket_id = config.websoket_id;
  Config.files = config.files;
  Config.source = config.source;
}
export default Config;