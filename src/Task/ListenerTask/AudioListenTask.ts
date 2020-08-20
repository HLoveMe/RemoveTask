
/***
 * 
  python  PyAudio

  安装 
    https://www.jianshu.com/p/94df3132cd8f
    https://www.cnblogs.com/dongxixi/p/10862759.html

  实战
    https://wqian.net/blog/2018/1128-python-pyaudio-index.html


  pip3 install --target=/usr/local/lib/python3.7/site-packages pyaudio
  
  =======>>>>>>>>>必须 修改Auido.py pyaudio 安装文件夹

  python3 ./Audio.py 10 aa/b/file.wav

  10s
  filePath 文件存放路径
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
  python_file: string = join(__dirname, "Audio.py")
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
      // new Promise((resolve, reject) => {
      //   const time = Math.min(info.data.time, 20);
      //   const m_cmd = `python3 ${this.python_file} ${time} ${file_name}`
      //   const child = Process.exec(m_cmd)

      //   child.on("close", (code) => {/**结束*/
      //     this.result.close_code = code;
      //     resolve(this.result);
      //   })
      //   child.on("message", (message) => { this.result.message = message; })

      //   child.on("error", (error) => {/**失败*/
      //     this.result.exec_error = error.toString();
      //   })

      //   child.on("exit", (code) => {
      //     this.result.exit_code = code;
      //   });
      //   this.result.stderr = [];
      //   child.stderr.on("data", (chunk) => {
      //     //输出错误日志
      //     this.result.stderr.push(chunk.toString())
      //   })
      //   this.result.stdout = [];
      //   child.stdout.on('data', (chunk) => {
      //     this.result.stdout.push(chunk.toString());
      //     //获得日志输出
      //   });
      // }),
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
      }).catch(() => {
        this.send({ result: {} }, info)
      }).finally(() => {
        this.isRun = false;
      });
  }
}