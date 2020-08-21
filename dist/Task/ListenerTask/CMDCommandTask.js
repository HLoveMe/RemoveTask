"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var TaskBase_1 = require("../Base/TaskBase");
var os = require("os");
var path = require("path");
var Process = require("child_process");
var PathRUL_1 = require("../../Util/PathRUL");
var SocketMessage_1 = require("../../WebSocket/SocketMessage");
var events_1 = require("events");
var ExecMessage = /** @class */ (function () {
    function ExecMessage(msg, last_path, call) {
        this.msg = msg;
        this.result = { id: msg.data.id, sep: path.sep };
        this.last_path = last_path;
        this.callBack = call;
    }
    ExecMessage.prototype.exec = function () {
        var _this = this;
        Promise.race([
            new Promise(function (resolve) {
                var _a;
                var cmd = _this.msg.data.cmd;
                var args = _this.msg.data.args || [];
                var option = { cwd: (_a = (_this.msg.data.path || _this.last_path || null)) === null || _a === void 0 ? void 0 : _a.replace(/[\r\n]/g, "") };
                var m_cmd = cmd + " " + (args.join(" ") + " && pwd ");
                var child = Process.exec(m_cmd, option);
                _this.childProcess = child;
                child.on("close", function (code) {
                    _this.result.close_code = code;
                    resolve(_this.result);
                });
                child.on("message", function (message) {
                    _this.result.message = message;
                });
                child.on("error", function (error) {
                    _this.result.exec_error = error.toString();
                });
                child.on("exit", function (code) {
                    _this.result.exit_code = code;
                });
                _this.result.stderr = [];
                child.stderr.on("data", function (chunk) {
                    //输出错误日志
                    _this.result.stderr.push(chunk.toString());
                });
                _this.result.stdout = [];
                child.stdout.on('data', function (chunk) {
                    _this.result.stdout.push(chunk.toString());
                    //获得日志输出
                });
            }),
            new Promise(function (resolve) {
                setTimeout(function () { return resolve(null); }, _this.msg.data.timeout || 2000);
            }),
        ]).then(function (res) {
            _this.callBack && _this.callBack(_this, res);
        }).catch(function (err) {
            _this.result.error = err.toString();
            _this.callBack && _this.callBack(_this, _this.result);
        });
    };
    ExecMessage.prototype.getCurrentPath = function () {
        if (this.result.exit_code == 0 && this.result.close_code == 0)
            return this.result.stdout.pop();
        if (this.msg.data.path)
            return this.msg.data.path;
        if (this.last_path)
            return this.last_path;
        return null;
    };
    ExecMessage.prototype.clear = function () {
        if (this.childProcess) {
            this.childProcess.removeAllListeners();
            this.childProcess.stdout.removeAllListeners();
            this.childProcess.stderr.removeAllListeners();
            this.childProcess.kill();
            this.childProcess = null;
        }
    };
    return ExecMessage;
}());
var ExecManager = /** @class */ (function (_super) {
    __extends(ExecManager, _super);
    function ExecManager() {
        var _this = _super.call(this) || this;
        _this.cmdQueue = new Array();
        _this.root = os.homedir();
        _this.current = PathRUL_1.default.root;
        return _this;
    }
    ExecManager.prototype._execResult = function (exec_msg, result) {
        var curent_path = exec_msg.getCurrentPath();
        if (curent_path) {
            this.current = curent_path;
            result.last_path = curent_path;
        }
        ;
        exec_msg.clear();
        this.execMsg = null;
        this.cmdQueue = this.cmdQueue.filter(function ($1) { return $1 != exec_msg; });
        this.emit("message", exec_msg.msg, result);
        this.exec();
    };
    ExecManager.prototype.insert = function (cmd_msg) {
        if (cmd_msg.data.type == SocketMessage_1.CMDMessageType.CMD_EXEC) {
            this.cmdQueue.push(new ExecMessage(cmd_msg, this.current, this._execResult.bind(this)));
            this.exec();
        }
        else if (cmd_msg.data.type == SocketMessage_1.CMDMessageType.CMD_CLEAR) {
            this.clear();
            // this.cmdQueue.length = 0;
            // this.execMsg.clear();
            // this.execMsg.callBack = null;
            // this.execMsg = null;
        }
        else {
            this.emit("message", cmd_msg, "CMD类型错误");
        }
    };
    ExecManager.prototype.exec = function () {
        if (this.execMsg == null && this.cmdQueue.length >= 1) {
            this.execMsg = this.cmdQueue[0];
            this.execMsg.exec();
            return;
        }
    };
    ExecManager.prototype.clear = function () {
        this.cmdQueue.length = 0;
        this.execMsg.clear();
        this.execMsg.callBack = null;
        this.execMsg = null;
    };
    return ExecManager;
}(events_1.EventEmitter));
/**
 *
 * {id: 8888,key: 1000,date:0,name: "CMDCommandTask",data: {path: "",type: 201,id: 888,timeout: 2000,cmd: "ls",args: ["-a", "-l"]}}
 */
var CMDCommandTask = /** @class */ (function (_super) {
    __extends(CMDCommandTask, _super);
    function CMDCommandTask(app) {
        var _this = _super.call(this, app) || this;
        _this.status = TaskBase_1.TaskStatus.Prepare;
        _this.name = "CMDCommandTask";
        _this.date = new Date();
        _this.manage = new ExecManager();
        _this.manage.on("message", _this.handle.bind(_this));
        return _this;
    }
    CMDCommandTask.prototype.listen = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.manage.insert(info);
                return [2 /*return*/];
            });
        });
    };
    CMDCommandTask.prototype.handle = function (msg, res) {
        this.send({ result: res }, msg);
    };
    CMDCommandTask.prototype.clear = function () {
        this.manage.clear();
    };
    ;
    CMDCommandTask.prototype.toString = function () {
        return {
            name: this.name,
            desc: "执行命令",
            dome: { id: 8888, key: 1000, date: 0, name: "CMDCommandTask", data: { path: "", type: 201, id: 888, timeout: 2000, cmd: "ls", args: ["-a", "-l"] } }
        };
    };
    return CMDCommandTask;
}(TaskBase_1.ListenTask));
exports.default = CMDCommandTask;
//# sourceMappingURL=CMDCommandTask.js.map