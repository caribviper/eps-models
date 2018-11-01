"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var entity_model_type_1 = require("./../entity-model-type");
var userinfo_1 = require("./../../value-objects/common/userinfo");
var caribviper_entity_1 = require("caribviper-entity");
var caribviper_common_1 = require("caribviper-common");
var TaskShareItem = (function () {
    function TaskShareItem() {
        this.principle = new userinfo_1.UserInfo('', '');
        this.users = [];
    }
    return TaskShareItem;
}());
exports.TaskShareItem = TaskShareItem;
var TaskShare = (function (_super) {
    __extends(TaskShare, _super);
    function TaskShare() {
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.TASK_SHARE, TaskShare.createId(), true) || this;
        _this.shares = [];
        return _this;
    }
    TaskShare.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Must not be transient');
    };
    TaskShare.prototype.sortShares = function () {
        this.shares = this.shares.sort(function (a, b) {
            if (a.principle.username.toLowerCase() < b.principle.username.toLowerCase())
                return -1;
            if (b.principle.username.toLowerCase() < a.principle.username.toLowerCase())
                return 1;
            return 0;
        });
    };
    TaskShare.prototype.addShare = function (share) {
        if (!share || !share.principle || !share.users && share.users.length === 0)
            return false;
        share.principle.username = share.principle.username.toLowerCase();
        var index = this.shares.findIndex(function (s) { return s.principle.username.toLowerCase() === share.principle.username.toLowerCase(); });
        if (index > -1)
            this.shares[index].users = share.users;
        this.shares.push(share);
        return true;
    };
    TaskShare.prototype.removeShare = function (username) {
        if (this.shares.length === 0)
            return;
        var index = this.shares.findIndex(function (s) { return s.principle.username.toLowerCase() === username.toLowerCase(); });
        if (index < 0)
            return;
        this.shares.splice(index, 1);
    };
    TaskShare.prototype.clearShares = function () {
        this.shares = [];
    };
    TaskShare.createId = function () {
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.TASK_SHARE);
    };
    TaskShare.mapToEntity = function (source) {
        return Object.assign(new TaskShare(), source);
    };
    TaskShare.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new TaskShare(), element));
        });
        return array;
    };
    return TaskShare;
}(caribviper_entity_1.Entity));
exports.TaskShare = TaskShare;
