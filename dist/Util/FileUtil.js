"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanFiles = exports.getFileInfo = exports.isDir = exports.isFile = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var path = require("path");
var fs = require("fs");
var FileType;
(function (FileType) {
    FileType[FileType["file"] = 0] = "file";
    FileType[FileType["dir"] = 1] = "dir";
})(FileType || (FileType = {}));
function isFile(route) {
    if (fs_1.existsSync(route)) {
        return fs.statSync(route).isFile();
    }
    return false;
}
exports.isFile = isFile;
function isDir(route) {
    if (fs_1.existsSync(route)) {
        return fs.statSync(route).isDirectory();
    }
    return false;
}
exports.isDir = isDir;
function getFileInfo(route) {
    if (fs_1.existsSync(route)) {
        var stats = fs.statSync(route);
        return {
            name: path_1.basename(route),
            path: route,
            size: stats.size,
            type: stats.isFile() ? FileType.file : FileType.dir
        };
    }
    return null;
}
exports.getFileInfo = getFileInfo;
function scanFiles(entry) {
    if (!fs_1.existsSync(entry))
        return [];
    var res = [];
    var dirInfo = fs.readdirSync(entry);
    dirInfo.forEach(function (item) {
        var location = path.join(entry, item);
        res.push(location);
    });
    return res;
}
exports.scanFiles = scanFiles;
//# sourceMappingURL=FileUtil.js.map