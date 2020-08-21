"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationConfig = exports.ValidationMessage = void 0;
var index_1 = require("../Config/index");
exports.ValidationMessage = function (data) {
    if (data == null)
        return false;
    if (data["date"] == null)
        return false;
    if (data["id"] == null)
        return false;
    if (data["key"] == null)
        return false;
    return true;
};
exports.ValidationConfig = function (data) {
    var target = Object.keys(data);
    var source = Object.keys(index_1.default);
    return source.every(function ($1) { return target.indexOf($1) >= 0; });
};
//# sourceMappingURL=ValidationMessage.js.map