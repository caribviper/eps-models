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
var caribviper_entity_1 = require("caribviper-entity");
var Minute = (function (_super) {
    __extends(Minute, _super);
    function Minute(registryId, guid, author, recipient, content) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (author === void 0) { author = null; }
        if (recipient === void 0) { recipient = null; }
        if (content === void 0) { content = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.GENERAL.MINUTE, Minute.createId(registryId, guid), true) || this;
        _this.date = new Date();
        _this.content = '';
        _this.seen = null;
        _this.documentId = '';
        _this.attachmentId = '';
        _this.officialMinute = false;
        _this.registryId = registryId;
        _this.author = author;
        _this.recipient = recipient;
        _this.content = content;
        return _this;
    }
    Minute.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Minute cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Minute requires a valid registry item id');
        caribviper_common_1.Assert.isTruthy(this.author, "Minute requries a valid user as author");
        caribviper_common_1.Assert.isTruthy(this.recipient, "Minute requires a valid user as recipient");
        caribviper_common_1.Assert.isTruthy(this.content, "Minute content cannot be undefined or empty");
    };
    Minute.prototype.markAsSeen = function () {
        this.seen = new Date();
        this.update();
    };
    Minute.createId = function (registryId, guid) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (!registryId)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GENERAL.MINUTE);
        if (guid)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GENERAL.MINUTE, registryId);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GENERAL.MINUTE, registryId, guid);
    };
    Minute.mapToEntity = function (source) {
        return Object.assign(new Minute(), source);
    };
    Minute.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Minute(), element));
        });
        return array;
    };
    return Minute;
}(caribviper_entity_1.Entity));
exports.Minute = Minute;
