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
    if (version_status == TaskStatus.Success) {
      this.reload();
    }
    return true;
  }
  reload(err: Error = new Error("1s,重启")) {
    InfoUpdateManager.update(err);
    setTimeout(() => { process.exit() }, 1000);
  }
  reconnect() {
    WebManager.clear();
    WebManager.start();
  }
  listenerTasks() {
    WebManager.addEventListeners(
      new ConfigCheckTask(this),
    )
  }
  async run() {
    const result = await this.sourceInit();
    result && WebManager.start();
    this.listenerTasks();
    return;
  }
}

(async function RunApp(index = 0) {
  if (index == 5) return;
  const app = new App();
  try {
    await app.run()
  } catch (error) {
    index += 1;
    await RunApp(index + 1);
  }
})()
