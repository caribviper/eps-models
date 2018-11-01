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
var DocumentTemplate = (function (_super) {
    __extends(DocumentTemplate, _super);
    function DocumentTemplate(name, template) {
        if (name === void 0) { name = ''; }
        if (template === void 0) { template = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.DOCUMENT_TEMPLATE, DocumentTemplate.createId(name), true) || this;
        _this.name = name;
        _this.template = template;
        return _this;
    }
    DocumentTemplate.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'DocumentTemplate cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.name, 'DocumentTemplate templateName cannot be undefined/empty');
    };
    DocumentTemplate.createId = function (name) {
        if (name === void 0) { name = ''; }
        if (!name)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.DOCUMENT_TEMPLATE);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.DOCUMENT_TEMPLATE, name);
    };
    DocumentTemplate.mapToEntity = function (source) {
        return Object.assign(new DocumentTemplate(), source);
    };
    DocumentTemplate.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new DocumentTemplate(), element));
        });
        return array;
    };
    return DocumentTemplate;
}(caribviper_entity_1.Entity));
exports.DocumentTemplate = DocumentTemplate;
