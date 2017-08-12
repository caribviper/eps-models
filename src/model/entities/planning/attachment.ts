import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Entity } from 'caribviper-entities';


export class Attachment extends Entity {
  /**Stores the corresponding registry id */
  registryId: string;

  /**Specifies the date the item was attached */
  dateAttached: Date;

  /**Gets who attached the file */
  attachedBy: UserInfo;

  /** Gets description about the file */
  description: string = '';

	/**
	 * Gets whether the file is viewable for all.
	 * By default all new files are only visible to attachedby user
	 */
  isPublic: boolean = true;

  /**Gets the new filename of the attached file */
  filename: string = '';

  constructor(registryId: string = '', guid: string = '', username: string = '', filename: string = '', attachedBy: UserInfo = undefined, description: string = '') {
    super(ENTITY_MODELS.PLANNING.ATTACHMENT, Attachment.createId(registryId, guid), true);
    this.registryId =registryId;
    this.attachedBy = attachedBy;
    this.filename = filename;
    this.description = description;
    this.dateAttached = new Date();
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'Attachment cannot be transient');
    Assert.isTruthy(this.registryId, 'Attachment requires a valid registry item id');
    Assert.isTruthy(this.attachedBy, 'Attachment requires a valid user as the attaching user');
    Assert.isTruthy(this.filename, 'Attachment requires a valid filename');
  }

  public static createId(registryId: string = '', guid: string = ''): string{
    if(!registryId)
      return Entity.generateId(ENTITY_MODELS.PLANNING.ATTACHMENT);
    if(!guid)
      return Entity.generateId(ENTITY_MODELS.PLANNING.ATTACHMENT, registryId);
    return Entity.generateId(ENTITY_MODELS.PLANNING.ATTACHMENT, registryId, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source: Attachment): Attachment {
    return Object.assign(new Attachment(), source);
  }
}
