"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserInfo = (function () {
    function UserInfo(username, fullname) {
        this.username = username;
        this.fullname = fullname;
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
exports.SYSTEM_USER = new UserInfo('system', 'system');
