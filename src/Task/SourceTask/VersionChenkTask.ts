import { Task, TaskStatus, TaskBase } from "../Base/TaskBase";
import Config from "../../Config";
import PathConfig from "../../Util/PathRUL";
import { goRequestJson } from "../../Util/SourceRequest";

export declare type CheckVersionFunction = () => Promise<boolean>

export declare interface VersionInfo {
  date: Date;
  version: string,
  info: String;
}
export class VersionChenkTask extends TaskBase {
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "VersionChenkTask";
  date: Date = new Date();
  checkVersion: CheckVersionFunction = async () => {
    const result = await goRequestJson(PathConfig.source_url.versioncheck);
    if (result == null) return false;
    const current = parseInt(Config.version);
    const remote = parseInt(result.version);
    if (remote > current) {
      return true;
    }
    return false;
  }
  downloadProject = async () => {
    return false;
  }
  async do(): Promise<TaskStatus> {
    try {
      const hasUpdate = await this.checkVersion();
      const hasDownload = await (hasUpdate && await this.downloadProject());
      hasUpdate && !hasDownload && this.updateInfo(new Error("工程下载失败"));
      if (hasUpdate && hasDownload) {
        this.status = TaskStatus.Reload;
      } else {
        this.status = TaskStatus.Fail;
      }
    } catch (error) {
      this.updateInfo(error, "CheckVersion/checkVersion");
      this.status = TaskStatus.Fail;
    }
    return this.status;
  }
}