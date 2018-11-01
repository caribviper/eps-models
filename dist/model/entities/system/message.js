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
var Message = (function (_super) {
    __extends(Message, _super);
    function Message(guid, creator, recipient, message, created) {
        if (guid === void 0) { guid = ''; }
        if (creator === void 0) { creator = new userinfo_1.UserInfo('', ''); }
        if (recipient === void 0) { recipient = new userinfo_1.UserInfo('', ''); }
        if (message === void 0) { message = ''; }
        if (created === void 0) { created = null; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.MESSAGE, Message.createId(recipient.username, guid), true) || this;
        _this.guid = guid;
        _this.creator = creator;
        _this.recipient = recipient;
        _this.message = message;
        _this.created = created;
        _this.registryId = '';
        _this.referenceNo = '';
        _this.link = '';
        _this.dismissedDate = null;
        _this.readDate = null;
        _this.duplicate = 0;
        _this.reminderDate = 0;
        return _this;
    }
    Message.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Must not be transient');
        caribviper_common_1.Assert.isTruthy(this.creator, 'Must have a valid creator');
        caribviper_common_1.Assert.isTruthy(this.recipient, 'Must have a valid creator');
        caribviper_common_1.Assert.isTruthy(this.created, 'Must have a valid creation date');
        caribviper_common_1.Assert.isTruthy(this.message, 'Must have a valid message');
    };
    Object.defineProperty(Message.prototype, "isAlert", {
        get: function () { return !!this.reminderDate; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "wasDismissed", {
        get: function () { return !!this.dismissedDate; },
        enumerable: true,
        configurable: true
    });
    Message.prototype.setAlert = function (reminderDate) {
        this.reminderDate = new Date(reminderDate).getTime();
    };
    Message.prototype.setAlertByDays = function (days) {
        this.reminderDate = moment().add(days, 'days').toDate().getTime();
    };
    Message.prototype.dismiss = function () {
        if (!!this.reminderDate)
            this.dismissedDate = new Date();
    };
    Message.prototype.readMessage = function () {
        this.readDate = new Date();
    };
    Message.createDuplicate = function (message, newRecipient) {
        if (message.dismissedDate)
            return null;
        if (new Date(message.reminderDate) > new Date())
            return null;
        var m = Message.mapToEntity(message);
        m.duplicate++;
        m._id = m._id + ':duplicate' + m.duplicate;
        m.recipient = newRecipient;
        return m;
    };
    Message.createId = function (username, guid) {
        if (guid === void 0) { guid = ''; }
        if (!guid)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.MESSAGE);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.MESSAGE, guid);
    };
    Message.mapToEntity = function (source) {
        return Object.assign(new Message(), source);
    };
    Message.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Message(), element));
        });
        return array;
    };
    return Message;
}(caribviper_entity_1.Entity));
exports.Message = Message;
