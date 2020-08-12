import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { FileUplodMessage, MessageType, Message } from "../../WebSocket/SocketMessage";
import PathConfig from "../../Util/PathRUL";
import { existsSync, readFileSync } from "fs";
import { join, basename } from "path";
const FormData = require('form-data');
import { getFileInfo, FileInfo, isFile } from "../../Util/FileUtil";

/***
 * {id:1000,key:1000,date:10000,name:"UploadFileTask",
 *  data:{
 *      path:"/Users/swl/Desktop/My/Doc/Linux_Study/shell.md",
 *      name?:""
 *  }
 * }
 * 
 * client -- >server-- exec
 * exec --->WebServer
 * 
 * 让exec 上传文件到 server Upload文件夹下
 */
export default class UploadFileTask extends ListenTask {
    app: App;
    status: TaskStatus = TaskStatus.Prepare;
    name: String = "UploadFileTask";
    date: Date = new Date();
    constructor(app: App) {
        super(app);
    }
    async fileUpdate(path:string,name:string): Promise<any | Error | null> {
        try {
            const url_path = PathConfig.source_url.fileupload;
            let fileStream = readFileSync(path);//读取文件
            const formdata = new FormData();
            formdata.append("up_file", fileStream, {
                filename: name || basename(path),
            });
            const result = await fetch(url_path, {
                body: formdata,
                method: "POST",
                headers: formdata.getHeaders()
            }).then($1 => $1.json())
            return result;
        } catch (error) {
            return error;
        }
    }
    async listen(info: FileUplodMessage) {
        const file_path = info.data.path as string;
        if (existsSync(file_path) && isFile(file_path)) {
            // const name = basename(file_path);
            const file: FileInfo = getFileInfo(file_path);
            const result = await this.fileUpdate(info.data.path as string,info.data.name as string);
            result instanceof Error && this.updateInfo(result, { desc: "UploadFileTask/listen", file })
            this.send({ ...file, result }, info)
        } else {
            this.send({ desc: "文件不存在 or 不是文件" }, info)
        }
    }
}