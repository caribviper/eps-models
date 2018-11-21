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
var Consultation = (function (_super) {
    __extends(Consultation, _super);
    function Consultation(registryId, guid, organisation, comments, documentId, attachmentId) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (organisation === void 0) { organisation = null; }
        if (comments === void 0) { comments = ''; }
        if (documentId === void 0) { documentId = ''; }
        if (attachmentId === void 0) { attachmentId = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.PLANNING.CONSULTATION, Consultation.createId(registryId, guid), true) || this;
        _this.registryId = registryId;
        _this.organisation = organisation;
        _this.comments = comments;
        _this.documentId = documentId;
        _this.attachment = attachmentId;
        _this.attachedPictures = [];
        _this.agencyCode = '';
        return _this;
    }
    Object.defineProperty(Consultation.prototype, "hasPictures", {
        get: function () {
            return !!this.attachedPictures && this.attachedPictures.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Consultation.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Consultation cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.registryId, 'Consutlation must have a valid registry id');
        caribviper_common_1.Assert.isTruthy(this.organisation, 'Consutlation must have a valid organisation');
    };
    Consultation.createId = function (registryId, guid) {
        if (registryId === void 0) { registryId = ''; }
        if (guid === void 0) { guid = ''; }
        if (!registryId)
            return '';
        if (!guid)
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.CONSULTATION);
        return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.CONSULTATION, guid);
    };
    Consultation.mapToEntity = function (source) {
        return Object.assign(new Consultation(), source);
    };
    Consultation.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Consultation(), element));
        });
        return array;
    };
    return Consultation;
}(caribviper_entity_1.Entity));
exports.Consultation = Consultation;
