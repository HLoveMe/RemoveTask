
import PathConfig from "../../Util/PathRUL";
import { ListenTask } from "../TaskBase";
const path = require("path");

var remove_task_root = path.join(PathConfig.task_root);
const RemoteTasks: ListenTask[] = [];

function updateRemoteTask() {
  
}
export {
  RemoteTasks,
  updateRemoteTask
};
