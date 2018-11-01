"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var caribviper_common_1 = require("caribviper-common");
var WorkflowActivity = (function () {
    function WorkflowActivity(order, activity, estimatedDays) {
        this.order = order;
        this.activity = activity;
        this.estimatedDays = estimatedDays;
        caribviper_common_1.Assert.isTrue(order > -1, 'Order of the activity must be greater than 0');
        caribviper_common_1.Assert.isTruthy(activity, 'Activity cannot be undefined or empty');
        caribviper_common_1.Assert.isTrue(estimatedDays > 0, 'The number of estimated days must be greater than 0');
    }
    return WorkflowActivity;
}());
exports.WorkflowActivity = WorkflowActivity;
