import { UserStatistics } from "../../..";

export class UserStatisticsValue {

  /**
   * Create a new user statistic value
   * @param totalTasks the total number of Tasks within the Inbox and Outbox
   * @param totalAssigned the total number of Tasks assigned within the period
   * @param totalTasksCompletedFromInbox the total number of tasks within the Inbox that have been processed
   * @param totalTasksUncompletedFromInbox the total number of tasks uncompleted within the inbox
   * @param totalUncompletedTasks all uncompleted tasks
   * @param totalCompletedTasks all completed tasks
   * @param totalTasksBroughtOver all tasks brought over or self assigned
   * @param productivity basic productivity for the period
   */
  constructor(readonly totalTasks: number, readonly totalAssigned: number,
    readonly totalTasksCompletedFromInbox: number, readonly totalTasksUncompletedFromInbox: number,
    readonly totalUncompletedTasks: number, readonly totalCompletedTasks: number,
    readonly totalTasksBroughtOver: number, readonly productivity: number) { }

  public static createFromUserStatistics(stat: UserStatistics): UserStatisticsValue {
    return new UserStatisticsValue(stat.totalTasks, stat.totalAssigned,
      stat.totalTasksCompletedFromInbox, stat.totalTasksUncompletedFromInbox,
      stat.totalUncompletedTasks, stat.totalCompletedTasks,
      stat.totalTasksBroughtOver, stat.productivity);
  }
}
