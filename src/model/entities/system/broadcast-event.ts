import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';

export class BroadcastEvent extends Entity {
  
  /**Indicates that the broadcast specified should be hidden */
  hidden: boolean = false;

  constructor(public broadcastId: string = '', public username: string = '') {
    super(ENTITY_MODELS.SYSTEM.BROADCAST_MESSAGE_EVENT, BroadcastEvent.createId(broadcastId, username), true)
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Must not be transient');
    Assert.isTruthy(this.broadcastId, 'Must have a valid broadcast Id');
    Assert.isTruthy(this.username, 'Must have a valid user');
  }
  
  /**
   * Hide the current broadcast
   */
  public hideBroadcast() {
    this.hidden = true;
  }
  

  public static createId(broadcastId: string = '', username: string = '') {
    if (!username)
      return Entity.generateId(broadcastId);
    return Entity.generateId(broadcastId, username);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): BroadcastEvent {
    return Object.assign(new BroadcastEvent(), source);
  }

  public static mapToEntityArray(source: BroadcastEvent[]): BroadcastEvent[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new BroadcastEvent(), element));
    });
    return array;
  }
}
