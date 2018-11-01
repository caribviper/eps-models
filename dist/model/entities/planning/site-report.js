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
var report_1 = require("./../../value-objects/planning/report");
var report_2 = require("./report");
var SiteReport = (function (_super) {
    __extends(SiteReport, _super);
    function SiteReport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dateVisited = new Date();
        _this.policies = new report_1.PolicyItem();
        return _this;
    }
    SiteReport.prototype.validateEntity = function () {
        _super.prototype.validateEntity.call(this);
        caribviper_common_1.Assert.isTruthy(this.dateVisited, 'Site Report must have a valid date visited');
    };
    return SiteReport;
}(report_2.Report));
exports.SiteReport = SiteReport;
var SiteReportDevelopment = (function (_super) {
    __extends(SiteReportDevelopment, _super);
    function SiteReportDevelopment(registryId, user, description) {
        if (registryId === void 0) { registryId = ''; }
        if (user === void 0) { user = null; }
        if (description === void 0) { description = ''; }
        var _this = _super.call(this, registryId, user, description) || this;
        _this.roadReserve = new report_1.SiteReportMeasurementGroup();
        _this.buildingLine = new report_1.SiteReportMeasurementGroup();
        _this.rearAndSideDistances = new report_1.SiteReportMeasurementGroup();
        _this.highWaterMark = 0;
        _this.cliffEdge = 0;
        _this.noParkingSpacesProposed = 0;
        _this.noParkingSpacesRequired = 0;
        _this.noFloors = 0;
        _this.proposedPlotCoverage = 0;
        _this.recommendedPlotCoverage = 0;
        _this.proposedPlotRatio = 0;
        _this.recommendedPlotRatio = 0;
        _this.proposedBeds = 0;
        _this.recommendedBeds = 0;
        _this.existingBuilding = 0;
        _this.treesAffected = false;
        _this.wallsOrEnclosures = false;
        return _this;
    }
    SiteReportDevelopment.mapToEntity = function (source) {
        return Object.assign(new SiteReportDevelopment(), source);
    };
    SiteReportDevelopment.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new SiteReportDevelopment(), source));
        });
        return array;
    };
    return SiteReportDevelopment;
}(SiteReport));
exports.SiteReportDevelopment = SiteReportDevelopment;
var SiteReportEnforcement = (function (_super) {
    __extends(SiteReportEnforcement, _super);
    function SiteReportEnforcement(registryId, user, description) {
        if (registryId === void 0) { registryId = ''; }
        if (user === void 0) { user = null; }
        if (description === void 0) { description = ''; }
        var _this = _super.call(this, registryId, user, description) || this;
        _this.roadReserve = new report_1.SiteReportMeasurementGroup();
        _this.buildingLine = new report_1.SiteReportMeasurementGroup();
        _this.rearAndSideDistances = new report_1.SiteReportMeasurementGroup();
        _this.typeOfDevelopment = '';
        _this.durationOnSite = 0;
        return _this;
    }
    SiteReportEnforcement.mapToEntity = function (source) {
        return Object.assign(new SiteReportEnforcement(), source);
    };
    SiteReportEnforcement.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new SiteReportEnforcement(), element));
        });
        return array;
    };
    return SiteReportEnforcement;
}(SiteReport));
exports.SiteReportEnforcement = SiteReportEnforcement;
