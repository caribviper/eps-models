import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
import * as moment from 'moment';

const ACTIVE_DAYS_MIN = 1,
  ACTIVE_DAYS_MAX = 7,
  ACTIVE_DAYS_DEFAULT = 5;

export class BroadcastReceiver {
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
export class Broadcast extends Entity {

  /**Date broadcast was created */
  public dateCreated: Date;

  /**Date broadcast was dispatched */
  public dateDispatched: Date;

  /**Number of days broadcast should exists until self expiring */
  public activeDays: number;

  /**Recipients of the message */
  public broadcastReceivers: BroadcastReceiver;

  constructor(public guid: string = '', public title: string = '', public message: string = '', public creator: UserInfo = UserInfo.EmptyUserInfo()) {
    super(ENTITY_MODELS.SYSTEM.BROADCAST, Broadcast.createId(guid), true);
    this.dateCreated = new Date();
    this.activeDays = ACTIVE_DAYS_DEFAULT;
    this.broadcastReceivers = new BroadcastReceiver();
  }

  get expirationDate(): Date {
    if (!this.dateDispatched)
      return null;
    this.activeDays = (this.activeDays < ACTIVE_DAYS_MIN || this.activeDays > ACTIVE_DAYS_MAX) ? ACTIVE_DAYS_DEFAULT : this.activeDays;
    moment(new Date(this.dateDispatched)).add(this.activeDays, 'days');
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Must not be transient');
    Assert.isTruthy(this.creator, 'Must have a valid creator');
    Assert.isTruthy(this.dateCreated, 'Must have a valid creation date');
    Assert.isTruthy(this.title, 'Must have a valid message');
    Assert.isTruthy(this.message, 'Must have a valid title');
    Assert.isTruthy(this.broadcastReceivers, 'Must have valid receivers');
  }

  /**Sets the broadcast ready for dispatching */
  finalise() {
    this.activeDays = (this.activeDays < ACTIVE_DAYS_MIN || this.activeDays > ACTIVE_DAYS_MAX) ? ACTIVE_DAYS_DEFAULT : this.activeDays;
    this.dateDispatched = new Date();
  }


  public static createId(guid: string = '') {
    if (!guid)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.BROADCAST);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.BROADCAST, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Broadcast {
    return Object.assign(new Broadcast(), source);
  }

  public static mapToEntityArray(source: Broadcast[]): Broadcast[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Broadcast(), element));
    });
    return array;
  }
}
