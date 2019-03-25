import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';

export class BroadcastUserMessageInstance extends Entity {

  /**Indicates that the broadcast specified should be hidden */
  hidden: boolean = false;

  /**
   * Creates a new broadcast user instance
   * @param broadcastId Id of broadcast message
   * @param username Recipient of broadcast
   * @param expirationDate Date of expiration of automatically shown broadcast
   */
  constructor(public broadcastId: string = '', public username: string = '', public expirationDate: Date = null) {
    super(ENTITY_MODELS.SYSTEM.BROADCAST_USER_MESSAGE_INSTANCE, BroadcastUserMessageInstance.createId(broadcastId, username), true)
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
      return Entity.generateId(broadcastId, ENTITY_MODELS.SYSTEM.BROADCAST_USER_MESSAGE_INSTANCE);
    return Entity.generateId(broadcastId, ENTITY_MODELS.SYSTEM.BROADCAST_USER_MESSAGE_INSTANCE, username);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): BroadcastUserMessageInstance {
    return Object.assign(new BroadcastUserMessageInstance(), source);
  }

  public static mapToEntityArray(source: BroadcastUserMessageInstance[]): BroadcastUserMessageInstance[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new BroadcastUserMessageInstance(), element));
    });
    return array;
  }
}
