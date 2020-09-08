"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadtaskClassForDir = exports.parseTask = void 0;
var TaskBase_1 = require("../Base/TaskBase");
var FileUtil_1 = require("../../Util/FileUtil");
var ErrorManager_1 = require("../../ErrorManager");
var fs = require("fs");
var path = require("path");
function parseTask(routes) {
    var remoteTasks = [];
    for (var index = 0; index < routes.length; index++) {
        try {
            var element = routes[index];
            var SomeClass = require(element).default;
            var target = typeof SomeClass == 'function' ? new SomeClass(null) : null;
            if (target != null && target instanceof TaskBase_1.ListenTask)
                remoteTasks.push(target);
        }
        catch (error) { }
    }
    return remoteTasks;
}
exports.parseTask = parseTask;
function loadtaskClassForDir(root) {
    // if(fs.ex)
    try {
        var paths = FileUtil_1.scanFiles(root).filter(function ($1) {
            var name = path.basename($1);
            if (!name.endsWith(".js"))
                return false;
            if (name == "index.js")
                return false;
            if (name.startsWith("."))
                return false;
            if (name.endsWith(".map"))
                return false;
            return true;
        });
        return parseTask(paths);
    }
    catch (error) {
        ErrorManager_1.InfoUpdateManager.update(error, { root: root, desc: "loadtaskClassForDir/Error" });
    }
    return [];
}
exports.loadtaskClassForDir = loadtaskClassForDir;
//# sourceMappingURL=loadClass.js.map