import { Stakeholder } from './../../value-objects/common/stakeholder';
import { Contact } from './../../value-objects/common/contact';
import { NoticeType, FileType } from './../../value-objects/enumerators/filetype';
import { Assert } from 'caribviper-common';
import { UserInfo } from './../../value-objects/common/userinfo';
import { ENTITY_MODELS } from './../entity-model-type';
import { EventRecord } from './../../value-objects/common/event-record';
import { Entity } from 'caribviper-entity';
import * as numeral from 'numeral';
import { DocumentEntity } from '../document-entity';

/**
 * Specifies the enforcement notice done
 */
export class Notice extends DocumentEntity {

  public events: EventRecord;

  /**Id of the linked document */
  public documentId: string;

  /**Counter value applied to notice */
  public counterValue: number;

  /**Reference number for notice */
  public noticeNo: string;

  /**Persons receiving notice */
  public stakeholders: Stakeholder[] = [];

  /**Stores the development control area */
  public area: string = '';

  /**Has the development been completed */
  public completedDeveloment: boolean = false;

  //Gets the associated enforcement number if this notice is a stop notice/final notice/section37
  public enforcementNo: string = '';

  //Gets the associated enforcement date if this notice is a stop notice/final notice/section37
  public enforcementDate: Date = null;

  //Gets or sets the start date of the infraction
  public infractionStartDate: Date = null;

  //Gets or sets infraction end date
  public infractionEndDate: Date = null;

  //Gets or sets the recommended action to be taken
  public action: string ='';

  //Gets the date to carry out the action
  public actionDate: Date;

  //Person at tcp to be contacted
  public tcpContact: string;

  /**Stores the vairous fields and their values */
  formFields: any = {};

  constructor(public registryId: string = '', guid: string = '', public noticeType: NoticeType = null, public content: string = '', user: UserInfo = null) {
    super(ENTITY_MODELS.PLANNING.NOTICE, Notice.createId(registryId, guid), true);
    this.events = new EventRecord(user);
  }

  generateNo(area: string = '') {
    this.area = !!area ? area : this.area;
    this.noticeNo = this.noticeType.prefix + '/'
      + numeral(this.counterValue).format('0000') + '/'
      + numeral(new Date(this.events.created).getFullYear()).format('0000')
      + '/' + this.area;
  }

  validateEntity() {
    Assert.isFalse(this.isTransient, 'Notice cannot be transient');
    Assert.isTruthy(this.registryId, 'Notice must have a valid registry id');
    Assert.isTruthy(this.area, 'Notice must have a valid development control area');
  }

  /**
   * Signs a notice with the specified user
   * @param user User signing the notice
   */
  sign(user: UserInfo) {
    this.events = Object.assign(new EventRecord(null), this.events);
    this.events.sign(user);
  }

  /**
   * Dispatches a notice by the specifed user
   * @param user User dispatching the notice
   */
  dispatch(user: UserInfo) { 
    this.events = Object.assign(new EventRecord(null), this.events);
    this.events.dispatch(user); 
  }

  public static createId(registryId: string = '', guid: string = '') {
    if (!registryId)
      return '';
    if (!guid)
      return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.NOTICE);
    return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.NOTICE, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Notice {
    let events = Object.assign(new EventRecord(null), source.events);
    let o = Object.assign(new Notice(), source);
    o.events = events;
    return o;
  }

  public static mapToEntityArray(source: Notice[]): Notice[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      let events = Object.assign(new EventRecord(null), element.events);
      let o = Object.assign(new Notice(), element);
      o.events = events;
      array.push(o);
    });
    return array;
  }

}
