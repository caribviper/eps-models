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
var report_base_1 = require("./report-base");
var Report = (function (_super) {
    __extends(Report, _super);
    function Report(registryId, user, description) {
        if (registryId === void 0) { registryId = ''; }
        if (user === void 0) { user = null; }
        if (description === void 0) { description = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.PLANNING.REPORT, Report.createId(registryId, (!user) ? '' : user.username), true) || this;
        _this.attachedPictures = [];
        _this.author = user;
        _this.dateCreated = new Date();
        _this.description = description;
        _this.registryId = registryId;
        return _this;
    }
    Report.createId = function (registryId, username) {
        if (username === void 0) { username = ''; }
        if (!registryId)
            return '';
        else if (!username)
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.REPORT);
        else
            return caribviper_entity_1.Entity.generateId(registryId, entity_model_type_1.ENTITY_MODELS.PLANNING.REPORT, username, Date.now().toString());
    };
    Report.mapToEntity = function (source) {
        var report = Object.assign(new Report(), source);
        report.content = caribviper_common_1.StringUtilities.replaceAll(report.content, '\r\n', '<br />');
        if (report.content.indexOf('<p>') < 0)
            report.content = '<p>' + report.content + '</p>';
        return report;
    };
    Report.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Report(), element));
        });
        return array;
    };
    return Report;
}(report_base_1.BaseReport));
exports.Report = Report;
