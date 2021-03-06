"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var route = path_1.join(__dirname, "..", "..", "Static", "config.json");
var Config = require(route);
function updateConfig(config) {
    Config.version = config.version;
    Config.ip = config.ip;
    Config.py_web_ip = config.py_web_ip;
    Config.websoket_id = config.websoket_id;
    Config.files = config.files;
    Config.source = config.source;
    Config.bd_api = config.bd_api;
}
exports.updateConfig = updateConfig;
exports.default = Config;
//# sourceMappingURL=index.js.map