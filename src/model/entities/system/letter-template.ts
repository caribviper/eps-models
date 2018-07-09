import { Assert } from 'caribviper-common';
import { ENTITY_MODELS } from './../entity-model-type';
import { Entity } from 'caribviper-entity';

/**Manages letter templates */
export class LetterTemplate extends Entity {

  constructor(public name: string = '', public template: string = '') {
    super(ENTITY_MODELS.SYSTEM.LETTER_TEMPLATE, LetterTemplate.createId(name), true);
  }

  public validateEntity() {
    Assert.isFalse(this.isTransient, 'LetterTemplate cannot be transient');
    Assert.isTruthy(this.name, 'LetterTemplate templateName cannot be undefined/empty');
  }

  public static createId(name: string = '') : string {
    if(!name)
      return Entity.generateId(ENTITY_MODELS.SYSTEM.LETTER_TEMPLATE);
    return Entity.generateId(ENTITY_MODELS.SYSTEM.LETTER_TEMPLATE, name);
  }

  /**
   * Maps data from source to an entity of this type
   * @param source Data to be mapped to the entity
   */
  public static mapToEntity(source): LetterTemplate {
    return Object.assign(new LetterTemplate(), source);
  }

  public static mapToEntityArray(source: LetterTemplate[]): LetterTemplate[] {
    if (source.length < 1)
      return [];
    let array = [];
    source.forEach(element => {
      array.push(Object.assign(new LetterTemplate(), element));
    });
    return array;
  }

}
