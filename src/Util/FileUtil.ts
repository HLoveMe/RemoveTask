import { PathString } from "./Constants";
import { basename } from "path";
import { existsSync, PathLike } from "fs";
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
declare interface DirDesc {
    path: PathLike;
    subs: Array<DirDesc | FileInfo>
}
function isFile(route: PathLike): boolean {
    if (existsSync(route)) {
        return fs.statSync(route).isFile();
    }
    return false;
}

function isDir(route: PathLike): boolean {
    if (existsSync(route)) {
        return fs.statSync(route).isDirectory();
    }
    return false;
}

function getFileInfo(route: PathLike): FileInfo | null {
    if (existsSync(route)) {
        const stats = fs.statSync(route);
        return {
            name: basename(route.toString()),
            path: route,
            size: stats.size,
            type: stats.isFile() ? FileType.file : FileType.dir
        } as FileInfo;
    }
    return null;
}

function scanFiles(entry: PathLike): String[] {
    if (!existsSync(entry)) return [];
    const res: String[] = [];
    const dirInfo = fs.readdirSync(entry);
    dirInfo.forEach(item => {
        const location = path.join(entry, item)
        res.push(location);
    })
    return res;
}

function ScanDirs(dir: PathLike, depth: number = 10): DirDesc {
    const scan = (dir: PathLike, depth: number = 10, current_info = { path: dir, subs: [] }): DirDesc => {
        const dir_infos = scanFiles(dir);
        dir_infos.forEach($1 => {
            if (isFile($1 as string)) {
                current_info.subs.push(getFileInfo($1 as string))
            } else if (isDir($1 as string)) {
                depth >= 0 && current_info.subs.push(scan($1 as string, --depth, { path: $1 as string, subs: [] }))
            }
        })
        return current_info;
    }
    if (!isDir(dir)) {
        return scan(dir, depth);
    }
    return { path: dir, subs: [] };
}

export {
    isFile,
    isDir,
    FileInfo,
    getFileInfo,
    scanFiles,//得到当前文件下所有文件路径
    ScanDirs,//得到当前文件下架下 depth 层级 所有文件
}