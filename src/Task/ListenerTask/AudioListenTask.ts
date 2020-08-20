
/***
 * 
  python  PyAudio

  安装 
    https://www.jianshu.com/p/94df3132cd8f
    https://www.cnblogs.com/dongxixi/p/10862759.html

  实战
    https://wqian.net/blog/2018/1128-python-pyaudio-index.html


  pip3 install --target=/usr/local/lib/python3.7/site-packages pyaudio
  
  修改Auido.py pyaudio 安装文件夹


  python3 ./Audio.py 10 aa/b/file.wav

  10s
  filePath 文件存放路径
  */


import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { AudioTaskMessage } from "../../WebSocket/SocketMessage";
import PathConfig from "../../Util/PathRUL";
const Process = require("child_process");
import { join } from "path";
import { existsSync, unlinkSync, readFileSync } from "fs";

/**{id: 1000,key: 1000,date: 10000,name: "AudioListenTask",data: {}} */
export default class AudioListenTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "AudioListenTask";
  date: Date = new Date();
  isRun: boolean = false;
  python_file: string = join(__dirname, "Audio.py")
  constructor(app: App) {
    super(app);
  }
  clear() { }
  run_audio(info: AudioTaskMessage) {
    const file_name = join(PathConfig.temp_dir, `${new Date().getTime()}_audio_.wav`);
    return Promise.race([
      new Promise((resolve, reject) => {
        const time = Math.max(info.data.time, 20);
        const m_cmd = `python3 ${this.python_file} ${time} ${file_name}`
        const child = Process.exec(m_cmd)

        child.on("close", (code) => {/**结束*/
          resolve(file_name)
        })
        child.on("message", (message) => { })

        child.on("error", (error) => {/**失败*/
          resolve("")
        })

        child.on("exit", (code) => { });
        // this.result.stderr = [];
        child.stderr.on("data", (chunk) => {
          resolve("")
        })
        // this.result.stdout = [];
        child.stdout.on('data', (chunk) => { resolve("") });
      }),
      new Promise((resolve) => {
        setTimeout(() => resolve(""), 25000)
      })
    ])
  }
  async listen(info: AudioTaskMessage) {
    if (this.isRun) return;
    this.isRun = true;
    this.run_audio(info)
      .then(file => {
        this.send({file},info)
      }).catch(() => {
        this.send({file:null},info)
      });
  }
}