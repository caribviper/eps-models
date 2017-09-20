import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';


/**Manage the minute  */
export class Minute extends Entity {

  /**Id of the registry file */
  registryId: string;

  /**Date minute was created */
  date: Date = new Date();

  /**Gets the name of user that created message. */
  author: UserInfo;

  /**Receiver of the message. */
  recipient: UserInfo;

  /**Contents of message. */
  content: string = '';

  /**Number within Reference File. */
  minuteNo: number;

  /**Specifies the date and time it was seen by recipient. */
  seen: Date = null;

  /**Gets any associated document that comprises part of the minute. */
  documentId: string = '';

  /**Gets an associated attachment that comprises part of the minute. */
  attachmentId: string = '';

  /**Id of the minute this is in response to */
  minuteReplyId: string;

	/**
	 * Specifies if the minute is official.
	 * This is mainly used to distinguish between minutes created before this system went live.
	 */
  officialMinute: boolean = false;

  constructor(registryId: string = '', guid: string = '', author: UserInfo = null, recipient: UserInfo = null, content: string = '') {
    super(ENTITY_MODELS.GENERAL.MINUTE, Minute.createId(registryId, guid), true);
    this.registryId = registryId;
    this.author = author;
    this.recipient = recipient;
    this.content = content;
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Minute cannot be transient');
    Assert.isTruthy(this.registryId, 'Minute requires a valid registry item id');
    Assert.isTruthy(this.author, "Minute requries a valid user as author");
    Assert.isTruthy(this.recipient, "Minute requires a valid user as recipient");
    Assert.isTruthy(this.content, "Minute content cannot be undefined or empty");
  }

  /**
   * Mark a minute as seen
   */
  public markAsSeen() {
    this.seen = new Date();
    this.update();
  }
  
  public static createId(registryId: string = '', guid: string = '') : string {
    if(!registryId)
      return Entity.generateId(ENTITY_MODELS.GENERAL.MINUTE);
    if(guid)
      return Entity.generateId(ENTITY_MODELS.GENERAL.MINUTE, registryId);
    return Entity.generateId(ENTITY_MODELS.GENERAL.MINUTE, registryId, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Minute {
    return Object.assign(new Minute(), source);
  }

  public static mapToEntityArray(source: Minute[]): Minute[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Minute(), element));
    });
    return array;
  }
}
