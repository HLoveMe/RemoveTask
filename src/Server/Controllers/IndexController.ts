import { JsonController, Controller, Req, Res, Get, Post, UploadedFile, Param } from "routing-controllers";
import { join } from "path";
import { readFileSync, existsSync,createReadStream } from "fs";
import * as multer from "multer";
import PathConfig from "../../Util/PathRUL";
import { scanFiles, getFileInfo } from "../../Util/FileUtil";
import WebSocketManager from "../WebSocketManager";

const fileUploadOptions = {
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, PathConfig.upload_dir);
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, Date.now() + "_" + file.originalname);
        }
    }),
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 2
    }
};
@JsonController("/project")
export class IndexController {
    constructor() { }
    @Get("/")
    @Get("/index")
    index(@Req() request: any, @Res() response: any) {
        return { desc: "index" }
    }
    @Get("/config")
    config() {
        const source = PathConfig.next_config_file;//join(PathConfig.static_dir, "next_config.json");
        const context = readFileSync(source, 'utf-8').toString();
        return JSON.parse(context);
    }
    @Get("/check")
    check() {
        return "check"
    }
    @Get("clear_connect")
    clear_connect(){
        WebSocketManager.clearAll()
    }
    @Get("/source")
    source() {
        return "source"
    }

    @Post("/fileupload")
    fileupload(@UploadedFile("up_file", { options: fileUploadOptions }) file: Express.Multer.File) {
        return {
            filename: file.filename,
            size: file.size
        }
    }
    @Get("/files")
    files() {
        return scanFiles(PathConfig.upload_dir).map($1 => {
            const info = getFileInfo($1 as string);
            delete info["path"];
            return info;
        });
    }

}

@Controller("/file")
export class FileController {
    // @Get("/download")
    // async download(@Res() response: any, @Req() req: any) {
    //     const _path = join(PathConfig.upload_dir, req.query.name);
    //     if (existsSync(_path)) {
    //         try {
    //             await new Promise((resolve, reject) => {
    //                 response.sendFile(_path, (err: any) => {
    //                     if (err) reject(err);
    //                     resolve();
    //                 });
    //             });
    //         } catch (error) {
    //             console.log(error);
    //             throw new Error(error);
    //         }
    //     }
    // }
    // get http://1991919:8081/file/download?name=xx.txt
    @Get("/download")
    download(@Res() response: any, @Req() req: any) {
        const _path = join(PathConfig.upload_dir, req.query.name);
        if (existsSync(_path)) {
            response.writeHead(200, {
                "Content-Type": "multipart/form-data",
                "Content-disposition": `attachment;filename=${req.query.name}`,
                "Content-Length": getFileInfo(_path).size
            });
            const srcReadStream = createReadStream(_path)
            srcReadStream.pipe(response);
    
            srcReadStream.on('close', function () {
                // It can go here after close event
                srcReadStream.destroy();
                // resolve();
            });
            
            srcReadStream.on('error', function (err) {
                srcReadStream.destroy();
            })
            return;
        }
        return
    }
}