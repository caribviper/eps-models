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
var LetterTemplateProperty = (function () {
    function LetterTemplateProperty(hasSubject, hasContact, hasSalutation, hasFormFields, hasPhotographs) {
        if (hasSubject === void 0) { hasSubject = false; }
        if (hasContact === void 0) { hasContact = false; }
        if (hasSalutation === void 0) { hasSalutation = false; }
        if (hasFormFields === void 0) { hasFormFields = false; }
        if (hasPhotographs === void 0) { hasPhotographs = false; }
        this.hasSubject = hasSubject;
        this.hasContact = hasContact;
        this.hasSalutation = hasSalutation;
        this.hasFormFields = hasFormFields;
        this.hasPhotographs = hasPhotographs;
    }
    return LetterTemplateProperty;
}());
exports.LetterTemplateProperty = LetterTemplateProperty;
var LetterTemplate = (function (_super) {
    __extends(LetterTemplate, _super);
    function LetterTemplate(name, template, properties) {
        if (name === void 0) { name = ''; }
        if (template === void 0) { template = ''; }
        if (properties === void 0) { properties = new LetterTemplateProperty(); }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.LETTER_TEMPLATE, LetterTemplate.createId(name), true) || this;
        _this.name = name;
        _this.template = template;
        _this.properties = properties;
        return _this;
    }
    LetterTemplate.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'LetterTemplate cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.name, 'LetterTemplate templateName cannot be undefined/empty');
    };
    LetterTemplate.createId = function (name) {
        if (name === void 0) { name = ''; }
        if (!name)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.LETTER_TEMPLATE);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.LETTER_TEMPLATE, name);
    };
    LetterTemplate.mapToEntity = function (source) {
        var tmp = Object.assign(new LetterTemplate(), source);
        if (!tmp.properties)
            tmp.properties = new LetterTemplateProperty();
        return tmp;
    };
    LetterTemplate.mapToEntityArray = function (source) {
        var _this = this;
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(_this.mapToEntity(element));
        });
        return array;
    };
    return LetterTemplate;
}(caribviper_entity_1.Entity));
exports.LetterTemplate = LetterTemplate;
