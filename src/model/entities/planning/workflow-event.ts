import { Assert, Utilities } from 'caribviper-common';
import { UserInfo } from './../../value-objects/common/userinfo';
import { WorkflowActivity } from './../../value-objects/workflow/workflow-activity';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';

/**
 * Manages the workflow event
 */
export class WorkflowEvent extends Entity {

  /**Id of the registry item */
  registryId: string;

  /**Type of event */
  eventType: string;

  /**User who controls event */
  owner: UserInfo;

  /**Sender of the event */
  sender: UserInfo;

  /**Date of event */
  date: Date;

  /**Date completed */
  completed: Date;

  /**Event details/activity */
  activity: WorkflowActivity;

  /**Template id */
  templateId: string;

  /**comments about the event */
  comment: string;

  /**specifies whether the event is starting or completing*/
  status: string;

  /**id of the complimentary start/ending event */
  link: string;

  constructor(registryId: string = '', eventType: string = '', sender: UserInfo = null, dateCreated: Date = null) {
    super(ENTITY_MODELS.SYSTEM.EVENT, WorkflowEvent.createId(registryId, dateCreated, eventType, !!sender ? sender.username : ''), true);
    this.date = dateCreated;
    this.status = '';
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Must not be transient');
    Assert.isTruthy(this.owner, 'Must have a valid owner');
    Assert.isTruthy(this.sender, 'Must have a valid creator');
    Assert.isTruthy(this.registryId, 'Must have a valid registry id');
    Assert.isTruthy(this.eventType, 'Must have a valid event type');
    Assert.isTruthy(this.activity, 'Must have a valid activity');
    Assert.isTruthy(this.date, 'Must have a valid date of event');
    Assert.isTruthy(this.status, 'Must have a valid status of event');
    Assert.isTruthy(this.templateId, 'Must have a valid template id');
  }

  public static createNew(registryId: string, eventType: string, sender: UserInfo, receiver: UserInfo, activity: WorkflowActivity, templateId: string): WorkflowEvent {
    let datecreated = new Date();
    let e = new WorkflowEvent(registryId, eventType, sender, datecreated);
    e.owner = receiver;
    e.sender = sender;
    e.activity = activity;
    return e;
  }

  public static createId(registryId: string = '', dateCreated: Date = null, eventType: string = '', senderName: string = '') {
    if (!!registryId)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.WORKFLOW);
    if (!dateCreated || !eventType || !senderName)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.WORKFLOW, registryId);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.WORKFLOW, registryId, dateCreated.getTime().toString(), senderName);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: WorkflowEvent): WorkflowEvent {
    return Object.assign(new WorkflowEvent(), source);
  }
}

