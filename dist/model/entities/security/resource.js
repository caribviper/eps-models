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
var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource(url, verb, group, description) {
        if (url === void 0) { url = ''; }
        if (verb === void 0) { verb = ''; }
        if (group === void 0) { group = ''; }
        if (description === void 0) { description = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SECURITY.RESOURCE, Resource.createId(url, verb), true) || this;
        _this.url = url;
        _this.verb = verb;
        _this.group = group;
        _this.description = description;
        return _this;
    }
    Resource.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Resource cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.url, 'Resource url cannot be empty/undefined');
        caribviper_common_1.Assert.isTruthy(this.verb, 'Resource verb cannot be empty/undefined');
        caribviper_common_1.Assert.isTruthy(this.group, 'Resource group cannot be empty/undefined');
        caribviper_common_1.Assert.isTruthy(this.description, 'Resource description cannot be empty/undefined');
    };
    Resource.createId = function (url, verb) {
        if (!url || !verb)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SECURITY.RESOURCE);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SECURITY.RESOURCE, url, verb);
    };
    Resource.mapToEntity = function (source) {
        return Object.assign(new Resource(), source);
    };
    Resource.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Resource(), element));
        });
        return array;
    };
    return Resource;
}(caribviper_entity_1.Entity));
exports.Resource = Resource;
