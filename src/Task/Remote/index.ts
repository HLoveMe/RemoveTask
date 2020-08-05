
import PathConfig from "../../Util/PathRUL";
import { ListenTask } from "../Base/TaskBase";
import { scanFiles } from "../../Util/FileUtil";
import { InfoUpdateManager } from "../../ErrorManager";
const path = require("path");

var remove_task_root = path.join(PathConfig.task_root, "Remote");
const RemoteTasks: ListenTask[] = [];

try {
  const paths = scanFiles(remove_task_root).filter($1 => {
    const name: String = path.basename($1);
    if (name == "index.js") return false;
    if (name.startsWith(".")) return false;
    if (name.endsWith(".map")) return false;
    return true
  });
  RemoteTasks.push(...parseRemoveTask(paths));
} catch (error) {
  InfoUpdateManager.update(error,"Remote/Tast/parse")
}
function parseRemoveTask(routes: String[]): ListenTask[] {
  const remoteTasks = routes
    .map($1 => require($1 as string).default)
    .map(SomeClass => typeof SomeClass == 'function' ? new SomeClass(null) : null)
    .filter($2 => $2 != null && $2 instanceof ListenTask);
  return remoteTasks;
}

export {
  RemoteTasks,
  parseRemoveTask
};
