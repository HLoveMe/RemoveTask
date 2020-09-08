"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecProcess = void 0;
var Process = require("child_process");
function ExecProcess(cmd, args, path) {
    if (args === void 0) { args = []; }
    if (path === void 0) { path = null; }
    var result = {};
    return new Promise(function (resolve, reject) {
        var _a;
        var option = { cwd: (_a = (path || null)) === null || _a === void 0 ? void 0 : _a.replace(/[\r\n]/g, "") };
        var m_cmd = cmd + " " + args.join(" ");
        var child = Process.exec(m_cmd, path ? option : null);
        child.on("close", function (code) {
            result.close_code = code;
            resolve(result);
        });
        child.on("message", function (message) {
            result.message = message;
        });
        child.on("error", function (error) {
            result.exec_error = error.toString();
        });
        child.on("exit", function (code) {
            result.exit_code = code;
        });
        result.stderr = [];
        child.stderr.on("data", function (chunk) {
            //输出错误日志
            result.stderr.push(chunk.toString());
        });
        result.stdout = [];
        child.stdout.on('data', function (chunk) {
            result.stdout.push(chunk.toString());
            //获得日志输出
        });
    });
}
exports.ExecProcess = ExecProcess;
//# sourceMappingURL=ExecProcess.js.map