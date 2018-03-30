import { Assert, Utilities } from 'caribviper-common';
import { UserInfo } from './../../value-objects/common/userinfo';
import { WorkflowActivity } from './../../value-objects/workflow/workflow-activity';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import * as moment from 'moment';

/**
 * Manages the workflow event
 */
export class Task extends Entity {

  /**Id of the registry item */
  registryId: string;

  /**Reference number of task */
  referenceNo: string;

  /**User who controls event */
  recipient: UserInfo;

  /**Sender of the event */
  sender: UserInfo;

  /**Date of event */
  dateStarted: Date;

  /**Date completed */
  dateCompleted: Date;

  /**Event details/activity */
  activity: WorkflowActivity;

  /**Template id */
  templateId: string;

  /**comments about the event */
  comment: string;

  /**specifies whether the event is starting or completing*/
  status: string;

  /**id of the complimentary registry items, such as consultation/report etc */
  link: string;

  /** indicates whether the owner has seen it */
  seen: boolean;

  /**Group that was assigned the task */
  groupAssiged: string = '';

  /**version assigned to task */
  version: string = '';

  constructor(registryId: string = '', guid = '', referenceNo: string = '', sender: UserInfo = null, dateStarted: Date = null, groupAssigned: string = '') {
    super(ENTITY_MODELS.SYSTEM.TASK, Task.createId(registryId, guid), true);
    this.dateStarted = dateStarted;
    this.sender = sender;
    this.status = '';
    this.groupAssiged = groupAssigned;
    this.referenceNo = referenceNo;
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Must not be transient');
    Assert.isTruthy(this.recipient, 'Must have a valid owner/receiver');
    Assert.isTruthy(this.sender, 'Must have a valid creator');
    Assert.isTruthy(this.registryId, 'Must have a valid registry id');
    Assert.isTruthy(this.activity, 'Must have a valid activity');
    Assert.isTruthy(this.dateStarted, 'Must have a valid date of event');
    //Assert.isTruthy(this.status, 'Must have a valid status of event');
    Assert.isTruthy(this.templateId, 'Must have a valid template id');
    Assert.isTruthy(this.referenceNo, 'Must have a valid reference number');
  }

  public static createTask(registryId: string, guid: string, referenceNo: string, sender: UserInfo, receiver: UserInfo, activity: WorkflowActivity = null, templateId: string = '', groupAssigned: string = ''): Task {
    let datecreated = new Date();
    let e = new Task(registryId, guid, referenceNo, sender, datecreated);
    e.recipient = receiver;
    e.activity = activity;
    e.groupAssiged = groupAssigned;
    return e;
  }

  public static createId(registryId: string = '', guid: string = '') {
    if (!registryId)
      return '';
    if (!guid)
      return Entity.generateId(registryId, ENTITY_MODELS.SYSTEM.TASK);
    return Entity.generateId(registryId, ENTITY_MODELS.SYSTEM.TASK, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Task {
    return Object.assign(new Task(), source);
  }

  public static mapToEntityArray(source: Task[]): Task[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Task(), element));
    });
    return array;
  }
}

/**
 * Task report request used to get report based on user and period
 */
export class TaskReportRequest {
  /**
   * Creates a new task report request
   * @param username Username of the user in question
   * @param start Start period of the report in time since 1970/1/1
   * @param end End period f the report since 1970/1/1
   */
  constructor(public username: string, public start: number, public end: number) { }
}


/**Manages a groups member inbox and outbox */
export class GroupTasksBox {
  /**
   * Creates a group member of user boxes
   * @param membersTasksBoxes An array of UserTaskBoxes
   */
  constructor(public membersTasksBoxes: UserTasksBox[] = []) { }

  public addMemberBox(username: string, box: UserTasksBox) {
    this.membersTasksBoxes.push(box);
  }

  public static clone(box: GroupTasksBox): GroupTasksBox {
    let newBox = new GroupTasksBox(box.membersTasksBoxes);
    for (let i: number = 0; i < newBox.membersTasksBoxes.length; i++) {
      newBox.membersTasksBoxes[i] = UserTasksBox.clone(newBox.membersTasksBoxes[i]);
    }
    return newBox;
  }
}

/**Manages todo, inbox and outbox of a user */
export class UserTasksBox {

  //used to store the unassigned tasks, such that loop doesn't need to be called
  private _unassignedTasks: Task[] = [];

  //get/set all undone task whether they are inbox/todo list
  private _allUndoneTasks: Task[] = [];

  //get/set all undone task whether they are inbox/todo list
  private _inboxUndoneTasks: Task[] = [];

  //forces the _unassignedTasks to update
  public _forceUpdate: boolean = false;

  /**
   * Creates a user's todo, inbox and outbox 
   * @param username Name of user of tasksbox
   * @param todo Todo list of undone tasks
   * @param inbox Inbox of tasks for a user
   * @param outbox Outbox of tasks for a user
   */
  constructor(public username: string, public todo: Task[] = [], public inbox: Task[] = [], public outbox: Task[] = []) {
    this.forceUpdate = true;
  }

  /**Sort all boxes */
  public sortAll() {
    this.sortTodo();
    this.sortInbox();
    this.sortOutbox();
  }

  /**Sort todo tasks */
  public sortTodo() {
    this.todo = this.sortTasks(this.todo);
  }

  /**Sort inbox tasks */
  public sortInbox() {
    this.inbox = this.sortTasks(this.inbox);
  }

  /**Sort outbox tasks */
  public sortOutbox() {
    this.outbox = this.sortTasks(this.outbox);
  }

  private sortTasks(tasks: Task[]): Task[] {
    if (!tasks || tasks.length == 0)
      return [];
    tasks.sort((a: Task, b: Task) => {
      let x = moment(new Date(a.dateStarted));
      let y = moment(new Date(b.dateStarted));
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    });
    return tasks;
  }

  public static clone(box: UserTasksBox) {
    let newBox = new UserTasksBox(
      box.username,
      Task.mapToEntityArray(box.todo || []),
      Task.mapToEntityArray(box.inbox || []),
      Task.mapToEntityArray(box.outbox || []));
    return newBox;
  }

  ///Get the all files that have been worked on but not unassigned within the period
  public get nonAssignedTasks(): Task[] { return this._unassignedTasks; }

  ///Gets all undone task. Merge between undone inbox and todo list
  public get allUndoneTasks(): Task[] { return this._allUndoneTasks; }

  ///Gets all undone tasks within the inbox
  public get inboxUndoneTasks(): Task[] { return this._inboxUndoneTasks; }

  ///Gets the status of force update
  public get forceUpdate(): boolean { return this._forceUpdate; }

  //Sets force update
  public set forceUpdate(value: boolean) {
    this._forceUpdate = value;
    if (value === true) {
      this.update();
    }
  }

  //updates the properties
  public update() {
    //update nonAssignedTasks
    this._unassignedTasks = Task.mapToEntityArray(this.outbox);
    for (let x: number = this._unassignedTasks.length - 1; x > -1; x--) {
      if (this.inbox.find((i: Task) => i.referenceNo === this._unassignedTasks[x].referenceNo))
        this._unassignedTasks.splice(x, 1);
    }

    //update undoneTasks
    this._allUndoneTasks = [];
    this._allUndoneTasks = this._allUndoneTasks.concat(...this.inbox);
    for (let i: number = this._allUndoneTasks.length - 1; i > -1; i--) {
      if (this.outbox.find((o: Task) => o.referenceNo === this._allUndoneTasks[i].referenceNo))
        this._allUndoneTasks.splice(i, 1);
    }
    this._inboxUndoneTasks = this._allUndoneTasks;
    this._allUndoneTasks.concat(...this.inbox);
    this._allUndoneTasks = this.sortTasks(this._allUndoneTasks);
  }
}

export class UserStatistics {
  private _unassignedFiles: Task[] = [];

  constructor(private box: UserTasksBox) {
    if (!this.box || !this.box.username)
      throw new Error('Invalid UserTasksBox');
  }

  ///Gets the total number of Tasks within the Inbox and Outbox
  get totalTasks(): number {
    return this.totalTasksUncompletedFromInbox + this.totalCompletedTasks;
  }

  ///Gets the total number of Tasks assigned within the period
  get totalAssigned(): number {
    return this.box.inbox.length;
  }

  ///Gets the total number of tasks within the Inbox that have been processed
  get totalTasksCompletedFromInbox(): number {
    return (this.box.inbox.length - this.box.inboxUndoneTasks.length);
  }

  ///Gets the total number of tasks uncompleted within the inbox
  get totalTasksUncompletedFromInbox(): number {
    return this.box.inbox.length - this.totalTasksCompletedFromInbox;
  }

  ///Get all uncompleted tasks
  get totalUncompletedTasks(): number {
    return this.box.allUndoneTasks.length;
  }

  ///Get all completed tasks
  get totalCompletedTasks(): number {
    return this.box.outbox.length;
  }

  ///Get all tasks brought over or self assigned
  get totalTasksBroughtOver(): number {
    if (!this.box || !this.box.nonAssignedTasks)
      return 0;
    return this.box.nonAssignedTasks.length;
  }

  ///Get basic productivity for the period in question
  get productivity(): number {
    return (this.totalTasks == 0) ? 0 : (this.totalCompletedTasks / this.totalTasks) * 100;
  }

  //Updates the statistics calcuations
  update() {
    this.box.forceUpdate = true;
  }
}

export class MergeTask extends Entity {

  constructor(public qid: number = 0) {
    super('$merge', 'task');
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'MergeTask must not be transient');
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): MergeTask {
    return Object.assign(new MergeTask(), source);
  }

}
