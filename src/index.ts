import { WebManager } from "./WebSocket/WebSocketManager";
import { VersionChenkTask } from "./Task/SourceTask/VersionChenkTask";
import fetch from 'node-fetch';
import { TaskStatus, ListenTask } from "./Task/Base/TaskBase";
import { InfoUpdateManager } from "./ErrorManager";
import { RemoteTasks } from "./Task/Remote/index";
import PathConfig from "./Util/PathRUL";
import { loadtaskClassForDir } from "./Task/Util/loadClass";
const path = require("path");
const { AbortController } = require('abortcontroller-polyfill/dist/cjs-ponyfill');
globalThis.fetch = fetch;
class App {
  reloadCount: number = 0;
  abortController = new AbortController();
  constructor() {
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
    InfoUpdateManager.update(err);
    //pm2 启动
    setTimeout(() => { process.exit() }, 1000)
  }
  reconnect() {
    this.reloadCount += 1;
    if (this.reloadCount <= 5) {
      setTimeout(() => {
        WebManager.clear();
        WebManager.start();
        this.initListenerTasks();
      }, 1000 * Math.pow(2, this.reloadCount));
    } else {
      this.abortController.abort();
    }
  }
  initListenerTasks() {
    const litener_path = path.join(PathConfig.task_root, "ListenerTask");
    const tasks = loadtaskClassForDir(litener_path);
    this.addListenTask([
      // new CMDCommandTask(this),
      // new ConfigCheckTask(this),
      // new RemoteListenTask(this),
      // new UploadFileTask(this),
      ...tasks,
      ...RemoteTasks
    ])
  }
  addListenTask(tasks: ListenTask[]) {
    WebManager.addEventListeners(
      ...tasks
    )
  }

  Wait(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.abortController.signal.addEventListener("abort", () => resolve())
    })
  }
  async run() {
    this.initListenerTasks();
    const result = await this.sourceInit();
    result && WebManager.start();
    await this.Wait();
  }
}
new App().run().then(() => { });