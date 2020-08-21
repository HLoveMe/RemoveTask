"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function saveFile(data, path) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, data, { flag: "w", encoding: "utf-8" }, function (err) {
            resolve(err == null);
        });
    });
}
exports.saveFile = saveFile;
//# sourceMappingURL=SaveFile.js.map