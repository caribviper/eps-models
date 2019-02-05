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
var caribviper_entity_1 = require("caribviper-entity");
var __1 = require("../../..");
var caribviper_common_1 = require("caribviper-common");
exports.FILE_STATES = {
    LOCAL: 'local',
    REMOTE: 'remote',
    REPLICATED: 'replicatef'
};
exports.FILE_EVENTS = {
    CREATED: 'created',
    DELETED: 'deleted'
};
var FileEvent = (function (_super) {
    __extends(FileEvent, _super);
    function FileEvent(registryId, filePath, state, event) {
        if (registryId === void 0) { registryId = ''; }
        if (filePath === void 0) { filePath = ''; }
        if (state === void 0) { state = ''; }
        if (event === void 0) { event = ''; }
        var _this = _super.call(this, __1.ENTITY_MODELS.SYSTEM.FILE_EVENT, FileEvent.createId(filePath), true) || this;
        _this.registryId = registryId;
        _this.filePath = filePath;
        _this.state = state;
        _this.event = event;
        _this.date = new Date();
        return _this;
    }
    FileEvent.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'FileEvent cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'FileEvent must have a valid registry id');
        caribviper_common_1.Assert.isTruthy(this.filePath, 'FileEvent must have a valid filepath');
        caribviper_common_1.Assert.isTruthy(this.state, 'FileEvent must have a valid state');
        caribviper_common_1.Assert.isTruthy(this.event, 'FileEvent must have a valid event');
    };
    FileEvent.createId = function (filepath) {
        if (filepath === void 0) { filepath = ''; }
        if (!filepath)
            return '';
        return caribviper_entity_1.Entity.generateId(filepath, __1.ENTITY_MODELS.SYSTEM.FILE_EVENT);
    };
    FileEvent.mapToEntity = function (source) {
        var o = Object.assign(new FileEvent(), source);
        return o;
    };
    FileEvent.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            var o = Object.assign(new FileEvent(), element);
            array.push(o);
        });
        return array;
    };
    return FileEvent;
}(caribviper_entity_1.Entity));
exports.FileEvent = FileEvent;
