import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Contact } from './../../value-objects/common/contact';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entities';

export class Consultation extends Entity {
  /**Id of registry item */
  registryId: string;

  /**consultation event ids */
  events: string[];

  /**Contact */
  organisation: Contact;

  /**Comments/information sent to agency */
  comments: string;

  /**Document/letter sent to consulting group */
  documentId: string

  /**Attachment id  */
  attachment: string;

  constructor(registryId: string = '', guid: string = '', organisation: Contact = null, comments: string = '', documentId: string = '', attachmentId: string = '') {
    super(ENTITY_MODELS.PLANNING.CONSULTATION, Consultation.createId(registryId, guid), true);
    this.registryId = registryId;
    this.organisation = organisation;
    this.comments = comments;
    this.documentId = documentId;
    this.attachment = attachmentId;
    this.events = [];
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Consultation cannot be transient');
    Assert.isTruthy(this.registryId, 'Consutlation must have a valid registry id');
    Assert.isTruthy(this.organisation, 'Consutlation must have a valid organisation');
    Assert.isTruthy(this.events, 'Consutlation must have a valid set of events');
  }

  public addEvent(eventId) {
    this.events.push(eventId);
  }

  public static createId(registryId: string = '', guid: string = '') {
    if (!registryId || !guid)
      return Entity.generateId(ENTITY_MODELS.PLANNING.CONSULTATION, registryId);
    return Entity.generateId(ENTITY_MODELS.PLANNING.CONSULTATION, registryId, Date.now().toString(), guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: Consultation): Consultation {
    return Object.assign(new Consultation(), source);
  }
}
