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
var caribviper_common_1 = require("caribviper-common");
var entity_model_type_1 = require("./../entity-model-type");
var userinfo_1 = require("./../../value-objects/common/userinfo");
var caribviper_entity_1 = require("caribviper-entity");
var moment = require("moment");
var ACTIVE_DAYS_MIN = 1, ACTIVE_DAYS_MAX = 7, ACTIVE_DAYS_DEFAULT = 5;
var Broadcast = (function (_super) {
    __extends(Broadcast, _super);
    function Broadcast(guid, title, message, creator) {
        if (guid === void 0) { guid = ''; }
        if (title === void 0) { title = ''; }
        if (message === void 0) { message = ''; }
        if (creator === void 0) { creator = userinfo_1.UserInfo.EmptyUserInfo(); }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.BROADCAST, Broadcast.createId(guid), true) || this;
        _this.guid = guid;
        _this.title = title;
        _this.message = message;
        _this.creator = creator;
        _this.dateCreated = new Date();
        _this.activeDays = ACTIVE_DAYS_DEFAULT;
        return _this;
    }
    Object.defineProperty(Broadcast.prototype, "expirationDate", {
        get: function () {
            if (!this.dateDispatched)
                return null;
            this.activeDays = (this.activeDays < ACTIVE_DAYS_MIN || this.activeDays > ACTIVE_DAYS_MAX) ? ACTIVE_DAYS_DEFAULT : this.activeDays;
            moment(new Date(this.dateDispatched)).add(this.activeDays, 'days');
        },
        enumerable: true,
        configurable: true
    });
    Broadcast.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Must not be transient');
        caribviper_common_1.Assert.isTruthy(this.creator, 'Must have a valid creator');
        caribviper_common_1.Assert.isTruthy(this.dateCreated, 'Must have a valid creation date');
        caribviper_common_1.Assert.isTruthy(this.title, 'Must have a valid message');
        caribviper_common_1.Assert.isTruthy(this.message, 'Must have a valid title');
    };
    Broadcast.prototype.finalise = function () {
        this.activeDays = (this.activeDays < ACTIVE_DAYS_MIN || this.activeDays > ACTIVE_DAYS_MAX) ? ACTIVE_DAYS_DEFAULT : this.activeDays;
        this.dateDispatched = new Date();
    };
    Broadcast.createId = function (guid) {
        if (guid === void 0) { guid = ''; }
        if (!guid)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.BROADCAST);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.BROADCAST, guid);
    };
    Broadcast.mapToEntity = function (source) {
        return Object.assign(new Broadcast(), source);
    };
    Broadcast.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Broadcast(), element));
        });
        return array;
    };
    return Broadcast;
}(caribviper_entity_1.Entity));
exports.Broadcast = Broadcast;
