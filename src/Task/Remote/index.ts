
import PathConfig from "../../Util/PathRUL";
import { ListenTask } from "../Base/TaskBase";
import {  loadtaskClassForDir } from "../Util/loadClass";
const path = require("path");
var remove_task_root = path.join(PathConfig.task_root, "Remote");

const RemoteTasks: ListenTask[] = loadtaskClassForDir(remove_task_root);

export {
  RemoteTasks
};
