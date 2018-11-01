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
var Attachment = (function (_super) {
    __extends(Attachment, _super);
    function Attachment(registryId, guid, filename, attachedBy, description) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (filename === void 0) { filename = ''; }
        if (attachedBy === void 0) { attachedBy = undefined; }
        if (description === void 0) { description = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.PLANNING.ATTACHMENT, Attachment.createId(registryId, guid), true) || this;
        _this.description = '';
        _this.isPublic = true;
        _this.filename = '';
        _this.registryId = registryId;
        _this.attachedBy = attachedBy;
        _this.filename = filename;
        _this.description = description;
        _this.dateAttached = new Date();
        return _this;
    }
    Attachment.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Attachment cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Attachment requires a valid registry item id');
        caribviper_common_1.Assert.isTruthy(this.attachedBy, 'Attachment requires a valid user as the attaching user');
        caribviper_common_1.Assert.isTruthy(this.filename, 'Attachment requires a valid filename');
    };
    Attachment.createId = function (registryId, guid) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (!registryId)
            return '';
        if (!guid)
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.ATTACHMENT);
        return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.ATTACHMENT, guid);
    };
    Attachment.mapToEntity = function (source) {
        return Object.assign(new Attachment(), source);
    };
    Attachment.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Attachment(), element));
        });
        return array;
    };
    return Attachment;
}(caribviper_entity_1.Entity));
exports.Attachment = Attachment;
