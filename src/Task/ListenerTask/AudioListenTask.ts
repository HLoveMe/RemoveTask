
/***
 * 
  python  PyAudio

  安装 
    https://www.jianshu.com/p/94df3132cd8f
    https://www.cnblogs.com/dongxixi/p/10862759.html

  实战
    https://wqian.net/blog/2018/1128-python-pyaudio-index.html


  pip3 install --target=/usr/local/lib/python3.7/site-packages pyaudio
  
    1:修改Auido.py pyaudio 安装文件夹 第二行 指定pyaudio 安装路径 「能正常导入就不需要」

  dome
    python3 ./Audio.py 10 aa/b/file.wav

    10s
    filePath 文件存放路径

  https://console.bce.baidu.com/ai/#/ai/speech/app/detail~appId=1876716
  */


import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { AudioTaskMessage, AudioExexResult } from "../../WebSocket/SocketMessage";
import PathConfig from "../../Util/PathRUL";
const Process = require("child_process");
import { join } from "path";
import { existsSync, unlinkSync, readFileSync } from "fs";
import { scanFiles } from "../../Util/FileUtil";
import { ExecProcess } from "../../Util/ExecProcess";


/**{id: 1000,key: 1000,date: 10000,name: "AudioListenTask",data: {}} */
export default class AudioListenTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "AudioListenTask";
  date: Date = new Date();
  isRun: boolean = false;
  python_file: string = join(__dirname, "pys", "Audio.py")
  // result: AudioExexResult;
  constructor(app: App) {
    super(app);
    // this.result = { sep: path.sep } as AudioExexResult;
  }
  clear() {
    scanFiles(PathConfig.temp_dir).forEach($1 => {
      if ($1.indexOf("_audio_.wav") >= 0) {
        unlinkSync($1 as string);
      }
    })
  }
  run_audio(info: AudioTaskMessage) {
    const file_name = join(PathConfig.temp_dir, `${new Date().getTime()}_audio_.wav`);
    return Promise.race([
      ExecProcess(`python3 ${this.python_file} ${Math.min(info.data.time, 20)} ${file_name}`).then(res => { (res as any).file_name = file_name; return res; }),
      new Promise((resolve) => {
        setTimeout(() => resolve({}), 25000)
      })
    ])
  }
  async listen(info: AudioTaskMessage) {
    if (this.isRun) return;
    this.isRun = true;
    this.run_audio(info)
      .then(result => {
        this.send({ result }, info)
      }).catch((err) => {
        this.send({ result: {}, err }, info)
      }).finally(() => {
        this.isRun = false;
      });
  }
  toString() {
    return {
      name: this.name,
      desc: "录音,保存文件",
      dome: { id: 1000, key: 1000, date: 10000, name: "AudioListenTask", data: {} }
    }
  }
}