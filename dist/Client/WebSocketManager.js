"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MessageConstants_1 = require("../Util/MessageConstants");
var SocketMessageFac_1 = require("../Util/SocketMessageFac");
var SocketMessage_1 = require("../WebSocket/SocketMessage");
var events_1 = require("events");
var createMesage_1 = require("./createMesage");
var Config = require("../../Static/config.json");
var ClientEvent;
(function (ClientEvent) {
    ClientEvent["on_uuids"] = "on_uuids";
    ClientEvent["on_open"] = "on_open";
    ClientEvent["on_message"] = "on_message";
    ClientEvent["on_close"] = "on_close";
})(ClientEvent || (ClientEvent = {}));
exports.ClientEvent = ClientEvent;
var _ClientSocketManager = /** @class */ (function (_super) {
    __extends(_ClientSocketManager, _super);
    function _ClientSocketManager() {
        return _super.call(this) || this;
    }
    _ClientSocketManager.prototype.start = function () {
        this.url = "ws://" + Config.ip + ":" + Config.websoket_id;
        this.webSocket = new WebSocket(this.url);
        this.webSocket.onopen = this.onOpen.bind(this);
        this.webSocket.onmessage = this.onMessage.bind(this);
        this.webSocket.onclose = this.onClose.bind(this);
        this.webSocket.onerror = this.onError.bind(this);
    };
    _ClientSocketManager.prototype.onOpen = function () {
        this.emit(ClientEvent.on_open);
    };
    _ClientSocketManager.prototype.onMessage = function (msg) {
        this.emit(ClientEvent.on_message, msg);
    };
    _ClientSocketManager.prototype.onClose = function (ev) {
        this.emit(ClientEvent.on_close, ev);
    };
    _ClientSocketManager.prototype.onError = function () { };
    _ClientSocketManager.prototype.send = function (msg) {
        this.webSocket && this.webSocket.readyState == 1 && this.webSocket.send(SocketMessageFac_1.MessageFac(msg));
    };
    _ClientSocketManager.prototype.clear = function () {
        this.webSocket.close();
        this.webSocket = null;
    };
    return _ClientSocketManager;
}(events_1.EventEmitter));
var InfoManager = /** @class */ (function (_super) {
    __extends(InfoManager, _super);
    function InfoManager() {
        var _this = _super.call(this) || this;
        _this.connect();
        return _this;
    }
    InfoManager.prototype.init = function () {
        this.msgList = [];
        this.uuids = null;
        this.uuid = null;
        this.compute = null;
        this.pwd = null;
        this.infoData = null;
        this.interval = null;
        this.sysPath = [];
    };
    InfoManager.prototype.connect = function () {
        this.init();
        this.webManager && this.webManager.clear();
        this.webManager = new _ClientSocketManager();
        this.webManager.start();
        this.webManager.on(ClientEvent.on_open, this.on_open.bind(this));
        this.webManager.on(ClientEvent.on_message, this.on_message.bind(this));
        this.webManager.on(ClientEvent.on_close, this.on_close.bind(this));
    };
    InfoManager.prototype.connecrServeForMac = function (uuid) {
        this.uuid = uuid;
        this.webManager.send(MessageConstants_1.LineMessage(uuid));
    };
    InfoManager.prototype.on_open = function () {
        var _this = this;
        this.interval && clearInterval(this.interval);
        this.webManager.send(MessageConstants_1.RequestUuidMessage);
        this.interval = setInterval(function () {
            _this.webManager.send(MessageConstants_1.RequestUuidMessage);
            _this.webManager.send(MessageConstants_1.PingMessage);
        }, 10000);
    };
    InfoManager.prototype.handlePathMsg = function (route, sep) {
        var _this = this;
        var paths = [sep];
        paths.push.apply(paths, route.split(sep).filter(function ($1) { return $1.length >= 1; }));
        paths.forEach(function (_path, index) {
            var jh = _this.sysPath[index] || new Set();
            jh.add(_path);
            _this.sysPath[index] = jh;
        });
    };
    InfoManager.prototype.on_message = function (ev) {
        var data = ev.data;
        var msg = JSON.parse(data);
        console.log(1111, msg);
        switch (msg.key) {
            case SocketMessage_1.MessageType.UUID:
                this.uuids = (msg.data.uuids || []);
                break;
            case SocketMessage_1.MessageType.PING:
                this.compute = msg.data.compute;
                break;
            case SocketMessage_1.MessageType.INFO_KEY:
                this.infoData = msg.data;
                break;
            case SocketMessage_1.MessageType.TASK:
                //回复
                if (msg.name == createMesage_1.TaskMessage.CMDCommandTask) {
                    var _data = msg.data;
                    this.pwd = _data.result.last_path;
                    this.handlePathMsg(_data.result.last_path, _data.result.sep);
                }
                break;
        }
        this.msgList.push(msg);
        this.emit("update");
    };
    InfoManager.prototype.on_close = function () {
        this.uuids = [];
        this.compute = null;
    };
    return InfoManager;
}(events_1.EventEmitter));
exports.InfoManager = InfoManager;
//# sourceMappingURL=WebSocketManager.js.map