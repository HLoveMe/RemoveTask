// import Config from "../Config";
import Constant from "./PathRUL";
import { PathString } from "./Constants";
var fs = require("fs");
var zlib = require("zlib");
var path = require("path");

export enum FileType {
  Project = 1,
  Task = 2,
  ErrorFile = 3,
}

export function Zip(source: PathString, type: FileType = FileType.ErrorFile) {}

export function unZip(source: PathString, type: FileType = FileType.Project) {
  var target: String;
  if (type == FileType.Project) {
    target = Constant.new_project_path;
  } else if(type == FileType.Task){
    target = Constant.task_root;
  }
  
  fs.createReadStream(source).pipe(zlib.createGunzip()).pipe(fs.createWriteStream(target))
}
