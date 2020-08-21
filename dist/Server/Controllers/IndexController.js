"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var path_1 = require("path");
var fs_1 = require("fs");
var multer = require("multer");
var PathRUL_1 = require("../../Util/PathRUL");
var FileUtil_1 = require("../../Util/FileUtil");
var fileUploadOptions = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, PathRUL_1.default.upload_dir);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "_" + file.originalname);
        }
    }),
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 2
    }
};
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (request, response) {
        return { desc: "index" };
    };
    IndexController.prototype.config = function () {
        var source = PathRUL_1.default.next_config_file; //join(PathConfig.static_dir, "next_config.json");
        var context = fs_1.readFileSync(source, 'utf-8').toString();
        return JSON.parse(context);
    };
    IndexController.prototype.check = function () {
        return "check";
    };
    IndexController.prototype.source = function () {
        return "source";
    };
    IndexController.prototype.fileupload = function (file) {
        return {
            filename: file.filename,
            size: file.size
        };
    };
    IndexController.prototype.files = function () {
        return FileUtil_1.scanFiles(PathRUL_1.default.upload_dir).map(function ($1) {
            var info = FileUtil_1.getFileInfo($1);
            delete info["path"];
            return info;
        });
    };
    __decorate([
        routing_controllers_1.Get("/"),
        routing_controllers_1.Get("/index"),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], IndexController.prototype, "index", null);
    __decorate([
        routing_controllers_1.Get("/config"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IndexController.prototype, "config", null);
    __decorate([
        routing_controllers_1.Get("/check"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IndexController.prototype, "check", null);
    __decorate([
        routing_controllers_1.Get("/source"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IndexController.prototype, "source", null);
    __decorate([
        routing_controllers_1.Post("/fileupload"),
        __param(0, routing_controllers_1.UploadedFile("up_file", { options: fileUploadOptions })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], IndexController.prototype, "fileupload", null);
    __decorate([
        routing_controllers_1.Get("/files"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IndexController.prototype, "files", null);
    IndexController = __decorate([
        routing_controllers_1.JsonController("/project"),
        __metadata("design:paramtypes", [])
    ], IndexController);
    return IndexController;
}());
exports.IndexController = IndexController;
var FileController = /** @class */ (function () {
    function FileController() {
    }
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
    FileController.prototype.download = function (response, req) {
        var _path = path_1.join(PathRUL_1.default.upload_dir, req.query.name);
        if (fs_1.existsSync(_path)) {
            response.writeHead(200, {
                "Content-Type": "multipart/form-data",
                "Content-disposition": "attachment;filename=" + req.query.name,
                "Content-Length": FileUtil_1.getFileInfo(_path).size
            });
            var srcReadStream_1 = fs_1.createReadStream(_path);
            srcReadStream_1.pipe(response);
            srcReadStream_1.on('close', function () {
                // It can go here after close event
                srcReadStream_1.destroy();
                // resolve();
            });
            srcReadStream_1.on('error', function (err) {
                srcReadStream_1.destroy();
            });
            return;
        }
        return;
    };
    __decorate([
        routing_controllers_1.Get("/download"),
        __param(0, routing_controllers_1.Res()), __param(1, routing_controllers_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], FileController.prototype, "download", null);
    FileController = __decorate([
        routing_controllers_1.Controller("/file")
    ], FileController);
    return FileController;
}());
exports.FileController = FileController;
//# sourceMappingURL=IndexController.js.map