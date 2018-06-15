import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { UserInfo } from './../../value-objects/common/userinfo';
import { Assert } from 'caribviper-common';

/**
 * Short bit of information with an instruction
 */
export class Note extends Entity {

  /** Date content was added */
  public created: Date = null;

  /**Indicates that the note is critical in nature */
  public critical: boolean = false;

  /**
   * Creates a new note
   * @param guid Unique id of note
   * @param registryId Id of linked registry item
   * @param content Content/short information to be displayed with file
   * @param creator User who added content
   * @param expired Date note expires and is no longer made visible on file
   */
  constructor(guid: string = '', public registryId: string = '', public content: string = '', public creator: UserInfo = null, public expired: Date = null) { 
    super(ENTITY_MODELS.PLANNING.NOTE, Note.createId(registryId, guid), true);
    this.created = new Date();
  }
  
  validateEntity() {    
    Assert.isFalse(this.isTransient, 'Note cannot be transient');
    Assert.isTruthy(this.registryId, 'Note must have a valid registry id');
    Assert.isTruthy(this.content, 'Note must have valid content');
  }
  
  public static createId(registryId: string = '', guid: string = '') {
    if (!registryId)
      return '';
    if (!guid)
      return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.NOTE);
    return Entity.generateId(registryId, ENTITY_MODELS.PLANNING.NOTE, guid);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): Note {
    let o = Object.assign(new Note(), source);
    return o;
  }

  public static mapToEntityArray(source: Note[]): Note[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      let o = Object.assign(new Note(), element);
      array.push(o);
    });
    return array;
  }
}
