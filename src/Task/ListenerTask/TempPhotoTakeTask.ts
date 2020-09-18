
/***
 * 
  pip3 install  opencv-python
  
    1:修改 takePhotoServer.py  第二行 指定 opencv-python 安装路径 「能正常导入就不需要」

  */


import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { AudioTaskMessage, AudioExexResult } from "../../WebSocket/SocketMessage";
import PathConfig from "../../Util/PathRUL";
const Process = require("child_process");
import { join } from "path";
import { existsSync, unlinkSync, readFileSync } from "fs";
import { scanFiles } from "../../Util/FileUtil";
import { ExecProcess } from "../../Util/ExecProcess";
import Config from "../../Config";
import KillPort from "../../Util/KillPort";


/**{id: 1000,key: 1000,date: 10000,name: "PhotoTakeTask",data: {}} */
export default class PhotoTakeTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "PhotoTakeTask";
  date: Date = new Date();
  isRun: boolean = false;
  python_file: string = join(__dirname, "pys", "Photo.py")
  // result: AudioExexResult;
  constructor(app: App) {
    super(app);
  }
  clear() {
    scanFiles(PathConfig.temp_dir).forEach($1 => {
      if ($1.indexOf("_photo_.jpg") >= 0) {
        unlinkSync($1 as string);
      }
    })
  }
  run_photo(info: AudioTaskMessage) {
    const file_name = join(PathConfig.temp_dir, `${new Date().getTime()}_photo_.jpg`);
    return Promise.race([
      fetch(`http://localhost:${Config.py_web_ip}/?file=${file_name}`).then(() => { return { file_name } }),
      new Promise((resolve) => {
        setTimeout(() => resolve({}), 25000)
      })
    ])
  }
  async listen(info: AudioTaskMessage) {
    if (this.isRun) return;
    this.isRun = true;
    this.run_photo(info)
      .then(result => {
        setTimeout(() => {
          var file_name = (result as any).file_name;
          if (!existsSync(file_name)) {
            file_name = join(PathConfig.py_util, "_photo_.jpg")
          }
          var content = "";
          if (existsSync(file_name)) {
            const bitmap = readFileSync(file_name);
            content = bitmap.toString('base64');
          }
          (result as any).content = content;
          this.send({ result }, info)
          this.clear();
        }, 3000)
      }).catch((err) => {
        this.send({ result: {}, err }, info)
      }).finally(() => {
        this.isRun = false;
      });
  }
  toString() {
    return {
      name: this.name,
      desc: "拍照,保存文件",
      dome: { id: 1000, key: 1000, date: 10000, name: "PhotoTakeTask", data: {} }
    }
  }
}