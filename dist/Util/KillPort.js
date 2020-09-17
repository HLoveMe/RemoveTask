"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec = require('child_process').exec;
function KillPort(port) {
    if (port === void 0) { port = 8486; }
    return new Promise(function (resolve, reject) {
        var order = "lsof -i:" + port;
        exec(order, function (err, stdout, stderr) {
            if (err) {
                resolve();
                return console.log(err);
            }
            stdout.split('\n').filter(function (line, index, arr) {
                var p = line.trim().split(/\s+/);
                var address = p[1];
                if (address != undefined && address != "PID") {
                    exec('kill ' + address, function (err, stdout, stderr) {
                        index == arr.length - 1 && resolve();
                    });
                }
            });
        });
    });
}
exports.default = KillPort;
//# sourceMappingURL=KillPort.js.map