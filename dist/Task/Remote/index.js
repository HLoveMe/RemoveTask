"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteTasks = void 0;
var PathRUL_1 = require("../../Util/PathRUL");
var loadClass_1 = require("../Util/loadClass");
var path = require("path");
var remove_task_root = path.join(PathRUL_1.default.task_root, "Remote");
var RemoteTasks = loadClass_1.loadtaskClassForDir(remove_task_root);
exports.RemoteTasks = RemoteTasks;
//# sourceMappingURL=index.js.map