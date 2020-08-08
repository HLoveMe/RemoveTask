import { JsonController, Req, Res, Get } from "routing-controllers";
import { join } from "path";
import { readFileSync } from "fs";

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
        const source = join(__dirname,"..","Source","Config","config.json");
        const context = readFileSync(source,'utf-8').toString();
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
}