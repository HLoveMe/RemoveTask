
/***
 * https://sourceforge.net/projects/sox/  下载
 * 
 * alias play="/Users/swl/Downloads/sox-14.4.2/play"
 * alias soxi="/Users/swl/Downloads/sox-14.4.2/soxi"
 * alias sox="/Users/swl/Downloads/sox-14.4.2/sox"
 */
// https://github.com/MexXxo/node-microphone

import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { ScreenshotMessage, ScreenshotCMD, ImageInfo, ScreenshotData, Message } from "../../WebSocket/SocketMessage";
import PathConfig from "../../Util/PathRUL";
import { join } from "path";
import { existsSync, unlinkSync, readFileSync } from "fs";
const Microphone = require('node-microphone');
const maxCount: number = 50;

/**{id: 1000,key: 1000,date: 10000,name: "AudioListenTask",data: {}} */
export default class AudioListenTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "AudioListenTask";
  date: Date = new Date();
  constructor(app: App) {
    super(app);
  }
  clear() {}
  async listen(info: Message) {

  }
}