"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserInfo = (function () {
    function UserInfo(username, fullname, domain) {
        this.username = username;
        this.fullname = fullname;
        this.domain = domain;
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
exports.SYSTEM_USER = new UserInfo('system', 'system', 'system');
