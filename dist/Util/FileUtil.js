"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            name: path_1.basename(route.toString()),
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
function ScanDirs(dir, depth) {
    if (depth === void 0) { depth = 10; }
    var scan = function (dir, depth, current_info) {
        if (depth === void 0) { depth = 10; }
        if (current_info === void 0) { current_info = { path: dir, subs: [] }; }
        var dir_infos = scanFiles(dir);
        dir_infos.forEach(function ($1) {
            if (isFile($1)) {
                current_info.subs.push(getFileInfo($1));
            }
            else if (isDir($1)) {
                depth >= 0 && current_info.subs.push(scan($1, --depth, { path: $1, subs: [] }));
            }
        });
        return current_info;
    };
    if (!isDir(dir)) {
        return scan(dir, depth);
    }
    return { path: dir, subs: [] };
}
exports.ScanDirs = ScanDirs;
//# sourceMappingURL=FileUtil.js.map