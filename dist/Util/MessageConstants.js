"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketMessage_1 = require("../WebSocket/SocketMessage");
var Machine_1 = require("./Machine");
var getmac = !Machine_1.isNode ? function () { } : require("getmac").default;
exports.mac_id = getmac();
//服务器 发送客服机表明Exec 连接中断
exports.CloseMessage = function (info) { return { id: SocketMessage_1.MessageType.ExecCLOSE, date: new Date().getTime(), key: SocketMessage_1.MessageType.ExecCLOSE, data: { desc: "ExecClientClose", info: info, uuid: null } }; };
exports.ClearMessage = { id: SocketMessage_1.MessageType.CLEAR, key: SocketMessage_1.MessageType.CLEAR, data: {} };
exports.PingMessage = { id: SocketMessage_1.MessageType.PING, key: SocketMessage_1.MessageType.PING, data: { ping: "ping", compute: Machine_1.getComInfo(), uuid: exports.mac_id } };
exports.UuidMessage = { id: SocketMessage_1.MessageType.UUID, key: SocketMessage_1.MessageType.UUID, data: { uuid: exports.mac_id } };
exports.RequestUuidMessage = { id: SocketMessage_1.MessageType.REQUEST_UUID, key: SocketMessage_1.MessageType.REQUEST_UUID, get date() { return new Date().getTime(); } };
exports.TaskNameMessage = { id: SocketMessage_1.MessageType.INFO_KEY, key: SocketMessage_1.MessageType.INFO_KEY, data: { task_info: null, task_names: null, message_types: Object.keys(SocketMessage_1.MessageType), uuid: exports.mac_id } };
//客户端 请求连接Exec
exports.LineMessage = function (uuid) { return { id: SocketMessage_1.MessageType.LINK, key: SocketMessage_1.MessageType.LINK, data: { uuid: uuid } }; };
//# sourceMappingURL=MessageConstants.js.map