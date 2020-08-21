"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import Config from "../Config";
var PathRUL_1 = require("./PathRUL");
var fs = require("fs");
var zlib = require("zlib");
var path = require("path");
var FileType;
(function (FileType) {
    FileType[FileType["Project"] = 1] = "Project";
    FileType[FileType["Task"] = 2] = "Task";
    FileType[FileType["ErrorFile"] = 3] = "ErrorFile";
})(FileType = exports.FileType || (exports.FileType = {}));
function Zip(source, type) {
    if (type === void 0) { type = FileType.ErrorFile; }
}
exports.Zip = Zip;
function unZip(source, type) {
    if (type === void 0) { type = FileType.Project; }
    var target;
    if (type == FileType.Project) {
        target = PathRUL_1.default.new_project_path;
    }
    else if (type == FileType.Task) {
        target = PathRUL_1.default.task_root;
    }
    fs.createReadStream(source).pipe(zlib.createGunzip()).pipe(fs.createWriteStream(target));
}
exports.unZip = unZip;
//# sourceMappingURL=FileZip.js.map