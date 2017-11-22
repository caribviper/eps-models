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
    newBox.membersTasksBoxes.forEach((b: UserTasksBox) => {
      b = UserTasksBox.clone(b);
    });
    return newBox;
  }
}

/**Manages todo, inbox and outbox of a user */
export class UserTasksBox {

  /**
   * Creates a user's todo, inbox and outbox 
   * @param username Name of user of tasksbox
   * @param todo Todo list of undone tasks
   * @param inbox Inbox of tasks for a user
   * @param outbox Outbox of tasks for a user
   */
  constructor(public username: string, public todo: Task[] = [], public inbox: Task[] = [], public outbox: Task[] = []) { }

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
      let x = moment(a.dateStarted);
      let y = moment(b.dateStarted);
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
