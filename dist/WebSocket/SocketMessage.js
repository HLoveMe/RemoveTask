"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenshotCMD = exports.CMDMessageType = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["CLEAR"] = -100] = "CLEAR";
    MessageType[MessageType["ERROR"] = -99] = "ERROR";
    MessageType[MessageType["ExecCLOSE"] = -98] = "ExecCLOSE";
    MessageType[MessageType["Normal"] = 0] = "Normal";
    MessageType[MessageType["PING"] = 1] = "PING";
    MessageType[MessageType["UUID"] = 4] = "UUID";
    MessageType[MessageType["REQUEST_UUID"] = 7] = "REQUEST_UUID";
    MessageType[MessageType["INFO_KEY"] = 2] = "INFO_KEY";
    MessageType[MessageType["LINK"] = 5] = "LINK";
    MessageType[MessageType["TASK"] = 1000] = "TASK";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var CMDMessageType;
(function (CMDMessageType) {
    CMDMessageType[CMDMessageType["CMD_MSG"] = 200] = "CMD_MSG";
    CMDMessageType[CMDMessageType["CMD_EXEC"] = 201] = "CMD_EXEC";
    CMDMessageType[CMDMessageType["CMD_CLEAR"] = 202] = "CMD_CLEAR";
})(CMDMessageType = exports.CMDMessageType || (exports.CMDMessageType = {}));
var ScreenshotCMD;
(function (ScreenshotCMD) {
    ScreenshotCMD[ScreenshotCMD["START"] = 1000] = "START";
    ScreenshotCMD[ScreenshotCMD["END"] = 990] = "END";
})(ScreenshotCMD = exports.ScreenshotCMD || (exports.ScreenshotCMD = {}));
//# sourceMappingURL=SocketMessage.js.map