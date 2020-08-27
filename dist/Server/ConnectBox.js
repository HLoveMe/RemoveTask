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
var MessageConstants_1 = require("../Util/MessageConstants");
var events_1 = require("events");
var SocketMessage_1 = require("../WebSocket/SocketMessage");
var SocketMessageFac_1 = require("../Util/SocketMessageFac");
var ValidationMessage_1 = require("../Util/ValidationMessage");
var SocketID = 1000;
var ConnectBox = /** @class */ (function (_super) {
    __extends(ConnectBox, _super);
    function ConnectBox(uuid, exec) {
        var _this = _super.call(this) || this;
        _this.sourceClients = [];
        _this.uuid = uuid;
        _this.execClient = exec;
        _this._addListener(exec);
        return _this;
        // setInterval(() => {
        //   const data = readFileSync(join(__dirname, "message.json"), "utf-8");
        //   this.send(this.execClient, data);
        // }, 5000)
    }
    ConnectBox.prototype.addSourceClient = function (source) {
        this._addListener(source);
        var id_socket = source;
        SocketID += 1;
        id_socket.tag_id = SocketID;
        this.sourceClients.push(id_socket);
        this.sendClientInfos(true, [source]);
    };
    ConnectBox.prototype._addListener = function (socket) {
        socket.onopen = this.onOpen.bind(this, socket);
        socket.onmessage = this.onMessage.bind(this, socket);
        socket.onclose = this.onClose.bind(this, socket);
        socket.onerror = this.onError.bind(this, socket);
    };
    ConnectBox.prototype.isExecClient = function (socket) {
        return socket == this.execClient;
    };
    ConnectBox.prototype.onOpen = function (socket, ev) { };
    ;
    ConnectBox.prototype.onMessage = function (socket, ev) {
        var msg;
        try {
            msg = JSON.parse(ev.data);
            if (ValidationMessage_1.ValidationMessage(msg)) {
                this.isExecClient(socket) ?
                    this._execSocketOnMessage(socket, msg)
                    : this._clientSocketOnMessage(socket, msg);
            }
            else {
                throw new Error("ConnectBox/onMessage/格式不对");
            }
        }
        catch (error) {
            this.send(socket, SocketMessageFac_1.ErrorMsgFac({ id: msg.id }, { reason: error.message, data: ev.data }));
        }
    };
    ;
    ConnectBox.prototype._execSocketOnMessage = function (socket, msg) {
        switch (msg.key) {
            case SocketMessage_1.MessageType.PING:
                this.compute = msg.data.compute;
                break;
            case SocketMessage_1.MessageType.UUID: break;
            case SocketMessage_1.MessageType.INFO_KEY:
                var _msg = msg;
                this.task_names = _msg.data.task_names;
                this.task_info = _msg.data.task_info;
                this.msg_typs = _msg.data.message_types;
                break;
            case SocketMessage_1.MessageType.TASK:
                //exec-server-client
                var socket_id_1 = msg.socket_id;
                var tar_socket = this.sourceClients.find(function ($1) { return $1.tag_id == socket_id_1; });
                tar_socket && this.send(tar_socket, SocketMessageFac_1.MessageFac(msg));
                break;
        }
        this.sendClientInfos();
    };
    ConnectBox.prototype._clientSocketOnMessage = function (socket, msg) {
        switch (msg.key) {
            case SocketMessage_1.MessageType.PING:
                var p_msg = __assign(__assign({}, MessageConstants_1.PingMessage), { data: __assign(__assign({}, MessageConstants_1.PingMessage.data), { compute: this.compute, uuid: this.uuid }) });
                this.send(socket, SocketMessageFac_1.MessageFac(p_msg));
                break;
            case SocketMessage_1.MessageType.TASK:
                msg.socket_id = socket.tag_id;
                this.send(this.execClient, SocketMessageFac_1.MessageFac(msg, true));
        }
    };
    ConnectBox.prototype.sendClientInfos = function (now, target) {
        var _this = this;
        if (now === void 0) { now = false; }
        if (target === void 0) { target = null; }
        if (this.sendTag && now == false)
            return;
        var timeout = now ? 0 : 60000;
        this.sendTag = setTimeout(function () {
            (target || _this.sourceClients).forEach(function (socket) {
                // this.send(socket, MessageFac({
                //   ...UuidMessage,
                //   data: { uuid: this.uuid }
                // }));
                _this.task_names && _this.send(socket, SocketMessageFac_1.MessageFac(__assign(__assign({}, MessageConstants_1.TaskNameMessage), { data: { uuid: _this.uuid, task_names: _this.task_names, message_types: _this.msg_typs, task_info: _this.task_info } })));
            });
            _this.sendTag = null;
        }, timeout);
    };
    ConnectBox.prototype.onClose = function (socket, ev) {
        var _this = this;
        if (this.isExecClient(socket)) {
            this.sourceClients.forEach(function ($1) { return _this.send($1, SocketMessageFac_1.MessageFac(MessageConstants_1.CloseMessage(ev.toString()))); });
            this.sourceClients.forEach(function ($1) { return $1.close(); });
            socket.close();
            this.emit("close");
        }
        else {
            this.sourceClients = this.sourceClients.filter(function ($1) { return $1 != socket; });
            socket.close();
        }
        if (this.sourceClients.length == 0) {
            this.send(this.execClient, SocketMessageFac_1.MessageFac(MessageConstants_1.ClearMessage));
        }
    };
    ;
    ConnectBox.prototype.onError = function (socket, ev) {
    };
    ;
    ConnectBox.prototype.send = function (socket, data) {
        data && socket.readyState == 1 && socket.send(data);
    };
    ConnectBox.prototype.clear = function () {
        this.execClient.close();
        this.sourceClients.forEach(function (V) { return V.close(); });
    };
    return ConnectBox;
}(events_1.EventEmitter));
exports.ConnectBox = ConnectBox;
//# sourceMappingURL=ConnectBox.js.map