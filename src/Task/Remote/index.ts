
import PathConfig from "../../Util/PathRUL";
import { ListenTask } from "../TaskBase";
import { scanFiles } from "../../Util/FileUtil";
const path = require("path");

var remove_task_root = path.join(PathConfig.task_root,"Remote");
const RemoteTasks: ListenTask[] = [];

try {
  const paths = scanFiles(remove_task_root).filter($1=>{
    const name:String = path.basename($1);
    if(name == "index.js")return false;
    if(name.startsWith("."))return false;
    if(name.endsWith(".map"))return false;
    return true
  });
  debugger
} catch (error) {
  debugger
  console.error(error)
}

export {
  RemoteTasks
};
