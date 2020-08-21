"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var routing_controllers_1 = require("routing-controllers");
var WebSocketManager_1 = require("./WebSocketManager");
var Config_1 = require("../Config");
/**
 * 服务器中转
 * 8080
 *
 */
var AppServer = /** @class */ (function () {
    function AppServer() {
    }
    AppServer.prototype.run = function () {
        var app = routing_controllers_1.createExpressServer({
            controllers: [
                __dirname + "/Controllers/*.js",
            ] //声明需要使用的控制器
        });
        app.listen(Config_1.default.server_ip);
        WebSocketManager_1.default.start();
    };
    return AppServer;
}());
new AppServer().run();
//# sourceMappingURL=index.js.map