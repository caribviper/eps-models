import { ActionEvent } from './../../value-objects/common/action-event';
import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Contact } from './../../value-objects/common/contact';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entities';


export class Consultation extends Entity {
  /**Id of registry item */
  registryId: string;

  /**date consultation was completed */
  public dateCompleted: Date;

  /**Date consultation was requested */
  public dateRequested: Date;
  
  /**Date consultation is expected back */
  public dateDue: Date;

  /**user requesting */
  public requestingUser: UserInfo;

  /**user logging return */
  public returnedByUser: UserInfo;

  /**Contact */
  organisation: Contact;

  /**Comments/information sent to agency */
  comments: string;

  /**Comments/information sent from agency */
  agencyComment: string;

  /**Document/letter sent to consulting group */
  documentId: string;

  /**Attachment id  */
  attachment: string;

  constructor(registryId: string = '', guid: string = '', organisation: Contact = null, comments: string = '', documentId: string = '', attachmentId: string = '') {
    super(ENTITY_MODELS.PLANNING.CONSULTATION, Consultation.createId(registryId, guid), true);
    this.registryId = registryId;
    this.organisation = organisation;
    this.comments = comments;
    this.documentId = documentId;
    this.attachment = attachmentId;
    this.dateRequested = new Date();
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Consultation cannot be transient');
    Assert.isTruthy(this.registryId, 'Consutlation must have a valid registry id');
    Assert.isTruthy(this.organisation, 'Consutlation must have a valid organisation');
    Assert.isTruthy(this.dateRequested, 'Consutlation must have a requested date');
    Assert.isTruthy(this.dateDue, 'Consutlation must have a due date');
  }


  public static createId(registryId: string = '', guid: string = '') {
    if(!registryId)
      return Entity.generateId(ENTITY_MODELS.PLANNING.CONSULTATION);
    if (!guid)
      return Entity.generateId(ENTITY_MODELS.PLANNING.CONSULTATION, registryId);
    return Entity.generateId(ENTITY_MODELS.PLANNING.CONSULTATION, registryId, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Consultation {
    return Object.assign(new Consultation(), source);
  }

  public static mapToEntityArray(source: Consultation[]): Consultation[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new Consultation(), element));
    });
    return array;
  }
}
