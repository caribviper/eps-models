"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserStatisticsValue = (function () {
    function UserStatisticsValue(totalTasks, totalAssigned, totalTasksCompletedFromInbox, totalTasksUncompletedFromInbox, totalUncompletedTasks, totalCompletedTasks, totalTasksBroughtOver, productivity) {
        this.totalTasks = totalTasks;
        this.totalAssigned = totalAssigned;
        this.totalTasksCompletedFromInbox = totalTasksCompletedFromInbox;
        this.totalTasksUncompletedFromInbox = totalTasksUncompletedFromInbox;
        this.totalUncompletedTasks = totalUncompletedTasks;
        this.totalCompletedTasks = totalCompletedTasks;
        this.totalTasksBroughtOver = totalTasksBroughtOver;
        this.productivity = productivity;
    }
    UserStatisticsValue.createFromUserStatistics = function (stat) {
        return new UserStatisticsValue(stat.totalTasks, stat.totalAssigned, stat.totalTasksCompletedFromInbox, stat.totalTasksUncompletedFromInbox, stat.totalUncompletedTasks, stat.totalCompletedTasks, stat.totalTasksBroughtOver, stat.productivity);
    };
    return UserStatisticsValue;
}());
exports.UserStatisticsValue = UserStatisticsValue;
