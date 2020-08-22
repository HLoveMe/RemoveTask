import { join } from "path";

export declare interface ConfigType {
  version: string;
  ip: string;
  websoket_id: number;
  server_ip: number;
  files: {
    error: string;
  },
  source: {
    check: string;
    config: string;
    project: string;
    task: string;
    upload: string;
    files: string;
    download: string;
  },
  bd_api: {
    app_id: string;
    api_key: string;
    secret_key: string;
  }
}
const route = join(__dirname, "..", "..", "Static", "config.json")
const Config: ConfigType = require(route);


export function updateConfig(config: ConfigType) {
  Config.version = config.version;
  Config.ip = config.ip;
  Config.websoket_id = config.websoket_id;
  Config.files = config.files;
  Config.source = config.source;
  Config.bd_api = config.bd_api;
}
export default Config;