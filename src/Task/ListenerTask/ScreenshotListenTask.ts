import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { ScreenshotMessage, ScreenshotCMD } from "../../WebSocket/SocketMessage";
const maxCount: number = 500;
export default class ScreenshotListenTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "ScreenshotListenTask";
  date: Date = new Date();
  currentCount: number = 0;
  intervalTime: number = 10000;
  interval: any;
  constructor(app: App) {
    super(app);
  }
  screenshot() {
    this.currentCount +=1;
    if(this.currentCount >= maxCount){
      return this.clear()
    }
    
  }
  clear() {
    this.currentCount = 0;
    this.interval && clearInterval(this.interval);
  }
  async listen(info: ScreenshotMessage) {
    this.clear();
    if (info.screenshotCmd == ScreenshotCMD.START) {
      this.interval = setInterval(() => this.screenshot(), this.intervalTime)
    } else if (info.screenshotCmd == ScreenshotCMD.END) {

    }
  }
}