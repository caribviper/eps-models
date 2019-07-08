import { BroadcastUserMessageInstance } from './broadcast-user-message-instance';
import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
import * as moment from 'moment';

const ACTIVE_DAYS_MIN = 1,
  ACTIVE_DAYS_MAX = 7,
  ACTIVE_DAYS_DEFAULT = 5;

/**Manages broadcasts of the system */
export class BroadcastMessage extends Entity {

  /**Date broadcast was created */
  public dateCreated: Date;

  /**Date broadcast was dispatched */
  public dateDispatched: Date;

  /**Number of days broadcast should exists until self expiring */
  public activeDays: number;

  /**Recipients of the message */
  public domains: string[] = [];

  /**
   * Creates a new broadcast message
   * @param guid Id of the broadcast message
   * @param title Title of the broadcast
   * @param message Content of the broadcast
   * @param creator Creator of the broadcast
   */
  constructor(public guid: string = '', public title: string = '', public message: string = '', public creator: UserInfo = UserInfo.EmptyUserInfo()) {
    super(ENTITY_MODELS.SYSTEM.BROADCAST_MESSAGE, BroadcastMessage.createId(guid), true);
    this.dateCreated = new Date();
    this.activeDays = ACTIVE_DAYS_DEFAULT;
  }

  /**Expiration date of the message */
  get expirationDate(): Date {
    if (!this.dateDispatched)
      return undefined;
    this.activeDays = (this.activeDays < ACTIVE_DAYS_MIN || this.activeDays > ACTIVE_DAYS_MAX) ? ACTIVE_DAYS_DEFAULT : this.activeDays;
    const date = moment(new Date(this.dateDispatched)).add(this.activeDays, 'days');
    return date.toDate();
  }

  /**Indicates if the message can be broadcasted */
  get canBroadcast(): boolean {
    return !!this.dateDispatched !== true && !!this.title && !!this.message && this.domains && this.domains.length > 0;
  }

  /**Indicates if the message has been dispatched */
  get dispatched(): boolean {
    return !!this.dateDispatched === true;
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Must not be transient');
    Assert.isTruthy(this.creator, 'Must have a valid creator');
    Assert.isTruthy(this.dateCreated, 'Must have a valid creation date');
    Assert.isTruthy(this.title, 'Must have a valid title');
    Assert.isTruthy(this.message, 'Must have a valid message');
    Assert.isTruthy(this.domains, 'Must have valid receivers');
  }

  /**
   * Commits the broadcast to dispatching
   */
  broadcast() {
    if (this.dispatched)
      throw new Error('Broadcast message already sent');
    this.activeDays = (this.activeDays < ACTIVE_DAYS_MIN || this.activeDays > ACTIVE_DAYS_MAX) ? ACTIVE_DAYS_DEFAULT : this.activeDays;
    this.dateDispatched = new Date();
  }

  /**
   * Recalls a broadcast
   */
  recall() {
    if(this.dispatched)
      this.dateDispatched = undefined;
  }

  public static createId(guid: string = '') {
    if (!guid)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.BROADCAST_MESSAGE);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.BROADCAST_MESSAGE, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): BroadcastMessage {
    return Object.assign(new BroadcastMessage(), source);
  }

  public static mapToEntityArray(source: BroadcastMessage[]): BroadcastMessage[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new BroadcastMessage(), element));
    });
    return array;
  }
}
