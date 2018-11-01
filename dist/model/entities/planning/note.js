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
var Note = (function (_super) {
    __extends(Note, _super);
    function Note(guid, registryId, content, creator, expired) {
        if (guid === void 0) { guid = ''; }
        if (registryId === void 0) { registryId = ''; }
        if (content === void 0) { content = ''; }
        if (creator === void 0) { creator = null; }
        if (expired === void 0) { expired = null; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.PLANNING.NOTE, Note.createId(registryId, guid), true) || this;
        _this.registryId = registryId;
        _this.content = content;
        _this.creator = creator;
        _this.expired = expired;
        _this.created = null;
        _this.critical = false;
        _this.created = new Date();
        return _this;
    }
    Note.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Note cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Note must have a valid registry id');
        caribviper_common_1.Assert.isTruthy(this.content, 'Note must have valid content');
    };
    Note.createId = function (registryId, guid) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (!registryId)
            return '';
        if (!guid)
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.NOTE);
        return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.NOTE, guid);
    };
    Note.mapToEntity = function (source) {
        var o = Object.assign(new Note(), source);
        return o;
    };
    Note.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            var o = Object.assign(new Note(), element);
            array.push(o);
        });
        return array;
    };
    return Note;
}(caribviper_entity_1.Entity));
exports.Note = Note;
