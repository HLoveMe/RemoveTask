import { Task, TaskStatus, TaskBase, ListenTask, App } from "./TaskBase";
import Config from "../Config";
var os = require("os");
var path = require("path");
const ChildProcess = require("child_process");
import PathConfig from "../Util/PathRUL";
import { goRequestJson } from "../Util/SourceRequest";
import { Message, CMDData, CMDMessage, MessageType } from "../WebSocket/SocketMessage";
import { EventEmitter } from "events";
declare type ExecCallBack = (msg: ExecMessage, result: ExexResult) => void;

interface ExexResult {
  close_code: number;
  message: any;
  exec_error: String;
  exit_code: number;
  stderr: any[];
  stdout: any[];
}
class ExecMessage {
  msg: CMDMessage;
  staus: number;
  result: ExexResult;
  callBack: Function;
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
        const child = ChildProcess.spawn("ls", ["-a", "-l"],option)
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
          this.result.stderr.push(chunk)
        })
        this.result.stdout = [];
        child.stdout.on('data', (chunk) => {
          this.result.stdout.push(chunk);
          //获得日志输出
        });
      }),
      new Promise((resolve) => {
        setTimeout(() => resolve(null), this.msg.data.timeout || 2000)
      }),
    ]).then(res => {
      this.callBack && this.callBack(this, res)
    }).catch(err => {
      this.callBack && this.callBack(this, null)
    });
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
  _execResult(msg: ExecMessage, result: ExexResult | null) {
    this.execMsg = null;
    this.cmdQueue = this.cmdQueue.filter($1 => $1 != msg);
    this.exec();
    console.log("1111", msg, result)
  }
  insert(cmd_msg: CMDMessage) {
    if (cmd_msg.data.type == MessageType.CMD_EXEC) {
      this.cmdQueue.push(new ExecMessage(cmd_msg, this._execResult.bind(this)));
      this.exec();
    } else if (cmd_msg.data.type == MessageType.CMD_CLEAR) {
      this.cmdQueue.length = 0;
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
  }
  async listen(info: CMDMessage) {
    this.manage.insert(info);
  }
} 