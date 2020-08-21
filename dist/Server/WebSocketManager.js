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
var ws = require("ws");
var ConnectBox_1 = require("./ConnectBox");
var SocketMessage_1 = require("../WebSocket/SocketMessage");
var Config_1 = require("../Config");
var ValidationMessage_1 = require("../Util/ValidationMessage");
var SocketMessageFac_1 = require("../Util/SocketMessageFac");
var MessageConstants = require("../Util/MessageConstants");
// const IP: number = 8080;
/**
 * Server    client
 *  <----Connect----
 *  -----Info---->uuid task types
 *  <---Link-----
 *  -----Ping--->
 *  -----Ping--->
 *  -----Ping--->
 */
var _TWebServeManager = /** @class */ (function () {
    function _TWebServeManager() {
        this.clientSocket = new Set();
        this.tastKey = new Set();
        this.connectMap = new Map();
    }
    _TWebServeManager.prototype.start = function () {
        var _this = this;
        this.serverSocket = new ws.Server({ port: Config_1.default.websoket_id, host: "0.0.0.0" });
        this.serverSocket.on("connection", function (ws) { return _this.onConnection(ws); });
    };
    _TWebServeManager.prototype.onConnection = function (socket) {
        this.clientSocket = new Set(Array.from(this.clientSocket.values()).filter(function ($1) { return $1.readyState == 1; }));
        socket.onmessage = this.onMessage.bind(this, socket);
        this.clientSocket.add(socket);
    };
    _TWebServeManager.prototype.onMessage = function (socket, ev) {
        console.log("服务器接受到信息", ev.data);
        try {
            var msg = JSON.parse(ev.data);
            if (ValidationMessage_1.ValidationMessage(msg)) {
                if (msg.key == SocketMessage_1.MessageType.UUID) {
                    var uuid = msg.data.uuid;
                    this.creteBox(uuid, socket);
                }
                else if (msg.key == SocketMessage_1.MessageType.LINK) {
                    var uuid = msg.data.uuid;
                    var has = this.tastKey.has(uuid);
                    if (has) {
                        this.connectMap.get(uuid).addSourceClient(socket);
                        this.clientSocket.delete(socket);
                    }
                }
                else if (msg.key == SocketMessage_1.MessageType.REQUEST_UUID) {
                    this.sendUuidMsg(socket);
                }
            }
            else {
                throw new Error("无效消息");
            }
        }
        catch (error) {
            socket.send(SocketMessageFac_1.ErrorMsgFac({}, { reason: error.message, data: ev.data }, ""));
        }
    };
    _TWebServeManager.prototype.sendUuidMsg = function (socket) {
        var U_msg = MessageConstants.UuidMessage;
        var msg = __assign(__assign({}, U_msg), { data: {
                uuid: null,
                uuids: Array.from(this.connectMap.values()).map(function ($1) { return $1.uuid; })
            } });
        socket.send(SocketMessageFac_1.MessageFac(msg));
    };
    _TWebServeManager.prototype.creteBox = function (uuid, socket) {
        var _this = this;
        // console.log(21212);
        socket.onmessage = null;
        this.tastKey.add(uuid);
        this.clientSocket.delete(socket);
        var box = new ConnectBox_1.ConnectBox(uuid, socket);
        this.connectMap.set(uuid, box);
        box.addListener("close", function () { return _this.execRemove(box); });
    };
    _TWebServeManager.prototype.closeSocket = function (socket) {
        socket.close();
        socket = null;
    };
    _TWebServeManager.prototype.execRemove = function (box) {
        var _this = this;
        this.tastKey.delete(box.uuid);
        box.sourceClients.forEach(function ($1) { return _this.clientSocket.delete($1); });
        this.connectMap.delete(box.uuid);
    };
    _TWebServeManager.prototype.clearAll = function () {
        this.connectMap.forEach(function (V) { return V.clear(); });
        this.connectMap.clear();
        this.tastKey.clear();
        this.clientSocket.clear();
    };
    return _TWebServeManager;
}());
exports.default = new _TWebServeManager();
//# sourceMappingURL=WebSocketManager.js.map