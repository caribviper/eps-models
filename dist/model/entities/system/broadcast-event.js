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
var caribviper_entity_1 = require("caribviper-entity");
var caribviper_common_1 = require("caribviper-common");
var BroadcastEvent = (function (_super) {
    __extends(BroadcastEvent, _super);
    function BroadcastEvent(broadcastId, username) {
        if (broadcastId === void 0) { broadcastId = ''; }
        if (username === void 0) { username = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.BROADCAST_MESSAGE_EVENT, BroadcastEvent.createId(broadcastId, username), true) || this;
        _this.broadcastId = broadcastId;
        _this.username = username;
        _this.hidden = false;
        return _this;
    }
    BroadcastEvent.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Must not be transient');
        caribviper_common_1.Assert.isTruthy(this.broadcastId, 'Must have a valid broadcast Id');
        caribviper_common_1.Assert.isTruthy(this.username, 'Must have a valid user');
    };
    BroadcastEvent.prototype.hideBroadcast = function () {
        this.hidden = true;
    };
    BroadcastEvent.createId = function (broadcastId, username) {
        if (broadcastId === void 0) { broadcastId = ''; }
        if (username === void 0) { username = ''; }
        if (!username)
            return caribviper_entity_1.Entity.generateId(broadcastId);
        return caribviper_entity_1.Entity.generateId(broadcastId, username);
    };
    BroadcastEvent.mapToEntity = function (source) {
        return Object.assign(new BroadcastEvent(), source);
    };
    BroadcastEvent.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new BroadcastEvent(), element));
        });
        return array;
    };
    return BroadcastEvent;
}(caribviper_entity_1.Entity));
exports.BroadcastEvent = BroadcastEvent;
