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
exports.StatsiticalReportType = {
    TABLE: 'table-only',
    CHART: 'chart-only',
    TABLE_AND_CHART: 'table-and-chart'
};
Object.freeze(exports.StatsiticalReportType);
var StatisticalReportTemplate = (function (_super) {
    __extends(StatisticalReportTemplate, _super);
    function StatisticalReportTemplate(name) {
        if (name === void 0) { name = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.STATISTICAL_REPORT_TEMPLATE, name, false) || this;
        _this.reportType = exports.StatsiticalReportType.TABLE;
        _this.name = name;
        return _this;
    }
    StatisticalReportTemplate.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Must not be transient');
        caribviper_common_1.Assert.isTruthy(this.name, 'Must have a valid name');
        caribviper_common_1.Assert.isTruthy(this.description, 'Must have a valid description');
        caribviper_common_1.Assert.isTruthy(this.query, 'Must have a valid query');
        ;
    };
    StatisticalReportTemplate.createId = function (name) {
        if (name === void 0) { name = ''; }
        if (!name)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.STATISTICAL_REPORT_TEMPLATE);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.STATISTICAL_REPORT_TEMPLATE, name);
    };
    StatisticalReportTemplate.mapToEntity = function (source) {
        return Object.assign(new StatisticalReportTemplate(), source);
    };
    StatisticalReportTemplate.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new StatisticalReportTemplate(), element));
        });
        return array;
    };
    return StatisticalReportTemplate;
}(caribviper_entity_1.Entity));
exports.StatisticalReportTemplate = StatisticalReportTemplate;
var StatisticalReport = (function () {
    function StatisticalReport(template, data) {
        if (data === void 0) { data = null; }
        this.template = template;
        this.data = data;
        caribviper_common_1.Assert.isTruthy(template, 'StatisticalReportTemplate cannot be null');
        this.timestamp = new Date().getTime();
    }
    StatisticalReport.createCustomReport = function (data, reportType, query) {
        var parameters = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            parameters[_i - 3] = arguments[_i];
        }
        var template = this.generateCustomReportTemplate(reportType, query, parameters);
        return new StatisticalReport(template, data);
    };
    StatisticalReport.generateCustomReportTemplate = function (reportType, query) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
        }
        var template = new StatisticalReportTemplate('Custom Template - ' + new Date().getTime().toString());
        template.description = 'Custom template used with custom queries';
        template.query = query;
        template.parameters = parameters;
        template.reportType = reportType || exports.StatsiticalReportType.TABLE_AND_CHART;
        return template;
    };
    return StatisticalReport;
}());
exports.StatisticalReport = StatisticalReport;
