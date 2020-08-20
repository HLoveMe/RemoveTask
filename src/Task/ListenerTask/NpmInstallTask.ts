
import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { NpmData, NpmInstallMessge, NpmTask } from "../../WebSocket/SocketMessage";
import { ExecProcess } from "../../Util/ExecProcess";
import PathConfig from "../../Util/PathRUL";
import { join } from "path";

// npm
// {id:1000,key:1000,date:10000,name:"NpmInstallTask",data:{reload:false,tasks:[{name:"co",global:false}]}}
export default class NpmInstallTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "NpmInstallTask";
  date: Date = new Date();
  constructor(app: App) {
    super(app);
  }
  async run_task(info: NpmInstallMessge) {
    const tasks = info.data.tasks;
    const results = [];
    for (let index = 0; index < tasks.length; index++) {
      const task = tasks[index]
      const project = join(PathConfig.root, "..");
      const global = task.global;
      const res = await Promise.race([
        ExecProcess(`cd ${project} && npm install ${task.name} ${global ? "-g" : ""}`),
        new Promise((resolve) => {
          setTimeout(() => resolve({}), 25000)
        })
      ])
      results.push({ name: task.name, res });
    }
    this.send({ results }, info);
    info.data.reload && this.app.reload();
  }
  async listen(info: NpmInstallMessge) {
    this.run_task(info)
  }
  toString() {
    return {
      name: this.name,
      desc: "Exec 安装npm 库",
      dome: { id: 1000, key: 1000, date: 10000, name: "NpmInstallTask", data: { reload: false, tasks: [{ name: "co", global: false }] } }
    }
  }
}