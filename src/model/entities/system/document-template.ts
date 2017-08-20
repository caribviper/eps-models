import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entities';

/**Manages document templates */
export class DocumentTemplate extends Entity {

  constructor(public name: string = '', public template: string = '') {
    super(ENTITY_MODELS.SYSTEM.DOCUMENT_TEMPLATE, DocumentTemplate.createId(name), true);
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'DocumentTemplate cannot be transient');
    Assert.isTruthy(this.name, 'DcumentTemplate templateName cannot be undefined/empty');
  }

  public static createId(name: string = '') : string {
    if(!name)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.DOCUMENT_TEMPLATE);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.DOCUMENT_TEMPLATE, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): DocumentTemplate {
    return Object.assign(new DocumentTemplate(), source);
  }

  public static mapToEntityArray(source: DocumentTemplate[]): DocumentTemplate[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new DocumentTemplate(), element));
    });
    return array;
  }

}
