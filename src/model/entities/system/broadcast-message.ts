import { BroadcastUserMessageInstance } from './broadcast-user-message-instance';
import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
import * as moment from 'moment';

const ACTIVE_DAYS_MIN = 1,
  ACTIVE_DAYS_MAX = 7,
  ACTIVE_DAYS_DEFAULT = 5;

export class BroadcastMessageReceiver {
  public readonly domains: string[];
  public readonly groups: string[];
  public readonly users: string[];

  constructor() {
    this.domains = [];
    this.groups = [];
    this.users = [];
  }
}

/**Manages broadcasts of the system */
export class BroadcastMessage extends Entity {

  /**Date broadcast was created */
  public dateCreated: Date;

  /**Date broadcast was dispatched */
  public dateDispatched: Date;

  /**Number of days broadcast should exists until self expiring */
  public activeDays: number;

  /**Recipients of the message */
  public broadcastReceivers: BroadcastMessageReceiver;

  /**
   * 
   * @param guid Id of the broadcast message
   * @param title Title of the broadcast
   * @param message Content of the broadcast
   * @param creator Creator of the broadcast
   */
  constructor(public guid: string = '', public title: string = '', public message: string = '', public creator: UserInfo = UserInfo.EmptyUserInfo()) {
    super(ENTITY_MODELS.SYSTEM.BROADCAST_MESSAGE, BroadcastMessage.createId(guid), true);
    this.dateCreated = new Date();
    this.activeDays = ACTIVE_DAYS_DEFAULT;
    this.broadcastReceivers = new BroadcastMessageReceiver();
  }

  /**Expiration date of the message */
  get expirationDate(): Date {
    if (!this.dateDispatched)
      return null;
    this.activeDays = (this.activeDays < ACTIVE_DAYS_MIN || this.activeDays > ACTIVE_DAYS_MAX) ? ACTIVE_DAYS_DEFAULT : this.activeDays;
    moment(new Date(this.dateDispatched)).add(this.activeDays, 'days');
  }

  /**Indicates if the message can be broadcasted */
  get canBroadcast(): boolean {
    return !!this.dateDispatched !== true && !!this.title && !!this.message;
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Must not be transient');
    Assert.isTruthy(this.creator, 'Must have a valid creator');
    Assert.isTruthy(this.dateCreated, 'Must have a valid creation date');
    Assert.isTruthy(this.title, 'Must have a valid message');
    Assert.isTruthy(this.message, 'Must have a valid title');
    Assert.isTruthy(this.broadcastReceivers, 'Must have valid receivers');
  }

  /**
   * Commits the broadcast to dispatching
   * @param users Users to get broadcast
   */
  broadcast(users: string[] = []): BroadcastUserMessageInstance[] {
    if (!!users || users.length < 1)
      return [];
    if (!!this.dateDispatched)
      throw 'Broadcast message already sent'
    this.activeDays = (this.activeDays < ACTIVE_DAYS_MIN || this.activeDays > ACTIVE_DAYS_MAX) ? ACTIVE_DAYS_DEFAULT : this.activeDays;
    this.dateDispatched = new Date();
    const bInstances: BroadcastUserMessageInstance[] = [];
    users.forEach(user => {
      bInstances.push(new BroadcastUserMessageInstance(this._id, user, this.expirationDate));
    });
    return bInstances;
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
