import { Controller, Req, Res, Get } from "routing-controllers";

@Controller("/project")
export class IndexController {
    constructor() { }
    @Get("/")
    @Get("/index")
    index(@Req() request: any, @Res() response: any) {
        return response.send("Hello response!111");
    }
    @Get("/config")
    config() {
        return "config11"
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