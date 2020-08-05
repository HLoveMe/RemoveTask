import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { FileUplodMessage } from "../../WebSocket/SocketMessage";
import PathConfig from "../../Util/PathRUL";
const path = require("path");
const fs = require("fs");
/**
 * 1:远程任务必须 使用 export.default
 * 2:远程任务文件保存位置位于TasK/Remote 下
 */
export class UploadFileTask extends ListenTask {
    app: App;
    status: TaskStatus = TaskStatus.Prepare;
    name: String = "UploadFileTask";
    date: Date = new Date();
    constructor(app: App) {
        super(app);
    }
    async listen(info: FileUplodMessage) {

    }
}