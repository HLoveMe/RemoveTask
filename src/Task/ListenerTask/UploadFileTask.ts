import { TaskStatus, ListenTask, App } from "../Base/TaskBase";
import { FileUplodMessage, MessageType, Message } from "../../WebSocket/SocketMessage";
import PathConfig from "../../Util/PathRUL";
import { existsSync } from "fs";
import { join, basename } from "path";
import { getFileInfo, FileInfo, isFile } from "../../Util/FileUtil";


export default class UploadFileTask extends ListenTask {
    app: App;
    status: TaskStatus = TaskStatus.Prepare;
    name: String = "UploadFileTask";
    date: Date = new Date();
    constructor(app: App) {
        super(app);
    }
    fileUpdate(path: string): Promise<Error | any | null> {
        return new Promise((resolve, reject) => {
            // fetch(PathConfig.source_url.fileupload)
            //     .then(a => { })
            //     .catch((error) => resolve(error))
        })
    }
    async listen(info: FileUplodMessage) {
        const file_path = info.data.path as string;
        if (existsSync(file_path) && isFile(file_path)) {
            // const name = basename(file_path);
            const file: FileInfo = getFileInfo(file_path);
            const result = await this.fileUpdate(file_path);
            result instanceof Error && this.updateInfo(result, { desc: "UploadFileTask/listen", file })
            this.send({
                ...file,
                status: !(result instanceof Error) && result != null
            }, info)
        }
    }
}