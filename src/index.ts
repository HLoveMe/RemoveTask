import { WebManager } from "./WebSocket/WebSocketManager";
import { VersionChenkTask } from "./Task/SourceTask/VersionChenkTask";
import fetch from 'node-fetch';
import { TaskStatus, ListenTask } from "./Task/Base/TaskBase";
import { InfoUpdateManager } from "./ErrorManager";
import { RemoteTasks } from "./Task/Remote/index";
import PathConfig from "./Util/PathRUL";
import { loadtaskClassForDir } from "./Task/Util/loadClass";
import { ExecProcess } from "./Util/ExecProcess";
import { join } from "path";
import { isWindow } from "./Util/Machine";
const { exec } = require("child_process");
const path = require("path");
const { AbortController } = require('abortcontroller-polyfill/dist/cjs-ponyfill');
global.fetch = fetch;
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


// (function () {
//   if (isWindow) {
      
//   } else {
//     const which = require("which");
//     var py3 = which.sync('python3');
//     var nohup = which.sync('nohup');
//     const cwd = `${nohup} ${py3} ${join(PathConfig.py_util, "takePhotoServer.py")} &`;
//     console.log(`[[[ ${cwd} ]]]`)
//   }
// })