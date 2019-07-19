import { UserInfo } from './../../value-objects/common/userinfo';
import { WorkflowActivity } from './../../value-objects/workflow/workflow-activity';
import { Entity } from 'caribviper-entity';
export declare class Task extends Entity {
    registryId: string;
    referenceNo: string;
    recipient: UserInfo;
    sender: UserInfo;
    dateStarted: Date;
    dateCompleted: Date;
    activity: WorkflowActivity;
    templateId: string;
    comment: string;
    status: string;
    link: string;
    seen: boolean;
    groupAssiged: string;
    version: string;
    addReminderToSender: boolean;
    constructor(registryId?: string, guid?: string, referenceNo?: string, sender?: UserInfo, dateStarted?: Date, groupAssigned?: string);
    validateEntity(): void;
    static createTask(registryId: string, guid: string, referenceNo: string, sender: UserInfo, receiver: UserInfo, activity?: WorkflowActivity, templateId?: string, groupAssigned?: string): Task;
    static createId(registryId?: string, guid?: string): string;
    static mapToEntity(source: any): Task;
    static mapToEntityArray(source: Task[]): Task[];
}
export declare class OverdueTask {
    readonly task: Task;
    readonly daysOverDue: number;
    readonly highestSupervisorNotification: number;
    constructor(task: Task);
    static createOverdueTasks(tasks: Task[]): OverdueTask[];
    static isTaskOverdue(task: Task): boolean;
}
export declare class TaskReportRequest {
    username: string;
    start: number;
    end: number;
    constructor(username: string, start: number, end: number);
}
export declare class GroupTasksBox {
    membersTasksBoxes: UserTasksBox[];
    constructor(membersTasksBoxes?: UserTasksBox[]);
    addMemberBox(username: string, box: UserTasksBox): void;
    static clone(box: GroupTasksBox): GroupTasksBox;
}
export declare class UserTasksBox {
    username: string;
    todo: Task[];
    inbox: Task[];
    outbox: Task[];
    private _unassignedTasks;
    private _allUndoneTasks;
    private _inboxUndoneTasks;
    _forceUpdate: boolean;
    constructor(username: string, todo?: Task[], inbox?: Task[], outbox?: Task[]);
    sortAll(): void;
    sortTodo(): void;
    sortInbox(): void;
    sortOutbox(): void;
    private sortTasks;
    static clone(box: UserTasksBox): UserTasksBox;
    readonly nonAssignedTasks: Task[];
    readonly allUndoneTasks: Task[];
    readonly inboxUndoneTasks: Task[];
    forceUpdate: boolean;
    update(): void;
}
export declare class UserStatistics {
    private box;
    private _unassignedFiles;
    constructor(box: UserTasksBox);
    readonly totalTasks: number;
    readonly totalAssigned: number;
    readonly totalTasksCompletedFromInbox: number;
    readonly totalTasksUncompletedFromInbox: number;
    readonly totalUncompletedTasks: number;
    readonly totalCompletedTasks: number;
    readonly totalTasksBroughtOver: number;
    readonly productivity: number;
    update(): void;
}
export declare class MergeTask extends Entity {
    qid: number;
    constructor(qid?: number);
    validateEntity(): void;
    static mapToEntity(source: any): MergeTask;
}
