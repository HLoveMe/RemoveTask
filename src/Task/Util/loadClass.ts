import { ListenTask } from "../Base/TaskBase";
import { scanFiles } from "../../Util/FileUtil";
import { InfoUpdateManager } from "../../ErrorManager";
const fs = require("fs");
const path = require("path");

function parseTask(routes: String[]): ListenTask[] {
    const remoteTasks = [];
    for (let index = 0; index < routes.length; index++) {
        try {
            const element = routes[index];
            const SomeClass = require(element as string).default;
            const target = typeof SomeClass == 'function' ? new SomeClass(null) : null
            if (target != null && target instanceof ListenTask) remoteTasks.push(target)
        } catch (error) { }
    }
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