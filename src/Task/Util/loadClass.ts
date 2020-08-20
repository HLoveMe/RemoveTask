import { ListenTask } from "../Base/TaskBase";
import { scanFiles } from "../../Util/FileUtil";
import { InfoUpdateManager } from "../../ErrorManager";
const fs = require("fs");
const path = require("path");

function parseTask(routes: String[]): ListenTask[] {

    const remoteTasks = routes
        .map($1 => require($1 as string).default)
        .map(SomeClass => {
            try {
                return typeof SomeClass == 'function' ? new SomeClass(null) : null
            } catch (error) {
                return null
            }
        })
        .filter($2 => $2 != null && $2 instanceof ListenTask);
    return remoteTasks;
}

function loadtaskClassForDir(root: string): ListenTask[] {
    // if(fs.ex)
    try {
        const paths = scanFiles(root).filter($1 => {
            const name: String = path.basename($1);
            if (!name.endsWith(".js")) return false;
            if (name == "index.js") return false;
            if (name.startsWith(".")) return false;
            if (name.endsWith(".map")) return false;
            return true
        });
        return parseTask(paths);
    } catch (error) {
        InfoUpdateManager.update(error, { root, desc: "loadtaskClassForDir/Error" })
    }
    return []
}
export {
    parseTask,
    loadtaskClassForDir
}