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
var Config_1 = require("../Config");
var ValidationMessage_1 = require("../Util/ValidationMessage");
var SocketMessage_1 = require("./SocketMessage");
var SocketMessageFac_1 = require("../Util/SocketMessageFac");
var MessageConstants_1 = require("../Util/MessageConstants");
var WebSocketManager = /** @class */ (function () {
    function WebSocketManager() {
        var _this = this;
        this.onOpen = function () {
            _this._uuidMessage();
            _this._taskMessage();
            _this._Ping();
        };
        this.subscriber = new Map();
    }
    WebSocketManager.prototype.onMessage = function (ev) {
        try {
            console.log("接收到消息", ev.data);
            var data;
            var err_info;
            try {
                data = JSON.parse(ev.data);
            }
            catch (err) {
                err_info = { data: ev.data, reason: "WebSocketManager/onMessage/data解析错误" };
                return this._send(SocketMessageFac_1.ErrorMsgFac({ id: -1, key: SocketMessage_1.MessageType.ERROR }, err_info));
            }
            if (err_info == null && ValidationMessage_1.ValidationMessage(data) == false) {
                err_info = { data: ev.data, errreasonor: "WebSocketManager/onMessage/格式不对" };
                return this._send(SocketMessageFac_1.ErrorMsgFac({ id: data.id, key: SocketMessage_1.MessageType.ERROR }, err_info));
            }
            ;
            if (data.key == SocketMessage_1.MessageType.CLEAR) {
                this.subscriber.forEach(function (task) { return task.clear(); });
                return;
            }
            var task = this.subscriber.get(data.name);
            if (err_info == null && task == null) {
                err_info = { data: ev.data, reason: "WebSocketManager/onMessage/name不正确" };
                return this._send(SocketMessageFac_1.ErrorMsgFac({ id: data.id, key: SocketMessage_1.MessageType.ERROR }, err_info));
            }
            task.listen(data);
        }
        catch (error) {
            err_info = { data: error.statck, reason: "WebSocketManager/onMessage/data解析错误" };
            return this._send(SocketMessageFac_1.ErrorMsgFac({ id: -1, key: SocketMessage_1.MessageType.ERROR }, err_info));
        }
    };
    ;
    WebSocketManager.prototype.onClose = function (ev) {
        this.app.reconnect();
    };
    ;
    WebSocketManager.prototype.onError = function (ev) { };
    ;
    WebSocketManager.prototype.clear = function () {
        if (this.webSocket) {
            this.webSocket.close();
            this.webSocket = null;
            this.url = null;
            this.subscriber.clear();
        }
    };
    WebSocketManager.prototype.start = function () {
        this.clear();
        this.url = "ws://" + Config_1.default.ip + ":" + Config_1.default.websoket_id;
        this.webSocket = new ws(this.url);
        this.webSocket.onopen = this.onOpen.bind(this);
        this.webSocket.onmessage = this.onMessage.bind(this);
        this.webSocket.onclose = this.onClose.bind(this);
        this.webSocket.onerror = this.onError.bind(this);
    };
    WebSocketManager.prototype._uuidMessage = function () {
        this.send(MessageConstants_1.UuidMessage);
    };
    WebSocketManager.prototype._taskMessage = function () {
        this.send(__assign(__assign({}, MessageConstants_1.TaskNameMessage), { data: __assign(__assign({}, MessageConstants_1.TaskNameMessage.data), { task_names: Array.from(this.subscriber.keys()), task_info: Array.from(this.subscriber.values()).map(function ($1) { return $1.toString(); }) }) }));
    };
    WebSocketManager.prototype._Ping = function () {
        var _this = this;
        this.pingId && clearInterval(this.pingId);
        this.pingId = setInterval(function () { return _this.send(MessageConstants_1.PingMessage); }, 10000);
    };
    WebSocketManager.prototype.send = function (msg) {
        var result = SocketMessageFac_1.MessageFac(msg);
        if (result == null || result == "") {
            result = SocketMessageFac_1.ErrorMsgFac(msg, "WebSocketManager/send/JSON");
        }
        result && this._send(result);
    };
    WebSocketManager.prototype._send = function (data) {
        this.webSocket && this.webSocket.readyState == 1 && data && this.webSocket.send(data);
    };
    WebSocketManager.prototype.addEventListeners = function () {
        var _this = this;
        var tasks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tasks[_i] = arguments[_i];
        }
        tasks.forEach(function ($1) {
            $1.app = $1.app || _this.app;
            _this.subscriber.set($1.name, $1);
        });
        this.webSocket && this._taskMessage();
    };
    WebSocketManager.prototype.removeTask = function (task) {
        this.subscriber.delete(task.name);
    };
    return WebSocketManager;
}());
exports.WebManager = new WebSocketManager();
//# sourceMappingURL=WebSocketManager.js.map