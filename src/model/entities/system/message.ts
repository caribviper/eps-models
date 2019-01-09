import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
import * as moment from 'moment';

//Manages the messages sent between users and the system
export class Message extends Entity {

  //Registry id that the alert is attached to if any
  public registryId: string = '';

  //Reference no the alert is attached to if any
  public referenceNo: string = '';

  //Navigation link providing more information on alert
  public link: string = '';

  //Date of alert dismissal
  public dismissedDate: Date = null;

  //Date message read
  public readDate: Date = null;

  /**Stores the level of duplication */
  public duplicate: number = 0;

  /**
   * Date message should be displayed and stored as a timestamp.
   * This allows reminder functionality
  */
  public reminderDate: number = 0;

  /**
   * Creates a new message
   * @param guid Guid created for entity
   * @param creator User that created the message
   * @param recipient Intended recipient of the message
   * @param message Message detailing the message
   * @param created Date message was created
   */
  constructor(public guid: string = '', public creator: UserInfo = new UserInfo('',''), public recipient: UserInfo = new UserInfo('',''), public message: string = '', public created: number = null) {
    super(ENTITY_MODELS.SYSTEM.MESSAGE, Message.createId(recipient.username, guid), true );
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Must not be transient');
    Assert.isTruthy(this.creator, 'Must have a valid creator');
    Assert.isTruthy(this.recipient, 'Must have a valid creator');
    Assert.isTruthy(this.created, 'Must have a valid creation date');
    Assert.isTruthy(this.message, 'Must have a valid message');
  }

  //Indicates whether the message is an alert
  public get isAlert(): boolean { return !!this.reminderDate; }

  //Was the alert of message dismissed
  public get wasDismissed(): boolean { return !!this.dismissedDate; }

  /**
   * Sets the reminder date to alert user
   * @param reminderDate The date to show reminder
   */
  public setAlert(reminderDate: Date) {
    this.reminderDate = new Date(reminderDate).getTime();
  }

  /**
   * Sets the reminder date to alert user
   * @param days The number of days from current date to show reminder
   */
  public setAlertByDays(days: number) {
    this.reminderDate = moment().add(days, 'days').toDate().getTime();
  }

  //Dimisses an alert 
  public dismiss() {
    if(!!this.reminderDate)
      this.dismissedDate = new Date();
  }

  //Sets the message as read
  public readMessage() {
    this.readDate = new Date();
  }

  /**
   * Creates a duplicate of the alert for the new recipient
   * @param message Message alert to be duplicated
   * @param newRecipient New Recipient of the alert
   */
  public static createDuplicate(message: Message, newRecipient: UserInfo): Message {
    if(message.dismissedDate)
      return null;
    if(new Date(message.reminderDate) < new Date() )
      return null;
    let m = Message.mapToEntity(message);
    m.duplicate++;
    m._id = m._id + ':duplicate' + m.duplicate;
    m.recipient = newRecipient;
    return m;
  }

  public static createId(username: string, guid: string = '') {
    // if(!username) 
    //   return '';
    if (!guid)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.MESSAGE);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.MESSAGE, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Message {
    return Object.assign(new Message(), source);
  }

  public static mapToEntityArray(source: Message[]): Message[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Message(), element));
    });
    return array;
  }
}
