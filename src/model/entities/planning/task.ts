import { Assert, Utilities } from 'caribviper-common';
import { UserInfo } from './../../value-objects/common/userinfo';
import { WorkflowActivity } from './../../value-objects/workflow/workflow-activity';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';

/**
 * Manages the workflow event
 */
export class Task extends Entity {

  /**Id of the registry item */
  registryId: string;

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
  seen: boolean

  constructor(registryId: string = '', guid = '', sender: UserInfo = null, dateStarted: Date = null) {
    super(ENTITY_MODELS.SYSTEM.TASK, Task.createId(registryId, guid), true);
    this.dateStarted = dateStarted;
    this.status = '';
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
  }

  public static createNew(registryId: string, eventType: string, sender: UserInfo, receiver: UserInfo, activity: WorkflowActivity, templateId: string): Task {
    let datecreated = new Date();
    let e = new Task(registryId, eventType, sender, datecreated);
    e.recipient = receiver;
    e.sender = sender;
    e.activity = activity;
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

