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
exports.CreateTaskMessage = exports.TaskMessage = void 0;
var SocketMessage_1 = require("../WebSocket/SocketMessage");
var uuidv4 = require('uuid/v4');
var TaskMessage;
(function (TaskMessage) {
    TaskMessage["ConfigCheckTask"] = "ConfigCheckTask";
    TaskMessage["RemoteListenTask"] = "RemoteListenTask";
    TaskMessage["CMDCommandTask"] = "CMDCommandTask";
    TaskMessage["UploadFileTask"] = "UploadFileTask";
})(TaskMessage || (TaskMessage = {}));
exports.TaskMessage = TaskMessage;
var taskMap = new Map();
Object.keys(TaskMessage).forEach(function ($1) { return $1.indexOf("Task") >= 0 && taskMap.set(TaskMessage[$1], { get id() { return uuidv4(); }, key: SocketMessage_1.MessageType.Normal, name: TaskMessage[$1], data: null, date: null }); });
function CreateTaskMessage(data, type) {
    var basetask = taskMap.get(type);
    return __assign(__assign({}, basetask), { date: new Date().getTime(), data: data });
}
exports.CreateTaskMessage = CreateTaskMessage;
/***
 *
var ws = new WebSocket("ws://127.0.0.1:9090");
ws.onopen = function (evt) {
    console.log("Connection open ...");
    ws.send(JSON.stringify({id:7,key:7,date:1}));
    ws.send(JSON.stringify({id:5,key:5,date:111,data:{uuid:"f0:18:98:0d:91:97"}}))
};
ws.onmessage = function (event) {
   console.log("Connection onmessage ...",JSON.parse(event.data));
};

ws.onclose = function (evt) {
    console.log("Connection closed.");
};

//JSON.stringify({id:5,key:5,date:111,data:{uuid:"f0:18:98:0d:91:97"}})
//link
//ws.send(JSON.stringify({id:5,key:5,date:111,data:{uuid:"f0:18:98:0d:91:97"}}))

//ping
//ws.send(JSON.stringify({ id: 1, key: 1,date:111, data: { ping: "ping"}}))

cmd
JSON.stringify({id: 8888,key: 1000,date:0,name: "CMDCommandTask",data: {path: "",type: 201,id: 888,timeout: 2000,cmd: "ls",args: ["-a", "-l"]}})

//config
JSON.stringify({id:1000,key:1000,date:10000,name:"ConfigCheckTask",data:{}})

//UploadFileTask
JSON.stringify({id:1000,key:1000,date:10000,name:"UploadFileTask",data:{path:"/Users/swl/Desktop/2020-08-06 14.29.55.png"}})

remote Task
JSON.stringify({id:1000,key:1000,date:10000,name:"RemoteListenTask",data:{name:"文件名称",context:"class=>base64"}})



http://127.0.0.1:9091/project/files

http://127.0.0.1:9091/file/download?name=1597223583998_zzh.jjj
 */
//# sourceMappingURL=createMesage.js.map