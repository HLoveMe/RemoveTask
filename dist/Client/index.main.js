(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/Client/WebSocketManager.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Static/config.json":
/*!****************************!*\
  !*** ./Static/config.json ***!
  \****************************/
/*! exports provided: version, ip, websoket_id, server_ip, files, source, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"version\":\"202008021325-11\",\"ip\":\"127.0.0.1\",\"websoket_id\":9090,\"server_ip\":9091,\"files\":{\"error\":\"error.log\"},\"source\":{\"config\":\"project/config\",\"check\":\"project/check\",\"project\":\"project/source\",\"upload\":\"project/fileupload\",\"files\":\"project/files\",\"download\":\"file/download\"}}");

/***/ }),

/***/ "./dist/Client/WebSocketManager.js":
/*!*****************************************!*\
  !*** ./dist/Client/WebSocketManager.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientEvent = exports.InfoManager = void 0;

var MessageConstants_1 = __webpack_require__(/*! ../Util/MessageConstants */ "./dist/Util/MessageConstants.js");

var SocketMessageFac_1 = __webpack_require__(/*! ../Util/SocketMessageFac */ "./dist/Util/SocketMessageFac.js");

var SocketMessage_1 = __webpack_require__(/*! ../WebSocket/SocketMessage */ "./dist/WebSocket/SocketMessage.js");

var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");

var createMesage_1 = __webpack_require__(/*! ./createMesage */ "./dist/Client/createMesage.js");

var Config = __webpack_require__(/*! ../../Static/config.json */ "./Static/config.json");

var ClientEvent;

(function (ClientEvent) {
  ClientEvent["on_uuids"] = "on_uuids";
  ClientEvent["on_open"] = "on_open";
  ClientEvent["on_message"] = "on_message";
  ClientEvent["on_close"] = "on_close";
})(ClientEvent || (ClientEvent = {}));

exports.ClientEvent = ClientEvent;

var _ClientSocketManager =
/** @class */
function (_super) {
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

  _ClientSocketManager.prototype.onError = function () {};

  _ClientSocketManager.prototype.send = function (msg) {
    this.webSocket && this.webSocket.readyState == 1 && this.webSocket.send(SocketMessageFac_1.MessageFac(msg));
  };

  _ClientSocketManager.prototype.clear = function () {
    this.webSocket.close();
    this.webSocket = null;
  };

  return _ClientSocketManager;
}(events_1.EventEmitter);

var InfoManager =
/** @class */
function (_super) {
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
    paths.push.apply(paths, route.split(sep).filter(function ($1) {
      return $1.length >= 1;
    }));
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
        this.uuids = msg.data.uuids || [];
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
}(events_1.EventEmitter);

exports.InfoManager = InfoManager;

/***/ }),

/***/ "./dist/Client/createMesage.js":
/*!*************************************!*\
  !*** ./dist/Client/createMesage.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTaskMessage = exports.TaskMessage = void 0;

var SocketMessage_1 = __webpack_require__(/*! ../WebSocket/SocketMessage */ "./dist/WebSocket/SocketMessage.js");

var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");

var TaskMessage;

(function (TaskMessage) {
  TaskMessage["ConfigCheckTask"] = "ConfigCheckTask";
  TaskMessage["RemoteListenTask"] = "RemoteListenTask";
  TaskMessage["CMDCommandTask"] = "CMDCommandTask";
  TaskMessage["UploadFileTask"] = "UploadFileTask";
})(TaskMessage || (TaskMessage = {}));

exports.TaskMessage = TaskMessage;
var taskMap = new Map();
Object.keys(TaskMessage).forEach(function ($1) {
  return $1.indexOf("Task") >= 0 && taskMap.set(TaskMessage[$1], {
    get id() {
      return uuidv4();
    },

    key: SocketMessage_1.MessageType.Normal,
    name: TaskMessage[$1],
    data: null,
    date: null
  });
});

function CreateTaskMessage(data, type) {
  var basetask = taskMap.get(type);
  return __assign(__assign({}, basetask), {
    date: new Date().getTime(),
    data: data
  });
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

/***/ }),

/***/ "./dist/Util/Machine.js":
/*!******************************!*\
  !*** ./dist/Util/Machine.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComInfo = exports.select = exports.isNode = exports.isMac = exports.isWindow = void 0;

var os = __webpack_require__(/*! os */ "./node_modules/os-browserify/browser.js");

var isWindow = os.type() == "Windows_NT";
exports.isWindow = isWindow;
var isMac = !isWindow;
exports.isMac = isMac;
var isNode = this === window ? false : true;
exports.isNode = isNode;
/**
 * select({mac:1,window:2})
 * @param params
 */

function select(params) {
  return params[isMac ? "mac" : "window"];
}

exports.select = select;

var _computer_info;

function getComInfo() {
  if (!isNode) return {};
  if (_computer_info) return _computer_info;
  _computer_info = {};

  var dealMem = function (mem) {
    var G = 0,
        M = 0,
        KB = 0;
    mem > 1 << 30 && (G = (mem / (1 << 30)).toFixed(2));
    mem > 1 << 20 && mem < 1 << 30 && (M = (mem / (1 << 20)).toFixed(2));
    mem > 1 << 10 && mem > 1 << 20 && (KB = (mem / (1 << 10)).toFixed(2));
    return G > 0 ? G + 'G' : M > 0 ? M + 'M' : KB > 0 ? KB + 'KB' : mem + 'B';
  }; //cpu架构


  var arch = os.arch();
  _computer_info["arch"] = arch; //操作系统内核

  var kernel = os.type();
  _computer_info["kernel"] = kernel; //操作系统平台

  var pf = os.platform();
  _computer_info["pf"] = pf; //系统开机时间

  var uptime = os.uptime();
  _computer_info["uptime"] = uptime; //主机名

  var hn = os.hostname();
  _computer_info["hostname"] = hn; //主目录

  var hdir = os.homedir();
  _computer_info["hdir"] = hdir; //内存

  var totalMem = os.totalmem();
  var freeMem = os.freemem();
  _computer_info["mem"] = {
    totalMem: dealMem(totalMem),
    freeMem: dealMem(freeMem)
  }; //cpu

  var cpus = os.cpus();
  _computer_info["cpus"] = [];
  cpus.forEach(function (cpu, idx) {
    _computer_info["cpus"].push({
      idx: idx,
      model: cpu.model
    });
  });
  return _computer_info;
}

exports.getComInfo = getComInfo;

/***/ }),

/***/ "./dist/Util/MessageConstants.js":
/*!***************************************!*\
  !*** ./dist/Util/MessageConstants.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineMessage = exports.TaskNameMessage = exports.RequestUuidMessage = exports.UuidMessage = exports.PingMessage = exports.ClearMessage = exports.CloseMessage = exports.mac_id = void 0;

var SocketMessage_1 = __webpack_require__(/*! ../WebSocket/SocketMessage */ "./dist/WebSocket/SocketMessage.js");

var Machine_1 = __webpack_require__(/*! ./Machine */ "./dist/Util/Machine.js");

var getmac = !Machine_1.isNode ? function () {} : __webpack_require__(/*! getmac */ "./node_modules/getmac/edition-esnext/index.js").default;
exports.mac_id = getmac(); //服务器 发送客服机表明Exec 连接中断

exports.CloseMessage = function (info) {
  return {
    id: SocketMessage_1.MessageType.ExecCLOSE,
    date: new Date().getTime(),
    key: SocketMessage_1.MessageType.ExecCLOSE,
    data: {
      desc: "ExecClientClose",
      info: info,
      uuid: null
    }
  };
};

exports.ClearMessage = {
  id: SocketMessage_1.MessageType.CLEAR,
  key: SocketMessage_1.MessageType.CLEAR,
  data: {}
};
exports.PingMessage = {
  id: SocketMessage_1.MessageType.PING,
  key: SocketMessage_1.MessageType.PING,
  data: {
    ping: "ping",
    compute: Machine_1.getComInfo(),
    uuid: exports.mac_id
  }
};
exports.UuidMessage = {
  id: SocketMessage_1.MessageType.UUID,
  key: SocketMessage_1.MessageType.UUID,
  data: {
    uuid: exports.mac_id
  }
};
exports.RequestUuidMessage = {
  id: SocketMessage_1.MessageType.REQUEST_UUID,
  key: SocketMessage_1.MessageType.REQUEST_UUID,

  get date() {
    return new Date().getTime();
  }

};
exports.TaskNameMessage = {
  id: SocketMessage_1.MessageType.INFO_KEY,
  key: SocketMessage_1.MessageType.INFO_KEY,
  data: {
    task_info: null,
    task_names: null,
    message_types: Object.keys(SocketMessage_1.MessageType),
    uuid: exports.mac_id
  }
}; //客户端 请求连接Exec

exports.LineMessage = function (uuid) {
  return {
    id: SocketMessage_1.MessageType.LINK,
    key: SocketMessage_1.MessageType.LINK,
    data: {
      uuid: uuid
    }
  };
};

/***/ }),

/***/ "./dist/Util/SocketMessageFac.js":
/*!***************************************!*\
  !*** ./dist/Util/SocketMessageFac.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorMsgFac = exports.MessageFac = void 0;

var SocketMessage_1 = __webpack_require__(/*! ../WebSocket/SocketMessage */ "./dist/WebSocket/SocketMessage.js");

var MessageConstants_1 = __webpack_require__(/*! ./MessageConstants */ "./dist/Util/MessageConstants.js");

exports.MessageFac = function (msg, noUpdate) {
  if (noUpdate === void 0) {
    noUpdate = false;
  }

  try {
    var result = __assign(__assign({}, msg), {
      date: noUpdate ? msg.date : new Date().getTime()
    });

    return JSON.stringify(result);
  } catch (error) {
    return "";
  }
};

exports.ErrorMsgFac = function (msg, info, uuid) {
  if (info === void 0) {
    info = "";
  }

  if (uuid === void 0) {
    uuid = null;
  }

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

/***/ }),

/***/ "./dist/WebSocket/SocketMessage.js":
/*!*****************************************!*\
  !*** ./dist/WebSocket/SocketMessage.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };
    var errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}


/***/ }),

/***/ "./node_modules/getmac/edition-esnext/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/getmac/edition-esnext/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true })
exports.isMAC = void 0
// Prepare
const os_1 = __webpack_require__(/*! os */ "./node_modules/os-browserify/browser.js")
const macRegex = /(?:[a-z0-9]{1,2}[:-]){5}[a-z0-9]{1,2}/i
const zeroRegex = /(?:[0]{1,2}[:-]){5}[0]{1,2}/
/**
 * Get the first proper MAC address
 * @param iface If provided, restrict MAC address fetching to this interface
 */
function getMAC(iface) {
	const list = os_1.networkInterfaces()
	if (iface) {
		const parts = list[iface]
		if (!parts) {
			throw new Error(`interface ${iface} was not found`)
		}
		for (const part of parts) {
			if (zeroRegex.test(part.mac) === false) {
				return part.mac
			}
		}
		throw new Error(`interface ${iface} had no valid mac addresses`)
	} else {
		for (const [key, parts] of Object.entries(list)) {
			// for some reason beyond me, this is needed to satisfy typescript
			// fix https://github.com/bevry/getmac/issues/100
			if (!parts) continue
			for (const part of parts) {
				if (zeroRegex.test(part.mac) === false) {
					return part.mac
				}
			}
		}
	}
	throw new Error('failed to get the MAC address')
}
exports.default = getMAC
/** Check if the input is a valid MAC address */
function isMAC(macAddress) {
	return macRegex.test(macAddress)
}
exports.isMAC = isMAC


/***/ }),

/***/ "./node_modules/os-browserify/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/os-browserify/browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ })

/******/ })));
//# sourceMappingURL=index.main.js.map