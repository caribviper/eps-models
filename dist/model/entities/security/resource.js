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
    function Resource(resourceType, operation, category, description) {
        if (resourceType === void 0) { resourceType = 'api'; }
        if (operation === void 0) { operation = ''; }
        if (category === void 0) { category = ''; }
        if (description === void 0) { description = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SECURITY.RESOURCE, Resource.createId(resourceType, operation), true) || this;
        _this.resourceType = resourceType;
        _this.operation = operation;
        _this.category = category;
        _this.description = description;
        return _this;
    }
    Resource.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Resource cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.operation, 'Resource operation cannot be empty/undefined');
        caribviper_common_1.Assert.isTruthy(this.category, 'Resource category cannot be empty/undefined');
        caribviper_common_1.Assert.isTruthy(this.resourceType, 'Resource type cannot be empty/undefined');
    };
    Resource.createId = function (resourceType, operation) {
        if (resourceType === void 0) { resourceType = ''; }
        if (operation === void 0) { operation = ''; }
        if (!resourceType || !operation)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SECURITY.RESOURCE);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SECURITY.RESOURCE, resourceType, operation);
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
