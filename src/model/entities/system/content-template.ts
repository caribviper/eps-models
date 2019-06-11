import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';
import { Assert } from 'caribviper-common';

/**
 * Entity that stores content to be rendered onto a document template
 */
export class ContentTemplate extends Entity {

  constructor(public name: string = '', public template: string = '') {
    super(ENTITY_MODELS.SYSTEM.CONTENT_TEMPLATE, ContentTemplate.createId(name), true);
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'ContentTemplate cannot be transient');
    Assert.isTruthy(this.name, 'ContentTemplate template name cannot be undefined/empty');
  }

  public static createId(name: string = '') : string {
    if(!name)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.CONTENT_TEMPLATE);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.CONTENT_TEMPLATE, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): ContentTemplate {
    return Object.assign(new ContentTemplate(), source);
  }

  public static mapToEntityArray(source: ContentTemplate[]): ContentTemplate[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new ContentTemplate(), element));
    });
    return array;
  }
}
