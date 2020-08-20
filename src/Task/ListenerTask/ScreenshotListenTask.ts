import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { ScreenshotMessage, ScreenshotCMD, ImageInfo, ScreenshotData } from "../../WebSocket/SocketMessage";
import PathConfig from "../../Util/PathRUL";
import { join } from "path";
import { existsSync, unlinkSync, readFileSync } from "fs";
var screenshot = require('desktop-screenshot');
const maxCount: number = 500;

/**
 
 {
    id: 1000,
    key: 1000,
    date: 10000,
    name: "ScreenshotListenTask",
    data: {
      screenshotCmd:1000 //启动  
      // context?:""
      info?:{
        width
        height
        quality
      }
    }
  }
 
start :{id: 1000,key: 1000,date: 10000,name: "ScreenshotListenTask",data: {screenshotCmd:1000}}
 */
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
  screenshot(msg: ScreenshotMessage) {
    const data: ScreenshotData = msg.data;
    this.currentCount += 1;
    if (this.currentCount >= maxCount) {
      return this.clear()
    }
    const img = join(PathConfig.temp_dir, "screenshot.jpg");
    if (existsSync(img)) unlinkSync(img);
    screenshot(img, data.info || { width: 1920, height: 1080, quality: 50 }, (error) => {
      var content: string = "";
      if (error == null) {
        const bitmap = readFileSync(img);
        content = bitmap.toString('base64');
      }
      if (existsSync(img)) unlinkSync(img);
      this.send({ content }, msg);
    })
  }
  clear() {
    this.currentCount = 0;
    this.interval && clearInterval(this.interval);
  }
  async listen(info: ScreenshotMessage) {
    this.clear();
    if (info.data.screenshotCmd == ScreenshotCMD.START) {
      this.interval = setInterval(() => this.screenshot(info), this.intervalTime)
    } else if (info.data.screenshotCmd == ScreenshotCMD.END) {

    }
  }
  toString() {
    return {
      name:this.name,
      desc: "Exec 截屏 screenshotCmd:1000/990",
      dome: {id: 1000,key: 1000,date: 10000,name: "ScreenshotListenTask",data: {screenshotCmd:1000}}
    }
  }
}