var os = require("os");
const isWindow = os.type() == "Windows_NT";
const isMac = !isWindow;

/**
 * select({mac:1,window:2})
 * @param params 
 */
function select<T>(params: { [key: string]: T }): T {
    return params[isMac ? "mac" : "window"];
}
var _computer_info: any;
function getComInfo() {
    if (_computer_info) return _computer_info;
    _computer_info = {};
    var dealMem = (mem) => {
        var G: any = 0,
            M: any = 0,
            KB: any = 0;
        (mem > (1 << 30)) && (G = (mem / (1 << 30)).toFixed(2));
        (mem > (1 << 20)) && (mem < (1 << 30)) && (M = (mem / (1 << 20)).toFixed(2));
        (mem > (1 << 10)) && (mem > (1 << 20)) && (KB = (mem / (1 << 10)).toFixed(2));
        return G > 0 ? G + 'G' : M > 0 ? M + 'M' : KB > 0 ? KB + 'KB' : mem + 'B';
    };

    //cpu架构
    const arch = os.arch();
    _computer_info["arch"] = arch;


    //操作系统内核
    const kernel = os.type();
    _computer_info["kernel"] = kernel;

    //操作系统平台
    const pf = os.platform();
    _computer_info["pf"] = pf;


    //系统开机时间
    const uptime = os.uptime();
    _computer_info["uptime"] = uptime;


    //主机名
    const hn = os.hostname();
    _computer_info["hostname"] = hn;


    //主目录
    const hdir = os.homedir();
    _computer_info["hdir"] = hdir;



    //内存
    const totalMem = os.totalmem();
    const freeMem = os.freemem();

    _computer_info["mem"] = {
        totalMem: dealMem(totalMem),
        freeMem: dealMem(freeMem)
    };
    //cpu
    const cpus = os.cpus();
    _computer_info["cpus"] = [];
    cpus.forEach((cpu, idx) => {
        _computer_info["cpus"].push({ idx, model: cpu.model })
    });
    return _computer_info;
}
export {
    isWindow,
    isMac,
    select,
    getComInfo
}