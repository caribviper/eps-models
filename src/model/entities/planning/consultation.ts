import { AttachedPicture } from './../../value-objects/planning/report';
import { ActionEvent } from './../../value-objects/common/action-event';
import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Contact } from './../../value-objects/common/contact';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entity';
import { DocumentEntity } from '../document-entity';


export class Consultation extends DocumentEntity {
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

  //agency code
  agencyCode: string;

  /**Comments/information sent to agency */
  comments: string;

  /**Comments/information sent from agency */
  agencyComment: string;

  /**Document/letter sent to consulting group */
  documentId: string;

  /**Attachment id  */
  attachment: string;

  /**pictures */
  attachedPictures: AttachedPicture[];

  constructor(registryId: string = '', guid: string = '', organisation: Contact = null, comments: string = '', documentId: string = '', attachmentId: string = '') {
    super(ENTITY_MODELS.PLANNING.CONSULTATION, Consultation.createId(registryId, guid), true);
    this.registryId = registryId;
    this.organisation = organisation;
    this.comments = comments;
    this.documentId = documentId;
    this.attachment = attachmentId;
    this.attachedPictures = [];
    this.agencyCode = '';
  }
  
  /**Indicates if the report has pictures attached */
  get hasPictures(): boolean {
    return !!this.attachedPictures && this.attachedPictures.length > 0;
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Consultation cannot be transient');
    Assert.isTruthy(this.registryId, 'Consutlation must have a valid registry id');
    Assert.isTruthy(this.organisation, 'Consutlation must have a valid organisation');
  }


  public static createId(registryId: string = '', guid: string = '') {
    if (!registryId)
      return '';
    if (!guid)
      return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.CONSULTATION);
    return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.CONSULTATION, guid);
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
