import { PathString } from "./Constants";
const path = require("path");
var fs = require("fs");
enum FileType {
    file,
    dir
}
declare interface FileInfo {
    name: String;
    path: String;
    size: number;
    type: FileType
}
function isFile(route: PathString): boolean {
    if (fs.exists(route)) {
        return fs.statSync(route).isFile();
    }
    return false;
}

function isDir(route: PathString): boolean {
    if (fs.exists(route)) {
        return fs.statSync(route).isDirectory();
    }
    return false;
}

function getFileInfo(route: PathString): FileInfo | null {
    if (fs.exists(route)) {
        const stats = fs.statSync(route).stats;
        return {
            name: route.split(path.step)[0],
            path: route,
            size: stats.size,
            type: stats.isFile() ? FileType.file : FileType.dir
        } as FileInfo;
    }
    return null;
}

function scanFiles(entry: PathString): String[] {
    if (!fs.exists(entry)) return [];
    const res: String[] = [];
    const dirInfo = fs.readdirSync(entry);
    dirInfo.forEach(item => {
        const location = path.join(entry, item)
        res.push(location);
    })
    return res;
}

export {
    isFile,
    isDir,
    FileInfo,
    getFileInfo,
    scanFiles
}