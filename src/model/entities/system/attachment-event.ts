import { Entity } from 'caribviper-entity';
import { ENTITY_MODELS } from '../../..';
import { Assert } from 'caribviper-common';

export const ATTACHMENT_STATES = {
  LOCAL: 'local',
  REMOTE: 'remote',
  REPLICATED: 'replicatef'
};

export const ATTACHMENT_EVENTS = {
  CREATED: 'created',
  DELETED: 'deleted'
};

export class AttachmentEvent extends Entity {
  public date: Date;
  constructor(public registryId:string ='', public filePath: string ='', public state: string ='', public event: string ='') {
    super(ENTITY_MODELS.SYSTEM.ATTACHMENT_EVENT, AttachmentEvent.createId(filePath), true);
    this.date = new Date();
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'FileEvent cannot be transient');
    Assert.isTruthy(this.registryId, 'FileEvent must have a valid registry id');
    Assert.isTruthy(this.filePath, 'FileEvent must have a valid filepath');
    Assert.isTruthy(this.state, 'FileEvent must have a valid state');
    Assert.isTruthy(this.event, 'FileEvent must have a valid event');
  }

  public static createId(filepath: string = '') {
    if (!filepath)
      return '';
    return Entity.generateId(ENTITY_MODELS.SYSTEM.ATTACHMENT_EVENT, filepath);
  }
  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): AttachmentEvent {
    let o = Object.assign(new AttachmentEvent(), source);
    return o;
  }

  public static mapToEntityArray(source: AttachmentEvent[]): AttachmentEvent[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      let o = Object.assign(new AttachmentEvent(), element);
      array.push(o);
    });
    return array;
  }
}
