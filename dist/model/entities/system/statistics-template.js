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
var StatisticsTemplate = (function (_super) {
    __extends(StatisticsTemplate, _super);
    function StatisticsTemplate(name, template) {
        if (name === void 0) { name = ''; }
        if (template === void 0) { template = ''; }
        var _this = _super.call(this, __1.ENTITY_MODELS.SYSTEM.STATISTICS_TEMPLATE, StatisticsTemplate.createId(name), true) || this;
        _this.name = name;
        _this.template = template;
        return _this;
    }
    StatisticsTemplate.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'StatisticsTemplate cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.name, 'StatisticsTemplate templateName cannot be undefined/empty');
    };
    StatisticsTemplate.createId = function (name) {
        if (name === void 0) { name = ''; }
        if (!name)
            return caribviper_entity_1.Entity.generateId(__1.ENTITY_MODELS.SYSTEM.STATISTICS_TEMPLATE);
        return caribviper_entity_1.Entity.generateId(__1.ENTITY_MODELS.SYSTEM.STATISTICS_TEMPLATE, name);
    };
    StatisticsTemplate.mapToEntity = function (source) {
        return Object.assign(new StatisticsTemplate(), source);
    };
    StatisticsTemplate.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new StatisticsTemplate(), element));
        });
        return array;
    };
    return StatisticsTemplate;
}(caribviper_entity_1.Entity));
exports.StatisticsTemplate = StatisticsTemplate;
