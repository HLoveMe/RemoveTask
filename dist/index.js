"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketManager_1 = require("./WebSocket/WebSocketManager");
var VersionChenkTask_1 = require("./Task/SourceTask/VersionChenkTask");
var node_fetch_1 = require("node-fetch");
var TaskBase_1 = require("./Task/Base/TaskBase");
var ErrorManager_1 = require("./ErrorManager");
var index_1 = require("./Task/Remote/index");
var PathRUL_1 = require("./Util/PathRUL");
var loadClass_1 = require("./Task/Util/loadClass");
// import { ExecProcess } from "./Util/ExecProcess";
// import { join } from "path";
// const { exec } = require("child_process");
var path = require("path");
var AbortController = require('abortcontroller-polyfill/dist/cjs-ponyfill').AbortController;
global.fetch = node_fetch_1.default;
var App = /** @class */ (function () {
    function App() {
        this.reloadCount = 0;
        this.abortController = new AbortController();
        WebSocketManager_1.WebManager.app = this;
        // let a = `cd ${join(PathConfig.root,"..")} && npm run runrun`
        // exec(`cd ${join(PathConfig.root,"..")} && npm run runrun &`,function(){
        //   debugger
        // })
        // ExecProcess("npm run runrun",[],join(PathConfig.root,".."))
    }
    App.prototype.sourceInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var version_status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new VersionChenkTask_1.VersionChenkTask().do()];
                    case 1:
                        version_status = _a.sent();
                        if (version_status == TaskBase_1.TaskStatus.Success) {
                            this.reload();
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    App.prototype.reload = function (err) {
        if (err === void 0) { err = new Error("1s,重启"); }
        ErrorManager_1.InfoUpdateManager.update(err);
        //pm2 启动
        setTimeout(function () { process.exit(); }, 1000);
    };
    App.prototype.reconnect = function () {
        var _this = this;
        this.reloadCount += 1;
        if (this.reloadCount <= 5) {
            setTimeout(function () {
                WebSocketManager_1.WebManager.clear();
                WebSocketManager_1.WebManager.start();
                _this.initListenerTasks();
            }, 1000 * Math.pow(2, this.reloadCount));
        }
        else {
            this.abortController.abort();
        }
    };
    App.prototype.initListenerTasks = function () {
        var litener_path = path.join(PathRUL_1.default.task_root, "ListenerTask");
        var tasks = loadClass_1.loadtaskClassForDir(litener_path);
        this.addListenTask(__spreadArrays(tasks, index_1.RemoteTasks));
    };
    App.prototype.addListenTask = function (tasks) {
        WebSocketManager_1.WebManager.addEventListeners.apply(WebSocketManager_1.WebManager, tasks);
    };
    App.prototype.Wait = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.abortController.signal.addEventListener("abort", function () { return resolve(); });
        });
    };
    App.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initListenerTasks();
                        return [4 /*yield*/, this.sourceInit()];
                    case 1:
                        result = _a.sent();
                        result && WebSocketManager_1.WebManager.start();
                        return [4 /*yield*/, this.Wait()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return App;
}());
new App().run().then(function () { });
//# sourceMappingURL=index.js.map