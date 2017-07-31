import { Assert } from 'caribviper-common';
import { UserInfo } from './../../value-objects/common/userinfo';
import { WorkflowActivity } from './../../value-objects/workflow/workflow-activity';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';

/**
 * Manages the workflow event
 */
export class WorkflowEvent extends Entity {

  /**Id of the registry item */
  registryId:string;

  /**Type of event */
  eventType: string;

  /**User who controls event */
  owner: UserInfo;

  /**Sender of the event */
  creator: UserInfo;

  /**Date of event */
  date: Date;

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

  constructor(identifier: string | { registryId: string, eventType: string, guid: string } = '') {
    super(ENTITY_MODELS.SYSTEM.EVENT, WorkflowEvent.createId(identifier), true);
    this.date = new Date();
    this.status = (typeof identifier === 'string') ? 'end': 'start';
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Must not be transient');
    Assert.isTruthy(this.owner, 'Must have a valid owner');
    Assert.isTruthy(this.creator, 'Must have a valid creator');
    Assert.isTruthy(this.registryId, 'Must have a valid registry id');
    Assert.isTruthy(this.eventType, 'Must have a valid event type');
    Assert.isTruthy(this.activity, 'Must have a valid activity');
    Assert.isTruthy(this.date, 'Must have a valid date of event');
    Assert.isTruthy(this.status, 'Must have a valid status of event');
    Assert.isTruthy(this.templateId, 'Must have a valid template id');

  }

  public static createId(identifier: string | { registryId: string, eventType: string, guid: string } = '') {
    //done mainly for link to previous event
    if (typeof identifier === 'string') {
      if (!identifier)
        return Entity.generateId(ENTITY_MODELS.SYSTEM.EVENT);
      let linkpos = identifier.indexOf('link:');
      if (linkpos < 0)
        throw new Error('Invalid event link id');
      return `${identifier.substr(0, linkpos)}link:01`;
    }
    //creates a new unlinked event
    if (!identifier || !identifier.registryId || !identifier.eventType|| !identifier.guid)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.EVENT);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.EVENT, identifier.registryId, identifier.eventType, identifier.guid, 'link:00');
  }

  public static createNew(link: string, registryId: string, eventType: string, templateId: string, activity: WorkflowActivity, creator: UserInfo, owner: UserInfo, comment: string ) {
    let identifier = link || {registryId: registryId, eventType: eventType};
    let event = new WorkflowEvent(identifier);
    event.activity = activity;
    event.comment = comment;
    event.creator = creator;
    event.eventType = eventType;
    event.link = link;
    event.owner = owner;
    event.registryId = registryId;
    event.templateId = templateId;
  }
}

