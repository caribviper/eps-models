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
var CategoryNameValue = (function () {
    function CategoryNameValue(name, value) {
        if (value === void 0) { value = ''; }
        this.name = name;
        this.value = value || name;
    }
    return CategoryNameValue;
}());
exports.CategoryNameValue = CategoryNameValue;
var Category = (function (_super) {
    __extends(Category, _super);
    function Category(name, values) {
        if (name === void 0) { name = ''; }
        if (values === void 0) { values = []; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.GENERAL.CATEGORY, Category.createId(name), true) || this;
        _this.name = name;
        _this.values = values;
        _this.values = values || [];
        return _this;
    }
    Category.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Category cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.name, 'Category name cannot be null/empty');
        caribviper_common_1.Assert.isTruthy(this.values, 'Category values cannot be null');
    };
    Category.createId = function (name) {
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.GENERAL.CATEGORY, name);
    };
    Category.mapToEntity = function (source) {
        return Object.assign(new Category(), source);
    };
    Category.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Category(), element));
        });
        return array;
    };
    return Category;
}(caribviper_entity_1.Entity));
exports.Category = Category;
