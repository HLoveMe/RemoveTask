import { TaskStatus, ListenTask, App } from "./TaskBase";
import { RemoteMessage } from "../WebSocket/SocketMessage";
import PathConfig from "../Util/PathRUL";
const path = require("path");
const fs = require("fs");
/**
 * 1:远程任务必须 使用 export.default
 * 2:远程任务文件保存位置位于TasK/Remote 下
 */
export class RemoteListenTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "RemoteListenTask";
  date: Date = new Date();
  remote_dir_root: String;
  constructor(app: App) {
    super(app);
    this.remote_dir_root = path.join(PathConfig.task_root, "Remote");
  }
  loadRemoteClass(routes: string[]) {
    const remoteTasks = routes.map($1 => require($1 as string).default).map(SomeClass=>{
      return new SomeClass(this.app)
    });
    this.app.addListenTask(remoteTasks);
  }
  async listen(info: RemoteMessage) {
    try {
      const routes: string[] = [];
      (info.data || []).forEach($1 => {
        const { name, context } = $1;
        const that_path = path.join(this.remote_dir_root, name + ".js");
        fs.existsSync(that_path) && fs.unlinkSync(that_path);
        const jscontext = new Buffer(context as string, "base64");
        fs.writeFileSync(that_path, jscontext.toString());
        routes.push(that_path);
      })
      this.loadRemoteClass(routes);
    } catch (error) {
      console.log(error);
      this.updateInfo(error, "RemoteListenTask/listen/saveFile")
    }
  }
}