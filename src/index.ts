import { WebManager } from "./WebSocket/WebSocketManager";
import { VersionChenkTask } from "./Task/SourceTask/VersionChenkTask";
import fetch from 'node-fetch';
import { TaskStatus, ListenTask } from "./Task/Base/TaskBase";
import { InfoUpdateManager } from "./ErrorManager";
import { ConfigCheckTask } from "./Task/ListenerTask/ConfigCheckTask";
import { CMDCommandTask } from "./Task/ListenerTask/CMDCommandTask";
import { RemoteTasks } from "./Task/Remote/index";
import { RemoteListenTask } from "./Task/ListenerTask/RemoteListenTask";
import { UploadFileTask } from "./Task/ListenerTask/UploadFileTask";
import PathConfig from "./Util/PathRUL";
const path = require("path");
globalThis.fetch = fetch;

class App {
  constructor() {
    globalThis.reload = this.reload.bind(this);
    globalThis.reconnect = this.reconnect.bind(this);
    WebManager.app = this;
  }
  async sourceInit() {
    const version_status = await new VersionChenkTask().do();
    if (version_status == TaskStatus.Success) {
      this.reload();
    }
    return true;
  }
  reload(err: Error = new Error("1s,重启")) {
    debugger
    InfoUpdateManager.update(err);
    //pm2 启动
    setTimeout(() => { process.exit() }, 1000);
  }
  reconnect() {
    WebManager.clear();
    WebManager.start();
    this.initListenerTasks();
  }
  initListenerTasks() {
    const litener_path = path.join(PathConfig.task_root,"ListenerTask");
    
    this.addListenTask([
      new CMDCommandTask(this),
      new ConfigCheckTask(this),
      new RemoteListenTask(this),
      new UploadFileTask(this),
      ...RemoteTasks
    ])
  }
  addListenTask(tasks: ListenTask[]) {
    WebManager.addEventListeners(
      ...tasks
    )
  }
  async run() {
    this.initListenerTasks();
    const result = await this.sourceInit();
    result && WebManager.start();
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
