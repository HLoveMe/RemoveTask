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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var fs_1 = require("fs");
var path_1 = require("path");
var FormData = require('form-data');
var FileUtil_1 = require("../../Util/FileUtil");
/***
 * {id:1000,key:1000,date:10000,name:"UploadFileTask",
 *  data:{
 *      path:"/Users/swl/Desktop/My/Doc/Linux_Study/shell.md",
 *      name?:""
 *  }
 * }
 *
 * client -- >server-- exec
 * exec --->WebServer
 *
 * 让exec 上传文件到 server Upload文件夹下
 */
var UploadFileTask = /** @class */ (function (_super) {
    __extends(UploadFileTask, _super);
    function UploadFileTask(app) {
        var _this = _super.call(this, app) || this;
        _this.status = TaskBase_1.TaskStatus.Prepare;
        _this.name = "UploadFileTask";
        _this.date = new Date();
        return _this;
    }
    UploadFileTask.prototype.fileUpdate = function (path, name) {
        return __awaiter(this, void 0, void 0, function () {
            var url_path, fileStream, formdata, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url_path = PathRUL_1.default.source_url.fileupload;
                        fileStream = fs_1.readFileSync(path);
                        formdata = new FormData();
                        formdata.append("up_file", fileStream, {
                            filename: name || path_1.basename(path),
                        });
                        return [4 /*yield*/, fetch(url_path, {
                                body: formdata,
                                method: "POST",
                                headers: formdata.getHeaders()
                            }).then(function ($1) { return $1.json(); })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UploadFileTask.prototype.listen = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var file_path, file, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file_path = info.data.path;
                        if (!(fs_1.existsSync(file_path) && FileUtil_1.isFile(file_path))) return [3 /*break*/, 2];
                        file = FileUtil_1.getFileInfo(file_path);
                        return [4 /*yield*/, this.fileUpdate(info.data.path, info.data.name)];
                    case 1:
                        result = _a.sent();
                        result instanceof Error && this.updateInfo(result, { desc: "UploadFileTask/listen", file: file });
                        this.send(__assign(__assign({}, file), { result: result }), info);
                        return [3 /*break*/, 3];
                    case 2:
                        this.send({ desc: "文件不存在 or 不是文件" }, info);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UploadFileTask.prototype.toString = function () {
        return {
            name: this.name,
            desc: "Exec uploadfile",
            dome: {
                id: 1000, key: 1000, date: 10000, name: "UploadFileTask",
                data: {
                    path: "/Users/swl/Desktop/My/Doc/Linux_Study/shell.md",
                    name: "aa.md"
                }
            }
        };
    };
    return UploadFileTask;
}(TaskBase_1.ListenTask));
exports.default = UploadFileTask;
//# sourceMappingURL=UploadFileTask.js.map