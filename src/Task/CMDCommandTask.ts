import { Task, TaskStatus, ListenTask, App } from "./TaskBase";
var os = require("os");
const Process = require("child_process");
import PathConfig from "../Util/PathRUL";
import { CMDMessage, MessageType } from "../WebSocket/SocketMessage";
import { EventEmitter } from "events";
declare type ExecCallBack = (msg: ExecMessage, result: ExexResult) => void;

interface ExexResult {
  close_code: number;
  message: any;
  exec_error: String;
  exit_code: number;
  stderr: any[];
  stdout: any[];
  error: String;
}
class ExecMessage {
  msg: CMDMessage;
  staus: number;
  result: ExexResult;
  callBack: Function;
  childProcess: any;
  constructor(msg: CMDMessage, call: ExecCallBack) {
    this.msg = msg;
    this.result = {} as ExexResult;
    this.callBack = call;
  }
  exec() {
    Promise.race([
      new Promise((resolve, reject) => {
        const cmd = this.msg.data.cmd;
        const args = this.msg.data.args || [];
        const option: any = this.msg.data.path ? { cwd: this.msg.data.path } : {};
        const child = Process.spawn(cmd, args, option)
        this.childProcess = child;
        child.on("close", (code) => {/**结束*/
          this.result.close_code = code;
          resolve(this.result);
        })
        child.on("message", (message) => {
          this.result.message = message;
        })

        child.on("error", (error) => {/**失败*/
          this.result.exec_error = error.toString();
        })

        child.on("exit", (code) => {
          this.result.exit_code = code;
        });
        this.result.stderr = [];
        child.stderr.on("data", (chunk) => {
          //输出错误日志
          this.result.stderr.push(chunk.toString())
        })
        this.result.stdout = [];
        child.stdout.on('data', (chunk) => {
          this.result.stdout.push(chunk.toString());
          //获得日志输出
        });
      }),
      new Promise((resolve) => {
        setTimeout(() => resolve(null), this.msg.data.timeout || 2000)
      }),
    ]).then(res => {
      this.callBack && this.callBack(this, res)
    }).catch(err => {
      this.result.error = err.toString()
      this.callBack && this.callBack(this, this.result)
    });
  }
  clear() {
    if (this.childProcess) {
      this.childProcess.removeAllListeners();
      this.childProcess.stdout.removeAllListeners();
      this.childProcess.stderr.removeAllListeners();
      (this.childProcess as any).kill();
      this.childProcess = null;
    }
  }
}
class ExecManager extends EventEmitter {
  root: String;
  current: String;
  cmdQueue: Array<ExecMessage> = new Array();
  execMsg: ExecMessage;
  max: number = 1;
  constructor() {
    super();
    this.root = os.homedir();
    this.current = PathConfig.root;
  }
  _execResult(e_msg: ExecMessage, result: ExexResult | null) {
    e_msg.clear();
    this.execMsg = null;
    this.cmdQueue = this.cmdQueue.filter($1 => $1 != e_msg);
    this.emit("data",e_msg.msg,result);
    this.exec();
  }
  insert(cmd_msg: CMDMessage) {
    if (cmd_msg.data.type == MessageType.CMD_EXEC) {
      this.cmdQueue.push(new ExecMessage(cmd_msg, this._execResult.bind(this)));
      this.exec();
    } else if (cmd_msg.data.type == MessageType.CMD_CLEAR) {
      this.cmdQueue.length = 0;
      this.execMsg.clear();
      this.execMsg.callBack = null;
      this.execMsg = null;
    }
  }
  exec() {
    if (this.execMsg == null && this.cmdQueue.length >= 1) {
      this.execMsg = this.cmdQueue[0];
      this.execMsg.exec();
      return;
    }
  }
}

export class CMDCommandTask extends ListenTask {
  app: App;
  status: TaskStatus = TaskStatus.Prepare;
  name: String = "CMDCommandTask";
  date: Date = new Date();
  manage: ExecManager;
  constructor(app: App) {
    super(app);
    this.manage = new ExecManager();
    this.manage.on("data",this.handle.bind(this))
  }
  async listen(info: CMDMessage) {
    this.manage.insert(info);
  }
  handle(msg:CMDMessage,res:ExexResult){
    
  }
} 