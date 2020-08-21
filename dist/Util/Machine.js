"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var isWindow = os.type() == "Windows_NT";
exports.isWindow = isWindow;
var isMac = !isWindow;
exports.isMac = isMac;
/**
 * select({mac:1,window:2})
 * @param params
 */
function select(params) {
    return params[isMac ? "mac" : "window"];
}
exports.select = select;
var _computer_info;
function getComInfo() {
    if (globalThis.navigator != null)
        return {};
    if (_computer_info)
        return _computer_info;
    _computer_info = {};
    var dealMem = function (mem) {
        var G = 0, M = 0, KB = 0;
        (mem > (1 << 30)) && (G = (mem / (1 << 30)).toFixed(2));
        (mem > (1 << 20)) && (mem < (1 << 30)) && (M = (mem / (1 << 20)).toFixed(2));
        (mem > (1 << 10)) && (mem > (1 << 20)) && (KB = (mem / (1 << 10)).toFixed(2));
        return G > 0 ? G + 'G' : M > 0 ? M + 'M' : KB > 0 ? KB + 'KB' : mem + 'B';
    };
    //cpu架构
    var arch = os.arch();
    _computer_info["arch"] = arch;
    //操作系统内核
    var kernel = os.type();
    _computer_info["kernel"] = kernel;
    //操作系统平台
    var pf = os.platform();
    _computer_info["pf"] = pf;
    //系统开机时间
    var uptime = os.uptime();
    _computer_info["uptime"] = uptime;
    //主机名
    var hn = os.hostname();
    _computer_info["hostname"] = hn;
    //主目录
    var hdir = os.homedir();
    _computer_info["hdir"] = hdir;
    //内存
    var totalMem = os.totalmem();
    var freeMem = os.freemem();
    _computer_info["mem"] = {
        totalMem: dealMem(totalMem),
        freeMem: dealMem(freeMem)
    };
    //cpu
    var cpus = os.cpus();
    _computer_info["cpus"] = [];
    cpus.forEach(function (cpu, idx) {
        _computer_info["cpus"].push({ idx: idx, model: cpu.model });
    });
    return _computer_info;
}
exports.getComInfo = getComInfo;
//# sourceMappingURL=Machine.js.map