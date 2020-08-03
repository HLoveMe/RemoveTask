import { WebManager } from "./WebSocket/WebSocketManager";
import { InitTaskQueue } from "./Task/InitTaskQueue";
import { VersionChenkTask } from "./Task/VersionChenkTask";
import fetch from 'node-fetch';
globalThis.fetch = fetch;

declare type SourceInitFunction = () => Promise<any>;
class App {
  constructor() { }
  SourceInit: SourceInitFunction = async function () {
    const initTasks = new InitTaskQueue(
      new VersionChenkTask(),
    );
    await initTasks.do();
    return true;
  }
  async run() {
    await this.SourceInit();
    WebManager.start();
  }
}

(new App()).run();