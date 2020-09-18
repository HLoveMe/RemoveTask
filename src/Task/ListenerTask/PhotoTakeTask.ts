
import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { AudioTaskMessage, AudioExexResult, Message } from "../../WebSocket/SocketMessage";
import PathConfig from "../../Util/PathRUL";
import { join } from "path";
import { WebManager } from "../../WebSocket/WebSocketManager";
const fs = require("fs")
const http = require("http");
var open = require('open');
/**{id: 1000,key: 1000,date: 10000,name: "PhotoTakeTask",data: {}} */
export default class PhotoTakeTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "PhotoTakeTask";
  date: Date = new Date()
  constructor(app: App) {
    super(app);

    const server = http.createServer((req, res) => {
      if (req.method.toLowerCase().indexOf("post")) {

        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const myReadStream = fs.createReadStream(`${join(PathConfig.py_util, "..", "photo", "index.html")}`, 'utf8');
      myReadStream.pipe(res);
    })
    server.listen(3323, '127.0.0.1');
  }
  async listen(info: Message) {
    await open("http://localhost:3323");
  }
  toString() {
    return {
      name: this.name,
      desc: "拍照,保存文件",
      dome: { id: 1000, key: 1000, date: 10000, name: "PhotoTakeTask", data: {} }
    }
  }
}