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
var PathRUL_1 = require("../../Util/PathRUL");
var loadClass_1 = require("../Util/loadClass");
var path = require("path");
var fs = require("fs");
/**
 * {id:1000,key:1000,date:10000,name:"RemoteListenTask",data:{name:"文件名称",context:"base64源文件"}}
 *
 * 1:编写ListenTask子类 export default。 并编译为commonjs
 * 2:复制到 TSome_Util/TaskBase64/Tasks 下
 * 3:npm run  create_remote_msg
 * 4:得到 RemoteListenTask 消息体
 * 5:该远程Task 会被保存在 /Task/Remote 文件夹下
 */
var RemoteListenTask = /** @class */ (function (_super) {
    __extends(RemoteListenTask, _super);
    function RemoteListenTask(app) {
        var _this = _super.call(this, app) || this;
        _this.status = TaskBase_1.TaskStatus.Prepare;
        _this.name = "RemoteListenTask";
        _this.date = new Date();
        _this.remote_dir_root = path.join(PathRUL_1.default.task_root, "Remote");
        return _this;
    }
    RemoteListenTask.prototype.loadRemoteClass = function (routes) {
        var remoteTasks = loadClass_1.parseTask(routes);
        this.app.addListenTask(remoteTasks);
    };
    RemoteListenTask.prototype.listen = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var routes_1;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    routes_1 = [];
                    (info.data || []).forEach(function ($1) {
                        var name = $1.name, context = $1.context;
                        var that_path = path.join(_this.remote_dir_root, name + ".js");
                        fs.existsSync(that_path) && fs.unlinkSync(that_path);
                        var jscontext = new Buffer(context, "base64");
                        fs.writeFileSync(that_path, jscontext.toString());
                        routes_1.push(that_path);
                    });
                    this.loadRemoteClass(routes_1);
                }
                catch (error) {
                    console.log(error);
                    this.updateInfo(error, "RemoteListenTask/listen/saveFile");
                }
                return [2 /*return*/];
            });
        });
    };
    RemoteListenTask.prototype.toString = function () {
        return {
            name: this.name,
            desc: "Exec 下载远程任务",
            dome: { id: 1000, key: 1000, date: 10000, name: "RemoteListenTask", data: { name: "文件名称", context: "base64源文件" } }
        };
    };
    return RemoteListenTask;
}(TaskBase_1.ListenTask));
exports.default = RemoteListenTask;
//# sourceMappingURL=RemoteListenTask.js.map