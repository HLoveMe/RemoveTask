
import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { Message } from "../../WebSocket/SocketMessage";

// npm
// {id:1000,key:1000,date:10000,name:"TestLinkTask",data:{}}
export default class TestLinkTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "TestLinkTask";
  date: Date = new Date();
  constructor(app: App) {
    super(app);
  }
  async listen(info: Message) {
    this.send({ test: true }, info);
  }
  toString() {
    return {
      name: this.name,
      desc: "测试连接Exec",
      dome: { id: 1000, key: 1000, date: 10000, name: "TestLinkTask", data: {} }
    }
  }
}