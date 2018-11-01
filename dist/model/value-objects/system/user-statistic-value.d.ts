import { UserStatistics } from "../../..";
export declare class UserStatisticsValue {
    readonly totalTasks: number;
    readonly totalAssigned: number;
    readonly totalTasksCompletedFromInbox: number;
    readonly totalTasksUncompletedFromInbox: number;
    readonly totalUncompletedTasks: number;
    readonly totalCompletedTasks: number;
    readonly totalTasksBroughtOver: number;
    readonly productivity: number;
    constructor(totalTasks: number, totalAssigned: number, totalTasksCompletedFromInbox: number, totalTasksUncompletedFromInbox: number, totalUncompletedTasks: number, totalCompletedTasks: number, totalTasksBroughtOver: number, productivity: number);
    static createFromUserStatistics(stat: UserStatistics): UserStatisticsValue;
}
