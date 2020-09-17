"use strict";
/***
 *
  pip3 install  opencv-python
  
    1:修改 takePhotoServer.py  第二行 指定 opencv-python 安装路径 「能正常导入就不需要」

  */
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
var Process = require("child_process");
var path_1 = require("path");
var fs_1 = require("fs");
var FileUtil_1 = require("../../Util/FileUtil");
var Config_1 = require("../../Config");
/**{id: 1000,key: 1000,date: 10000,name: "PhotoTakeTask",data: {}} */
var PhotoTakeTask = /** @class */ (function (_super) {
    __extends(PhotoTakeTask, _super);
    // result: AudioExexResult;
    function PhotoTakeTask(app) {
        var _this = _super.call(this, app) || this;
        _this.status = TaskBase_1.TaskStatus.Prepare;
        _this.name = "PhotoTakeTask";
        _this.date = new Date();
        _this.isRun = false;
        _this.python_file = path_1.join(__dirname, "pys", "Photo.py");
        return _this;
    }
    PhotoTakeTask.prototype.clear = function () {
        FileUtil_1.scanFiles(PathRUL_1.default.temp_dir).forEach(function ($1) {
            if ($1.indexOf("_photo_.jpg") >= 0) {
                fs_1.unlinkSync($1);
            }
        });
    };
    PhotoTakeTask.prototype.run_photo = function (info) {
        var file_name = path_1.join(PathRUL_1.default.temp_dir, new Date().getTime() + "_photo_.jpg");
        return Promise.race([
            fetch("http://localhost:" + Config_1.default.py_web_ip + "/?file=" + file_name).then(function () { return { file_name: file_name }; }),
            new Promise(function (resolve) {
                setTimeout(function () { return resolve({}); }, 25000);
            })
        ]);
    };
    PhotoTakeTask.prototype.listen = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.isRun)
                    return [2 /*return*/];
                this.isRun = true;
                this.run_photo(info)
                    .then(function (result) {
                    setTimeout(function () {
                        var file_name = result.file_name;
                        if (!fs_1.existsSync(file_name)) {
                            file_name = path_1.join(PathRUL_1.default.py_util, "_photo_.jpg");
                        }
                        var content = "";
                        if (fs_1.existsSync(file_name)) {
                            var bitmap = fs_1.readFileSync(file_name);
                            content = bitmap.toString('base64');
                        }
                        result.content = content;
                        _this.send({ result: result }, info);
                        _this.clear();
                    }, 3000);
                }).catch(function (err) {
                    _this.send({ result: {}, err: err }, info);
                }).finally(function () {
                    _this.isRun = false;
                });
                return [2 /*return*/];
            });
        });
    };
    PhotoTakeTask.prototype.toString = function () {
        return {
            name: this.name,
            desc: "拍照,保存文件",
            dome: { id: 1000, key: 1000, date: 10000, name: "PhotoTakeTask", data: {} }
        };
    };
    return PhotoTakeTask;
}(TaskBase_1.ListenTask));
exports.default = PhotoTakeTask;
//# sourceMappingURL=PhotoTakeTask.js.map