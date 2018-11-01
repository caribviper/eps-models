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
var workflow_activity_1 = require("./../../value-objects/workflow/workflow-activity");
var caribviper_common_1 = require("caribviper-common");
var entity_model_type_1 = require("./../entity-model-type");
var caribviper_entity_1 = require("caribviper-entity");
var WorkflowTemplate = (function (_super) {
    __extends(WorkflowTemplate, _super);
    function WorkflowTemplate(name, filePrefix, description) {
        if (name === void 0) { name = ''; }
        if (filePrefix === void 0) { filePrefix = ''; }
        if (description === void 0) { description = ''; }
        var _this = _super.call(this, entity_model_type_1.ENTITY_MODELS.SYSTEM.WORKFLOW_TEMPLATE, WorkflowTemplate.createId(name), true) || this;
        _this.name = name;
        _this.filePrefix = filePrefix;
        _this.description = description;
        _this.activities = [];
        return _this;
    }
    WorkflowTemplate.prototype.validateEntity = function () {
        caribviper_common_1.Assert.isFalse(this.isTransient, 'Cannot be transient');
        caribviper_common_1.Assert.isTruthy(this.filePrefix, 'Must have a valid file prefix');
        caribviper_common_1.Assert.isTruthy(this.name, 'Must have a valid name');
    };
    Object.defineProperty(WorkflowTemplate.prototype, "activityDays", {
        get: function () {
            if (!this.activities || this.activities.length < 1)
                return 0;
            var total = 0;
            this.activities.forEach(function (a) {
                total += a.estimatedDays;
            });
            return total;
        },
        enumerable: true,
        configurable: true
    });
    WorkflowTemplate.prototype.addActivity = function (activity, estimatedDays) {
        this.activities.push(new workflow_activity_1.WorkflowActivity(this.activities.length, activity, estimatedDays));
    };
    WorkflowTemplate.prototype.removeActivity = function (activityIndex) {
        var totalSwaps = this.activities.length - (activityIndex + 1);
        for (var i = 0; i < totalSwaps; i++) {
            this.swap(activityIndex, activityIndex + 1);
            activityIndex++;
        }
        this.activities.splice(activityIndex, 1);
    };
    WorkflowTemplate.prototype.moveActivityUp = function (order) {
        if (!this.activities && this.activities.length < 1 && order < 1)
            return;
        this.swap(order, order - 1);
    };
    WorkflowTemplate.prototype.moveActivityDown = function (order) {
        if (!this.activities && this.activities.length < 1 && order > this.activities.length - 1)
            return;
        this.swap(order, order + 1);
    };
    WorkflowTemplate.prototype.swap = function (index1, index2) {
        var order = this.activities[index1].order;
        this.activities[index1].order = this.activities[index2].order;
        this.activities[index2].order = order;
        var tmp = this.activities[index1];
        this.activities[index1] = this.activities[index2];
        this.activities[index2] = tmp;
    };
    WorkflowTemplate.createId = function (name) {
        if (name === void 0) { name = ''; }
        if (!name)
            return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.WORKFLOW_TEMPLATE);
        return caribviper_entity_1.Entity.generateId(entity_model_type_1.ENTITY_MODELS.SYSTEM.WORKFLOW_TEMPLATE, name);
    };
    WorkflowTemplate.mapToEntity = function (source) {
        return Object.assign(new WorkflowTemplate(), source);
    };
    WorkflowTemplate.mapToEntityArray = function (source) {
        if (source.length < 1)
            return [];
        var array = [];
        source.forEach(function (element) {
            array.push(Object.assign(new WorkflowTemplate(), element));
        });
        return array;
    };
    return WorkflowTemplate;
}(caribviper_entity_1.Entity));
exports.WorkflowTemplate = WorkflowTemplate;
exports.WORKFLOW_STATES = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    DEFERRED: 'deferred',
    CANCELED: 'canceled'
};
