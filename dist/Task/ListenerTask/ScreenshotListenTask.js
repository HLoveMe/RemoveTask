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
var SocketMessage_1 = require("../../WebSocket/SocketMessage");
var PathRUL_1 = require("../../Util/PathRUL");
var path_1 = require("path");
var fs_1 = require("fs");
var screenshot = require('desktop-screenshot');
var maxCount = 50;
/**
 
 {
    id: 1000,
    key: 1000,
    date: 10000,
    name: "ScreenshotListenTask",
    data: {
      screenshotCmd:1000 //启动
      // context?:""
      info?:{
        width
        height
        quality
      }
    }
  }
 
start :{id: 1000,key: 1000,date: 10000,name: "ScreenshotListenTask",data: {screenshotCmd:1000}}
 */
var ScreenshotListenTask = /** @class */ (function (_super) {
    __extends(ScreenshotListenTask, _super);
    function ScreenshotListenTask(app) {
        var _this = _super.call(this, app) || this;
        _this.status = TaskBase_1.TaskStatus.Prepare;
        _this.name = "ScreenshotListenTask";
        _this.date = new Date();
        _this.currentCount = 0;
        _this.intervalTime = 10000;
        return _this;
    }
    ScreenshotListenTask.prototype.screenshot = function (msg) {
        var _this = this;
        var data = msg.data;
        this.currentCount += 1;
        if (this.currentCount >= maxCount) {
            return this.clear();
        }
        var img = path_1.join(PathRUL_1.default.temp_dir, "screenshot.jpg");
        if (fs_1.existsSync(img))
            fs_1.unlinkSync(img);
        screenshot(img, data.info || { width: 1920, height: 1080, quality: 50 }, function (error) {
            var content = "";
            if (error == null) {
                var bitmap = fs_1.readFileSync(img);
                content = bitmap.toString('base64');
            }
            if (fs_1.existsSync(img))
                fs_1.unlinkSync(img);
            _this.send({ content: content }, msg);
        });
    };
    ScreenshotListenTask.prototype.clear = function () {
        this.currentCount = 0;
        this.interval && clearInterval(this.interval);
    };
    ScreenshotListenTask.prototype.listen = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.clear();
                if (info.data.screenshotCmd == SocketMessage_1.ScreenshotCMD.START) {
                    this.screenshot(info);
                    this.interval = setInterval(function () { return _this.screenshot(info); }, this.intervalTime);
                }
                else if (info.data.screenshotCmd == SocketMessage_1.ScreenshotCMD.END) {
                }
                return [2 /*return*/];
            });
        });
    };
    ScreenshotListenTask.prototype.toString = function () {
        return {
            name: this.name,
            desc: "Exec 截屏 screenshotCmd:1000/990",
            dome: { id: 1000, key: 1000, date: 10000, name: "ScreenshotListenTask", data: { screenshotCmd: 1000 } }
        };
    };
    return ScreenshotListenTask;
}(TaskBase_1.ListenTask));
exports.default = ScreenshotListenTask;
//# sourceMappingURL=ScreenshotListenTask.js.map