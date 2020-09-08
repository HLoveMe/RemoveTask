"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = exports.LocalInfoData = void 0;
var LocalInfoData = /** @class */ (function () {
    function LocalInfoData(msg) {
        this.date = new Date();
        this.uuid = msg.data.uuid;
        this.key = msg.key;
        this.msg_id = msg.id;
        this.data = JSON.stringify(msg);
    }
    return LocalInfoData;
}());
exports.LocalInfoData = LocalInfoData;
var _BaseDataManage = /** @class */ (function () {
    function _BaseDataManage() {
    }
    _BaseDataManage.prototype.addMsg = function (data) {
    };
    return _BaseDataManage;
}());
var DataManager = new _BaseDataManage();
exports.DataManager = DataManager;
//# sourceMappingURL=LocalInfoData.js.map