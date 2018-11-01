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
var Job = (function (_super) {
    __extends(Job, _super);
    function Job(name, funcName, jobTime, description) {
        if (name === void 0) { name = ''; }
        if (funcName === void 0) { funcName = ''; }
        if (jobTime === void 0) { jobTime = ''; }
        if (description === void 0) { description = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.JOB, name, true) || this;
        _this.name = name;
        _this.funcName = funcName;
        _this.jobTime = jobTime;
        _this.description = description;
        _this.jobInstanceId = '';
        return _this;
    }
    Job.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Must not be transient');
        caribviper_common_1.Assert.isTruthy(this.funcName, 'Must not be empty or null');
    };
    Job.createId = function (name) {
        if (!name)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.JOB);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.JOB, name);
    };
    Job.mapToEntity = function (source) {
        return Object.assign(new Job(), source);
    };
    Job.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new Job(), element));
        });
        return array;
    };
    return Job;
}(caribviper_entity_1.Entity));
exports.Job = Job;
