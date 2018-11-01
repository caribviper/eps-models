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
var StatisticalReport = (function (_super) {
    __extends(StatisticalReport, _super);
    function StatisticalReport(name) {
        if (name === void 0) { name = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.STATISTICAL_REPORT, name, false) || this;
        _this.hasTable = false;
        _this.hasChart = false;
        _this.parameters = [];
        _this.name = name;
        return _this;
    }
    StatisticalReport.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Must not be transient');
        caribviper_common_1.Assert.isTruthy(this.name, 'Must have a valid name');
        caribviper_common_1.Assert.isTruthy(this.description, 'Must have a valid description');
        caribviper_common_1.Assert.isTruthy(this.query, 'Must have a valid query');
        ;
    };
    StatisticalReport.createId = function (name) {
        if (name === void 0) { name = ''; }
        if (!name)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.STATISTICAL_REPORT);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.STATISTICAL_REPORT, name);
    };
    StatisticalReport.mapToEntity = function (source) {
        return Object.assign(new StatisticalReport(), source);
    };
    StatisticalReport.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new StatisticalReport(), element));
        });
        return array;
    };
    return StatisticalReport;
}(caribviper_entity_1.Entity));
exports.StatisticalReport = StatisticalReport;
