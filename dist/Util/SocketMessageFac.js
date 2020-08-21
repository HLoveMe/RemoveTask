"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMsgFac = exports.MessageFac = void 0;
var SocketMessage_1 = require("../WebSocket/SocketMessage");
var MessageConstants_1 = require("./MessageConstants");
exports.MessageFac = function (msg, noUpdate) {
    if (noUpdate === void 0) { noUpdate = false; }
    try {
        var result = __assign(__assign({}, msg), { date: noUpdate ? msg.date : (new Date().getTime()) });
        return JSON.stringify(result);
    }
    catch (error) {
        return "";
    }
};
exports.ErrorMsgFac = function (msg, info, uuid) {
    if (info === void 0) { info = ""; }
    if (uuid === void 0) { uuid = null; }
    return JSON.stringify({
        id: msg.id || SocketMessage_1.MessageType.ERROR,
        key: msg.key || SocketMessage_1.MessageType.ERROR,
        name: msg.name || "",
        date: new Date().getTime(),
        data: {
            error: info,
            uuid: uuid !== null && uuid !== void 0 ? uuid : MessageConstants_1.mac_id
        }
    });
};
//# sourceMappingURL=SocketMessageFac.js.map