import { isWindow, isMac } from "../../Util/Machine";
var cmd = require('node-cmd');
var process = require('child_process');
//shutdown -h now   = mac
//shutdown -s -t 0  = window

import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { Message } from "../../WebSocket/SocketMessage";
// 立刻关机
// {id:1000,key:1000,date:10000,name:"ShutDownPC",data:{}}
export default class ShutDownPC extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "ShutDownPC";
  date: Date = new Date();
  constructor(app: App) {
    super(app);
  }
  async listen(info: Message) {
    isMac ?
      process.exec('shutdown -h now')
      :
      cmd.run('shutdown -s -t 0');
  }
  toString(){
    return {
      name:this.name,
      desc: "立刻关机",
      dome: {id:1000,key:1000,date:10000,name:"ShutDownPC",data:{}}
    }
  }
}