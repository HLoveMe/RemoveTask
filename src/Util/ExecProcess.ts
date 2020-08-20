import { ExexResult } from "../WebSocket/SocketMessage";
const Process = require("child_process");
export function ExecProcess(cmd: string, args: any[] = [], path: string = null): Promise<ExexResult> {
  var result: ExexResult = {} as ExexResult
  return new Promise((resolve, reject) => {
    const option: any = { cwd: (path || null)?.replace(/[\r\n]/g, "") }
    const m_cmd = `${cmd} ${args.join(" ")}`
    var child = Process.exec(m_cmd, path ? option : null)
    child.on("close", (code) => {/**结束*/
      result.close_code = code;
      resolve(result)
    })
    child.on("message", (message) => {
      result.message = message;
    })

    child.on("error", (error) => {/**失败*/
      result.exec_error = error.toString();
    })

    child.on("exit", (code) => {
      result.exit_code = code;
    });
    result.stderr = [];
    child.stderr.on("data", (chunk) => {
      //输出错误日志
      result.stderr.push(chunk.toString())
    })
    result.stdout = [];
    child.stdout.on('data', (chunk) => {
      result.stdout.push(chunk.toString());
      //获得日志输出
    });
  })

}