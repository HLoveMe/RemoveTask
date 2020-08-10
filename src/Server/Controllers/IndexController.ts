import { JsonController, Req, Res, Get, Post, UploadedFile } from "routing-controllers";
import { join, extname } from "path";
import { readFileSync } from "fs";
import * as multer from "multer";
import PathConfig from "../../Util/PathRUL";

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
}