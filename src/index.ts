import { WebManager } from "./WebSocket/WebSocketManager";
import { InitTaskQueue } from "./Task/InitTaskQueue";
import { VersionChenkTask } from "./Task/VersionChenkTask";
import fetch from 'node-fetch';
import { TaskStatus } from "./Task/TaskBase";
import { InfoUpdateManager } from "./ErrorManager";
import { ConfigCheckTask } from "./Task/ConfigCheckTask";
globalThis.fetch = fetch;

class App {
  constructor() {
    globalThis.reload = this.reload.bind(this);
    globalThis.reconnect = this.reconnect.bind(this);
  }
  async sourceInit() {
    const version_status = await new VersionChenkTask().do();
    if(version_status == TaskStatus.Success){
      this.reload();
    }
    return true;
  }
  reload(err: Error = new Error("1s,重启")) {
    InfoUpdateManager.update(err);
    setTimeout(() => { throw err }, 1000);
  }
  reconnect() {
    WebManager.clear();
    WebManager.start();
  }
  listenerTasks(){
    WebManager.addEventListeners(
      new ConfigCheckTask(this),
    )
  }
  async run() {
    const result = await this.sourceInit();
    result && WebManager.start();
    this.listenerTasks();
  }
}

(new App()).run();