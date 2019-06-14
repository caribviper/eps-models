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
var event_record_1 = require("./../../value-objects/common/event-record");
var caribviper_entity_1 = require("caribviper-entity");
var numeral = require("numeral");
var document_entity_1 = require("../document-entity");
var Notice = (function (_super) {
    __extends(Notice, _super);
    function Notice(registryId, guid, noticeType, content, user) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (noticeType === void 0) { noticeType = null; }
        if (content === void 0) { content = ''; }
        if (user === void 0) { user = null; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.PLANNING.NOTICE, Notice.createId(registryId, guid), true) || this;
        _this.registryId = registryId;
        _this.noticeType = noticeType;
        _this.content = content;
        _this.stakeholders = [];
        _this.area = '';
        _this.completedDeveloment = false;
        _this.enforcementNo = '';
        _this.enforcementDate = null;
        _this.infractionStartDate = null;
        _this.infractionEndDate = null;
        _this.action = '';
        _this.events = new event_record_1.EventRecord(user);
        return _this;
    }
    Notice.prototype.generateNo = function (area) {
        if (area === void 0) { area = ''; }
        this.area = !!area ? area : this.area;
        this.noticeNo = this.noticeType.prefix + '/'
            + numeral(this.counterValue).format('0000') + '/'
            + numeral(new Date(this.events.created).getFullYear()).format('0000')
            + '/' + this.area;
    };
    Notice.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Notice cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Notice must have a valid registry id');
        caribviper_common_1.Assert.isTruthy(this.area, 'Notice must have a valid development control area');
    };
    Notice.prototype.sign = function (user) {
        this.events = Object.assign(new event_record_1.EventRecord(null), this.events);
        this.events.sign(user);
    };
    Notice.prototype.dispatch = function (user) {
        this.events = Object.assign(new event_record_1.EventRecord(null), this.events);
        this.events.dispatch(user);
    };
    Notice.createId = function (registryId, guid) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (!registryId)
            return '';
        if (!guid)
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.NOTICE);
        return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.NOTICE, guid);
    };
    Notice.mapToEntity = function (source) {
        var events = Object.assign(new event_record_1.EventRecord(null), source.events);
        var o = Object.assign(new Notice(), source);
        o.events = events;
        return o;
    };
    Notice.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            var events = Object.assign(new event_record_1.EventRecord(null), element.events);
            var o = Object.assign(new Notice(), element);
            o.events = events;
            array.push(o);
        });
        return array;
    };
    return Notice;
}(document_entity_1.DocumentEntity));
exports.Notice = Notice;
