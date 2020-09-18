
import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { OpenMessage } from "../../WebSocket/SocketMessage";
var open = require('open');

/**{id: 1000,key: 1000,date: 10000,name: "OpenWebTask",data: {}} */
export default class OpenSomeTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "OpenSomeTask";
  date: Date = new Date();
  constructor(app: App) {
    super(app);
  }
  async listen(info: OpenMessage) {
    await open(info.data.url, info.data.option);
    this.send({}, info);
  }
  toString() {
    return {
      name: this.name,
      desc: "打开某个网址 文件 使用默认程序",
      dome: { id: 1000, key: 1000, date: 10000, name: "OpenSomeTask", data: { url: "", option: "firefox" } }
    }
  }
}