
/***
 * 
  pip3 install  opencv-python
  
    1:修改Photo.py pyaudio 安装文件夹 第二行 指定 opencv-python 安装路径 「能正常导入就不需要」

  */


import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { AudioTaskMessage, AudioExexResult } from "../../WebSocket/SocketMessage";
import PathConfig from "../../Util/PathRUL";
const Process = require("child_process");
import { join } from "path";
import { existsSync, unlinkSync, readFileSync } from "fs";
import { scanFiles } from "../../Util/FileUtil";
import { ExecProcess } from "../../Util/ExecProcess";


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
    // this.result = { sep: path.sep } as AudioExexResult;
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
      ExecProcess(`python3 ${this.python_file} ${file_name}`)
        .then(res => {
          (res as any).file_name = file_name;
          if (existsSync(file_name)) {
            const bitmap = readFileSync(file_name);
            const content = bitmap.toString('base64');
            (res as any).content = content;
          }

          return res;
        }),
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
        this.send({ result }, info)
      }).catch((err) => {
        this.send({ result: {}, err }, info)
      }).finally(() => {
        this.isRun = false;
        this.clear();
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